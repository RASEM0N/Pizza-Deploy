<script setup lang="ts">
import { PageHeader } from '~/src/widgets/Header';

const i18nHead = useLocaleHead();

// https://i18n.nuxtjs.org/docs/composables/use-locale-head
// информация:
// - о текущем языке
// - о доступных языках на данных ресурс
// - об основном языке и сайте
useHead(() => ({
	htmlAttrs: i18nHead.value.htmlAttrs,
	meta: i18nHead.value.meta,
	link: i18nHead.value.link,
}));
</script>
<template>
	<main class="min-h-screen bg-white rounded-3xl">
		<PageHeader />
		<slot></slot>
	</main>
</template>
