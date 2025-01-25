<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '../../lib/cls';
import { Primitive, type PrimitiveProps } from 'radix-vue';
import { type ButtonVariants, buttonVariants } from '.';

interface Props extends PrimitiveProps {
	variant?: ButtonVariants['variant'];
	size?: ButtonVariants['size'];
	class?: HTMLAttributes['class'];
	loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	as: 'button',
	loading: false
});
</script>

<template>
	<Primitive
		:as="as"
		:as-child="asChild"
		:disabled="$attrs.disabled || props.loading"
		:class="cn(buttonVariants({ variant, size }), props.class)"
	>
		<IconLoader v-if="loading" class="w-5 h-5 animate-spin" />
		<slot v-else />
	</Primitive>
</template>
