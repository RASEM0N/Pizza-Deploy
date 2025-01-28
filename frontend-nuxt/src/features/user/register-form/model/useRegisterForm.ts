import { toTypedSchema } from '@vee-validate/zod';
import { type User, registerSchema, useUserStore } from '~/src/entities/user';

// @TODO локализация

export const useRegisterForm = () => {

	// @todo есть такое чувство что не отработает нормально
	// надо проверять
	const emits = defineEmits<{
		'submit.success': [user: User];
		'submit.error': [error: Error];
	}>();

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

			snackbar.add({
				type: 'success',
				text: 'Вы успешно зарегистировароли аккаунт',
			});

			emits('submit.success', user);
		} catch (e) {
			snackbar.add({ type: 'error', text: 'Ошибка регистрации' });
			emits('submit.error', e as Error);
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
