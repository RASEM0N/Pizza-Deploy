<script setup lang="ts">

interface Props {
	label?: string;
	required?: boolean;
	className?: string;
	errorText?: string;
}

defineProps<Props>();

const emits = defineEmits(['clear']);
const model = defineModel<string>();

const clear = () => {
	model.value = '';
	emits('clear');
};
</script>
<template>
	<div :class="className">
		<p v-if="label" class="font-medium mb-2">
			{{ label }} <span v-if="required" class="text-red-500">*</span>
		</p>

		<div class="relative">
			<UiInput class="h-12 text-md" v-model="model" v-bind="$attrs" />
			<button
				v-show="model"
				@click="clear"
				type="button"
				class="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer"
			>
				<IconX class="h-5 w-5" />
			</button>
		</div>

		<UiErrorText v-if="errorText" class="mt-2">{{ errorText }}</UiErrorText>
	</div>
</template>
