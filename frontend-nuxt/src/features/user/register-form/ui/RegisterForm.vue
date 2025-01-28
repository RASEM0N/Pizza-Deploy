<script setup lang="ts">
import { useRegisterForm } from '../model/useRegisterForm';
import type { User } from '~/src/entities/user';

// @todo локализация

const emits = defineEmits<{
	'submit.success': [user: User];
	'submit.error': [error: unknown];
}>();

const { submit, fields } = useRegisterForm({
	onError: (error) => emits('submit.error', error),
	onSuccess: (user) => emits('submit.success', user),
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
				<UiTitle>Регистрация</UiTitle>
			</div>

			<NuxtImg
				src="/images/phone-icon.png"
				alt="phone-icon"
				width="50"
				height="50"
			/>
		</div>

		<UiFormInput v-model="email" v-bind="emailAttrs" label="E-Mail" required />
		<UiFormInput
			v-model="fullName"
			v-bind="fullNameAttrs"
			label="Полное имя"
			required
		/>
		<UiFormInput v-model="password" v-bind="passwordAttrs" label="Пароль" required />
		<UiFormInput
			v-model="confirmPassword"
			v-bind="confirmPasswordAttrs"
			label="Подвердите пароль"
			required
		/>

		<UiButton class="h-12 text-base" type="submit">Зарегистрироватся</UiButton>
	</form>
</template>
