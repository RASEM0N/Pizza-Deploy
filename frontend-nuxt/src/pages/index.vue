<script setup lang="ts">
import { Categories } from '~/src/entities/category';
import { ProductFilter } from '~/src/features/product-filter';
import { ProductGroupList } from '~/src/entities/product';
import { useApiFetch } from '~/src/shared/api';

// @TODO проверить что загружается на бэке
// сюда еще body на основе текущего query надо передавать

const { data, error } = await useApiFetch<Models.Category[]>('/api/product', {
	query: {

	}
});
const { t } = useI18n();
</script>
<template>
	<h1>{{ error }}</h1>
	<UiContainer class="mt-5">
		<UiTitle size="lg" class="font-extrabold">
			{{ t('pages.home.title') }}
		</UiTitle>
	</UiContainer>

	<div class="sticky top-0 bg-white py-5 shadow-lg shadow-black/5">
		<UiContainer class="flex items-center justify-between">
			<Categories :categories="data" />
			<UiSortPopup />
		</UiContainer>
	</div>

	<UiContainer class="mt-10 pb-14">
		<div class="flex gap-[80px]">
			<div class="w-[250px]">
				<ProductFilter />
			</div>

			<div class="flex-1">
				<div class="flex flex-col gap-16">
					<ProductGroupList
						v-for="category in data"
						:key="category.id"
						:category="category"
					/>
				</div>
			</div>
		</div>
	</UiContainer>
</template>
