import type { User } from './types';
import { useAsync } from '~/src/shared/lib/useAsync';
import { $apiFetch } from '~/src/shared/api';

// @todo давай без этих там сторов, есть Service или Model

export const useUserStore = defineStore('user', () => {
	const user = ref<User>();

	const login = useAsync(
		(data: Pick<User, 'email' | 'password'>) =>
			$apiFetch<User>('/api/auth/login', {
				method: 'POST',
				body: data,
			}),
		{ synchronizationRef: user },
	);

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
				body: data,
			}),
		{ synchronizationRef: user },
	);

	return {
		user,

		update,
		login,
		register,
	};
});
