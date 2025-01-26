<script setup lang="ts">
import { cn } from '~/src/shared/lib/cls';
import AuthModal from '~/src/widgets/auth-modal/AuthModal.vue';
import SearchProducts from '~/src/widgets/search-products/SearchProducts.vue';

const { hasCart = true, hasSearch = true } = defineProps<{
	hasSearch?: boolean;
	hasCart?: boolean;
}>();

const isOpenAuth = ref(false);
const { t } = useI18n();
</script>
<template>
	<header :class="cn('border-b border-gray-100')">
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

				<!--@TODO в компоненту c состаянием из которым есть доступ извне -->
				<div>
					<UiButton class="group relative">
						<b>520 ₽</b>
						<span class="h-full w-[1px] bg-white/30 mx-3" />
						<div
							class="flex items-center gap-1 transition duration-300 group-hover:opacity-0"
						>
							<IconShoppingCart class="h-4 w-4 relative" stroke-width="2" />
							<b>3</b>
						</div>
						<IconArrowRight
							class="w-5 absolute right-5 transition duration-300 translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
						/>
					</UiButton>
				</div>
			</div>
		</UiContainer>
	</header>
</template>
