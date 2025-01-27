<script setup lang="ts">
// @TODO чето не в том месте
import { AuthModal } from '~/src/widgets/auth-modal';

import { SearchProducts } from '~/src/features/product/search';
import { CartDrawerButton } from '~/src/features/cart/drawer';

defineProps<{ hasSearch?: boolean; hasCart?: boolean }>();

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
				<!--@todo должно быть подцеплено к состоянию авторизации-->
				<AuthModal>
					<UiButton variant="outline">{{ t('header.login') }}</UiButton>
				</AuthModal>

				<CartDrawerButton />
			</div>
		</UiContainer>
	</header>
</template>
