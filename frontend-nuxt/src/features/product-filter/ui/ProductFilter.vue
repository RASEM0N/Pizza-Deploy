<script setup lang="ts">
// @TODO перенести в виджеты или куда-то в другое место
import ProductFilterCheckbox from './ProductFilterCheckbox.vue';
import ProductFilterCheckboxGroup from './ProductFilterCheckboxGroup.vue';

// @TODO все числовые значения должны приходить с бэка
// не должно быть захардкодено

const { t } = useI18n();
const price = ref([0, 30000]);
</script>
<template>
	<div>
		<UiTitle size="sm" class="mb-5 font-bold">
			{{ t('product_filter.name') }}
		</UiTitle>
		<div class="flex flex-col gap-4">
			<ProductFilterCheckbox
				:text="t('product_filter.status.can_collect')"
				value="1"
			/>
			<ProductFilterCheckbox :text="t('product_filter.status.new')" value="2" />
		</div>

		<div class="mt-5 border-y border-y-neutral-100 py-6 pb-7">
			<p class="font-bold mb-3">{{ t('product_filter.price') }}</p>
			<div class="flex gap-3 mb-5">
				<UiInput
					type="number"
					:min="100"
					:max="30000"
					placeholder="0"
					default-value="0"
				/>
				<UiInput type="number" :min="100" :max="30000" placeholder="30000" />
			</div>
			<UiSlider :min="0" :max="5000" :step="10" :model-value="price" />
		</div>

		<ProductFilterCheckboxGroup
			className="mt-5"
			title="Формат"
			:limit="6"
			:items="[
				{
					text: 'Сырный соус',
					value: '1',
				},
				{
					text: 'Моццарелла',
					value: '2',
				},
				{
					text: 'Чеснок',
					value: '3',
				},
				{
					text: 'Солённые огурчики',
					value: '4',
				},
				{
					text: 'Красный лук',
					value: '5',
				},
				{
					text: 'Томаты',
					value: '6',
				},
				{
					text: 'Сырный соус',
					value: '7',
				},
				{
					text: 'Моццарелла',
					value: '8',
				},
				{
					text: 'Чеснок',
					value: '9',
				},
				{
					text: 'Солённые огурчики',
					value: '10',
				},
				{
					text: 'Красный лук',
					value: '11',
				},
				{
					text: 'Томаты',
					value: '12',
				},
			]"
		/>
	</div>
</template>
