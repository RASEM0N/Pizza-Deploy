import { Module } from '@nestjs/common';
import { PrismaModule } from '@/shared/prisma';

@Module({
	providers: [PrismaModule],
})
export class AppModule {}
