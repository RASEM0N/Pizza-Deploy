import type { Common } from '~/src/shared/lib/types';
import type { Cart, CartItem } from '~/src/entities/cart/@x';

export interface IProduct extends Common {
	name: string;
	imgUrl: string;

	items: IProductItem[];
	ingredients: IProductIngredient[];

	Category: IProductCategory;
	categoryId: number;
}

export interface IProductItem extends Common {
	price: number;
	size: number;
	pizzaType: number;

	cartItem: CartItem;

	Product: IProduct;
	productId: number;
}

export interface IProductIngredient extends Common {
	name: string;
	price: number;
	imgUrl: string;

	Product: IProduct;
	productId: number;

	Cart: Cart;
	cartId: number;
}

export interface IProductCategory extends Common {
	name: string;
	products: IProduct[];
}

export interface IProductIngredientDetail {
	name: string;
	price: number;
	disabled?: boolean;
}
