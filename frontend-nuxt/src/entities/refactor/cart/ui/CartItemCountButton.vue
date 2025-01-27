<script setup lang="ts">
defineProps<{ value: number }>();
defineEmits(['add', 'remove']);
</script>
<template>
	<div class="inline-flex items-center justify-between gap-3">
		<UiButton
			@click="$emit('remove')"
			variant="outline"
			type="button"
			:disabled="value <= 1"
			:class="[
				'p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400',
				'disabled:text-gray-400 w-[30px] h-[30px] rounded-[10px]',
			]"
		>
			<IconMinus class="h-4" />
		</UiButton>

		<b class="text-sm">{{ value }}</b>

		<UiButton
			@click="$emit('add')"
			variant="outline"
			type="button"
			:class="[
				'p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400',
				'disabled:text-gray-400 w-[30px] h-[30px] rounded-[10px]',
			]"
		>
			<IconPlus class="h-4" />
		</UiButton>
	</div>
</template>
