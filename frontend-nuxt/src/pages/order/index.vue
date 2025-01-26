<script setup lang="ts">
// @TODO локализация

import { toTypedSchema } from '@vee-validate/zod';
import { object, string } from 'zod';
import { useApiFetch } from '~/src/shared/api';
import { FormInput } from '~/src/shared/ui/form-input';
import { useProductCart } from '~/src/features/product-form/model/service';
import FormTextarea from '~/src/shared/ui/form-textarea/FormTextarea.vue';
import { CheckoutItem, CheckoutItemSkeleton } from '~/src/entities/order';
import CheckoutItemDetails from '~/src/entities/order/ui/CheckoutItemDetails.vue';

definePageMeta({ layout: 'without-search' });

const { data } = await useApiFetch<Models.User>('/api/auth/me');

const cartStore = useProductCart();
const emptyCarts = Array.from(Array(4));

const { defineField, handleSubmit } = useForm({
	// @TODO вынести в локализацию
	validationSchema: toTypedSchema(
		object({
			email: string(),
			fullName: string(),
			phone: string(),
			address: string(),
			comment: string(),
		}),
	),

	initialValues: {
		email: data.value.email,
		fullName: data.value.fullName,
		phone: '',
		address: '',
		comment: '',
	},
});

const [email, emailAttrs] = defineField('email');
const [fullName, fullNameAttrs] = defineField('fullName');
const [phone, phoneAttrs] = defineField('phone');

const [address, addressAttrs] = defineField('address');
const [comment, commentAttrs] = defineField('comment');

const submit = handleSubmit(async (values) => {
	// .... @TODO надо как то обработать
	await $fetch<Models.Order>('http://localhost:5000/api/order', {
		method: 'POST',
		body: values,
	});
});
</script>
<template>
	<UiContainer class="mt-10">
		<UiTitle class="font-extrabold mb-8 text-[36px]">Оформление заказа</UiTitle>
		<form @submit="submit" class="flex gap-10">
			<div class="flex flex-col gap-10 flex-1 mb-20">
				<!--todo вынести в компонент-->
				<UiWhiteBlock title="1. Корзина">
					<div class="grid grid-cols-2 gap-5">
						<CheckoutItemSkeleton v-for="(_, idx) in emptyCarts" :key="idx" />
						<CheckoutItem
							v-for="item in cartStore.detailItems"
							:key="item"
							:item="item"
							@item.add="
								cartStore.updateCartItem(item.id, item.quantity + 1)
							"
							@item.remove="
								cartStore.updateCartItem(item.id, item.quantity - 1)
							"
							@remove="cartStore.removeCartItem(item.id)"
						/>
					</div>
				</UiWhiteBlock>

				<UiWhiteBlock title="2. Персональные данные">
					<div class="grid grid-cols-2 gap-5">
						<FormInput
							placeholder="Имя и фамилия"
							class="text-base"
							v-model="fullName"
							v-bind="fullNameAttrs"
						/>
						<FormInput
							placeholder="E-Mail"
							class="text-base"
							v-model="email"
							v-bind="emailAttrs"
						/>
						<FormInput
							placeholder="Телефон"
							class="text-base"
							v-model="phone"
							v-bind="phoneAttrs"
						/>
					</div>
				</UiWhiteBlock>

				<UiWhiteBlock title="3. Персональные данные">
					<div class="grid grid-cols-2 gap-5">
						<FormInput
							class="text-base"
							placeholder="Адресс"
							v-model="address"
							v-bind="addressAttrs"
						/>

						<FormTextarea
							class="text-base"
							placeholder="Комментарий к заказу"
							rows="5"
							v-model="comment"
							v-bind="commentAttrs"
						/>
					</div>
				</UiWhiteBlock>
			</div>

			<div class="w-[450px]">
				<!--@TODO добавить скелетоны-->
				<UiWhiteBlock class="p-6 sticky top-4">
					<div class="flex flex-col gap-1">
						<span class="text-xl">Итого:</span>
						<div class="h-11 text-[34px] font-extrabold">
							{{ cartStore.totalAmount }}
						</div>
					</div>

					<!--@TODO копипаст-->
					<CheckoutItemDetails>
						<template #title>
							<div class="flex items-center">
								<IconPackage class="mr-2 text-gray-400" :size="18" />
								Стоимость корзины:
							</div>
						</template>
						<template #value></template>
					</CheckoutItemDetails>

					<CheckoutItemDetails>
						<template #title>
							<div class="flex items-center">
								<IconPercent class="mr-2 text-gray-400" :size="18" />
								Налоги:
							</div>
						</template>
						<template #value></template>
					</CheckoutItemDetails>

					<CheckoutItemDetails>
						<template #title>
							<div class="flex items-center">
								<IconTruck class="mr-2 text-gray-400" :size="18" />
								Доставка:
							</div>
						</template>
						<template #value></template>
					</CheckoutItemDetails>

					<UiButton
						type="submit"
						class="w-full h-14 rounded-2xl mt-6 text-base font-bold"
					>
						Перейти к оплате
						<IconArrowRight class="w-5 ml-2" />
					</UiButton>
				</UiWhiteBlock>
			</div>
		</form>
	</UiContainer>
</template>
