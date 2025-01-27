<script setup lang="ts">
import type { AvailableProductVariant } from '../lib';

defineProps<{ variants: AvailableProductVariant[] }>();

const emits = defineEmits<{ select: [value: AvailableProductVariant] }>();
const model = defineModel<number, number>();

const select = (variant: AvailableProductVariant) => {
	model.value = variant.value;
	emits('select', variant);
};
</script>
<template>
	<div class="flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none">
		<button
			@click="select(variant)"
			v-for="variant in variants"
			:key="variant.name"
			:class="[
				'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1',
				'rounded-3xl transition-all duration-400 text-sm',
				{
					'bg-white shadow': variant.value === model,
					'text-gray-500 opacity-50 pointer-events-none': variant.disabled,
				},
			]"
		>
			{{ variant.name }}
		</button>
	</div>
</template>
