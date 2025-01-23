import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from '@/modules/order/dto/create.dto';
import { Cookie } from '@/shared/cookie';
import { YookassaPaymentCallback } from '@/shared/yookassa';
import { OrderStatus } from '@prisma/client';

@ApiTags('Order')
@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post()
	async create(
		@Cookie('cart-token') token: string,
		@Body() dto: CreateOrderDto,
	): Promise<string> {
		const paymentData = await this.orderService.create(token, dto);
		return paymentData.confirmation.confirmation_url;
	}

	@Post('callback')
	paymentCallback(@Body() data: YookassaPaymentCallback) {
		return this.orderService.changeOrderStatus(
			+data.object.metadata.order_id,
			OrderStatus.SUCCEEDED,
		);
	}
}
