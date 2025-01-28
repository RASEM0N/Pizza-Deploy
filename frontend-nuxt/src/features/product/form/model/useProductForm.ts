import { type Cart, useCartStore } from '~/src/entities/cart';
import type { IProduct } from '~/src/entities/product';

interface Params {
	product: IProduct;
	onError?: (error: unknown) => void;
	onSuccess?: (user: Cart) => void;
}

export const useProductForm = ({ product, onError, onSuccess }: Params) => {
	const snackbar = useSnackbar();
	const cartStore = useCartStore();

	// @TODO скорее всего не подцепится, надо проверять
	const firstItem = computed(() => product.items?.[0]);

	const submit = async (
		...args: Parameters<typeof cartStore.createCart.executeWithThrow>
	) => {
		try {
			const cart = await cartStore.createCart.executeWithThrow(...args);

			snackbar.add({ type: 'success', text: `${product.name} добавлен в корзину` });
			onSuccess?.(cart);
		} catch (e) {
			snackbar.add({ type: 'error', text: `Ошибка добавления продукта в корзине` });
			onError?.(e);
		}
	};

	return {
		submit,
		firstItem,
		loading: cartStore.createCart.loading,
	};
};
