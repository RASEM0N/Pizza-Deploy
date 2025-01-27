import type { Cart, CartDetail } from './types';
import { getCartDetail } from '../lib';
import { FETCH_STATUS } from '~/src/shared/lib/types';

interface State {
	cart?: Cart;
	status: FETCH_STATUS;
}

// @TODO ошибки не перхватить нормально
export const useCart = defineStore('cart', {
	state: (): State => ({ status: FETCH_STATUS.none }),
	getters: {
		loading(state): boolean {
			return state.status === FETCH_STATUS.loading;
		},
		totalAmount(state): number {
			return state.cart?.totalAmount ?? 0;
		},
		detailItems(state): CartDetail[] {
			return state.cart ? getCartDetail(state.cart) : [];
		},
	},
	actions: {
		async getMyCart() {
			try {
				this.status = FETCH_STATUS.loading;
				const data = await $fetch<Cart>(`/api/cart`);
				this.status = FETCH_STATUS.loaded;
				this.cart = data;
			} catch (e) {
				this.status = FETCH_STATUS.error;
			}
		},

		async updateCartItem(itemId: number, quantity: number) {
			try {
				this.status = FETCH_STATUS.loading;

				const data = await $fetch<Cart>(`/api/cart/${itemId}`, {
					method: 'PUT',
					body: { quantity },
				});

				this.status = FETCH_STATUS.loaded;
				this.cart = data;
			} catch (e) {
				this.status = FETCH_STATUS.error;
			}
		},

		async removeCartItem(itemId: number) {
			try {
				this.status = FETCH_STATUS.loading;

				const data = await $fetch<Cart>(`/api/cart/${itemId}`, {
					method: 'DELETE',
				});

				this.status = FETCH_STATUS.loaded;
				this.cart = data;
			} catch (e) {
				this.status = FETCH_STATUS.error;
			}
		},

		async addCartItem(itemId: number, ingredients?: number[]) {
			try {
				this.status = FETCH_STATUS.loading;

				const data = await $fetch<Cart>(`/api/cart`, {
					method: 'POST',
					body: {
						itemId,
						ingredients,
					},
				});

				this.status = FETCH_STATUS.loaded;
				this.cart = data;
			} catch (e) {
				this.status = FETCH_STATUS.error;
			}
		},
	},
});
