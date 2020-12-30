import { Category } from "./category";
import { Promotion } from "./promotion";

export class Product {
  idProduct: number;
  name: string;
  sizes: string;
  characteristics: string;
  quantity: number;
  price: number;
  colors: string;
  date_of_created: string;
  promotion: Promotion;
  category: Category;
  logicDelet: boolean;
}
