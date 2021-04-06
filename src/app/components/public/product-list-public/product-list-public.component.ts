import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Client } from 'src/app/models/client';
import { NewUser } from 'src/app/models/new-user';
import { Product } from 'src/app/models/product';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { CategoryService } from 'src/app/services/category.service';
import { ClientService } from 'src/app/services/client.service';
import { ProductService } from 'src/app/services/product.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-product-list-public',
  templateUrl: './product-list-public.component.html',
  styleUrls: ['./product-list-public.component.css']
})
export class ProductListPublicComponent implements OnInit {

  //Products
  products: Product[] = []

  //User
  user: NewUser;
  //isLogged
  isLogged: boolean = false;
  //Client
  client: Client;

  //ShoppingCart;
  shoppingCart: ShoppingCart;
  //Path
  path: string;


  //ProductsView
  productsView: Array<Product> = [];

  constructor(private productService: ProductService, private tokenService: TokenService, private clientService: ClientService, private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.path = this.productService.pathImages;
    this.getProducts();
    this.getLogged();
    this.getProductsView();
  }

  /**
   * getProducts
   */
  public getProducts() {
    this.productService.list().subscribe(result => {
      this.products = result;
      if (this.products.length == 0) {
        alert("Pronto tendremos productos para ti");
      }
    })
  }

  /**
   * getLogged
   */
  public getLogged(): void {
    this.user = this.tokenService.newUser;
    if (this.user != null) {
      if (this.user.userName)
        this.clientService.retriveByUserName(this.user.userName).subscribe(result => {
          this.client = result;
          if (this.client)
            this.shoppingCartService.getShoppingCart(this.client).subscribe(result2 => {
              this.shoppingCart = result2;
              console.log(this.shoppingCart);
            })
        })
    }
    else {
      this.isLogged = false;
    }
  }

  /**
   * getProductsView
   */
  public getProductsView() {
    this.productsView = this.productService.getProductsView;
    console.log(this.productsView);
  }
}
