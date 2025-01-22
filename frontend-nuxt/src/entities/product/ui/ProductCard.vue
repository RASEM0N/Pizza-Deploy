<script setup lang="ts">
interface Props {
	product: any;
	count?: number;
}

// @TODO локализация потерялась

const { product, count = 0 } = defineProps<Props>();

</script>
<template>
	<div>
		<div class="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
			<NuxtImg
				class="w-[215px] h-[215px] object-contain"
				:src="product.imgUrl"
				alt="Logo"
			/>
		</div>
		<Title size="sm" className="mb-1 mt-3 font-bold">
			{{ product.name }}
		</Title>
		<p class="text-sm text-gray-400">
			{{ product.description }}
		</p>
		<div class="flex justify-between items-center mt-4">
			<span class="text-[20px]">
				от <b>{{ product.price }} ₽</b>
			</span>
			<UiButton variant="secondary">
				<IconPlus class="w-4 h-4 mr-1" />
				Добавить
			</UiButton>
		</div>
	</div>
</template>
