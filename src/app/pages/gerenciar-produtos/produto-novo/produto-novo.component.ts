import { Component, OnInit } from '@angular/core';
import { trigger, transition, state, style, animate } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/service/categoria.service';
import { UnidadeMedidaService } from 'src/app/service/unidade-medida.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Option } from 'src/app/model/option.model';
import { Categoria } from 'src/app/model/produto/categoria.model';
import { Produto, AbaManipulada } from 'src/app/model/produto/produto.model';
import { ProdutoService } from '../produto.service';
import { VariacaoService } from '../variacao/variacao.service';
import { HttpParams } from '@angular/common/http';
import { Campo } from 'src/app/model/campo.extra.model';

@Component({
  selector: 'sv-produto-novo',
  templateUrl: './produto-novo.component.html',
  styleUrls: ['./produto-novo.component.scss'],
  animations: [
    trigger('simpleFadeAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(700)
      ]),
      transition(':leave',
        animate(200, style({ opacity: 0 })))
    ])
  ],
})
export class ProdutoNovoComponent implements OnInit {

  form: FormGroup
  tabAtual: string = 'tabInfoPrincipal'

  data: any;
  carregando: boolean = false;

  categorias: Option[] = []
  unidadeMedidas: Option[] = []
  id: number

  ocultarBtSalvarCancelar: boolean = false

  constructor(private route: ActivatedRoute,
    private router: Router,
    private produtosService: ProdutoService,
    private variacaoService: VariacaoService,
    private categoriaService: CategoriaService,
    private unidadeMedidaService: UnidadeMedidaService,
    public toastrService: ToastrService,
    private fb: FormBuilder) {
    this.criarForm()
  }

  ngOnInit() {
    this.categoriaService.findAll().subscribe((categorias: Categoria[]) => {
      this.categorias = categorias;
    })

    this.unidadeMedidaService.findAll().subscribe((unidadeMedidas: Option[]) => {
      this.unidadeMedidas = unidadeMedidas
    })

    this.unidadeMedidas.push({ id: null, descricao: "Selecione..." })
    this.categorias.push({ id: null, descricao: "Selecione..." })
  }

  criarForm() {
    var produto = new Produto();

    this.form = this.fb.group({
      id: this.fb.control(produto.id),
      codigo: this.fb.control(produto.codigo, [Validators.required, Validators.minLength(4), Validators.maxLength(45)]),
      nome: this.fb.control(produto.nome, [Validators.required, Validators.minLength(4), Validators.maxLength(45)]),
      precoCusto: this.fb.control(produto.precoCusto, [Validators.required]),
      precoVenda: this.fb.control(produto.precoVenda, [Validators.required]),
      precoPromocional: this.fb.control(produto.precoPromocional),
      descricao: this.fb.control(produto.descricao, [Validators.required]),
      ativo: this.fb.control(true),
      possuiVariacao: this.fb.control(false),
      movimentaEstoque: this.fb.control(true),
      peso: this.fb.control(produto.peso),
      largura: this.fb.control(produto.largura),
      altura: this.fb.control(produto.altura),
      comprimento: this.fb.control(produto.comprimento),
      comissao: this.fb.control(produto.comissao),
      estoqueAtual: this.fb.control(produto.estoqueAtual),
      estoqueMinimo: this.fb.control(produto.estoqueMinimo),
      idCategoria: this.fb.control(produto.idCategoria, [Validators.required]),
      listVariacao: this.fb.array([]),
      idUnidadeMedida: this.fb.control(produto.idUnidadeMedida, [Validators.required]),
      camposExtra: this.fb.array([]),
      listImagem: this.fb.array([]),
      imagemDestaque: this.fb.control(produto.imagemDestaque),
      abaManipulada: this.fb.control(new AbaManipulada(false, false))
    })
  }

  changeTab(tab: string) {
    this.tabAtual = tab

    if (tab == 'tabVariacao') {

    } else {
      this.ocultarBtSalvarCancelar = false;
    }

  }

  getCampoExtra(campo: Campo) {
    let campos = this.form.get('camposExtra') as FormArray
    campos.push(this.fb.group(
      {
        id: 1,
        tipo: campo.tipo,
        label: campo.label,
        value: null
      }
    ))
  }

  cancelar(): void {
    this.router.navigate([`/pages/gerenciar-produtos/produtos`]);
  }

  removeCampoExtra(index: number, campo: Campo) {
    let campos = this.form.get('camposExtra') as FormArray
    campos.removeAt(index)
  }

  camposExtraList(produto: Produto): Campo[] {
    let campos: Campo[] = []
    if (produto.camposExtra) {
      for (var i in produto.camposExtra) {
        campos.push(this.fb.group(
          {
            id: produto.camposExtra[i].id,
            label: produto.camposExtra[i].label,
            value: produto.camposExtra[i].value
          }
        ))
      }
    }
    return campos
  }

  async onSubmit(produto: Produto) {
    console.log(produto)
    this.produtosService.insert(produto).subscribe((produto: Produto) => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(["/pages/gerenciar-produtos/produtos"]));
      
      this.toastrService.success('Seu produto foi salvo com sucesso!', 'Tudo certo 😃');
    }, (err) => {
      this.toastrService.error('Contate o administrador do sistema!', 'Ops algo deu errado');
    }
    );;
  }

  redirectToNovoProduto() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(["/pages/gerenciar-produtos/produtos/add"]));
  }

  isValid(campo: string): boolean {
    let input = this.form.get(campo);
    if (input) {
      return input.valid && (input.dirty || input.touched)
    } else {
      return false
    }
  }

  isInvalid(campo: string): boolean {
    let input = this.form.get(campo);
    if (input) {
      return input.invalid && (input.dirty || input.touched)
    } else {
      return false
    }
  }

  ocultarBtSalvar(event: boolean) {
    this.ocultarBtSalvarCancelar = event;
  }

  houveAlteracaoVariacao(event: boolean) {
    this.form.get('abaManipulada').value.variacao = true;
  }
}
