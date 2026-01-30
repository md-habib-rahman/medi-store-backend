export interface OrderRequest {
	shippingAddress: string;
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
