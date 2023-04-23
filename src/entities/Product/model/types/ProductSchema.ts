export interface Product {
    _id: string;
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
