import { type OrderPriceDetails, orderSchema } from '~/src/entities/order';

import { toTypedSchema } from '@vee-validate/zod';
import { useUserStore } from '~/src/entities/user';
import { useCartStore } from '~/src/entities/cart';
import { useAsync } from '~/src/shared/lib/useAsync';
import { $apiFetch } from '~/src/shared/api';

// @TODO чето перегруженный какой-то

export const useOrderForm = () => {
	const snackbar = useSnackbar();
	const cartStore = useCartStore();
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

	const getPriceDetails = useAsync(() =>
		$apiFetch<OrderPriceDetails>('/api/order/details'),
	);

	const submit = handleSubmit(async (values) => {
		try {
			window.location.href = await cartStore.payCart.executeWithThrow(values);
		} catch (e) {
			snackbar.add({
				type: 'error',
				text: 'Ошибка создания заказа',
			});
		}
	});

	return {
		submit,
		loadingFormData,
		getPriceDetails,
		fields: {
			email: defineField('email'),
			fullName: defineField('fullName'),
			phone: defineField('phone'),
			address: defineField('address'),
			comment: defineField('comment'),
		},
	};
};
