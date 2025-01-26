<script setup lang="ts">
import type { CartDetailItem } from '~/src/features/product-form/model/service';
import { mapPizzaType } from '~/src/features/product-form/lib';
import {
	CartItemImage,
	CartItemInfo,
	CartItemCountButton,
	CartItemPrice,
} from '~/src/entities/cart';

// @TODO ЛОГИКА КОПИПАСТ КАК В CHECKOUT ITEM

const emits = defineEmits(['item.add', 'item.remove', 'remove']);
const { item, disabled } = defineProps<{ item: CartDetailItem; disabled?: boolean }>();

// @TODO КОПИПАСТ
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
			'flex bg-white p-5 gap-6',
			{
				'opacity-50 pointer-events-none': disabled,
			},
		]"
	>
		<CartItemImage :src="item.imageUrl" :alt="item.name" />

		<div class="flex-1">
			<CartItemInfo :name="item.name" :description="description" />

			<hr class="my-3" />

			<div class="flex items-center justify-between">
				<CartItemCountButton
					@add="emits('item.add')"
					@remove="emits('item.remove')"
					:value="item.quantity"
				/>

				<div class="flex items-center gap-3">
					<CartItemPrice :value="item.price" />
					<IconTrash2
						@click="emits('remove')"
						class="text-gray-400 cursor-pointer hover:text-gray-600"
						:size="16"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
