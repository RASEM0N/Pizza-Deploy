<script setup lang="ts">
import { useCartStore } from '~/src/entities/cart';
import { useOrderForm } from '../model/useOrderForm';

import OrderFormCart from './OrderFormCart.vue';
import OrderFormPersonal from './OrderFormPersonal.vue';
import OrderFormAddress from './OrderFormAddress.vue';
import OrderFormDetails from './OrderFormDetails.vue';

// @TODO локализация
const { totalAmount } = useCartStore();
const { submit, fields } = useOrderForm();

const { email, phone, comment, address, fullName } = fields;
</script>
<template>
	<div>
		<UiTitle class="font-extrabold mb-8 text-[36px]">Оформление заказа</UiTitle>
		<form @submit="submit" class="flex gap-10">
			<div class="flex flex-col gap-10 flex-1 mb-20">
				<OrderFormCart />
				<OrderFormPersonal :email="email" :full-name="fullName" :phone="phone" />
				<OrderFormAddress :address="address" :comment="comment" />
			</div>

			<div class="w-[450px]">
				<OrderFormDetails :total-amount="totalAmount" />
			</div>
		</form>
	</div>
</template>
