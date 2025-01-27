import { toTypedSchema } from '@vee-validate/zod';
import { type User, loginSchema, useUserStore } from '~/src/entities/user';

// @TODO локализация

export const useLoginForm = () => {
	const emits = defineEmits<{
		'submit.success': [user: User];
		'submit.error': [error: Error];
	}>();

	const userStore = useUserStore();
	const snackbar = useSnackbar();
	const { defineField, handleSubmit } = useForm({
		validationSchema: toTypedSchema(loginSchema()),
		initialValues: {
			email: '',
			password: '',
		},
	});

	const email = defineField('email');
	const password = defineField('password');

	const submit = handleSubmit(async (values) => {
		try {
			const user = await userStore.login.executeWithThrow(values);

			snackbar.add({
				type: 'success',
				text: 'Вы успешно вошли в аккаунт',
			});

			emits('submit.success', user);
		} catch (e) {
			snackbar.add({ type: 'error', text: 'Ошибка входа в аккаунт' });
			emits('submit.error', e as Error);
		}
	});

	return {
		submit,
		fields: {
			email,
			password,
		},
	};
};
