<script setup lang="ts">
import { Categories } from '~/src/entities/category';
import { ProductFilter } from '~/src/features/product-filter';
import { ProductGroupList } from '~/src/entities/product';

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

			<div class="flex-1">
				<div class="flex flex-col gap-16">
					<ProductGroupList
						title="Пиццы"
						:id="0"
						:products="[
							{
								id: 1,
								name: 'Пицца 1',
								description:
									'Вкусная пицца с анасами и майонезом провансаль',
								price: 500,
								imgUrl: 'https://будем-жарить.рф/upload/iblock/9a0/lw8r56xqa2dylwq2qv2sjcvnequ5fyaf.png',
							},
							{
								id: 2,
								name: 'Пицца 2',
								description:
									'Вкусная пицца с анасами и майонезом провансаль',
								price: 500,
								imgUrl: 'https://будем-жарить.рф/upload/iblock/9a0/lw8r56xqa2dylwq2qv2sjcvnequ5fyaf.png',
							},
							{
								id: 3,
								name: 'Пицца 3',
								description:
									'Вкусная пицца с анасами и майонезом провансаль',
								price: 500,
								imgUrl: 'https://будем-жарить.рф/upload/iblock/9a0/lw8r56xqa2dylwq2qv2sjcvnequ5fyaf.png',
							},
						]"
					/>
					<ProductGroupList
						title="Пиццы вкусные"
						:id="1"
						:products="[
							{
								id: 1,
								name: 'Пицца 1',
								description:
									'Вкусная пицца с анасами и майонезом провансаль',
								price: 500,
								imgUrl: 'https://будем-жарить.рф/upload/iblock/9a0/lw8r56xqa2dylwq2qv2sjcvnequ5fyaf.png',
							},
							{
								id: 2,
								name: 'Пицца 2',
								description:
									'Вкусная пицца с анасами и майонезом провансаль',
								price: 500,
								imgUrl: 'https://будем-жарить.рф/upload/iblock/9a0/lw8r56xqa2dylwq2qv2sjcvnequ5fyaf.png',
							},
							{
								id: 3,
								name: 'Пицца 3',
								description:
									'Вкусная пицца с анасами и майонезом провансаль',
								price: 500,
								imgUrl: 'https://будем-жарить.рф/upload/iblock/9a0/lw8r56xqa2dylwq2qv2sjcvnequ5fyaf.png',
							},
						]"
					/>
					<ProductGroupList
						title="Пиццы вкусные"
						:id="2"
						:products="[
							{
								id: 1,
								name: 'Пицца 1',
								description:
									'Вкусная пицца с анасами и майонезом провансаль',
								price: 500,
								imgUrl: 'https://будем-жарить.рф/upload/iblock/9a0/lw8r56xqa2dylwq2qv2sjcvnequ5fyaf.png',
							},
							{
								id: 2,
								name: 'Пицца 2',
								description:
									'Вкусная пицца с анасами и майонезом провансаль',
								price: 500,
								imgUrl: 'https://будем-жарить.рф/upload/iblock/9a0/lw8r56xqa2dylwq2qv2sjcvnequ5fyaf.png',
							},
							{
								id: 3,
								name: 'Пицца 3',
								description:
									'Вкусная пицца с анасами и майонезом провансаль',
								price: 500,
								imgUrl: 'https://будем-жарить.рф/upload/iblock/9a0/lw8r56xqa2dylwq2qv2sjcvnequ5fyaf.png',
							},
						]"
					/>
				</div>
			</div>
		</div>
	</UiContainer>
</template>
