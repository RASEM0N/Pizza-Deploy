import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared/prisma';
import { User } from '@prisma/client';
import { LoginDto, RegisterDto } from './dto/login.dto';
import { UserService } from '@/modules/user/user.service';
import { ResendService } from 'nestjs-resend';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly userService: UserService,
		private readonly resendService: ResendService,
		private readonly jwtService: JwtService,
	) {}

	async login(dto: LoginDto): Promise<{ user: User; token: string }> {
		const user = await this.userService.validateUser(dto.email, dto.password);
		const token = this.jwtService.sign({ userId: user.id });

		return { user, token };
	}

	async register(dto: RegisterDto): Promise<User> {
		const user = this.userService.create(dto);

		await this.resendService.send({
			// @TODO Ban
			from: 'onboarding@resend.dev',
			to: user.email,
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
