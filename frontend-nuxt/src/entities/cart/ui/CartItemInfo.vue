<script setup lang="ts">
defineProps<{ name: string; description?: string }>();
</script>
<template>
	<div>
		<div class="flex items-center justify-between">
			<h2 class="text-lg font-bold flex-1 leading-6">{{ name }}</h2>
		</div>
		<p v-if="description" class="text-xs text-gray-400 w-[90%]">{{ description }}</p>
	</div>
</template>
