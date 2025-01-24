import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Cookie = createParamDecorator((data: string, ctx: ExecutionContext) => {
	const value = ctx.switchToHttp().getRequest<Request>().cookies[data];

	if (!value) {
		throw new BadRequestException(`${data} cookie is empty`)
	}

	return value;
});
