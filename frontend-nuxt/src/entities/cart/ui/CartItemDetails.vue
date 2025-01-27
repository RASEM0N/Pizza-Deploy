<template>
	<div class="flex my-4">
		<div class="flex flex-1 text-lg text-neutral-500">
			<slot name="title"></slot>
			<div
				class="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"
			></div>
		</div>

		<span class="font-bold text-lg">
			<slot name="value"></slot>
		</span>
	</div>
</template>
