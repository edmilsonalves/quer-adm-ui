import { HttpParams } from '@angular/common/http';
import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Variacao } from '../../../model/produto/variacao.model';
import { TipoAtributo } from '../../../model/produto/tipo-atributo.model';
import { trigger, transition, state, style, animate } from '@angular/animations';
import { Imagem } from '../../../model/produto/imagem.model';
import { TipoAtributoService } from './tipo-atributo.service';

@Component({
  selector: 'sv-variacao',
  templateUrl: './variacao.component.html',
  styleUrls: ['./variacao.component.scss'],
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

export class VariacaoComponent implements OnInit {


  @Input() listVariacao: Array<Variacao> = [];
  @Output() ocultarBtSalvar: EventEmitter<boolean> = new EventEmitter();
  @Output() houveAlteracao: EventEmitter<boolean> = new EventEmitter();

  isForm: boolean = false
  form: FormGroup

  constructor(
    private tipoAtributoService: TipoAtributoService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    if (this.listVariacao != undefined && this.listVariacao.length > 0) {
      this.listVariacao = this.listVariacao.sort((variacao1, variacao2) => variacao1.ordem - variacao2.ordem);
    }
  }

  delete(index: number) {
    this.listVariacao.splice(index, 1);
    this.houveAlteracao.emit(true);
  }

  moveUp(variacao: Variacao, index: number): void {
    var ordem = variacao.ordem

    var variacaoAux: Variacao = this.listVariacao[index - 1]
    variacao.ordem = variacaoAux.ordem

    variacaoAux.ordem = ordem
    this.listVariacao = this.listVariacao.sort((variacao1, variacao2) => variacao1.ordem - variacao2.ordem);
    this.houveAlteracao.emit(true);
  }

  moveDown(variacao: Variacao, index: number): void {
    var ordem = variacao.ordem

    var variacaoAux: Variacao = this.listVariacao[index + 1]
    variacao.ordem = variacaoAux.ordem

    variacaoAux.ordem = ordem
    this.listVariacao = this.listVariacao.sort((variacao1, variacao2) => variacao1.ordem - variacao2.ordem);
    this.houveAlteracao.emit(true);
  }

  setDescricao(tipoAtributo: TipoAtributo, idVariacao: number): void {
    var descricao: string
    var atributos = tipoAtributo.listAtributo
    for (let i = 0; i < atributos.length; i++) {
      var atributo = atributos[i];
      if (atributo.id == tipoAtributo.idAtributoSelecionado) {
        descricao = `${tipoAtributo.descricao}:${atributo.descricao}<br/>`
        document.getElementById(`descricaoVariacao_${tipoAtributo.id}_${idVariacao}`).innerHTML = descricao;
        break;
      }
    }
  }

  add() {
    this.tipoAtributoService.findAll().subscribe((tipoAtributos: TipoAtributo[]) => {
      var variacao: Variacao = new Variacao()
      variacao.listTipoAtributo = tipoAtributos
      this.criarForm(variacao)
      this.isForm = true;
      this.ocultarBtSalvar.emit(true);
    })
  }

  edit(variacao: Variacao) {
    this.criarForm(variacao);
    this.isForm = true;
    this.ocultarBtSalvar.emit(true);
  }

  cancelar() {
    this.isForm = false;
    this.ocultarBtSalvar.emit(false);
  }

  criarForm(variacao: Variacao) {
    this.form = this.fb.group({
      id: variacao.id,
      codigo: [variacao.codigo, Validators.required],
      ordem: variacao.ordem,
      idProduto: variacao.idProduto,
      precoCusto: variacao.precoCusto,
      precoVenda: variacao.precoVenda,
      precoPromocional: variacao.precoPromocional,
      ativo: variacao.ativo,
      estoqueAtual: variacao.estoqueAtual,
      listTipoAtributo: this.tipoAtributoArray(variacao.listTipoAtributo),
      listImagem: this.imagemArray(variacao.listImagem)
    })
  }

  imagemArray(imagens: Imagem[]) {
    console.log(imagens)
    let imagemArray = this.fb.array([])
    if (imagens) {
      for (var i in imagens) {
        imagemArray.push(new FormControl(imagens[i]))
      }
    }
    return imagemArray;
  }

  tipoAtributoArray(tipoAtributos: TipoAtributo[]) {
    let tipoAtributoArray = this.fb.array([])
    if (tipoAtributos) {
      for (var i in tipoAtributos) {
        tipoAtributoArray.push(this.fb.group(
          {
            id: tipoAtributos[i].id,
            descricao: tipoAtributos[i].descricao,
            idAtributoSelecionado: tipoAtributos[i].idAtributoSelecionado,
            selecionado: tipoAtributos[i].idAtributoSelecionado != null ? true : false,
            listAtributo: this.fb.array(tipoAtributos[i].listAtributo)
          }
        ))
      }
    }
    return tipoAtributoArray;
  }

  async finalizar(variacao: Variacao) {
    this.isForm = false;
    var variacaoListAux = this.listVariacao.filter(v => v.id === variacao.id)

    if (variacaoListAux.length > 0) {
      variacaoListAux[0].codigo = variacao.codigo;
      variacaoListAux[0].precoCusto = variacao.precoCusto;
      variacaoListAux[0].precoVenda = variacao.precoVenda;
      variacaoListAux[0].precoPromocional = variacao.precoPromocional;
      variacaoListAux[0].estoqueAtual = variacao.estoqueAtual;
      variacaoListAux[0].listImagem = variacao.listImagem;
      variacaoListAux[0].ordem = variacao.ordem;
      variacaoListAux[0].listTipoAtributo = variacao.listTipoAtributo;
    } else {
      variacao.id = (this.listVariacao.length + 1) * (-1)
      variacao.ordem = this.listVariacao.length + 1;
      this.listVariacao.push(variacao);
    }

    this.ocultarBtSalvar.emit(false);
    this.houveAlteracao.emit(true);
  }


  checkTipoAtributo(tipoAtributo: TipoAtributo, index: number, event: any) {
    if (!event.target.checked) {
      tipoAtributo.idAtributoSelecionado = null;
    }
  }

  get listTipoAtributo(): FormArray {
    return this.form.get('listTipoAtributo') as FormArray;
  }

}
