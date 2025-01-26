<script setup lang="ts">
// @TODO вынести в компоненты блок
</script>
<template>
	<div class="flex flex-col items-center justify-center mt-40">

<!--		todo это вынести -->
		<div class="flex items-center justify-between w-[840px] gap-12">
			<div class="flex flex-col">
				<div class="w-[445px]">
					<UiTitle>{{ 'Доступ запрещён' }}</UiTitle>
					<div class="text-gray-400 text-lg">
						{{
							'Данную страницу могут просматривать только авторизованные пользователи'
						}}
					</div>
				</div>

				<div class="flex gap-5 mt-11">
					<Link href="/">
						<UiButton class="gap-2" variant="outline">
							<IconArrowLeft />
							На главную
						</UiButton>
					</Link>
					<Link>
						<UiButton
							@click="location.reload()"
							class="text-gray-500 border-gray-400 hover:bg-gray-50"
							variant="outline"
						>
							Обновить страницу
						</UiButton>
					</Link>
				</div>
			</div>
		</div>
	</div>
</template>
