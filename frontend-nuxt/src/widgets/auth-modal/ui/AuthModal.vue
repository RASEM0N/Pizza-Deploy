<script setup lang="ts">
import { useAuthTabs } from '../model/useAuthTabs';

// @TODO
// - после успешной регистрации вкладка меняется на login
// - github, google, yandex авторизация

const open = ref(false);
const { tabInfo, switchTab } = useAuthTabs();
</script>

<template>
	<UiDialog v-model:open="open">
		<UiDialogTrigger as-child>
			<slot></slot>
		</UiDialogTrigger>
		<UiDialogContent class="w-[450px] bg-white p-10">
			<component :is="tabInfo.component" @success="open = false"></component>

			<!--			<div class="flex gap-2">-->
			<!--				<UiButton variant="secondary" class="gap-2 h-12 p-2 flex-1">-->
			<!--					GitHub-->
			<!--				</UiButton>-->
			<!--				<UiButton variant="secondary" class="gap-2 h-12 p-2 flex-1">-->
			<!--					Google-->
			<!--				</UiButton>-->
			<!--				<UiButton variant="secondary" class="gap-2 h-12 p-2 flex-1">-->
			<!--					Yandex-->
			<!--				</UiButton>-->
			<!--			</div>-->

			<UiButton variant="outline" @click="switchTab" class="h-12">
				{{ tabInfo.name }}
			</UiButton>
		</UiDialogContent>
	</UiDialog>
</template>
