<script setup lang="ts">
import {
	CartItemImg,
	CartItemInfo,
	CartItemCountButton,
	CartItemPrice,
	type CartDetail,
} from '~/src/entities/cart';
import { getCartDetailDescription } from '~/src/entities/cart/lib';

const emits = defineEmits(['item.add', 'item.remove', 'remove']);
const { item, disabled } = defineProps<{ item: CartDetail; disabled?: boolean }>();
const description = computed(() => getCartDetailDescription(item));
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
		<CartItemImg :src="item.imgUrl" :alt="item.name" />

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
