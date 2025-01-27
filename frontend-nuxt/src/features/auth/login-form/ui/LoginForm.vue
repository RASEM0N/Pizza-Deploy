<script setup lang="ts">
import { useLoginForm } from '../model/useLoginForm';

// @todo локализация

const { submit, fields } = useLoginForm();
const {
	email: [email, emailAttrs],
	password: [password, passwordAttrs],
} = fields;
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
