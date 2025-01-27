<script setup lang="ts">
import type { IProductCategory } from '../model/types';
import Product from './Product.vue';

defineProps<{ category: IProductCategory }>();


// @TODO логика прежняя
// const categoryStore = useCategory();
// const { category } = defineProps<Props>();
// const emits = defineEmits<{ active: [id: number] }>();
//
// // https://vueuse.org/core/useIntersectionObserver/#useintersectionobserver
// const target = ref();
// useIntersectionObserver(
// 	target,
// 	([entry]) => {
// 		if (entry?.isIntersecting) {
// 			categoryStore.setActiveId(category.id);
// 			emits('active', category.id);
// 		}
// 	},
// 	{
// 		threshold: 0.4,
// 	},
// );
</script>
<template>
	<div>
		<UiTitle class="font-extrabold mb-5" size="lg">
			{{ category.name }}
		</UiTitle>
		<div class="grid grid-cols-3 gap-[50px]">
			<Product
				v-for="product in category.products"
				:key="product.id"
				:product="product"
			/>
		</div>
	</div>
</template>
