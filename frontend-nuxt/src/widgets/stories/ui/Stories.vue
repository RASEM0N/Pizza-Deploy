<script setup lang="ts">
import { useApiFetch } from '~/src/shared/api';
import type { Story } from '~/src/entities/story';

const { data } = useApiFetch<Story[]>('/api/story');

const stories = computed(() => data.value ?? []);
const emptyStories = computed(() => (stories.value ? [] : Array.from(Array(6))));

const selectedStory = ref<Story>();
const openStory = computed<boolean>(() => Boolean(selectedStory.value?.items.length));

const onUpdateOpen = (value: boolean) => {
	if (value) {
		return;
	}

	selectedStory.value = undefined;
};
</script>
<template>
	<UiContainer class="flex items-center justify-between gap-2 my-10 overflow-hidden">
		<div
			v-for="(_, idx) in emptyStories"
			:key="idx"
			class="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse"
		></div>

		<NuxtImg
			v-for="story in stories"
			draggable="false"
			:key="story.id"
			:src="story.previewImageUrl"
			height="250"
			width="200"
			@click="selectedStory = story"
		/>

		<UiDialog :open="openStory" @update:open="onUpdateOpen">
			<UiDialogContent class="bg-white overflow-hidden">
				STORIES @TODO
			</UiDialogContent>
		</UiDialog>
	</UiContainer>
</template>
