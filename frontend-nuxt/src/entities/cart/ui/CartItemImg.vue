<script setup lang="ts">
defineProps<{ src: string; alt?: string }>();
</script>
<template>
	<NuxtImg :src="src" :alt="alt" width="60" height="60" draggable="false" />
</template>
