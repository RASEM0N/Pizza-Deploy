import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma';
import { SearchCategoriesDto } from './dto/search.dto';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
	constructor(private readonly prisma: PrismaService) {}

	async search({
		priceTo = 0,
		priceFrom = 1000,
		sortBy = 'desc',
		ingredients,
		pizzaTypes,
		sizes,
		query,
	}: SearchCategoriesDto): Promise<Category[]> {
		return this.prisma.category.findMany({
			where: {
				name: { contains: query, mode: 'insensitive' },
			},
			include: {
				products: {
					ingredients: true,
					orderBy: { id: sortBy },
					items: {
						where: { price: { gte: priceFrom, lte: priceTo } },
						orderBy: { price: 'asc' },
					},
					where: {
						ingredients: ingredients
							? {
									some: {
										id: {
											in: ingredients,
										},
									},
								}
							: undefined,
						items: {
							some: {
								size: { in: sizes },
								pizzaType: { in: pizzaTypes },
								price: { gte: priceFrom, lte: priceTo },
							},
						},
					},
				},
			},
		});
	}
}
