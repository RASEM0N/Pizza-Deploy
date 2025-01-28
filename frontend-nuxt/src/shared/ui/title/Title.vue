<script lang="ts" setup>
interface Props {
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const { size } = defineProps<Props>();

const tags = {
	xs: { tag: 'h5', css: 'text-[16px] ys-text' },
	sm: { tag: 'h4', css: 'text-[22px] ys-text' },
	md: { tag: 'h3', css: 'text-[26px] ys-text' },
	lg: { tag: 'h2', css: 'text-[32px] ys-display' },
	xl: { tag: 'h1', css: 'text-[40px] ys-display' },
	'2xl': { tag: 'h1', css: 'text-[48px] ys-display' },
};

const title = computed(() => tags[size] || tags['sm']);
</script>
<template>
	<component :is="title.tag" :class="title.css">
		<slot></slot>
	</component>
</template>
