import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { User } from '@prisma/client';
import { PrismaService } from '@/shared/prisma';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	getAll(): Promise<User[]> {
		return this.prisma.user.findMany();
	}

	create(data: CreateUserDto): Promise<User> {
		return this.prisma.user.create({ data });
	}
}
