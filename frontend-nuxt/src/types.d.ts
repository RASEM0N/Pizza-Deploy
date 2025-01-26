// @TODO дублировать = бан
declare namespace Models {
	interface Common {
		id: number;
		createdAt: number;
		updatedAt: number;
	}

	// @TODO объекты с двухстороней связью
	// не всегда запрашиваются, так что отдельные типы нужны для них

	// @TODO Надо нормально оформить
	type PizzaSize = 20 | 30 | 40;
	type PizzaType = 1 | 2;

	// @TODO enum plz
	type OrderStatus = 'PENDING' | 'SUCCESS' | 'CANCELLED';
	type UserRole = 'USER' | 'ADMIN';

	interface Category extends Common {
		name: string;
		products: Product[];
	}

	interface Product extends Common {
		name: string;
		imgUrl: string;
		ingredients: Ingredient[];
		items: ProductItem[];
		categoryId: number;
	}

	interface ProductItem extends Common {
		price: number;
		size: number;
		pizzaType: number;
		cartItem: CartItem[];

		// @TODO в одном регистре всегда
		Product: Product;
		productId: number;
	}

	interface Ingredient extends Common {
		name: string;
		price: number;
		imgUrl: string;

		// @TODO в одном регистре всегда
		Product: Product;
		productId: number;

		// @TODO в одном регистре всегда
		Cart: Cart;
		cartItemId: number;
	}

	interface Cart extends Common {
		items: CartItem[];
		token: string;
		totalAmount: number;
		userId: number;
	}

	interface CartItem extends Common {
		quantity: number;
		ingredients: Ingredient[];

		// @TODO в одном регистре всегда
		ProductItem: ProductItem;
		productItemId: number;

		// @TODO в одном регистре всегда
		Cart: Cart;
		cartId: number;
	}

	interface User extends Common {
		fullName: string;
		email: string;
		password: string;
		role: UserRole;
		verified?: number;

		provider?: string;
		providerId?: string;

		cart: Cart;
		orders: Order[];
		verificationCode: VerificationCode;
	}

	interface Order extends Common {
		token: string;
		totalAmount: number;
		status: OrderStatus;
		paymentId: string;
		items: string;

		fullName: string;
		email: string;
		phone: string;
		address: string;
		comment?: string;
		userId: number;
	}

	interface VerificationCode extends Common {
		code: string;
		userId: number;
	}

	interface Story extends Common {
		previewImageUrl: string;
		items: StoryItem[];
	}

	interface StoryItem extends Common {
		sourceUrl: string;
		storyId: number;
	}
}
