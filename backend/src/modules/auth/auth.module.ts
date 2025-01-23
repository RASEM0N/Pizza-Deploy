import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthJwtStrategy } from './auth-jwt.strategy';

@Module({
	providers: [AuthService, AuthJwtStrategy],
	exports: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
