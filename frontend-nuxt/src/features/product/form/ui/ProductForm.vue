<script setup lang="ts">
import type { IProduct } from '~/src/entities/product';
import type { Cart } from '~/src/entities/cart';
import { useProductForm } from '../model/useProductForm';

// @TODO название компоненты бэд
import ProductPizzaChooseForm from './ProductPizzaChooseForm.vue';
import ProductChooseForm from './ProductChooseForm.vue';

const emits = defineEmits<{
	'submit.success': [cart: Cart];
	'submit.error': [error: unknown];
}>();

const { product } = defineProps<{ product: IProduct }>();
const { firstItem, submit, loading } = useProductForm({
	product,
	onError: (error) => emits('submit.error', error),
	onSuccess: (product) => emits('submit.success', product),
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
