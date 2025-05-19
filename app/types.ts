
export interface Product {
    no: number;
    productId: string;
    productName: string;
    category: string;
    price: number;
    imageUrl: string;
    stock: number;
}

export interface CartItem extends Product {
    quantity: number;
    originalPrice?: number;
    discount?: number;
    discountType?: 'percentage' | 'amount';
}

export interface Discount {
    type: 'percentage' | 'amount';
    value: number;
}