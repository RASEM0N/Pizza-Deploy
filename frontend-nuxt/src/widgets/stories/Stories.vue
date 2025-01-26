<script setup lang="ts">
import { useApiFetch } from '~/src/shared/api';

const { data } = useApiFetch<Models.Story[]>('/api/story');

const stories = computed(() => data.value ?? []);
const emptyStories = computed(() => (stories.value ? [] : Array(6)));

const selectedStory = ref<Models.Story | null>(null);
const openStory = computed<boolean>(() => Boolean(selectedStory.value?.items.length));

const onUpdateOpen = (value: boolean) => {
	if (value) {
		return;
	}

	selectedStory.value = null;
};
</script>
<template>
	<UiContainer class="flex items-center justify-between gap-2 my-10">
		<div
			v-for="(_, idx) in emptyStories"
			:key="idx"
			class="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse"
		></div>

		<NuxtImg
			v-for="story in stories"
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
