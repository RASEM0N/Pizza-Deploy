import { toTypedSchema } from '@vee-validate/zod';
import { type User, registerSchema, useUserStore } from '~/src/entities/user';

interface Params {
	user: User;
	onError?: (error: unknown) => void;
	onSuccess?: (user: User) => void;
}

export const useProfileForm = ({ user, onSuccess, onError }: Params) => {
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

			snackbar.add({ type: 'success', text: 'gdfsgdfgds' });
			onSuccess?.(user);
		} catch (e) {
			snackbar.add({ type: 'error', text: 'gdfsfsdfsd' });
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
