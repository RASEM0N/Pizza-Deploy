<script setup lang="ts">
import { useCartStore } from '~/src/entities/cart';
import CartDrawerItem from './CartDrawerItem.vue';
// @TODO локализация

// @TODO локализация с "товара" "товаров" ...

// @TODO разнести по компонентам

const { cart, totalAmount, cartDetails, updateCart, removeCart } = useCartStore();
const open = ref(false);
</script>
<template>
	<UiSheet v-model:open="open">
		<UiSheetTrigger as-child>
			<slot></slot>
		</UiSheetTrigger>
		<UiSheetContent class="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
			<template v-if="cart?.totalAmount">
				<UiSheetTitle>
					В корзине
					<span class="font-bold"> {{ cartDetails.length }} товара </span>
				</UiSheetTitle>

				<div class="-mx-6 mt-5 overflow-auto flex-1">
					<CartDrawerItem
						v-for="item in cartDetails"
						class="mb-2"
						:key="item.id"
						:item="item"
						@item.add="updateCart.execute(item.id, item.quantity - 1)"
						@item.remove="updateCart.execute(item.id, item.quantity - 1)"
						@remove="removeCart.execute(item.id)"
					/>
				</div>

				<UiSheetFooter class="-mx-6 bg-white p-8">
					<div class="w-full">
						<div class="flex mb-4">
							<div class="flex flex-1 text-lg text-neutral-500">
								Итого
								<div
									class="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"
								></div>
							</div>

							<span class="font-bold text-lg">{{ totalAmount }} ₽</span>
						</div>

						<NuxtLink to="/order">
							<UiButton class="w-full h-12 text-base">
								Оформить заказ
								<IconArrowRight class="w-5 ml-2" />
							</UiButton>
						</NuxtLink>
					</div>
				</UiSheetFooter>
			</template>

			<div
				v-else
				class="flex flex-col items-center justify-center w-72 mx-auto h-full"
			>
				<NuxtImg
					src="/images/empty-box.png"
					alt="Empty cart"
					width="120"
					height="120"
					draggable="false"
				/>
				<UiTitle size="sm" class="text-center font-bold my-2">
					Корзина пустая
				</UiTitle>

				<p class="text-center text-neutral-500 mb-5">
					Добавьте хотя бы одну пиццу, чтобы совершить заказ
				</p>

				<UiSheetClose as-child>
					<UiButton size="lg" class="w-56 h-12 text-base">
						<IconArrowLeft class="w-5 mr-2" />
						Вернуться назад
					</UiButton>
				</UiSheetClose>
			</div>
		</UiSheetContent>
	</UiSheet>
</template>
