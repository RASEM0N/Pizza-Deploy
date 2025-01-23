import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma';
import { OrderStatus } from '@prisma/client';
import { CreateOrderDto } from './dto/create.dto';
import { CartService } from '@/modules/cart/cart.service';
import {
	YookassaPaymentCallback,
	YookassaPaymentData,
	YookassaService,
} from '@/shared/yookassa';
import { ResendService } from 'nestjs-resend';

@Injectable()
export class OrderService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly cartService: CartService,
		private readonly resendService: ResendService,
		private readonly yookassaService: YookassaService,
	) {}

	async create(token: string, dto: CreateOrderDto): Promise<YookassaPaymentData> {
		const cart = await this.cartService.get(token);

		if (!cart.totalAmount) {
			throw new Error('Cart is empty');
		}

		const order = await this.prisma.order.create({
			data: {
				token,
				...dto,
				status: OrderStatus.PENDING,
				totalAmount: cart.totalAmount,
				items: JSON.stringify(cart.items),
			},
		});

		await this.cartService.clear(cart.id);

		const paymentData = await this.yookassaService.createPayment({
			orderId: order.id,
			amount: order.totalAmount,
			description: `Оплата заказа #${order.id}`,
		});

		await this.prisma.order.update({
			where: { id: order.id },
			data: { paymentId: paymentData.id },
		});

		await this.resendService.send({
			// @TODO Ban
			from: 'onboarding@resend.dev',
			to: dto.email,
			subject: `Next Pizza / Оплатите заказ #${order.id}`,
			html: '',
		});

		return paymentData;
	}

	async changeOrderStatus(id: number, status: OrderStatus): Promise<void> {
		const order = await this.prisma.order.findFirstOrThrow({ where: { id } });

		if (order.status === status) {
			return;
		}

		await this.prisma.order.update({
			where: { id },
			data: { status },
		});

		// только при успешном платеже подтверждаем
		if (status === OrderStatus.SUCCEEDED) {
			// @TODO
			await this.resendService.send({
				// @TODO Ban
				from: 'onboarding@resend.dev',
				to: order.email,
				subject: `Next Pizza / Ваш заказ успешно оформлен #${order.id}`,
				html: '',
			});
		}
	}
}
