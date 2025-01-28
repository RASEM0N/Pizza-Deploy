import { LoginForm } from '~/src/features/user/login-form';
import { RegisterForm } from '~/src/features/user/register-form';
import type { Component } from 'vue';

type Tab = 'login' | 'register';
type TabInfo = { name: string; component: Component };

export const useAuthTabs = (initTab: Tab = 'login') => {
	const { t } = useI18n();

	const tab = ref(initTab);
	const tabInfo = computed(() => componentTabs[tab.value]);

	const componentTabs: { [key in Tab]: TabInfo } = {
		login: {
			name: t('user.tabs.register'),
			component: LoginForm,
		},
		register: {
			name: t('user.tabs.login'),
			component: RegisterForm,
		},
	};

	const switchTab = () => {
		tab.value = tab.value === 'login' ? 'register' : 'login';
	};

	return { tab, tabInfo, switchTab };
};
