import type { Common } from '~/src/shared/lib/types';
import type { ProductIngredient, ProductItem } from '~/src/entities/refactor/product/@x';

export interface Cart extends Common {
	token: string;
	totalAmount: number;
	userId: number;
	items: CartItem[];
}

export interface CartItem extends Common {
	quantity: number;
	ingredients: ProductIngredient[];

	productItem: ProductItem;
	productItemId: number;

	cart: Cart;
	cartId: number;
}
