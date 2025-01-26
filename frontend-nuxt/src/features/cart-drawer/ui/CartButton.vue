<script setup lang="ts">
import CartDrawer from './CartDrawer.vue';
import { useProductCart } from '~/src/features/product-form/model/service';

const cart = useProductCart();
</script>
<template>
	<CartDrawer>
		<UiButton class="group relative">
			<b>{{ cart.totalAmount }} ₽</b>
			<span class="h-full w-[1px] bg-white/30 mx-3" />
			<div
				class="flex items-center gap-1 transition duration-300 group-hover:opacity-0"
			>
				<IconShoppingCart class="h-4 w-4 relative" stroke-width="2" />
				<b>{{ cart.detailItems.length }}</b>
			</div>
			<IconArrowRight
				class="w-5 absolute right-5 transition duration-300 translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
			/>
		</UiButton>
	</CartDrawer>
</template>
