import { VariacaoService } from './variacao/variacao.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutosComponent } from './produtos/produtos.component';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../../theme/directives/directives.module';
import { ProdutoEditComponent } from './produto-edit/produto-edit.component';
import { ProdutoService } from './produto.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CategoriaService } from '../../service/categoria.service';
import { ImagemComponent } from '../../shared/components/imagem/imagem.component';
import { ImagemService } from '../../service/Imagem.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CampoExtraComponent } from '../../shared/components/campo-extra/campo-extra.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { VariacaoComponent } from './variacao/variacao.component';
import { UnidadeMedidaService } from '../../service/unidade-medida.service';
import { MultipleImageUploaderComponent } from '../../shared/components/multiple-image-uploader/multiple-image-uploader.component';
import { ProdutoNovoComponent } from './produto-novo/produto-novo.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { TipoAtributoService } from './variacao/tipo-atributo.service';

export const routes = [
  { path: '', redirectTo: 'produtos', pathMatch: 'full' },
  { path: 'produtos', component: ProdutosComponent, data: { breadcrumb: 'Lista de produtos' } },
  {
    path: 'produtos/edit/:id', component: ProdutoEditComponent, data: { breadcrumb: 'Editar produto' }
  },
  {
    path: 'produtos/add', component: ProdutoNovoComponent, data: { breadcrumb: 'Novo produto' }
  },
];

@NgModule({
  declarations: [
    ProdutosComponent, 
    ProdutoEditComponent, 
    ImagemComponent, 
    CampoExtraComponent, 
    LoadingComponent, 
    VariacaoComponent, 
    MultipleImageUploaderComponent, 
    ProdutoNovoComponent, 
    FornecedorComponent],
  imports: [
    DirectivesModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    DragDropModule,
    RouterModule.forChild(routes),
  ],
  providers: [ProdutoService, 
              CategoriaService,
              UnidadeMedidaService, 
              ImagemService,
              VariacaoService,
              TipoAtributoService],
})
export class GerenciarProdutosModule { }
