<script setup lang="ts">
import DefaultLayout from './default.vue';
</script>
<template>
	<DefaultLayout :has-search="false" :has-cart="false">
		<slot></slot>
	</DefaultLayout>
</template>