<script setup lang="ts">
import ProductFilterCheckbox from './ProductFilterCheckbox.vue';

// @TODO инпут пока что ниче не фильтрует

// @TODO оставить пустой скролл чтоб блять не скакало

interface Item {
	text: string;
	value: string;
}

interface Props {
	title: string;
	items: Item[];
	limit?: number;
	inputPlaceholder?: string;
}

const { t } = useI18n();

const showAll = shallowRef(false);
const { title, items, limit = 6 } = defineProps<Props>();

// @TODO
const emits = defineEmits<{}>();
const itemsForShow = computed(() => (showAll.value ? items : items.slice(0, limit)));
</script>
<template>
	<div>
		<p class="font-bold mb-3">{{ title }}</p>

		<div v-if="showAll" class="mb-5">
			<UiInput
				:placeholder="t('product_filter.group.search')"
				className="bg-gray-50 border-none"
			/>
		</div>

		<div class="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
			<ProductFilterCheckbox
				v-for="item in itemsForShow"
				:key="item.value"
				:text="item.text"
				:value="item.value"
			/>
		</div>

		<div
			v-if="items.length > limit"
			:class="{
				'border-t border-t-neutral-100 mt-4': showAll,
			}"
		>
			<button class="text-primary mt-3" @click="showAll = !showAll">
				{{
					showAll
						? t('product_filter.group.button_hide')
						: t('product_filter.group.button_show_all')
				}}
			</button>
		</div>
	</div>
</template>
