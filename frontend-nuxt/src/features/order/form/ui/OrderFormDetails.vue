<script setup lang="ts">
import { CartItemDetails } from '~/src/entities/cart';

defineProps<{ totalAmount: number }>();
</script>
<template>
	<UiWhiteBlock class="p-6 sticky top-4">
		<div class="flex flex-col gap-1">
			<span class="text-xl">Итого:</span>
			<div class="h-11 text-[34px] font-extrabold">
				{{ totalAmount }}
			</div>
		</div>

		<!--@TODO копипаст-->
		<CartItemDetails>
			<template #title>
				<div class="flex items-center">
					<IconPackage class="mr-2 text-gray-400" :size="18" />
					Стоимость корзины:
				</div>
			</template>
			<template #value></template>
		</CartItemDetails>

		<CartItemDetails>
			<template #title>
				<div class="flex items-center">
					<IconPercent class="mr-2 text-gray-400" :size="18" />
					Налоги:
				</div>
			</template>
			<template #value> @TODO</template>
		</CartItemDetails>

		<CartItemDetails>
			<template #title>
				<div class="flex items-center">
					<IconTruck class="mr-2 text-gray-400" :size="18" />
					Доставка:
				</div>
			</template>
			<template #value> @TODO</template>
		</CartItemDetails>

		<UiButton type="submit" class="w-full h-14 rounded-2xl mt-6 text-base font-bold">
			Перейти к оплате
			<IconArrowRight class="w-5 ml-2" />
		</UiButton>
	</UiWhiteBlock>
</template>
