<script setup lang="ts">
import { useLoginForm } from '../model/useLoginForm';
import type { User } from '~/src/entities/user';

const { t } = useI18n();
const emits = defineEmits<{
	'success': [user: User];
	'error': [error: unknown];
}>();

const v = ref(ref(0))

const { submit, fields, loading } = useLoginForm({
	onError: (error) => emits('error', error),
	onSuccess: (user) => emits('success', user),
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
			type="email"
			v-model="email"
			v-bind="emailAttrs"
			:label="t('common.input.email')"
			required
		/>
		<UiFormInput
			type="password"
			v-model="password"
			v-bind="passwordAttrs"
			:label="t('common.input.password')"
			required
		/>

		<UiButton class="h-12 text-base" type="submit" :loading="loading">
			{{ t('user.login.submit') }}
		</UiButton>
	</form>
</template>
