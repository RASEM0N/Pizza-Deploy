import { Module } from '@nestjs/common';
import { PrismaModule } from '@/shared/prisma';
import { AuthModule } from '@/modules/auth/auth.module';
import { CartModule } from '@/modules/cart/cart.module';
import { ProductModule } from '@/modules/product/product.module';
import { StoryModule } from '@/modules/story/story.module';
import { UserModule } from '@/modules/user/user.module';

@Module({
	imports: [
		PrismaModule,
		AuthModule,
		CartModule,
		ProductModule,
		StoryModule,
		UserModule,
	],
})
export class AppModule {}
