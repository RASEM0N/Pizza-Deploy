import type { Cart } from './types';
import { useAsync } from '~/src/shared/lib/useAsync';
import { $apiFetch } from '~/src/shared/api';
import { getCartDetails } from '~/src/entities/cart/lib';

export const useCartStore = defineStore('cart', () => {
	const cart = ref<Cart>();
	const totalAmount = computed(() => cart.value?.totalAmount ?? 0);
	const cartDetails = computed(() => (cart.value ? getCartDetails(cart.value) : []));

	const loadMyCart = useAsync(
		() => {
			return $apiFetch<Cart>(`/api/cart`);
		},
		{ synchronizationRef: cart },
	);

	const createCartItem = useAsync(
		(itemId: number, ingredients: number[]) => {
			return $apiFetch<Cart>('/api/cart', {
				method: 'POST',
				body: { itemId, ingredients },
			});
		},
		{ synchronizationRef: cart },
	);

	const removeCartItem = useAsync(async (itemId: number) => {
		await $apiFetch<void>(`/api/cart/${itemId}`, { method: 'DELETE' });
		cart.value = undefined;
	});

	const updateCartItem = useAsync(
		(itemId: number, quantity: number) => {
			return $apiFetch<Cart>(`/api/cart/${itemId}`, {
				method: 'PUT',
				body: { quantity },
			});
		},
		{ synchronizationRef: cart },
	);

	return {
		cart,
		cartDetails,
		totalAmount,

		loadMyCart,
		updateCartItem,
		createCartItem,
		removeCartItem,
	};
});
