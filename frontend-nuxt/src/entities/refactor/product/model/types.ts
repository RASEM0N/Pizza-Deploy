import type { Common } from '~/src/shared/lib/types';
import type { Cart, CartItem } from '~/src/entities/refactor/cart/@x';

export interface Product extends Common {
	name: string;
	imgUrl: string;

	items: ProductItem[];
	ingredients: ProductIngredient[];

	category: ProductCategory;
	categoryId: number;
}

export interface ProductItem extends Common {
	price: number;
	size: number;
	pizzaType: number;

	cartItem: CartItem;
}

export interface ProductIngredient extends Common {
	name: string;
	price: number;
	imgUrl: string;

	product: Product;
	productId: number;

	cart: Cart;
	cartId: number;
}

export interface ProductCategory extends Common {
	name: string;
	products: Product[];
}
