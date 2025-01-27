export type DefaultProductSize = 20 | 30 | 40;
export type DefaultProductType = 1 | 2;

export const defaultMapProductSizes = (): { [key: number]: string } => {
	const { t } = useI18n();

	return {
		20: t('product.size.small'),
		30: t('product.size.medium'),
		40: t('product.size.bit'),
	};
};

export const defaultMapProductTypes = (): { [key: number]: string } => {
	const { t } = useI18n();

	return {
		1: t('product.type.default'),
		2: t('product.type.thin'),
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
