<script setup lang="ts">
import ProductFormVariants from './ProductFormVariants.vue';
import { useProductChooseForm } from '../model/useProductChooseForm';
import { type IProduct, ProductIngredient } from '~/src/entities/product';

// @TODO 20 30 40 в константы надо вынести и в компосайбе useProductChooseForm тоже поменять
const { product, loading } = defineProps<{
	product: IProduct;
	loading: boolean;
}>();
const emits = defineEmits<{
	submit: [itemId: number, ingredients: number[]];
}>();

const {
	details,
	selectIngredient,
	selectedIngredients,
	availableSizes,
	availableTypes,
	currentItemId,
	currentSize,
	currentType,
} = useProductChooseForm(product);

// @TODO странная форма, надо по другому как-то
const submit = () => {
	if (!currentItemId.value) {
		return;
	}

	emits('submit', currentItemId.value, Array.from(selectedIngredients));
};
</script>
<template>
	<div class="flex flex-1">
		<!--@TODO в компонент-->
		<div class="flex items-center justify-center flex-1 relative w-full">
			<NuxtImg
				:src="product.imgUrl"
				:alt="product.name"
				:class="[
					'relative left-2 top-2 transition-all z-10 duration-300',
					{
						'w-[300px] h-[300px]': currentSize === 20,
						'w-[400px] h-[400px]': currentSize === 30,
						'w-[500px] h-[500px]': currentSize === 40,
					},
				]"
			/>

			<div
				class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]"
			/>
			<div
				class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px]"
			/>
		</div>

		<div class="w-[490px] bg-[#f7f6f5] p-7">
			<UiTitle class="font-extrabold mb-1" size="md">
				{{ product.name }}
			</UiTitle>

			<p class="text-gray-400">{{ details.priceText }}</p>
			<div class="flex flex-col gap-4 mt-5">
				<ProductFormVariants :variants="availableSizes" v-model="currentSize" />
				<ProductFormVariants :variants="availableTypes" v-model="currentType" />
			</div>
			<div class="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
				<div class="grid grid-cols-3 gap-3">
					<ProductIngredient
						@click="selectIngredient(ingredient.id)"
						v-for="ingredient in product.ingredients"
						:key="ingredient.id"
						:ingredient="ingredient"
						:active="selectedIngredients.has(ingredient.id)"
					/>
				</div>
			</div>

			<UiButton
				class="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
				:loading="loading"
				@click="submit"
			>
				Добавить в корзину за {{ details.totalPrice }} ₽
			</UiButton>
		</div>
	</div>
</template>
