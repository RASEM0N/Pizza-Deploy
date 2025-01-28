<script setup lang="ts">
import { useRegisterForm } from '../model/useRegisterForm';
import type { User } from '~/src/entities/user';

// @todo локализация

const { t } = useI18n();
const emits = defineEmits<{
	'success': [user: User];
	'error': [error: unknown];
}>();

const { submit, fields, loading } = useRegisterForm({
	onError: (error) => emits('error', error),
	onSuccess: (user) => emits('success', user),
});
const {
	email: [email, emailAttrs],
	fullName: [fullName, fullNameAttrs],
	password: [password, passwordAttrs],
	confirmPassword: [confirmPassword, confirmPasswordAttrs],
} = fields;
</script>
<template>
	<form @submit="submit" class="flex flex-col gap-5">
		<div class="flex justify-between items-center">
			<div class="mr-2">
				<UiTitle>{{ t('user.register.title') }}</UiTitle>
			</div>

			<NuxtImg
				src="/images/phone-icon.png"
				alt="phone-icon"
				width="50"
				height="50"
			/>
		</div>

		<UiFormInput
			v-model="email"
			v-bind="emailAttrs"
			:label="t('common.input.email')"
			type="email"
			required
		/>
		<UiFormInput
			v-model="fullName"
			v-bind="fullNameAttrs"
			:label="t('common.input.full_name')"
			required
		/>
		<UiFormInput
			v-model="password"
			v-bind="passwordAttrs"
			type="password"
			:label="t('common.input.password')"
			required
		/>
		<UiFormInput
			v-model="confirmPassword"
			v-bind="confirmPasswordAttrs"
			type="password"
			:label="t('common.input.confirm_password')"
			required
		/>

		<UiButton class="h-12 text-base" type="submit" :loading="loading">
			{{ t('user.register.submit') }}
		</UiButton>
	</form>
</template>
