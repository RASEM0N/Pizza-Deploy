// @TODO локализация
export const mapPizzaSize: { [key in Models.PizzaSize]: string } = {
	20: 'Маленькая',
	30: 'Средняя',
	40: 'Большая',
};

export const mapPizzaType: { [key in Models.PizzaType]: string } = {
	1: 'традиционная',
	2: 'тонкая',
};

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
	name,
	value: Number(value),
}));

export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({
	name,
	value: Number(value),
}));

export const calcTotalPizzaPrice = (
	type: Models.PizzaType,
	size: Models.PizzaSize,
	items: Models.ProductItem[],
	ingredients: Models.Ingredient[],
	selectedIngredients: Set<number>,
) => {
	const pizzaPrice =
		items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;

	const totalIngredientsPrice = ingredients
		.filter((ingredient) => selectedIngredients.has(ingredient.id))
		.reduce((acc, ingredient) => acc + ingredient.price, 0);

	return pizzaPrice + totalIngredientsPrice;
};

// @TODO локализация
// @TODO константы вынести
// @ todo 5 параметров
export const getPizzaDetails = (
	items: Models.ProductItem[],
	ingredients: Models.Ingredient[],
	type: Models.PizzaType,
	size: Models.PizzaSize,
	selectedIngredients: Set<number>,
) => {
	const totalPrice = calcTotalPizzaPrice(
		type,
		size,
		items,
		ingredients,
		selectedIngredients,
	);
	const textDetails = `${size} см, ${mapPizzaType[type]} пицца`;

	return { totalPrice, textDetails };
};

// @TODO
export type Variant = {
	name: string;
	value: string | number;
	disabled?: boolean;
};

export const getAvailablePizzaSizes = (
	type: Models.PizzaType,
	items: Models.ProductItem[],
): Variant[] => {
	const filteredPizzasByType = items.filter((item) => item.pizzaType === type);

	return pizzaSizes.map((item) => ({
		name: item.name,
		value: item.value,
		disabled: !filteredPizzasByType.some(
			(pizza) => pizza.size === Number(item.value),
		),
	}));
};

// @TODO не на своем месте
export const usePizzaOptions = (items: Models.ProductItem[]) => {
	const size = ref<Models.PizzaSize>(20);
	const type = ref<Models.PizzaType>(1);

	const selectedIngredients = reactive(new Set<number>([]));
	const currentItemId = computed<number | undefined>(
		() =>
			items.find(
				(item) => item.pizzaType === type.value && item.size === size.value,
			)?.id,
	);

	const availableSizes = computed<Variant[]>(() =>
		getAvailablePizzaSizes(type.value, items),
	);
	const availableSize = computed<Variant | undefined>(() =>
		availableSizes.value.find((item) => !item.disabled),
	);

	const isAvailableSize = computed<boolean>(() =>
		availableSizes.value.some(
			(item) => Number(item.value) === size.value && !item.disabled,
		),
	);

	watch(type, () => {
		if (!isAvailableSize.value && availableSize.value) {
			size.value = +availableSize.value?.value as Models.PizzaSize;
		}
	});

	return {
		size,
		type,
		availableSizes,
		currentItemId,
		selectedIngredients,
		selectIngredient: (ingredient: number) =>
			selectedIngredients.has(ingredient)
				? selectedIngredients.delete(ingredient)
				: selectedIngredients.add(ingredient),
	};
};
