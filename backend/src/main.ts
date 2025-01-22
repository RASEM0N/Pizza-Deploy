import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/core/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// https://docs.nestjs.com/openapi/introduction
async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const doc = new DocumentBuilder()
		.setTitle('Pizza | Api documentation')
		.setVersion('0.0.0')
		.build();

	SwaggerModule.setup('api/docs', app, () => SwaggerModule.createDocument(app, doc));

	await app.listen(3000);
}

bootstrap();
