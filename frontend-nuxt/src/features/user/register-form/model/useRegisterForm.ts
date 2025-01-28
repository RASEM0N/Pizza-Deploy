import { toTypedSchema } from '@vee-validate/zod';
import { type User, registerSchema, useUserStore } from '~/src/entities/user';

interface Params {
	onError?: (error: unknown) => void;
	onSuccess?: (user: User) => void;
}

export const useRegisterForm = ({ onError, onSuccess }: Params = {}) => {
	const userStore = useUserStore();
	const snackbar = useSnackbar();
	const { defineField, handleSubmit } = useForm({
		validationSchema: toTypedSchema(registerSchema()),
		initialValues: {
			email: '',
			fullName: '',
			password: '',
			confirmPassword: '',
		},
	});

	const email = defineField('email');
	const fullName = defineField('fullName');
	const password = defineField('password');
	const confirmPassword = defineField('confirmPassword');

	const submit = handleSubmit(async (values) => {
		try {
			const user = await userStore.register.executeWithThrow(values);

			// @TODO локализация
			snackbar.add({
				type: 'success',
				text: 'Вы успешно зарегистировароли аккаунт',
			});

			onSuccess?.(user);
		} catch (e) {
			snackbar.add({ type: 'error', text: 'Ошибка регистрации' });
			onError?.(e);
		}
	});

	return {
		submit,
		fields: {
			email,
			fullName,
			password,
			confirmPassword,
		},
	};
};
