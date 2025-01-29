<script setup lang="ts">
import type { CartDetail } from '../model/types';
import { getCartDetailDescription } from '../lib';

import CartItemPrice from './CartItemPrice.vue';
import CartItemImg from './CartItemImg.vue';
import CartItemInfo from './CartItemInfo.vue';
import CartItemCountButton from './CartItemCountButton.vue';

const emits = defineEmits(['item:add', 'item:remove', 'remove']);
const { item } = defineProps<{ item: CartDetail }>();

const description = computed(() => getCartDetailDescription(item));
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
			<CartItemImg :src="item.imgUrl" :alt="item.name" />
			<CartItemInfo :name="item.name" :description="description" />
		</div>

		<CartItemPrice :value="item.price" />

		<div class="flex items-center gap-5 ml-20">
			<CartItemCountButton
				@add="emits('item:add')"
				@remove="emits('item:remove')"
				:value="item.quantity"
			/>

			<button type="button" @click="emits('remove')">
				<IconX
					class="text-gray-400 cursor-pointer hover:text-gray-600"
					:size="20"
				/>
			</button>
		</div>
	</div>
</template>
