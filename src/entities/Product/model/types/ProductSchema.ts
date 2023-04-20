export interface Product {
    name: string;
    description: string;
    price: number;
    image: string;
}

export interface ProductSchema {
    data?: Product;
    isLoading: boolean;
    error?: string
}
