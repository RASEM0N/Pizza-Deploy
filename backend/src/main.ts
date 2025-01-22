import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '@/core/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const doc = new DocumentBuilder()
		.setTitle('Pizza | Api documentation')
		.setVersion('0.0.0')
		.build();

	// https://docs.nestjs.com/openapi/introduction
	SwaggerModule.setup('api/docs', app, () => SwaggerModule.createDocument(app, doc));

	// https://docs.nestjs.com/techniques/validation
	app.useGlobalPipes(new ValidationPipe());

	await app.listen(3000);
}

bootstrap();
