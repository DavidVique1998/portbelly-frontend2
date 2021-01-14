import { Category } from "./category";
import { Promotion } from "./promotion";

export class Product {
  idProduct: number;
  name: string;
  image: string;
  sizes: string;
  characteristics: string;
  quantity: number;
  price: number;
  oldPrice: number;
  colors: string;
  dateOfCreated: string;
  promotion: Promotion;
  category: Category;
  logicDelet: boolean;
}
