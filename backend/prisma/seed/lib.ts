import { Prisma } from '@prisma/client';

export const randomDecimalNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

export const generateProductItem = ({
	productId,
	pizzaType,
	size,
}: {
	productId: number;
	pizzaType?: 1 | 2;
	size?: 20 | 30 | 40;
}) => {
	return {
		pizzaType,
		productId,
		size,
		price: randomDecimalNumber(190, 600),
	} as Prisma.ProductItemUncheckedCreateInput;
};
