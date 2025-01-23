import { Body, Controller, Get, Query, Response, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CurrentUser } from './auth-user.decorator';
import { JwtAuthGuard } from './auth-jwt.guard';
import { LoginDto } from './dto/login.dto';
import { Response as ExpResponse } from 'express';
import { CreateUserDto } from '@/modules/user/dto/create.dto';
import { User } from '@prisma/client';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('me')
	@UseGuards(JwtAuthGuard)
	me(@CurrentUser() user: User) {
		return user;
	}

	@Get('register')
	register(@Body() dto: CreateUserDto) {
		return this.authService.register(dto);
	}

	@Get('login')
	async login(@Response() response: ExpResponse, @Body() dto: LoginDto) {
		const { user, token } = await this.authService.login(dto);

		// @TODO
		response.cookie('jwt', token, { maxAge: 3600 * 1000 * 24 * 30 });

		return user;
	}

	@Get('logout')
	logout(@Response() response: ExpResponse) {
		response.clearCookie('jwt');
	}

	@Get('verify')
	async verify(
		@Response() response: ExpResponse,
		@Query('code') code: string,
	): Promise<void> {
		await this.authService.verify(code);
		response.redirect('/?verified');
	}
}
