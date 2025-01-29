import type { User } from './types';
import { useAsync } from '~/src/shared/lib/useAsync';
import { $apiFetch } from '~/src/shared/api';

export const useUserStore = defineStore('user', () => {
	const user = ref<User>();

	const me = useAsync(() => $apiFetch<User>('/api/auth/me'), {
		synchronizationRef: user,
	});

	const login = useAsync(
		(data: Pick<User, 'email' | 'password'>) =>
			$apiFetch<User>('/api/auth/login', {
				method: 'POST',
				body: data,
			}),
		{ synchronizationRef: user },
	);

	const logout = useAsync(async () => {
		await $apiFetch<User>('/api/auth/logout', { method: 'POST' });
		user.value = undefined;
	});

	const register = useAsync((data: Pick<User, 'email' | 'fullName' | 'password'>) =>
		$apiFetch<User>('/api/auth/register', {
			method: 'POST',
			body: data,
		}),
	);

	const update = useAsync(
		(data: Pick<User, 'email' | 'fullName' | 'password'>) =>
			$apiFetch<User>('/api/user', {
				method: 'PUT',
				body: Object.fromEntries(
					Object.entries(data).filter(([_, value]) => value),
				),
			}),
		{ synchronizationRef: user },
	);

	return {
		user,

		me,
		logout,
		update,
		login,
		register,
	};
});
