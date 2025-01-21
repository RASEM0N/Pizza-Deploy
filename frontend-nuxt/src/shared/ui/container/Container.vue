<script setup lang="ts">
import { cn } from '~/src/shared/lib/cls';
</script>
<template>
	<div :class="cn('mx-auto max-w-[1280px]')">
		<slot></slot>
	</div>
</template>
