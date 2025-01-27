<script setup lang="ts">
import type { IProductIngredient } from '../model/types';

defineProps<{ ingredient: IProductIngredient; active?: boolean }>();
</script>
<template>
	<div
		:class="[
			'flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white',
			{
				'border border-primary': active,
			},
		]"
	>
		<IconCircleCheck class="absolute top-2 right-2 text-primary" v-if="active" />
		<NuxtImg width="110" height="110" :src="ingredient.imgUrl" />
		<span class="text-xs mb-1">{{ ingredient.name }}</span>
		<span class="font-bold">{{ ingredient.price }} ₽</span>
	</div>
</template>
