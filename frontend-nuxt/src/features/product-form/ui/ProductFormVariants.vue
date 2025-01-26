<script setup lang="ts">
import type { Variant } from '~/src/features/product-form/lib';

interface Props {
	variants: Variant[];
	value: string;
}

interface Emits {
	select: [value: Variant['value']];
}

defineProps<Props>();
defineEmits<Emits>();
</script>
<template>
	<div class="flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none">
		<button
			v-for="variant in variants"
			@click="$emit('select', variant.value)"
			:key="variant.name"
			:class="[
				'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1',
				'rounded-3xl transition-all duration-400 text-sm',
				{
					'bg-white shadow': variant.value === value,
					'text-gray-500 opacity-50 pointer-events-none': variant.disabled,
				},
			]"
		>
			{{ variant.name }}
		</button>
	</div>
</template>
