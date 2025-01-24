import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
	constructor(private readonly prisma: PrismaService) {}

	get(id: number): Promise<Product> {
		return this.prisma.product.findFirstOrThrow({
			where: { id },
			include: {
				items: true,
				ingredients: true,
			},
		});
	}
}
