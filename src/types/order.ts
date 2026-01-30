export interface OrderRequest {
	shippingAddress: string;
	items: {
		medicineId: string;
		quantity: number;
	}[];
}
