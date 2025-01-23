import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Cart } from '@prisma/client';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create.dto';
import { UpdateCartDto } from './dto/update.dto';
import { Cookie } from '@/shared/cookie';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
	constructor(private readonly cartService: CartService) {}

	@Get()
	get(@Cookie('cart-token') token: string): Promise<Cart> {
		return this.cartService.get(token);
	}

	@Post()
	create(
		@Cookie('cart-token') token: string,
		@Body() dto: CreateCartDto,
	): Promise<Cart> {
		return this.cartService.create(dto, token);
	}

	@Delete(':cartItemId')
	delete(
		@Cookie('cart-token') token: string,
		@Param('cartItemId') cartItemId: number,
	): Promise<Cart> {
		return this.cartService.deleteItem(token, cartItemId);
	}

	@Put(':cartItemId')
	update(
		@Cookie('cart-token') token: string,
		@Param('cartItemId') cartItemId: number,
		@Body() dto: UpdateCartDto,
	): Promise<Cart> {
		return this.cartService.update(token, cartItemId, dto);
	}
}
