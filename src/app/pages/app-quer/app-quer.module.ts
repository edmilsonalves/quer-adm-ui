import { QuestionarioComponent } from './questionario/questionario.component';
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

export const routes = [
  { path: '', redirectTo: 'questionario', pathMatch: 'full' },
  { path: 'questionario', component: QuestionarioComponent, data: { breadcrumb: 'Lista de questionarios' } },
  { path: 'questionario/:id', component: QuestionarioFormComponent,
    children:[
      {path: '', redirectTo: 'questionario-form', pathMatch: 'full'},
      {path: 'pergunta', component: PerguntaComponent},
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
    ColetaComponent ],
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