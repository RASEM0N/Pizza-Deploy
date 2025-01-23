import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '@/core/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api');
	app.useGlobalPipes(new ValidationPipe());

	// https://docs.nestjs.com/openapi/introduction
	SwaggerModule.setup('api/docs', app, () =>
		SwaggerModule.createDocument(
			app,
			new DocumentBuilder().setTitle('Pizza | Api documentation').build(),
		),
	);

	await app.listen(process.env.APP_PORT);
}

bootstrap();
