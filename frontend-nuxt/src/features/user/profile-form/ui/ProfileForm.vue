<script setup lang="ts">
import { useProfileForm } from '../model/useProfileForm';
import type { User } from '~/src/entities/user';

// @todo локализация

const { user } = defineProps<{ user: User }>();
const { submit, fields } = useProfileForm(user);
const {
	email: [email, emailAttrs],
	fullName: [fullName, fullNameAttrs],
	password: [password, passwordAttrs],
	confirmPassword: [confirmPassword, confirmPasswordAttrs],
} = fields;
</script>
<template>
	<div>
		<UiTitle size="md" class="font-bold"> Личные данные | #{{ user.id }}</UiTitle>
		<form @submit="submit" class="flex flex-col gap-5 w-96 mt-10">
			<UiFormInput
				type="email"
				label="E-Mail"
				v-model="email"
				v-bind="emailAttrs"
				required
			/>

			<UiFormInput
				type="text"
				label="Полное имя"
				v-model="fullName"
				v-bind="fullNameAttrs"
				required
			/>

			<UiFormInput
				type="password"
				label="Новый пароль"
				v-model="password"
				v-bind="passwordAttrs"
				required
			/>

			<UiFormInput
				type="password"
				label="Повторите пароль"
				v-model="confirmPassword"
				v-bind="confirmPasswordAttrs"
				required
			/>

			<UiButton class="text-base mt-10" type="submit">Сохранить</UiButton>
			<slot></slot>
		</form>
	</div>
</template>
