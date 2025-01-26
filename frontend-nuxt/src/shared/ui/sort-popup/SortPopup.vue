<script setup lang="ts">
// @todo

interface Props {}

const { t } = useI18n();
const {} = defineProps();
</script>
<template>
	<UiPopover>
		<UiPopoverTrigger :as-child="true">
			<div
				class="inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer"
			>
				<IconArrowUpDown class="w-4 h-4" />
				<b>{{ t('sort.name') }}</b>
				<b class="text-primary">{{ t('sort.popular') }}</b>
			</div>
		</UiPopoverTrigger>
	</UiPopover>
</template>
