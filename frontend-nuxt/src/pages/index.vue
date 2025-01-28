<script setup lang="ts">
import { type IProductCategory, ProductGroupCategory } from '~/src/entities/product';
import { ProductFilter } from '~/src/features/product/filter';
import { useApiFetch } from '~/src/shared/api';
import { Stories } from '~/src/widgets/stories';
import {
	ProductCategoriesFeed,
	ProductIntersectionCategories,
} from '~/src/features/product/categories-feed';

// @TODO проверить что загружается на бэке
// сюда еще body на основе текущего query надо передавать

const { data } = await useApiFetch<IProductCategory[]>('/api/category', {
	// @TODO
	query: {},
});
const { t } = useI18n();
</script>
<template>
	<UiContainer class="mt-5">
		<UiTitle size="lg" class="font-extrabold">
			{{ t('pages.home.title') }}
		</UiTitle>
	</UiContainer>

	<div class="sticky top-0 bg-white py-5 shadow-lg shadow-black/5">
		<UiContainer class="flex items-center justify-between">
			<ProductCategoriesFeed :categories="data" />
			<UiSortPopup />
		</UiContainer>
	</div>

	<Stories />

	<UiContainer class="mt-10 pb-14">
		<div class="flex gap-[80px]">
			<div class="w-[250px]">
				<ProductFilter />
			</div>

			<div class="flex-1">
				<div class="flex flex-col gap-16">
					<ProductIntersectionCategories v-slot="{ observer }">
						<ProductGroupCategory
							v-for="category in data"
							:key="category.id"
							:category="category"
							:ref="observer(category.id, $el)"
						/>
					</ProductIntersectionCategories>
				</div>
			</div>
		</div>
	</UiContainer>

	<!--место под модалку. надо бы suspense бы еще туды-->
	<NuxtPage />
</template>
