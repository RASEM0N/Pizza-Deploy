<script setup lang="ts">
import ProductChooseForm from './ProductChooseForm.vue';
import ProductPizzaChooseForm from './ProductPizzaChooseForm.vue';
import { useProductCart } from '../model/service';

interface Props {
	product: Models.Product;
}

const { product } = defineProps<Props>();
const emits = defineEmits(['submit']);

const productStore = useProductCart(product.id)();
const firstItem = computed(() => product.items[0]);

const onSubmit = async (itemId: number = firstItem.value.id, ingredients: number[]) => {
	await productStore.addCartItem(itemId, ingredients);

	// @TODO показать тостер

	emits('submit');
};
</script>
<template>
	<ProductPizzaChooseForm
		v-if="firstItem?.pizzaType"
		@submit="onSubmit"
		:product="product"
		:loading="false"
	/>
	<ProductChooseForm v-else @submit="onSubmit" :product="product" :loading="false" />
</template>
