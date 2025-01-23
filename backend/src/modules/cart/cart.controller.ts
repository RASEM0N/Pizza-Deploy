import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Cart } from '@prisma/client';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create.dto';
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
}
