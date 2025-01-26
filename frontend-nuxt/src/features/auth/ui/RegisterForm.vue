<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { object, string } from 'zod';

const snackbar = useSnackbar();

// @TODO проверить обработку эвентов
const emits = defineEmits(['submit.success', 'submit.error']);

const { defineField, handleSubmit } = useForm({
	validationSchema: toTypedSchema(
		object({
			email: string().email(),
			fullName: string(),
			password: string(),
			confirmPassword: string(),

			// @TODO локализация + копипапст
		}).refine((data) => data.password === data.confirmPassword, {
			message: 'Пароли не совпадают',
			path: ['confirmPassword'],
		}),
	),
	initialValues: {
		email: '',
		fullName: '',
		password: '',
		confirmPassword: '',
	},
});

const [email, emailAttrs] = defineField('email');
const [fullName, fullNameAttrs] = defineField('fullName');
const [password, passwordAttrs] = defineField('password');
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword');

// @TODO вынести в другое место в authService
// и чтоб сразу же были статусы
const register = async (values: {
	email: string;
	password: string;
	fullName: string;
}) => {
	return await $fetch('/api/auth/register', {
		method: 'POST',
		body: values,
	});
};

const submit = handleSubmit(async (data) => {
	try {
		const user = await register(data);

		snackbar.add({
			type: 'success',
			text: 'Вы успешно зарегистировароли аккаунт',
		});

		emits('submit.success');
	} catch (e) {
		snackbar.add({ type: 'error', text: 'Вы успешно вошли в аккаунт' });

		emits('submit.error');
	}
});

// @TODO локализация плиз
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
