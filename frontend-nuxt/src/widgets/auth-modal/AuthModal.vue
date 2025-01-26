<script setup lang="ts">
import { LoginForm, RegisterForm } from '~/src/features/auth';

// @TODO автор по github и google и yandex

const open = defineModel();
const currentTab = ref<keyof typeof tabs>('login');

const tabs = {
	login: { name: 'Войти', component: LoginForm },
	register: { name: 'Регистрация', component: RegisterForm },
};

const switchTab = () => {
	currentTab.value = currentTab.value === 'login' ? 'register' : 'login';
};
</script>

<template>
	<UiDialog v-model:open="open">
		<UiDialogContent>
			<component :is="tabs[currentTab].component" @submit.success=""></component>

			<div class="flex gap-2">
				<UiButton variant="secondary" class="gap-2 h-12 p-2 flex-1">
					GitHub
				</UiButton>
				<UiButton variant="secondary" class="gap-2 h-12 p-2 flex-1">
					Google
				</UiButton>
				<UiButton variant="secondary" class="gap-2 h-12 p-2 flex-1">
					Yandex
				</UiButton>
			</div>

			<UiButton variant="outline" @click="switchTab" class="h-12">
				{{ tabs[currentTab].name }}
			</UiButton>
		</UiDialogContent>
	</UiDialog>
</template>
