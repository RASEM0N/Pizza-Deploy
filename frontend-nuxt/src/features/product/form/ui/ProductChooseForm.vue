<script setup lang="ts">
// @TODO Локализация плиз

import type { IProduct, IProductItem } from '~/src/entities/product';

defineProps<{
	product: IProduct;
	productItem: IProductItem;
	loading: boolean;
}>();

const emits = defineEmits<{
	submit: [itemId: number];
}>();
</script>
<template>
	<div class="flex flex-1">
		<div class="flex items-center justify-center flex-1 relative w-full">
			<NuxtImg
				class="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
				:alt="product.name"
				:src="product.imgUrl"
				draggable="false"
			/>
		</div>
		<div class="w-[490px] bg-[#f7f6f5] p-7">
			<UiTitle class="font-extrabold mb-1" size="md">{{ product.name }}</UiTitle>

			<UiButton
				class="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
				:loading="loading"
				@click="emits('submit', productItem.id)"
			>
				Добавить в корзину за {{ productItem.price }} ₽
			</UiButton>
		</div>
	</div>
</template>
