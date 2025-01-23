import { Module } from '@nestjs/common';
import { ResendModule } from 'nestjs-resend';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@/shared/prisma';
import { AuthModule } from '@/modules/auth/auth.module';
import { CartModule } from '@/modules/cart/cart.module';
import { ProductModule } from '@/modules/product/product.module';
import { StoryModule } from '@/modules/story/story.module';
import { UserModule } from '@/modules/user/user.module';
import { IngredientModule } from '@/modules/ingredient/ingredient.module';
import * as Joi from 'joi';
import { PassportModule } from '@nestjs/passport';

@Module({
	imports: [
		// --- Modules ---
		AuthModule,
		CartModule,
		IngredientModule,
		ProductModule,
		StoryModule,
		UserModule,
		// --- ------- ---

		PassportModule,
		PrismaModule,

		// https://docs.nestjs.com/techniques/configuration
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
			validationSchema: Joi.object({
				APP_PORT: Joi.number().required(),
				RESEND_KEY: Joi.string().required(),
				DATABASE_URL: Joi.string().required(),
				JWT_SECRET: Joi.string().required(),
				JWY_EXPIRE: Joi.string().required(),
			}),
		}),

		// https://docs.nestjs.com/security/authentication#jwt-token
		JwtModule.registerAsync({
			global: true,
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return {
					secret: configService.get('JWT_SECRET'),
					signOptions: {
						expiresIn: configService.get('JWY_EXPIRE'),
					},
				};
			},
		}),

		// https://github.com/jiangtaste/nestjs-resend
		ResendModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return {
					apiKey: configService.get('RESEND_KEY'),
				};
			},
		}),
	],
})
export class AppModule {}
