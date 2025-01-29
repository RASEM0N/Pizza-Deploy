import { toTypedSchema } from '@vee-validate/zod';
import { type User, registerSchema, useUserStore } from '~/src/entities/user';

interface Params {
	user: User;
	onError?: (error: unknown) => void;
	onSuccess?: (user: User) => void;
}

export const useProfileForm = ({ user, onSuccess, onError }: Params) => {
	const { t } = useI18n();
	const userStore = useUserStore();
	const snackbar = useSnackbar();

	const { defineField, handleSubmit } = useForm({
		validationSchema: toTypedSchema(registerSchema()),
		initialValues: {
			email: user?.email,
			fullName: user?.fullName,
			password: '',
			confirmPassword: '',
		},
	});

	const submit = handleSubmit(async (values) => {
		try {
			const user = await userStore.update.executeWithThrow(values);

			snackbar.add({ type: 'success', text: t('user.update_user.success') });
			onSuccess?.(user);
		} catch (e) {
			snackbar.add({ type: 'error', text: t('user.update_user.error') });
			onError?.(e);
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
