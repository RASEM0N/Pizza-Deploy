import { toTypedSchema } from '@vee-validate/zod';
import { type User, loginSchema, useUserStore } from '~/src/entities/user';

interface Params {
	onError?: (error: unknown) => void;
	onSuccess?: (user: User) => void;
}

export const useLoginForm = ({ onError, onSuccess }: Params = {}) => {
	const { t } = useI18n();
	const userStore = useUserStore();
	const snackbar = useSnackbar();
	const { defineField, handleSubmit } = useForm({
		validationSchema: toTypedSchema(loginSchema()),
		initialValues: {
			email: '',
			password: '',
		},
	});

	const submit = handleSubmit(async (values) => {
		try {
			const user = await userStore.login.executeWithThrow(values);

			snackbar.add({ type: 'success', text: t('user.login.success') });
			onSuccess?.(user);
		} catch (e) {
			snackbar.add({ type: 'error', text: t('user.login.error') });
			onError?.(e);
		}
	});

	return {
		submit,
		fields: {
			email: defineField('email'),
			password: defineField('password'),
		},
	};
};
