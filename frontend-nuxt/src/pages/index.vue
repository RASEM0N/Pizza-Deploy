<script setup lang="ts">
import { Categories } from '~/src/entities/category';
import { ProductFilter } from '~/src/features/product-filter';

const { t } = useI18n();

const categories = [
	'Пиццы',
	'Комбо',
	'Закуски',
	'Коктейли',
	'Кофе',
	'Напитки',
	'Десерты',
	'Десерты',
];
</script>
<template>
	<UiContainer class="mt-5">
		<UiTitle size="lg" class="font-extrabold">
			{{ t('pages.home.title') }}
		</UiTitle>
	</UiContainer>

	<div class="sticky top-0 bg-white py-5 shadow-lg shadow-black/5">
		<UiContainer class="flex items-center justify-between">
			<Categories :items="categories" />
			<UiSortPopup />
		</UiContainer>
	</div>

	<UiContainer class="mt-10 pb-14">
		<div class="flex gap-[80px]">
			<div class="w-[250px]">
				<ProductFilter />
			</div>
		</div>

		<div class="flex-1">
			<div class="flex flex-col gap-16"></div>
		</div>
	</UiContainer>
</template>
