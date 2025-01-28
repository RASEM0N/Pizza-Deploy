<script setup lang="ts">
import { CartItem, CartItemSkeleton, useCartStore } from '~/src/entities/cart';

const { updateCart, removeCart, cartDetails } = useCartStore();
const emptyCarts = Array.from(Array(4));

// @TODO добавить обработку loading для кнопок
</script>
<template>
	<UiInfoBlock title="1. Корзина">
		<div class="grid grid-cols-2 gap-5">
			<CartItemSkeleton v-for="(_, idx) in emptyCarts" :key="idx" />
			<CartItem
				v-for="item in cartDetails"
				:key="item"
				:item="item"
				@item:add="updateCart.execute(item.id, item.quantity + 1)"
				@item:remove="updateCart.execute(item.id, item.quantity - 1)"
				@remove="removeCart.execute(item.id)"
			/>
		</div>
	</UiInfoBlock>
</template>
