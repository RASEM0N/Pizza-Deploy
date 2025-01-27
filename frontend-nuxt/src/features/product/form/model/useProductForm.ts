import { type Cart, useCartStore } from '~/src/entities/cart';
import type { IProduct } from '~/src/entities/product';

export const useProductForm = (product: IProduct) => {
	// @todo есть такое чувство что не отработает нормально
	// надо проверять
	const emits = defineEmits<{
		'submit.success': [cart: Cart];
		'submit.error': [error: Error];
	}>();

	const snackbar = useSnackbar();
	const cartStore = useCartStore();

	// @TODO скорее всего не подцепится, надо проверять
	const firstItem = computed(() => product.items?.[0]);

	const submit = async (
		...args: Parameters<typeof cartStore.createCart.executeWithThrow>
	) => {
		try {
			const cart = await cartStore.createCart.executeWithThrow(...args);

			emits('submit.success', cart);
			snackbar.add({ type: 'success', text: `${product.name} добавлен в корзину` });
		} catch (e) {
			emits('submit.error', e as Error);
			snackbar.add({ type: 'error', text: `Ошибка добавления продукта в корзине` });
		}
	};

	return {
		submit,
		firstItem,
		loading: cartStore.createCart.loading,
	};
};
