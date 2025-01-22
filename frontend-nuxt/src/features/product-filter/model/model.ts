
// @TODO перенести в Features
export const useCategory = defineStore('products', {
	state: () => ({ activeId: NaN }),
	actions: {
		setActiveId(id: number) {
			this.activeId = id;
		},
	},
});
