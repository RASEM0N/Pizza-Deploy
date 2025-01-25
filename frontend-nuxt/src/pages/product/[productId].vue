<script setup lang="ts">
import { useApiFetch } from '~/src/shared/api';
import { ProductForm } from '~/src/features/product-form';

// @TODO локализация
// @TODO обработка ошибок

const route = useRoute();
const { data } = await useApiFetch<Models.Product>('/api/product', {
	params: { productId: route.params.productId },
});

if (!data) {
	throw createError({ statusCode: 404, statusMessage: 'Product is empty' });
}
</script>
<template>
	<UiContainer class="flex flex-col my-10">
		<ProductForm :product="data" />
	</UiContainer>
</template>
