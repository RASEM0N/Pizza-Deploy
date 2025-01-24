import { Body, Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Category, Product } from '@prisma/client';
import { ProductService } from './product.service';
import { CategoryService } from './category.service';
import { SearchCategoriesDto } from './dto/search.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
	constructor(
		private readonly productService: ProductService,
		private readonly categoryService: CategoryService,
	) {}

	@Get(':productId')
	get(@Param('productId') productId: number): Promise<Product[]> {
		return this.productService.get(productId);
	}

	// @todo пока что сюда приземлил
	@Get('search')
	search(@Body() dto: SearchCategoriesDto): Promise<Category[]> {
		return this.categoryService.search(dto);
	}
}
