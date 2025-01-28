<script setup lang="ts">
defineProps<{ src: string; alt?: string }>();
</script>
<template>
	<NuxtImg :src="src" :alt="alt" class="w-[60px] h-[60px]" draggable="false" />
</template>
