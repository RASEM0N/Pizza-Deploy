<script setup lang="ts">
import { useOrderForm } from '../model/useOrderForm';
import { useCartStore } from '~/src/entities/cart';

import OrderFormCarts from './OrderFormCarts.vue';
import OrderFormPersonal from './OrderFormPersonal.vue';
import OrderFormAddress from './OrderFormAddress.vue';
import OrderFormDetails from './OrderFormDetails.vue';

// @TODO
// - обработать загрузку Cart
// - обработать загрузку User
// - обработать загрузку налогов
// - локализация
// - при изменение кол-ва товаров у нас цена не изменяется

const { submit, fields, getPriceDetails } = useOrderForm();

const {
	email: [email, emailAttrs],
	phone: [phone, phoneAttrs],
	comment: [comment, commentAttrs],
	address: [address, addressAttrs],
	fullName: [fullName, fullNameAttrs],
} = fields;

onMounted(() => {
	// @TODO при измение карточки надо обновлять данные тут
	getPriceDetails.execute();
});
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
				<!--@TODO 🤡🤡🤡🤡🤡🤡-->
				<OrderFormDetails
					v-if="getPriceDetails.result.value"
					:details="getPriceDetails.result.value"
				>
					<!--@TODO 🤡🤡🤡🤡🤡🤡-->
					<UiButton
						:disabled="getPriceDetails.result.value?.cartPrice === 0"
						type="submit"
						class="w-full h-14 rounded-2xl mt-6 text-base font-bold"
					>
						Перейти к оплате
						<IconArrowRight class="w-5 ml-2" />
					</UiButton>
				</OrderFormDetails>
			</div>
		</form>
	</div>
</template>
