import type { Cart } from './types';
import { useAsync } from '~/src/shared/lib/useAsync';
import { $apiFetch } from '~/src/shared/api';
import { getCartDetails } from '~/src/entities/cart/lib';

export const useCartStore = defineStore('cart', () => {
	const cart = ref<Cart>();
	const totalAmount = computed(() => cart.value?.totalAmount ?? 0);
	const cartDetails = computed(() => (cart.value ? getCartDetails(cart.value) : []));

	const getCart = useAsync(
		() => {
			return $apiFetch<Cart>(`/api/cart`);
		},
		{ synchronizationRef: cart },
	);

	// @TODO CREATE REMOVE UPDATE это для Item

	const createCart = useAsync(
		(productItemId: number, ingredients: number[]) => {
			return $apiFetch<Cart>('/api/cart', {
				method: 'POST',
				body: { productItemId, ingredients },
			});
		},
		{ synchronizationRef: cart },
	);

	const removeCart = useAsync(
		(itemId: number) => $apiFetch<Cart>(`/api/cart/${itemId}`, { method: 'DELETE' }),
		{ synchronizationRef: cart },
	);

	const updateCart = useAsync(
		(itemId: number, quantity: number) => {
			return $apiFetch<Cart>(`/api/cart/${itemId}`, {
				method: 'PUT',
				body: { quantity },
			});
		},
		{ synchronizationRef: cart },
	);

	const payCart = useAsync(
		(values: {
			email: string;
			fullName: string;
			phone: string;
			address: string;
			comment: string;
		}) => $apiFetch<string>('/api/order', { method: 'POST', body: values }),
	);

	return {
		cart,
		cartDetails,
		totalAmount,

		getCart,
		payCart,
		createCart,
		updateCart,
		removeCart,
	};
});
