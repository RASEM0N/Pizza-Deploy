import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma';
import { Cart, CartItem } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { CreateCartDto } from './dto/create.dto';

@Injectable()
export class CartService {
	constructor(private readonly prisma: PrismaService) {
	}

	get(token: string, fall = false): Promise<Cart> {
		return (fall ? this.prisma.cart.findFirst : this.prisma.cart.findFirstOrThrow)({
			where: { token },
			include: {
				items: {
					orderBy: { createdAt: 'desc' },
					include: {
						ingredients: true,
						productItem: {
							include: { Product: true },
						},
					},
				},
			},
		});
	}

	async create(dto: CreateCartDto, token: string = uuidv4()): Promise<Cart> {
		const cart = await this.createOrGet(token);

		await this.createOrUpdateItem(cart.id, dto);
		await this._actualizeTotalAmount(cart);

		return cart;
	}

	async createOrUpdateItem(cartId: Cart, dto: CreateCartDto): Promise<CartItem> {
		const cartItem = await this.prisma.cartItem.findFirst({
			where: {
				cartId,
				productItemId: dto.productItemId,
				ingredients: {
					every: {
						id: { in: dto.ingredients },
					},
				},
			},
		});

		if (cartItem) {
			return this.prisma.cartItem.update({
				where: { id: cartItem.id },
				data: { quantity: cartItem.quantity + 1 },
			});
		}
		return this.prisma.cartItem.create({
			data: {
				cartId,
				productItemId: dto.productItemId,
				quantity: 1,
				ingredients: {
					connect: (dto.ingredients ?? []).map((id) => ({ id })),
				},
			},
		});
	}

	async createOrGet(token: string): Promise<Cart> {
		const cart = await this.prisma.cart.findFirst({ where: { token } });

		if (cart) {
			return cart;
		}

		return this.prisma.cart.create({ data: { token } });
	}

	private _actualizeTotalAmount(cart: Cart): Promise<Cart> {
		return this.prisma.cart.update({
			where: { id: cart.id },
			data: { totalAmount: this._calculateTotalAmount(cart) },
			include: {
				items: {
					orderBy: { createdAt: 'desc' },
					include: {
						ingredients: true,
						productItem: {
							include: { Product: true },
						},
					},
				},
			},
		});
	}

	private _calculateTotalAmount(cart: Cart): number {
		return cart.item.reduce((res, item) => res + this._calculateItemTotalPrice(item), 0);
	}

	private _calculateItemTotalPrice(item: CartItem): number {
		const ingredientPrice = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
		return (ingredientPrice + item.productItem.price) * item.quantity;
	}
}
