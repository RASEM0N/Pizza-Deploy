import { object, string } from 'zod';

const properties = () => {
	// @TODO локализация
	const { $i18n } = useNuxtApp()

	return {
		email: string(),
		fullName: string(),
		phone: string(),
		address: string(),
		comment: string(),
	};
};

export const orderSchema = () => {
	return object(properties());
};
