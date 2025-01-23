import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
	constructor(private readonly prisma: PrismaService) {}

	get(query: string): Promise<Product[]> {
		return this.prisma.product.findMany({
			where: { name: { contains: query, mode: 'insensitive' } },
			take: 5,
		});
	}
}
