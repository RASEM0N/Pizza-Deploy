<script setup lang="ts">
import { AuthModal } from '~/src/widgets/auth-modal';

import { useUserStore } from '~/src/entities/user';
import { FETCH_STATUS } from '~/src/shared/lib/types';

// @TODO
// - Auth - это widget

const { t } = useI18n();

const userStore = useUserStore();

// @TODO из-за гидрации делаем так
// надо дополительно как-то обработать none
const loading = computed(() =>
	[FETCH_STATUS.none, FETCH_STATUS.loading].includes(userStore.me.status),
);
onMounted(() => userStore.me.executeIfNone());
</script>
<template>
	<UiButton v-if="loading" variant="outline" :loading="loading"></UiButton>

	<template v-else>
		<NuxtLink v-if="userStore.user" to="/profile">
			<UiButton variant="outline">
				<IconCircleUser :size="16" />
				{{ t('header.profile') }}
			</UiButton>
		</NuxtLink>

		<AuthModal v-else>
			<UiButton variant="outline">
				<IconUser :size="16" />
				{{ t('header.login') }}
			</UiButton>
		</AuthModal>
	</template>
</template>
