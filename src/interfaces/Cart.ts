import { Product } from "./product";

export interface CartResponse {
  status: string;
  message?: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: Item[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface Item {
  count: number;
  _id: string;
  product: Product;
  price: number;
}
