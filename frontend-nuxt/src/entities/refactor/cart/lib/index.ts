import type { Cart, CartItem, CartDetail } from '../model/types';

// @TODO
import { defaultMapProductTypes } from '~/src/entities/refactor/product';

export const getCartItemTotalPrice = (item: CartItem): number => {
	return (getCartItemIngredientPrice(item) + item.productItem.price) * item.quantity;
};

export const getCartItemIngredientPrice = (item: CartItem): number => {
	return item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
};

export const getCartDetail = (cart: Cart): CartDetail[] => {
	return cart.items.map((item) => ({
		id: item.id,
		quantity: item.quantity,
		name: item.productItem.product.name,
		imgUrl: item.productItem.product.imgUrl,
		pizzaSize: item.productItem.size,
		pizzaType: item.productItem.pizzaType,
		disabled: false,
		price: getCartItemTotalPrice(item),
		ingredients: item.ingredients.map((v) => ({ name: v.name, price: v.price })),
	}));
};

export const getCartDetailDescription = ({
	ingredients,
	pizzaSize,
	pizzaType,
}: CartDetail) => {
	const details = [];

	// @todo локализация
	if (pizzaSize && pizzaType) {
		const typeName = defaultMapProductTypes()[pizzaType];
		details.push(`${typeName} ${pizzaSize} см`);
	}

	if (ingredients) {
		details.push(...ingredients.map((ingredient) => ingredient.name));
	}

	return details.join(', ');
};
