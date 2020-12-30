import { Component, OnInit } from '@angular/core';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  uploadedFiles: Array<File> = [];
  product: Product;
  changeImage: boolean;
  fileToUpload: File = null;
  path: string = `${environment.rootUrl}/images/`;
  fileUploadControl = new FileUploadControl([FileUploadValidators.fileSize(2000000), FileUploadValidators.accept(['image/'])]);
  files: File[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  /**
   * onSelect
   */
  onSelect(event): void {
    this.uploadedFiles = [];
    this.uploadedFiles.push(...event.addedFiles);
    this.files = [];
    this.files.push(...event.addedFiles);
    this.validate();
  }

  /**
   * validate
   */
  validate(): void {
    this.uploadedFiles.forEach(element => {
      if (!(/\.(jpg|png|jpeg|gif)$/i).test(element.name)) {
        alert('El archivo a adjuntar no es una imagen permitida');
      } else {
        this.fileToUpload = element;
      }
    });
  }

  /**
   * onRemove
   */
  onRemove(event) {
    // this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
    this.uploadedFiles = [];
    this.fileToUpload = null;
    this.changeImage = false;
    this.files.splice(this.files.indexOf(event), 1);
  }
  /**
   * dropped
   */
  dropped(): void {
    this.validate();
    this.changeImage = true;
  }

}
