<script setup lang="ts">
import type { IProductCategory } from '~/src/entities/product';
import { useCategoriesFeed } from '../model/store';

defineProps<{ categories: IProductCategory[] }>();

const categoriesFeed = useCategoriesFeed();
</script>
<template>
	<div class="inline-flex gap-1 bg-gray-50 p-1 rounded-2xl">
		<NuxtLink
			v-for="(item, idx) in categories"
			:key="item.id"
			:to="`/#${item.name}`"
			:class="[
				'flex items-center font-bold h-11 rounded-2xl px-5',
				{
					'bg-white shadow-md shadow-gray-200 text-primary':
						categoriesFeed.activeCategoryId === idx,
				},
			]"
		>
			{{ item.name }}
		</NuxtLink>
	</div>
</template>
