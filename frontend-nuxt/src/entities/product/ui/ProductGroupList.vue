<script setup lang="ts">
// @TODO перенести в Widgets
import ProductCard from './ProductCard.vue';

// @TODO умпорт не тот
import { useCategory } from '~/src/features/product-filter/model/model';

interface Props {
	category: Models.Category;
}

const categoryStore = useCategory();

const { category } = defineProps<Props>();
const emits = defineEmits<{ active: [id: number] }>();

// https://vueuse.org/core/useIntersectionObserver/#useintersectionobserver
const target = ref();
useIntersectionObserver(
	target,
	([entry]) => {
		if (entry?.isIntersecting) {
			categoryStore.setActiveId(category.id);
			emits('active', category.id);
		}
	},
	{
		threshold: 0.4,
	},
);
</script>
<template>
	<div ref="target">
		<UiTitle class="font-extrabold mb-5" size="lg">
			{{ category.name }}
		</UiTitle>
		<div class="grid grid-cols-3 gap-[50px]">
			<ProductCard
				v-for="product in category.products"
				:key="product.id"
				:product="product"
			/>
		</div>
	</div>
</template>
