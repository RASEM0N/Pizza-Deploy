<script setup lang="ts">
import { cn } from '~/src/shared/lib/cls';

// @TODO умпорт не тот
import { useCategory } from '~/src/features/product-filter/model/model';

interface Props {
	// @TODO тут объект должен приниматся и локализоватся
	items: string[];
}

const category = useCategory();
const { items = [] } = defineProps<Props>();
</script>
<template>
	<div :class="cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl')">
		<!-- @Todo to -->
		<NuxtLink
			v-for="(item, idx) in items"
			:key="item"
			:to="'---@TODOOOO---'"
			:class="[
				'flex items-center font-bold h-11 rounded-2xl px-5',
				{
					'bg-white shadow-md shadow-gray-200 text-primary':
						category.activeId === idx,
				},
			]"
		>
			{{ item }}
		</NuxtLink>
	</div>
</template>
