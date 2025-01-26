<script setup lang="ts">
defineProps<{ src: string; alt?: string }>();
</script>
<template>
	<img :src="src" :alt="alt" class="w-[60px] h-[60px]" />
</template>
