<script setup lang="ts">
import type { IProduct } from '~/src/entities/product';
import { useProductForm } from '../model/useProductForm';

import ProductChooseForm from './ProductChooseForm.vue';

// @TODO название компоненты бэд
import ProductPizzaChooseForm from './ProductPizzaChooseForm.vue';

const { product } = defineProps<{ product: IProduct }>();
const { firstItem, submit, loading } = useProductForm(product);

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
