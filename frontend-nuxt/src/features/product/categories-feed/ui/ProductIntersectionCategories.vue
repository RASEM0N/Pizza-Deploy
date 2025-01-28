<script setup lang="ts">
import { useCategoriesFeed } from '../model/store';
import { useIntersectionObserver } from '@vueuse/core';

// @TODO баги:
// - при изменение списка (удаления) targets прежний остается
// - не выбран по логике самый нижний (если несколько груп в поле видимости сейчас)

const dataAttribute = 'data-intersection-category-id';
const categoriesFeed = useCategoriesFeed();

const targets = computed<HTMLElement[]>(() => [...mapTargets.values()]);
const mapTargets = reactive<Map<number, HTMLElement>>(new Map());

useIntersectionObserver(
	targets,
	([entry]) => {
		if (entry?.isIntersecting) {
			const id = entry.target.getAttribute(dataAttribute);
			if (!id) {
				return;
			}
			categoriesFeed.setActiveCategory(+id);
		}
	},
	{ threshold: 0.4 },
);

const observer = (categoryId: number, elem: HTMLElement) => {

	// @TODO
	elem?.setAttribute?.(dataAttribute, String(categoryId));
	mapTargets.set(categoryId, elem);
};
</script>
<template>
	<slot :observer="observer" :activeId="categoriesFeed.activeCategoryId"></slot>
</template>
