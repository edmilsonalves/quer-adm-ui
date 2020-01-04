import { TipoAtributo } from '../../../../model/produto/tipo-atributo.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Variacao } from '../../../../model/produto/variacao.model';
import { VariacaoService } from '../variacao.service';
import { TipoAtributoService } from '../tipo-atributo.service';
import { Imagem } from 'src/app/model/produto/imagem.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'quer-variacao-form',
  templateUrl: './variacao-form.component.html',
  styleUrls: ['./variacao-form.component.scss']
})

export class FormVariacaoComponent implements OnInit {

  form: FormGroup
  id: any

  constructor(private fb: FormBuilder, 
              private router: Router, 
              public toastrService: ToastrService, 
              private route: ActivatedRoute, 
              private variacaoService: VariacaoService, 
              private tipoAtributoService: TipoAtributoService) {
    this.criarForm(new Variacao())
  }

  ngOnInit() {

    this.id = this.route.snapshot.params["id"];

    if (this.id != null && this.id != "add") {
      this.variacaoService.findById(this.id).subscribe((variacao: Variacao) => {
        this.criarForm(variacao)
      })
    } else {
      var variacao = new Variacao();
      var idProduto = this.route.snapshot.parent.params['id'];
      variacao.idProduto = idProduto;
      this.tipoAtributoService.findAll().subscribe((listTipoAtributo: TipoAtributo[]) => {
        variacao.listTipoAtributo = listTipoAtributo
        this.criarForm(variacao)
      })
    }
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
      listTipoAtributo: this.tipoAtributoArray(variacao.listTipoAtributo),
      listImagem: this.imagemArray(variacao.listImagem),
      ativo: variacao.ativo
    })
  }

  imagemArray(imagens: Imagem[]) {
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
            atributos: this.fb.array(tipoAtributos[i].listAtributo)
          }
        ))
      }
    }
    return tipoAtributoArray;
  }

  checkTipoAtributo(tipoAtributo: TipoAtributo, index: number, event: any) {
    if (!event.target.checked) {
      tipoAtributo.idAtributoSelecionado = null;
    }
  }


  async onSubmit(variacao: Variacao) {
    if (variacao.id != null) {
      this.variacaoService.update(variacao).subscribe(res => {
        this.toastrService.success('Registro salvo com sucesso!', 'Tudo certo 😃');
        this.router.navigate(['../'], {relativeTo: this.route } );
      }, (err) => {
        this.toastrService.error('Contate o administrador do sistema!', 'Ops algo deu errado');
      }
      );
    } else {
      this.variacaoService.insert(variacao).subscribe(res => {
        this.toastrService.success('Registro salvo com sucesso!', 'Tudo certo 😃');
        this.router.navigate(['../'], {relativeTo: this.route } );
      }, (err) => {
        this.toastrService.error('Contate o administrador do sistema!', 'Ops algo deu errado');
      }
      );
    }
  }

  cancelar(){
    this.router.navigate(['../'], {relativeTo: this.route } );
  }

  get tipoAtributos(): FormArray {
    return this.form.get('tipoAtributos') as FormArray;
  }

}
