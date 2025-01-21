<!--https://nuxt.com/docs/guide/directory-structure/error-->
<script setup lang="ts">
import type { NuxtError } from '#app';

interface Props {
	error: NuxtError;
}

const { t } = useI18n();
const { error } = defineProps<Props>();
</script>
<template>
	<h1>{{ t('errors.404') }}</h1>
	<p>{{ error.message }}</p>
</template>
