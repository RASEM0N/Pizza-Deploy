<script setup lang="ts">

defineModel<{
	asChild: boolean;
}>();
</script>
<template>
	<div class="mx-auto max-w-[1280px] overflow-hidden">
		<slot></slot>
	</div>
</template>
