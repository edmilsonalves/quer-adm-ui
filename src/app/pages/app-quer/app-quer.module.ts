import { QuestionarioComponent } from './questionario/questionario.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../../theme/directives/directives.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

export const routes = [
  { path: '', redirectTo: 'questionario', pathMatch: 'full' },
  { path: 'questionario', component: QuestionarioComponent, data: { breadcrumb: 'Lista de questionarios' } },
];

@NgModule({
  declarations: [
    QuestionarioComponent],
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
