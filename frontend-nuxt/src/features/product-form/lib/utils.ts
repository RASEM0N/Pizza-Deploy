import {
	type IProductItem,
	type IProductIngredient,
	defaultMapProductSizes,
	defaultProductSizes,
} from '~/src/entities/refactor/product';

// @TODO локализация

interface GetProductDetailsParams {
	type: number;
	size: number;
	items: IProductItem[];
	ingredients: IProductIngredient[];
	selectIngredientsId: Set<number>;
}

interface AvailableProductSize {
	name: string;
	value: number;
	disabled: boolean;
}

export const getProductTotalPrice = ({
	type,
	size,
	items,
	ingredients,
	selectIngredientsId,
}: GetProductDetailsParams) => {
	const pizzaPrice =
		items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;

	const totalIngredientsPrice = ingredients
		.filter((ingredient) => selectIngredientsId.has(ingredient.id))
		.reduce((acc, ingredient) => acc + ingredient.price, 0);

	return pizzaPrice + totalIngredientsPrice;
};

export const getProductDetails = (params: GetProductDetailsParams) => {
	return {
		totalPrice: getProductTotalPrice(params),
		priceText: `${params.size} см, ${defaultMapProductSizes()[params.type]} пицца`,
	};
};

export const getAvailableProductItems = (
	pizzaType: number,
	items: IProductItem[],
): AvailableProductSize[] => {
	const availableProducts = items.filter((v) => v.pizzaType === pizzaType);
	return defaultProductSizes().map((v) => ({
		...v,
		disabled: !availableProducts.some((v) => v.size === pizzaType),
	}));
};
