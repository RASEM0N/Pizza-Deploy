export type DefaultProductSize = 20 | 30 | 40;
export type DefaultProductType = 1 | 2;

export const defaultMapProductSizes = (): { [key: number]: string } => {
	const { $i18n } = useNuxtApp()

	return {
		20: $i18n.t('product.size.small'),
		30: $i18n.t('product.size.medium'),
		40: $i18n.t('product.size.big'),
	};
};

export const defaultMapProductTypes = (): { [key: number]: string } => {
	const { $i18n } = useNuxtApp()

	return {
		1: $i18n.t('product.type.traditional'),
		2: $i18n.t('product.type.thin'),
	};
};

export const defaultProductSizes = () => {
	return Object.entries(defaultMapProductSizes()).map(([value, name]) => ({
		name,
		value: +value,
	}));
};

export const defaultProductTypes = () => {
	return Object.entries(defaultMapProductTypes()).map(([value, name]) => ({
		name,
		value: +value,
	}));
};
