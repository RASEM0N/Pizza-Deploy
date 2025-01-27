import type { Common } from '~/src/shared/lib/types';
import type {
	IProductIngredient,
	IProductItem,
} from '~/src/entities/product/@x';

export interface Cart extends Common {
	token: string;
	totalAmount: number;
	userId: number;
	items: CartItem[];
}

export interface CartItem extends Common {
	quantity: number;
	ingredients: IProductIngredient[];

	productItem: IProductItem;
	productItemId: number;

	cart: Cart;
	cartId: number;
}

export interface CartDetail extends Pick<Common, 'id'> {
	name: string;
	quantity: number;
	price: number;

	imgUrl: string;
	disabled: boolean;

	pizzaSize: number;
	pizzaType: number;

	ingredients: CartIngredientDetail[];
}

export interface CartIngredientDetail {
	name: string;
	price: number;
	disabled?: boolean;
}
