<script setup lang="ts">
import { CartItem, CartItemSkeleton, useCartStore } from '~/src/entities/cart';

const cartStore = useCartStore();

// @TODO добавить обработку loading для кнопок

</script>
<template>
	<UiInfoBlock title="1. Корзина">
		<div class="flex flex-col gap-5">
			<CartItemSkeleton
				v-if="!cartStore.cart"
				v-for="(_, idx) in Array(4)"
				:key="idx"
			/>
			<CartItem
				v-else
				v-for="item in cartStore.cartDetails"
				:key="item"
				:item="item"
				@item:add="cartStore.updateCart.execute(item.id, item.quantity + 1)"
				@item:remove="cartStore.updateCart.execute(item.id, item.quantity - 1)"
				@remove="cartStore.removeCart.execute(item.id)"
			/>
		</div>
	</UiInfoBlock>
</template>
