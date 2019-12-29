import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagemComponent } from './components/imagem/imagem.component';
import { CampoExtraComponent } from './components/campo-extra/campo-extra.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { MultipleImageUploaderComponent } from './components/multiple-image-uploader/multiple-image-uploader.component';

@NgModule({
  exports: [
    CommonModule,
    ImagemComponent
  ],
  imports: [],
  declarations: [ImagemComponent, CampoExtraComponent, LoadingComponent, ImageUploaderComponent, MultipleImageUploaderComponent]
})
export class SharedModule { }
