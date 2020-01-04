import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { Imagem } from 'src/app/model/produto/imagem.model';

@Component({
  selector: 'quer-multiple-image-uploader',
  templateUrl: './multiple-image-uploader.component.html',
  styleUrls: ['./multiple-image-uploader.component.scss']
})
export class MultipleImageUploaderComponent {
  @Input() imagens: Imagem[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  fileChange(input) {
    this.readFiles(input.files);
  }

  readFile(file, reader, callback) {
    reader.onload = () => {
      callback(reader.result);
    }
    reader.readAsDataURL(file);
  }

  readFiles(files, index = 0) {
    let reader = new FileReader();

    if (index in files) {
      this.readFile(files[index], reader, (result) => {

        let campo = {
          id: null,
          name: files[index].name,
          type: files[index].type,
          file: result,
          order: index + 1
        }

        console.log(campo)
        this.imagens.push(campo)
        this.readFiles(files, index + 1);
      });
    } else {
      this.changeDetectorRef.detectChanges();
    }
  }

  removeImage(index): void {
    this.imagens.splice(index, 1);
  }

}
