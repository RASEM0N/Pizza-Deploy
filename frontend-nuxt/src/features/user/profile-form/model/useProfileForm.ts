import { toTypedSchema } from '@vee-validate/zod';
import { type User, registerSchema, useUserStore } from '~/src/entities/user';

// @TODO локализация

export const useProfileForm = (user: User) => {
	const userStore = useUserStore();
	const snackbar = useSnackbar();

	const { defineField, handleSubmit } = useForm({
		validationSchema: toTypedSchema(registerSchema()),
		initialValues: {
			email: user.email,
			fullName: user.fullName,
			password: '',
			confirmPassword: '',
		},
	});

	const submit = handleSubmit(async (values) => {
		try {
			await userStore.update.executeWithThrow(values);

			snackbar.add({
				type: 'success',
				text: 'Вы успешно изменили данные пользователя',
			});
		} catch (e) {
			snackbar.add({ type: 'error', text: 'Ошибка изменения данных пользователя' });
		}
	});

	return {
		submit,
		loading: userStore.update.loading,
		fields: {
			email: defineField('email'),
			fullName: defineField('fullName'),
			password: defineField('password'),
			confirmPassword: defineField('confirmPassword'),
		},
	};
};
