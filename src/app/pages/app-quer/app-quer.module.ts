import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../../theme/directives/directives.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { QuestionarioFormComponent } from './questionario-form/questionario-form.component';
import { PerguntaComponent } from './questionario-form/pergunta/pergunta.component';
import { PontuacaoComponent } from './questionario-form/pontuacao/pontuacao.component';
import { AprovacaoComponent } from './questionario-form/aprovacao/aprovacao.component';
import { PublicacaoComponent } from './questionario-form/publicacao/publicacao.component';
import { ColetaComponent } from './questionario-form/coleta/coleta.component';
import { QuestionarioComponent } from './questionario/questionario.component';
import { QuestionarioInfoComponent } from './questionario-form/questionario-info/questionario-info.component';
import { EmpresaComponent } from '../../shared/components/empresa/empresa.component';
import { ImagemComponent } from 'src/app/shared/components/imagem/imagem.component';
import { ImageUploaderComponent } from 'src/app/shared/components/image-uploader/image-uploader.component';
import { PreviewComponent } from './questionario-form/preview/preview.component';


export const routes = [
  { path: '', redirectTo: 'questionario', pathMatch: 'full' },
  { path: 'questionario', component: QuestionarioComponent, data: { breadcrumb: 'Lista de questionarios' } },
  { path: 'questionario/:id', component: QuestionarioFormComponent,
    children:[
      {path: '', redirectTo: 'info', pathMatch: 'full'},
      {path: 'info', component: QuestionarioInfoComponent},
      {path: 'pergunta', component: PerguntaComponent},
      {path: 'preview', component: PreviewComponent},
      {path: 'pontuacao', component: PontuacaoComponent},
      {path: 'aprovacao', component: AprovacaoComponent},
      {path: 'publicacao', component: PublicacaoComponent},
      {path: 'coleta', component: ColetaComponent}
    ]},
]

@NgModule({
  declarations: [
    QuestionarioComponent,
    QuestionarioFormComponent,
    PerguntaComponent,
    PontuacaoComponent,
    AprovacaoComponent,
    PublicacaoComponent,
    ColetaComponent,
    QuestionarioInfoComponent,
    EmpresaComponent,
    ImageUploaderComponent,
    PreviewComponent],
  imports: [
    DirectivesModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    RouterModule.forChild(routes),
  ]
})
export class AppQuerModule { }
