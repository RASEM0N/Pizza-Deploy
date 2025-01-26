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
			password: string(),
		}),
	),
	initialValues: {
		email: '',
		password: '',
	},
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

// @TODO вынести в другое место в authService
// и чтоб сразу же были статусы
const login = async (values: { email: string; password: string }) => {
	return await $fetch('/api/auth/login', {
		method: 'POST',
		body: values,
	});
};

const submit = handleSubmit(async (data) => {
	try {
		const user = await login(data);

		snackbar.add({
			type: 'success',
			text: 'Вы успешно вошли в аккаунт',
		});

		emits('submit.success');
	} catch (e) {
		snackbar.add({
			type: 'error',
			text: 'Вы успешно вошли в аккаунт',
		});

		emits('submit.error')
	}
});

// @TODO локализация плиз
</script>
<template>
	<form @submit="submit" class="flex flex-col gap-5">
		<div class="flex justify-between items-center">
			<div class="mr-2">
				<UiTitle>Вход в аккаунт</UiTitle>
				<p class="text-gray-400">
					Введите свою почту, чтобы войти в свой аккаунт
				</p>
			</div>

			<NuxtImg
				src="/images/phone-icon.png"
				alt="phone-icon"
				width="50"
				height="50"
			/>
		</div>

		<UiFormInput v-model="email" v-bind="emailAttrs" label="E-Mail" required />
		<UiFormInput v-model="password" v-bind="passwordAttrs" label="Пароль" required />

		<UiButton class="h-12 text-base" type="submit"> Войти</UiButton>
	</form>
</template>
