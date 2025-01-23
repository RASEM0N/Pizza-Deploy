import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma';
import { User } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import { UserService } from '@/modules/user/user.service';
import { CreateUserDto } from '@/modules/user/dto/create.dto';
import { ResendService } from 'nestjs-resend';

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly userService: UserService,
		private readonly resendService: ResendService,
	) {}

	async login(dto: LoginDto): Promise<{ user: User; token: string }> {
		return this.userService.validateUser(dto.email, dto.password);
	}

	async register(dto: CreateUserDto): Promise<User> {
		const user = this.userService.create(dto);

		await this.resendService.send({

			// @TODO Ban
			from: 'onboarding@resend.dev',
			to: '',
			subject: '',
			html: '',
		});

		return user;
	}

	async verify(code: string): Promise<void> {
		const verify = await this.prisma.verificationCode.findFirstOrThrow({
			where: { code },
		});

		await this.prisma.user.update({
			where: { id: verify.userId },
			data: { verified: new Date() },
		});

		await this.prisma.verificationCode.delete({ where: { id: verify.id } });
	}
}
