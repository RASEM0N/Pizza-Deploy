<script setup lang="ts">
import type { IProduct } from '~/src/entities/product';
import type { Cart } from '~/src/entities/cart';
import { useProductForm } from '../model/useProductForm';

// @TODO название компоненты бэд
import ProductPizzaChooseForm from './ProductPizzaChooseForm.vue';
import ProductChooseForm from './ProductChooseForm.vue';

const emits = defineEmits<{
	success: [cart: Cart];
	error: [error: unknown];
}>();

const { product } = defineProps<{ product: IProduct }>();
const { firstItem, submit, loading } = useProductForm({
	product,
	onError: (error) => emits('error', error),
	onSuccess: (product) => emits('success', product),
});

// @TODO странная проверка v-if="firstItem?.pizzaType"
// надо проверить
</script>
<template>
	<ProductPizzaChooseForm
		v-if="firstItem?.pizzaType"
		@submit="submit"
		:product="product"
		:loading="loading"
	/>
	<ProductChooseForm
		v-else
		@submit="submit"
		:product="product"
		:product-item="firstItem"
		:loading="loading"
	/>
</template>
