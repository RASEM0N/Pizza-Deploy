<script setup lang="ts">
import { useProfileForm } from '../model/useProfileForm';
import type { User } from '~/src/entities/user';

const { t } = useI18n();
const { user } = defineProps<{ user: User }>();
const { submit, fields } = useProfileForm({ user });
const {
	email: [email, emailAttrs],
	fullName: [fullName, fullNameAttrs],
	password: [password, passwordAttrs],
	confirmPassword: [confirmPassword, confirmPasswordAttrs],
} = fields;
</script>
<template>
	<div>
		<UiTitle size="md" class="font-bold">
			{{ t('user.update_user.title') }} | #{{ user.id }}
		</UiTitle>
		<form @submit="submit" class="flex flex-col gap-5 w-96 mt-10">
			<UiFormInput
				type="email"
				v-model="email"
				v-bind="emailAttrs"
				:label="t('common.input.email')"
				required
			/>

			<UiFormInput
				type="text"
				v-model="fullName"
				v-bind="fullNameAttrs"
				:label="t('common.input.full_name')"
				required
			/>

			<UiFormInput
				type="password"
				v-model="password"
				v-bind="passwordAttrs"
				:label="t('common.input.new_password')"
				required
			/>

			<UiFormInput
				type="password"
				v-model="confirmPassword"
				v-bind="confirmPasswordAttrs"
				:label="t('common.input.confirm_password')"
				required
			/>

			<UiButton class="text-base mt-10" type="submit">
				{{ t('common.button.save') }}
			</UiButton>
			<slot></slot>
		</form>
	</div>
</template>
