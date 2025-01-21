<script setup lang="ts">
import { Header } from '~/src/widgets/Header';

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
	<div>
		<Header/>
		<main>
			<slot />
		</main>
		<footer>Footer</footer>
	</div>
</template>
