export interface OrderRequest {
	shippingAddress: string;
	deliveryFee: number;
	items: {
		medicineId: string;
		quantity: number;
	}[];
}

export interface UpdateMedicine {
	title?: string;
	details?: string;
	price?: number;
	availableQuantity?: number;
	categoryId?: string;
	generic?: string;
	isAvailable?: boolean;
	manufacturer?: string;
	thumbnail?: string;
}

export interface WhereCondition {
	id?: string,
	sellerId?: string,
	categoryId?: string,
	manufacturer?: string,
	price?: {
		lte: number
	}
}
export interface OrderWhereCondition {
	orderId?: string,
	sellerId?: string,
	customerId?: string,
}
