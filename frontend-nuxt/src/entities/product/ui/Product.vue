<script setup lang="ts">
import type { IProduct } from '../model/types';

// @todo локализация

const { t } = useI18n();
const { product } = defineProps<{ product: IProduct }>();

const price = computed(() => product.items[0]?.price ?? 0);
const description = computed(() => product.ingredients.map((v) => v.name).join(', '));
</script>
<template>
	<NuxtLink :to="`/product/${product.id}`" class="flex flex-col">
		<div class="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
			<NuxtImg
				:src="product.imgUrl"
				class="w-[215px] h-[215px] object-contain"
				alt="Logo"
				draggable="false"
			/>
		</div>
		<UiTitle size="sm" class="mb-1 mt-3 font-bold">
			{{ product.name }}
		</UiTitle>
		<p class="text-sm text-gray-400 flex-1">
			{{ description }}
		</p>
		<div class="flex justify-between items-center mt-4">
			<span class="text-[20px]">
				от <b>{{ price }} ₽</b>
			</span>
			<UiButton variant="secondary">
				<IconPlus class="w-4 h-4 mr-1" />
				{{ t('common.button.add') }}
			</UiButton>
		</div>
	</NuxtLink>
</template>
