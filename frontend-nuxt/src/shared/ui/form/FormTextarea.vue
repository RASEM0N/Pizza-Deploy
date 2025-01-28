<script setup lang="ts">
interface Props {
	label?: string;
	required?: boolean;
	className?: string;
	errorText?: string;
}

defineProps<Props>();

// @TODO проверить что атрибуты нормально передались

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
			<textarea
				type="text"
				class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
				v-model="model"
				v-bind="$attrs"
			/>
			<button
				class="absolute right-4 top-[24px] -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer"
				v-show="model"
				@click="clear"
				type="button"
			>
				<IconX class="h-5 w-5" />
			</button>
		</div>

		<UiErrorText v-if="errorText" class="mt-2">{{ errorText }}</UiErrorText>
	</div>
</template>
