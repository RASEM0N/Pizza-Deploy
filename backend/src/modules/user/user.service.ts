import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { User } from '@prisma/client';
import { hash, genSalt, compare } from 'bcrypt';
import { PrismaService } from '@/shared/prisma';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	get(id: number): Promise<User> {
		return this.prisma.user.findFirst({ where: { id }, omit: { password: false } });
	}

	getAll(): Promise<User[]> {
		return this.prisma.user.findMany({ omit: { password: false } });
	}

	async create(dto: CreateUserDto): Promise<User> {
		const hashedPassword = await hash(this.password, await genSalt(10));
		return this.prisma.user.create({
			data: { ...dto, password: hashedPassword },
			omit: { password: false },
		});
	}

	async validateUser(email: string, password: string): Promise<User> {
		const user = await this.prisma.user.findFirst({ where: { email } });

		if (user && (await compare(password, user.password))) {
			return { ...user, password: undefined };
		}

		throw new Error('Error validation');
	}
}
