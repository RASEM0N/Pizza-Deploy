import { $apiFetch } from '~/src/shared/api';
import type { Order } from '~/src/entities/order';

import { toTypedSchema } from '@vee-validate/zod';
import { orderSchema } from '~/src/entities/order';
import { useUserStore } from '~/src/entities/user';

export const useOrderForm = () => {
	const userStore = useUserStore();
	const loadingFormData = computed(() => userStore.me.loading);

	watch(
		() => userStore.user,
		(value) => {
			if (!value) {
				return;
			}

			setFieldValue('email', value.email);
			setFieldValue('fullName', value.fullName);
		},
	);

	const { defineField, handleSubmit, setFieldValue } = useForm({
		validationSchema: toTypedSchema(orderSchema()),
		initialValues: {
			email: userStore.user?.email ?? '',
			fullName: userStore.user?.fullName ?? '',
			phone: '',
			address: '',
			comment: '',
		},
	});

	const submit = handleSubmit(async (values) => {
		// .... @TODO надо как то обработать
		// @TODO надо вынести
		await $apiFetch<Order>('/api/order', { method: 'POST', body: values });
	});

	return {
		submit,
		loadingFormData,
		fields: {
			email: defineField('email'),
			fullName: defineField('fullName'),
			phone: defineField('phone'),
			address: defineField('address'),
			comment: defineField('comment'),
		},
	};
};
