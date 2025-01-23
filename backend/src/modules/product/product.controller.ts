import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Get('search')
	get(@Query('query') query: string): Promise<Product[]> {
		return this.productService.get(query);
	}
}
