import { Client } from "./client";
import { Product } from "./product";
import { ProductInCart } from "./product-in-cart";

export class ShoppingCart {
  idShoppingCart: number;
  type: string;
  client: Client;
  logicDelet: boolean;
  productsInCart: Array<Product>;
}
