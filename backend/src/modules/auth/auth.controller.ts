import { Body, Controller, Get, Query, Response, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Response as ExpResponse } from 'express';
import { CreateUserDto } from '@/modules/user/dto/create.dto';
import { UserService } from '@/modules/user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { AuthUser } from './auth-user.decorator';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
	) {}

	@Get('me')
	@UseGuards(AuthGuard)
	me(@AuthUser() user: User) {
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
		response.clearCookie('jwt')
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
