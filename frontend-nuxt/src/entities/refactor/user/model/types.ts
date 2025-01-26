import type { Common } from '~/src/shared/lib/types';
import type { Cart } from '~/src/entities/refactor/cart/@x';
import type { Order } from '~/src/entities/refactor/order/@x';

export enum USER_ROLE {
	user = 'USER',
	admin = 'ADMIN',
}

export interface User extends Common {
	fullName: string;
	email: string;
	password: string;
	role: USER_ROLE;

	verified?: number;
	provider?: string;
	providerId?: string;

	cart: Cart;
	orders: Order[];
}

export interface UserVerification extends Common {
	code: string;
	userId: number;
}
