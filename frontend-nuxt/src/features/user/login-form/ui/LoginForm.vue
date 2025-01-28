<script setup lang="ts">
import { useLoginForm } from '../model/useLoginForm';
import type { User } from '~/src/entities/user';

const { t } = useI18n();
const emits = defineEmits<{
	'submit.success': [user: User];
	'submit.error': [error: unknown];
}>();

const { submit, fields } = useLoginForm({
	onError: (error) => emits('submit.error', error),
	onSuccess: (user) => emits('submit.success', user),
});
const {
	email: [email, emailAttrs],
	password: [password, passwordAttrs],
} = fields;
</script>
<template>
	<form @submit="submit" class="flex flex-col gap-5">
		<div class="flex justify-between items-center">
			<div class="mr-2">
				<UiTitle>{{ t('user.login.title') }}</UiTitle>
				<p class="text-gray-400">{{ t('user.login.description') }}</p>
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
			required
		/>
		<UiFormInput
			v-model="password"
			v-bind="passwordAttrs"
			:label="t('common.input.password')"
			required
		/>

		<UiButton class="h-12 text-base" type="submit">
			{{ t('user.login.submit') }}
		</UiButton>
	</form>
</template>
