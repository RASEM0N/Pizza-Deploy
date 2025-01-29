<script setup lang="ts">
import type { OrderPriceDetails } from '~/src/entities/order';
import { CartItemDetails } from '~/src/entities/cart';
import { IconPackage, IconPercent, IconTruck } from '#components';

// @TODO локализация

const { details } = defineProps<{ details: OrderPriceDetails }>();

const renderDetails = computed(() => [
	{
		text: 'Стоимость корзины:',
		icon: IconPackage,
		value: details.cartPrice,
	},
	{
		text: 'Налоги:',
		icon: IconPercent,
		value: details.taxesPrice,
	},
	{
		text: 'Доставка:',
		icon: IconTruck,
		value: details.deliveryPrice,
	},
]);
</script>
<template>
	<UiInfoBlock class="p-6 sticky top-4">
		<div class="flex flex-col gap-1">
			<span class="text-xl">Итого:</span>
			<div class="h-11 text-[34px] font-extrabold">
				{{ details.totalPrice }} ₽
			</div>
		</div>

		<CartItemDetails v-for="detail in renderDetails" :key="detail.text">
			<template #title>
				<div class="flex items-center">
					<component
						:is="detail.icon"
						class="mr-2 text-gray-400"
						:size="18"
					></component>
					{{ detail.text }}
				</div>
			</template>
			<template #value>{{ detail.value }} ₽</template>
		</CartItemDetails>
		<slot></slot>
	</UiInfoBlock>
</template>
