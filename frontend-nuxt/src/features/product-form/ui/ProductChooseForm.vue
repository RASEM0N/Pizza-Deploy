<script setup lang="ts">
import ProductFormVariants from './ProductFormVariants.vue';


// @TODO Локализация плиз

interface Props {
	product: Models.Product;
	loading: boolean;
}

interface Emits {
	submit: [itemId: number, ingredients: number[]];
}

const { product } = defineProps<Props>();
const emits = defineEmits<Emits>();
</script>
<template>
	<div class="flex flex-1">
		<div class="w-[490px] bg-[#f7f6f5] p-7">
			<UiTitle class="font-extrabold mb-1" size="md">
				{{ product.name }}
			</UiTitle>
		</div>
		<p class="text-gray-400">{{ textDetails }}</p>

		<div class="flex flex-col gap-4 mt-5">
			<ProductFormVariants
				variants=""
				value=""
				@click-item=""
			/>
			<ProductFormVariants
				variants=""
				value=""
				@click-item=""
			/>
		</div>

		<div class="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
			<div class="grid grid-cols-3 gap-3">

			</div>
		</div>

		<UiButton class="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
				  :loading="loading"
				  @click="emits('submit', '...')"
		>
			Добавить в корзину за {{ totalPrice }} ₽
		</UiButton>
	</div>
</template>
