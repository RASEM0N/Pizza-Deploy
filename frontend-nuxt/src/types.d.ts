// @TODO дублировать = бан
declare namespace Models {
	interface Common {
		id: number;
		createdAt: number;
		updatedAt: number;
	}

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
		productId: number;
	}

	interface Ingredient extends Common {
		name: string;
		price: number;
		imgUrl: string;

		productId: number;
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

		productItem: number;
		cartId: number;
	}

	interface User extends Common {
		fullName: number;
		email: number;
		password: number;
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
