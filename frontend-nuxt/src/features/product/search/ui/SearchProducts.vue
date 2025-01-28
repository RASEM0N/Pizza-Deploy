<script setup lang="ts">

import type { IProduct } from '~/src/entities/product';

const query = ref('');
const focused = ref(false);
const products = ref<IProduct[]>([]);

// @TODO надо протестировать

const target = ref<HTMLElement | null>(null);

const router = useRouter();
const search = useDebounceFn(async () => {
	// @TODO привет гонка
	// @TODO ссылка полная
	products.value = await $fetch<IProduct[]>('http://localhost:5000/api/product', {
		query: { query: query.value },
	});
}, 500);

watch(focused, (value) => {
	if (value) {
		search();
	}
});

const selectItem = async (product: IProduct) => {
	// открываем попап продукта
	router.push({ path: `/product/${product.id}` });

	// обнуляем после выбора
	focused.value = false
	query.value = '';
	products.value = [];
};

onClickOutside(target, () => {
	focused.value = false;
});
</script>
<template>
	<div
		v-if="focused"
		class="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30"
	></div>

	<div ref="target" class="flex rounded-2xl flex-1 justify-between relative h-11 z-30">
		<IconSearch
			class="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400"
		/>
		<input
			type="text"
			class="rounded-2xl outline-none w-full bg-gray-100 pl-11"
			placeholder="Найти пиццу..."
			v-model="query"
			@input="search"
			@focus="focused = true"
		/>
		<div
			v-if="focused && products.length"
			class="absolute w-full bg-white rounded-xl py-2 top-12 shadow-md transition-all duration-200 z-30"
		>
			<NuxtLink
				v-for="product in products"
				:key="product.id"
				@click="selectItem(product)"
				class="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
			>
				<img
					class="rounded-sm h-8 w-8"
					:src="product.imgUrl"
					:alt="product.name"
				/>
				<span>{{ product.name }}</span>
			</NuxtLink>
		</div>
	</div>
</template>
