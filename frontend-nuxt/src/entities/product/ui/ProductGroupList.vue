<script setup lang="ts">
import ProductCard from './ProductCard.vue';

interface Props {
	id: number;
	title: string;

	// @TODO Product
	products: any[];
}

const { id, title, products = [] } = defineProps<Props>();
const emits = defineEmits<{ active: [id: number] }>();

// https://vueuse.org/core/useIntersectionObserver/#useintersectionobserver
const target = ref();
useIntersectionObserver(
	target,
	([entry]) => {
		if (entry?.isIntersecting) {
			emits('active', id);
		}
	},
	{
		threshold: 0.4,
	},
);
</script>
<template>
	<div ref="target">
		<UiTitle class="font-extrabold mb-5" size="lg">{{ title }}</UiTitle>
		<div class="grid grid-cols-3 gap-[50px]">
			<ProductCard
				v-for="product in products"
				:key="product.id"
				:product="product"
			/>
		</div>
	</div>
</template>
