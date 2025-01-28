import { toTypedSchema } from '@vee-validate/zod';
import { type User, registerSchema, useUserStore } from '~/src/entities/user';

interface Params {
	onError?: (error: unknown) => void;
	onSuccess?: (user: User) => void;
}

export const useRegisterForm = ({ onError, onSuccess }: Params = {}) => {
	const { t } = useI18n();
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

	const submit = handleSubmit(async (values) => {
		try {
			const user = await userStore.register.executeWithThrow(values);

			snackbar.add({ type: 'success', text: t('user.register.success') });
			onSuccess?.(user);
		} catch (e) {
			snackbar.add({ type: 'error', text: t('user.register.error') });
			onError?.(e);
		}
	});

	return {
		submit,
		fields: {
			email: defineField('email'),
			fullName: defineField('fullName'),
			password: defineField('password'),
			confirmPassword: defineField('confirmPassword'),
		},
	};
};
