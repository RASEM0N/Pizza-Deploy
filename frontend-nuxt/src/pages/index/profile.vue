<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { object, string } from 'zod';
import { FormInput } from '~/src/shared/ui/form-input';
import { useApiFetch } from '~/src/shared/api';

interface Props {
	user: Models.User;
}

// @TODO локализация
// @TODO локализация для ошибок

const { data } = await useApiFetch<Models.User>('/api/auth/me');

if (!data.value) {
	navigateTo('/not-auth');
}

const { user } = defineProps<Props>();

const { defineField, handleSubmit } = useForm({
	validationSchema: toTypedSchema(
		object({
			fullName: string(),
			email: string().email(),

			// @TODO пароль может быть пустым
			// надо эти данные не отправлять просто
			password: string(),
			confirmPassword: string(),
		}).refine((data) => data.password === data.confirmPassword, {
			message: "Passwords don't match",
			path: ['confirmPassword'],
		}),
	),
	initialValues: {
		fullName: user.fullName,
		email: user.email,
		password: '',
		confirmPassword: '',
	},
});

// @TODO кнопки подцепить к статусам отправки

// @TODO вынести логику в сервис и добавить метод регистрации
const submit = handleSubmit(async (values) => {
	// @TODO
	const data = await $fetch('/api/user', {
		method: 'PUT',
		body: values,
	});
});

const [fullName, fullNameAttrs] = defineField('fullName');
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword');
</script>
<template>
	<UiContainer class="my-10">
		<UiTitle size="md" class="font-bold"> Личные данные | #{{ user.id }}</UiTitle>
		<form @submit="submit" class="flex flex-col gap-5 w-96 mt-10">
			<FormInput
				type="email"
				label="E-Mail"
				v-model="email"
				v-bind="emailAttrs"
				required
			/>

			<FormInput
				type="text"
				label="Полное имя"
				v-model="fullName"
				v-bind="fullNameAttrs"
				required
			/>

			<FormInput
				type="password"
				label="Новый пароль"
				v-model="password"
				v-bind="passwordAttrs"
				required
			/>

			<FormInput
				type="password"
				label="Повторите пароль"
				v-model="confirmPassword"
				v-bind="confirmPasswordAttrs"
				required
			/>

			<UiButton class="text-base mt-10" type="submit">Сохранить</UiButton>

			<UiButton
				@click="window.alert('ЧЕТО ДЕЛАЕМ')"
				class="text-base"
				variant="secondary"
			>
				Выйти
			</UiButton>
		</form>
	</UiContainer>
</template>
