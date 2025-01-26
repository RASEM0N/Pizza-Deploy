<script setup lang="ts">
import ProductChooseForm from './ProductChooseForm.vue';
import ProductPizzaChooseForm from './ProductPizzaChooseForm.vue';
import { useProductCart } from '../model/service';

interface Props {
	product: Models.Product;
}

const { product } = defineProps<Props>();
const emits = defineEmits(['submit']);
const snackbar = useSnackbar();

const productStore = useProductCart();
const firstItem = computed(() => product.items?.[0]);

const onSubmit = async (itemId: number, ingredients: number[] = []) => {
	// @TODO при ошибке не упадет
	await productStore.addCartItem(itemId, ingredients);

	// @TODO локализация
	snackbar.add({ type: 'success', text: `${product.name} добавлен в корзину` });
	emits('submit');
};
</script>
<template>
	<ProductPizzaChooseForm
		v-if="firstItem?.pizzaType"
		@submit="onSubmit"
		:product="product"
		:loading="productStore.loading"
	/>
	<ProductChooseForm
		v-else
		@submit="onSubmit"
		:product="product"
		:product-item="firstItem"
		:loading="productStore.loading"
	/>
</template>
