export const useCategoriesFeed = defineStore('category-feed', {
	state: () => ({ activeCategoryId: NaN }),
	actions: {
		setActiveCategory(categoryId: number) {
			this.activeCategoryId = categoryId;
		},
	},
});
