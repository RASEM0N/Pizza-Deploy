<script setup lang="ts">
import type { BaseFieldProps } from 'vee-validate';

const comment = defineModel<string>('comment');
const address = defineModel<string>('address');

defineProps<{
	addressAttrs: BaseFieldProps;
	commentAttrs: BaseFieldProps;
}>();
</script>
<template>
	<UiInfoBlock title="3. Адресс доставки">
		<div class="grid grid-cols-2 gap-5">
			<UiFormInput
				class="text-base"
				placeholder="Адресс"
				v-model="address"
				v-bind="addressAttrs"
			/>
			<UiFormTextarea
				class="text-base"
				placeholder="Комментарий к заказу"
				rows="5"
				v-model="comment"
				v-bind="commentAttrs"
			/>
		</div>
	</UiInfoBlock>
</template>
