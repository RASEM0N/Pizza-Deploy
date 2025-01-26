<script setup lang="ts">
import AuthModal from '~/src/widgets/auth-modal/AuthModal.vue';
import SearchProducts from '~/src/widgets/search-products/SearchProducts.vue';
import CartButton from '~/src/features/cart-drawer/ui/CartButton.vue';

defineProps<{ hasSearch?: boolean; hasCart?: boolean }>();

const isOpenAuth = ref(false);
const { t } = useI18n();
</script>
<template>
	<header class="border-b border-gray-100">
		<UiContainer class="flex items-center justify-between py-8">
			<div class="flex items-center gap-4">
				<NuxtImg src="/logo.svg" width="35" height="35" alt="logo" />
				<NuxtLink to="/">
					<h1 class="text-2xl uppercase font-black">Nuxt Pizza</h1>
					<p class="text-sm text-gray-400 leading-3">
						{{ t('header.subtitle') }}
					</p>
				</NuxtLink>
			</div>

			<div v-if="hasSearch" class="mx-10 flex-1">
				<SearchProducts />
			</div>

			<div v-if="hasCart" class="flex items-center gap-3">
				<AuthModal v-model="isOpenAuth" />

				<!--@todo должно быть подцеплено к состоянию авторизации-->
				<UiButton @click="isOpenAuth = true" variant="outline"
					>{{ t('header.login') }}
				</UiButton>

				<CartButton />
			</div>
		</UiContainer>
	</header>
</template>
