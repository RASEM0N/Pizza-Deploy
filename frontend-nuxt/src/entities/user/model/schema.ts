import { object, string } from 'zod';

const properties = () => {
	// @TODO локализация
	const { $i18n } = useNuxtApp()

	return {
		email: string().email(),
		fullName: string(),
		password: string(),
		confirmPassword: string(),
	};
};

export const loginSchema = () => {
	const { email, password } = properties();
	return object({ email, password });
};

export const registerSchema = () => {
	return object(properties()).refine((data) => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	});
};
