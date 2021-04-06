import { Client } from "./client";
import { Product } from "./product";

export class Action {
  idAction: number;
  myLike: boolean;
  opinion: string;
  starts: number;
  logicDelet: boolean;
  client: Client;
  product: Product;
}
