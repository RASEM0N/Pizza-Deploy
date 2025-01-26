<script setup lang="ts">
// @TODO локализация

import { toTypedSchema } from '@vee-validate/zod';
import { object, string } from 'zod';
import { useApiFetch } from '~/src/shared/api';
import { FormInput } from '~/src/shared/ui/form-input';
import { useProductCart } from '~/src/features/product-form/model/service';

definePageMeta({ layout: 'without-search' });

const { data } = await useApiFetch<Models.User>('/api/auth/me');

const cartStore = useProductCart()

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
</script>
<template>
	<UiContainer class="mt-10">
		<UiTitle class="font-extrabold mb-8 text-[36px]">Оформление заказа</UiTitle>
		<form class="flex gap-10">
			<div class="flex flex-col gap-10 flex-1 mb-20">
				<UiWhiteBlock title="1. Корзина">
					<div class="grid grid-cols-2 gap-5">
						@TODO
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
						@TODO
					</div>
				</UiWhiteBlock>
			</div>

			<div class="w-[450px]"></div>
		</form>
	</UiContainer>
</template>
