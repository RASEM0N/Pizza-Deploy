import { Module } from '@nestjs/common';
import { PrismaModule } from '@/core/prisma/prisma.module';

@Module({
	providers: [PrismaModule],
})
export class AppModule {}
