import { Product } from "./product";
import { ShoppingCart } from "./shopping-cart";

export class ProductInCart {
  idProductInCart: number;
  state: string;
  quantity: number;
  size: string;
  color: string;
  price: number;
  dateOfCreated: string;
  logicDelet: boolean;
  product: Product;
  shoppingCart: ShoppingCart;
}
