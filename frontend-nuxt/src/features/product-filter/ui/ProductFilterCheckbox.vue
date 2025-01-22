<script setup lang="ts">
interface Props {
	text: string;
	value: string;
}

// @TODO проверить что работает, тут как надо получать лучше v-for

const checked = defineModel<boolean>()
const { text, value } = defineProps<Props>();
const id = `checkbox-${value}`;

</script>
<template>
	<div class="flex items-center space-x-2">
		<UiCheckbox
			class="rounded-[8px] w-6 h-6"
			:id="id"
			:value="value"
			v-model="checked"
		/>
		<label :for="id" class="leading-none cursor-pointer flex-1">
			{{ text }}
		</label>
		<slot></slot>
	</div>
</template>