<script setup lang="ts">
import type { BaseFieldProps } from 'vee-validate';

const email = defineModel<string>('email');
const phone = defineModel<string>('phone');
const fullName = defineModel<string>('fullName');

defineProps<{
	emailAttrs: BaseFieldProps;
	phoneAttrs: BaseFieldProps;
	fullNameAttrs: BaseFieldProps;
}>();
</script>
<template>
	<UiInfoBlock title="2. Персональные данные">
		<div class="grid grid-cols-2 gap-5">
			<UiFormInput
				placeholder="Имя и фамилия"
				class="text-base"
				v-model="fullName"
				v-bind="fullNameAttrs"
			/>
			<UiFormInput
				placeholder="E-Mail"
				class="text-base"
				v-model="email"
				v-bind="emailAttrs"
			/>
			<UiFormInput
				placeholder="Телефон"
				class="text-base"
				v-model="phone"
				v-bind="phoneAttrs"
			/>
		</div>
	</UiInfoBlock>
</template>
