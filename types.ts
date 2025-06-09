
export interface Product {
  id: number;
  name: string;
  model: string;
  price: number;
  images: string[]; // Array of image paths/URLs
  description: string;
  available: boolean;
}

export type ColumnDirection = 'left' | 'right';

export interface CartItem extends Product {
  quantity: number;
}
