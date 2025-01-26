import Items from '@redocly/ajv/lib/vocabularies/applicator/items';

export enum FetchStatus {
	none,
	loading,
	loaded,
	error,
}

export const calcCartItemTotalPrice = (item: Models.CartItem): number => {
	const ingredientsPrice = item.ingredients.reduce(
		(acc, ingredient) => acc + ingredient.price,
		0,
	);
	return (ingredientsPrice + item.ProductItem.price) * item.quantity;
};

export const getCartDetailItems = (cart: Models.Cart): CartDetailItem[] => {
	return cart.items.map((item) => ({
		id: item.id,
		quantity: item.quantity,
		name: item.ProductItem.Product.name,
		imageUrl: item.ProductItem.Product.imgUrl,
		price: calcCartItemTotalPrice(item),
		pizzaSize: item.ProductItem.size,
		pizzaType: item.ProductItem.pizzaType,
		disabled: false,
		ingredients: item.ingredients.map((ingredient) => ({
			name: ingredient.name,
			price: ingredient.price,
		})),
	}));
};

export interface CartDetailItem {
	id: number;
	quantity: number;
	name: string;
	imageUrl: string;
	price: number;
	pizzaSize: number;
	pizzaType: number;
	disabled: boolean;
	ingredients: { name: string; price: number }[];
}

interface State {
	cart?: Models.Cart;
	status: FetchStatus;
}

// @TODO нет обработки ошибок
// await $fetch('*'
// @TODO вынести в API
// + надо дефолтный api сделать baseURL
// @TODO в entities cart

// @TODO переработать, cart-очка то одна у нас всегда
export const useProductCart = defineStore(`cart`, {
	// @TODO для каждого метода свой status-а
	state: (): State => ({ status: FetchStatus.none }),

	getters: {
		loading(state): boolean {
			return state.status === FetchStatus.loading;
		},
		totalAmount(state): number {
			return state.cart?.totalAmount ?? 0;
		},
		detailItems(state): CartDetailItem[] {
			return state.cart ? getCartDetailItems(state.cart) : [];
		},
	},

	actions: {
		async getCart() {
			try {
				this.status = FetchStatus.loading;
				const data = await $fetch<Models.Cart>(`/api/cart`);
				this.status = FetchStatus.loaded;
				this.cart = data;
			} catch (e) {
				this.status = FetchStatus.error;
			}
		},

		async updateCartItem(itemId: number, quantity: number) {
			try {
				this.status = FetchStatus.loading;

				const data = await $fetch<Models.Cart>(`/api/cart/${itemId}`, {
					method: 'PUT',
					body: { quantity },
				});

				this.status = FetchStatus.loaded;
				this.cart = data;
			} catch (e) {
				this.status = FetchStatus.error;
			}
		},

		async removeCartItem(itemId: number) {
			try {
				this.status = FetchStatus.loading;

				const data = await $fetch<Models.Cart>(`/api/cart/${itemId}`, {
					method: 'DELETE',
				});

				this.status = FetchStatus.loaded;
				this.cart = data;
			} catch (e) {
				this.status = FetchStatus.error;
			}
		},

		async addCartItem(itemId: number, ingredients?: number[]) {
			try {
				this.status = FetchStatus.loading;

				const data = await $fetch<Models.Cart>(`/api/cart`, {
					method: 'POST',
					body: {
						itemId,
						ingredients,
					},
				});

				this.status = FetchStatus.loaded;
				this.cart = data;
			} catch (e) {
				this.status = FetchStatus.error;
			}
		},
	},
});
