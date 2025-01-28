<script setup lang="ts">
import { useCartStore } from '~/src/entities/cart';
import { useOrderForm } from '../model/useOrderForm';

import OrderFormCarts from './OrderFormCarts.vue';
import OrderFormPersonal from './OrderFormPersonal.vue';
import OrderFormAddress from './OrderFormAddress.vue';
import OrderFormDetails from './OrderFormDetails.vue';

// @TODO локализация
const cartStore = useCartStore();
const { submit, fields } = useOrderForm();

const {
	email: [email, emailAttrs],
	phone: [phone, phoneAttrs],
	comment: [comment, commentAttrs],
	address: [address, addressAttrs],
	fullName: [fullName, fullNameAttrs],
} = fields;

// @TODO обработать кейс с загрузкой данных формы
</script>
<template>
	<div>
		<UiTitle class="font-extrabold mb-8 text-[36px]">Оформление заказа</UiTitle>
		<form @submit="submit" class="flex gap-10">
			<div class="flex flex-col gap-10 flex-1 mb-20">
				<OrderFormCarts />
				<OrderFormPersonal
					v-model:email="email"
					v-model:phone="phone"
					v-model:fullName="fullName"
					:email-attrs="emailAttrs"
					:phone-attrs="phoneAttrs"
					:fullName-attrs="fullNameAttrs"
				/>
				<OrderFormAddress
					v-model:comment="comment"
					v-model:address="address"
					:address-attrs="addressAttrs"
					:comment-attrs="commentAttrs"
				/>
			</div>

			<div class="w-[450px]">
				<OrderFormDetails :total-amount="cartStore.totalAmount" />
			</div>
		</form>
	</div>
</template>
