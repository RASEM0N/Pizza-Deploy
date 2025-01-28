import { $apiFetch, useApiFetch } from '~/src/shared/api';
import type { User } from '~/src/entities/user';
import type { Order } from '~/src/entities/order';

import { toTypedSchema } from '@vee-validate/zod';
import { orderSchema } from '~/src/entities/order';

export const useOrderForm = () => {
	const { data, status } = useApiFetch<User>('/api/auth/me');
	const loadingFormData = computed(() => status.value !== 'pending');

	watch(data, (value) => {
		setFieldValue('email', value.email);
		setFieldValue('email', value.fullName);
	});

	const { defineField, handleSubmit, setFieldValue } = useForm({
		validationSchema: toTypedSchema(orderSchema()),
		initialValues: {
			email: '',
			fullName: '',
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
