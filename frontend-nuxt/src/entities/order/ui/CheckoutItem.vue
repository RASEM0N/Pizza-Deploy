<script setup lang="ts">
import type { CartDetailItem } from '~/src/features/product-form/model/service';
import {
	CartItemPrice,
	CartItemCountButton,
	CartItemImage,
	CartItemInfo,
} from '~/src/entities/cart';
import { mapPizzaType } from '~/src/features/product-form/lib';

const emits = defineEmits(['item.add', 'item.remove', 'remove']);
const { item } = defineProps<{ item: CartDetailItem }>();

const getCartItemDetails = (
	ingredients: CartDetailItem['ingredients'],
	pizzaType?: number,
	pizzaSize?: number,
): string => {
	const details = [];

	if (pizzaSize && pizzaType) {
		const typeName = mapPizzaType[pizzaType as Models.PizzaType];
		details.push(`${typeName} ${pizzaSize} см`);
	}

	if (ingredients) {
		details.push(...ingredients.map((ingredient) => ingredient.name));
	}

	return details.join(', ');
};

const description = computed(() =>
	getCartItemDetails(item.ingredients, item.pizzaType, item.pizzaSize),
);
</script>
<template>
	<div
		:class="[
			'flex items-center justify-between',
			{
				'opacity-50 pointer-events-none': item.disabled,
			},
		]"
	>
		<div class="flex items-center gap-5 flex-1">
			<CartItemImage :src="item.imageUrl" />
			<CartItemInfo :name="item.name" :description="description" />
		</div>

		<CartItemPrice :value="item.price" />

		<div class="flex items-center gap-5 ml-20">
			<CartItemCountButton
				@add="emits('item.add')"
				@remove="emits('item.remove')"
				:value="item.quantity"
			/>

			<button @click="emits('remove')">
				<IconX
					class="text-gray-400 cursor-pointer hover:text-gray-600"
					:size="20"
				/>
			</button>
		</div>
	</div>
</template>
