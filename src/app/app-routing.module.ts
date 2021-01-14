import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCreateComponent } from './components/admin/product-admin/product-create/product-create.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { HomeComponent } from './components/public/home/home.component';
import { AuthGuard as guard } from '../app/guards/auth.guard'


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'product/create',
    component: ProductCreateComponent,
    canActivate: [guard],
    data: { expectedRol: ['admin'] }
  },
  {
    path: 'product/store',
    component: ProductCreateComponent,
    canActivate: [guard],
    data: { expectedRol: ['admin', 'user'] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
