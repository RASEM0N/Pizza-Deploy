import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '@prisma/client';
import { UserService } from '@/modules/user/user.service';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly userService: UserService,
		private readonly configService: ConfigService,
	) {
		// @TODO
		// @ts-ignore
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(req: Request) => req.cookies['jwt'],
			]),
			secretOrKey: configService.get('JWT_SECRET'),
		});
	}

	async validate(userId: number): Promise<User> {
		const user = await this.userService.get(userId);

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
