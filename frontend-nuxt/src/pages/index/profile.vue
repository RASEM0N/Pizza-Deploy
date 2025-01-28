<script setup lang="ts">
import { useApiFetch } from '~/src/shared/api';
import { type User } from '~/src/entities/user';
import { ProfileForm } from '~/src/features/user/profile-form';

const { data: user } = await useApiFetch<User>('/api/auth/me');

if (!user.value) {
	navigateTo('/not-auth');
}
</script>
<template>
	<UiContainer class="my-10">
		<ProfileForm :user="user">
			<UiButton
				@click="window.alert('ЧЕТО ДЕЛАЕМ')"
				type="button"
				class="text-base"
				variant="secondary"
			>
				Выйти
			</UiButton>
		</ProfileForm>
	</UiContainer>
</template>
