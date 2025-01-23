import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';

export const CurrentUser = createParamDecorator((_, ctx: ExecutionContext): UserModel => {
	const user = ctx.switchToHttp().getRequest()['res'];

	if (!user) {
		throw new Error('user is empty');
	}

	return user
});
