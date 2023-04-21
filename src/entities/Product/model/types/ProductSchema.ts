export interface Product {
    id: number;
    name?: string;
    description?: string;
    price?: number;
    image?: string;
}

export interface ProductSchema {
    data?: Product;
    isLoading: boolean;
    error?: string
}
