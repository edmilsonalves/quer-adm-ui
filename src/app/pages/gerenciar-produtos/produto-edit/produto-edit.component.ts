import { Produto, AbaManipulada } from '../../../model/produto/produto.model';
import { Component, ViewEncapsulation, OnInit, Input, VERSION } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { trigger, transition, state, style, animate } from '@angular/animations';
import { MyForm } from './validations.interface';
import { Imagem } from '../../../model/produto/imagem.model';
import { Categoria } from '../../../model/produto/categoria.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../produto.service';
import { Campo } from '../../../model/campo.extra.model';
import { CategoriaService } from '../../../service/categoria.service';
import { HttpParams } from '@angular/common/http';
import { ImagemService } from '../../../service/Imagem.service';
import { Option } from '../../../model/option.model';
import { Variacao } from '../../../model/produto/variacao.model';
import { UnidadeMedidaService } from '../../../service/unidade-medida.service';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { VariacaoService } from '../variacao/variacao.service';
import { StatusProdutoEnum } from '../../../enums/status-produto-enum';

@Component({
    selector: 'quer-form-produto',
    templateUrl: './produto-edit.component.html',
    styleUrls: ['./produto-edit.component.scss'],
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
export class ProdutoEditComponent implements OnInit {

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
        this.criarForm(null)
    }

    ngOnInit() {
        this.id = this.route.snapshot.params["id"];
        if (this.id != null) {
            this.carregando = true
            this.produtosService.findById(this.id).subscribe((produto: Produto) => {
                this.criarForm(produto)

                this.categoriaService.findAll().subscribe((categorias: Categoria[]) => {
                    this.categorias = categorias;
                })

                this.unidadeMedidaService.findAll().subscribe((unidadeMedidas: Option[]) => {
                    this.unidadeMedidas = unidadeMedidas
                })

                this.unidadeMedidas.push({ id: null, descricao: "Selecione..." })
                this.categorias.push({ id: null, descricao: "Selecione..." })

                this.carregando = false
                this.categorias = produto.listCategoria;
                this.unidadeMedidas = produto.listUnidadeMedida;
            });
        }

        // this.categoriaService.findAll().subscribe((categorias: Categoria[]) => {
        //     this.categorias = categorias;
        // })

        // this.unidadeMedidaService.findAll().subscribe((unidadeMedidas: Option[]) => {
        //     this.unidadeMedidas = unidadeMedidas
        // })

        this.unidadeMedidas.push({ id: null, descricao: "Selecione..." })
        this.categorias.push({ id: null, descricao: "Selecione..." })
    }

    criarForm(produto: Produto) {
        if (produto == null) {
            produto = new Produto();
            produto.possuiVariacao = false
            produto.movimentaEstoque = false
        }

        this.form = this.fb.group({
            id: this.fb.control(produto.id),
            codigo: this.fb.control(produto.codigo, [Validators.required, Validators.minLength(4), Validators.maxLength(45)]),
            nome: this.fb.control(produto.nome, [Validators.required, Validators.minLength(4), Validators.maxLength(45)]),
            precoCusto: this.fb.control(produto.precoCusto, [Validators.required]),
            precoVenda: this.fb.control(produto.precoVenda, [Validators.required]),
            precoPromocional: this.fb.control(produto.precoPromocional),
            descricao: this.fb.control(produto.descricao, [Validators.required]),
            ativo: this.fb.control(produto.status == StatusProdutoEnum.ATIVO),
            possuiVariacao: this.fb.control(produto.possuiVariacao),
            movimentaEstoque: this.fb.control(produto.movimentaEstoque),
            peso: this.fb.control(produto.peso),
            largura: this.fb.control(produto.largura),
            altura: this.fb.control(produto.altura),
            comprimento: this.fb.control(produto.comprimento),
            comissao: this.fb.control(produto.comissao),
            estoqueAtual: this.fb.control(produto.estoqueAtual),
            estoqueMinimo: this.fb.control(produto.estoqueMinimo),
            idCategoria: this.fb.control(produto.idCategoria, [Validators.required]),
            listVariacao: this.fb.array(produto.listVariacao || []),
            idUnidadeMedida: this.fb.control(produto.idUnidadeMedida, [Validators.required]),
            camposExtra: this.fb.array(this.camposExtraList(produto)),
            listImagem: this.fb.array(produto.listImagem || []),
            imagemDestaque: this.fb.control(produto.imagemDestaque),
            abaManipulada: this.fb.control(new AbaManipulada(false, false))
        })
    }

    changeTab(tab: string) {
        this.tabAtual = tab
        if (tab == 'tabVariacao') {
            // var variacaoArray = this.form.get("variacoes") as FormArray
            // if (this.id != null && variacaoArray.length == 0) {
            //     const params = new HttpParams().set('idProduto', this.id + "");

            //     this.variacaoService.findByParams(params).subscribe((variacoes: Array<Variacao>) => {
            //         this.tabAtual = tab
            //         for (var i in variacoes) {
            //             variacaoArray.push(new FormControl(variacoes[i]));
            //         }
            //     })
            // }
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

    listImagem(produto: Produto): Imagem[] {
        let imagens: Imagem[] = []
        if (produto.listImagem) {
            for (var i in produto.listImagem) {
                imagens.push
            }
        }
        return imagens
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
        
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(["/pages/gerenciar-produtos/produtos"]));

        for (let variacao of produto.listVariacao) {
            variacao.idProduto = produto.id
            if (variacao.id < 0) {
                variacao.id = null;
            }
            for (let tipoAtributo of variacao.listTipoAtributo) {
                if (tipoAtributo.idAtributoSelecionado == null) {
                    var index = variacao.listTipoAtributo.indexOf(tipoAtributo);
                    variacao.listTipoAtributo.splice(index, 1);
                }
            }
        }

        if (produto.id != null) {
            this.produtosService.update(produto).subscribe((produto: Produto) => {
                this.toastrService.success('Seu produto foi salvo com sucesso!', 'Tudo certo 😃');
            }, (err) => {
                this.toastrService.error('Contate o administrador do sistema!', 'Ops algo deu errado');
            }
            );;
        }
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


export function emailValidator(control: FormControl): { [key: string]: any } {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return { invalidEmail: true };
    }
}

export function websiteValidator(control: FormControl): { [key: string]: any } {
    var websiteRegexp = /(https?:\/\/)?([\w\d]+\.)?[\w\d]+\.\w+\/?.+$/;
    if (control.value && !websiteRegexp.test(control.value)) {
        return { invalidUrl: true };
    }
}

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
        let password = group.controls[passwordKey];
        let passwordConfirmation = group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({ mismatchedPasswords: true })
        }
    }
}