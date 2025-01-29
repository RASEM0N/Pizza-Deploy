import type { Common } from '~/src/shared/lib/types';

export enum ORDER_STATUS {
	pending = 'PENDING',
	success = 'SUCCESS',
	cancelled = 'CANCELLED',
}

export interface Order extends Common {
	token: string;
	totalAmount: number;
	paymentId: string;
	items: string;
	status: ORDER_STATUS;

	fullName: string;
	email: string;
	phone: string;
	address: string;
	comment?: string;
	userId: number;
}

export interface OrderPriceDetails {
	taxesPrice: number;
	deliveryPrice: number;
	cartPrice: number;
	totalPrice: number;
}
