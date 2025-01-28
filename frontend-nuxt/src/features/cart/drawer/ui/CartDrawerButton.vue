<script setup lang="ts">
import CartDrawer from './CartDrawer.vue';
import { useCartStore } from '~/src/entities/cart';
import { FETCH_STATUS } from '~/src/shared/lib/types';

const cartStore = useCartStore();
</script>
<template>
	<UiButton v-if="cartStore.getCart.loading" :loading="cartStore.getCart.loading"></UiButton>
	<CartDrawer v-else>
		<UiButton class="group relative">
			<b>{{ cartStore.totalAmount }} ₽</b>
			<span class="h-full w-[1px] bg-white/30 mx-3" />
			<div
				class="flex items-center gap-1 transition duration-300 group-hover:opacity-0"
			>
				<IconShoppingCart class="h-4 w-4 relative" stroke-width="2" />
				<b>{{ cartStore.cartDetails.length }}</b>
			</div>
			<IconArrowRight
				class="w-5 absolute right-5 transition duration-300 translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
			/>
		</UiButton>
	</CartDrawer>
</template>
