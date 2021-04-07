import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { HomeComponent } from './components/public/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductAdminComponent } from './components/admin/product-admin/product-admin.component';
import { ProductCreateComponent } from './components/admin/product-admin/product-create/product-create.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { interceptorProvider } from './interceptors/service.interceptor';
import { MediatorComponent } from './components/mediator/mediator.component';
import { ProductListPublicComponent } from './components/public/product-list-public/product-list-public.component';
import { ProductViewPublicComponent } from './components/public/product-view-public/product-view-public.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    ProductAdminComponent,
    ProductCreateComponent,
    MediatorComponent,
    ProductListPublicComponent,
    ProductViewPublicComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    FileUploadModule,
    NgxPaginationModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
