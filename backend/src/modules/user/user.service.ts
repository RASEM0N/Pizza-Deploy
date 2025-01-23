import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { User } from '@prisma/client';
import { PrismaService } from '@/shared/prisma';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	get(id: number): Promise<User> {
		return this.prisma.user.findFirst({ where: { id }, select: { password: false } });
	}

	getAll(): Promise<User[]> {
		return this.prisma.user.findMany({ select: { password: false } });
	}

	create(dto: CreateUserDto): Promise<User> {
		return this.prisma.user.create({ data: dto, select: { password: false } });
	}

	async validateUser(email: string, password: string): Promise<User> {
		const user = await this.prisma.user.findFirst({
			where: { email },
		});

		// @TODO Ban
		if (user && user.password === password) {
			return user;
		}

		throw new Error('Error validation');
	}
}
