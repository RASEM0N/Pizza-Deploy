<script setup lang="ts">
defineProps<{
	title?: string;
	contentClass?: string;
}>();
</script>
<template>
	<div class="bg-white rounded-3xl">
		<div
			v-if="title"
			class="flex items-center justify-between p-5 px-7 border-b border-gray-100"
		>
			<UiTitle class="font-bold" size="sm">{{ title }}</UiTitle>
			<slot name="title"></slot>
		</div>
		<div :class="['px-5 py-4', contentClass]">
			<slot></slot>
		</div>
	</div>
</template>
