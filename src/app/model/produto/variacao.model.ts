import { Imagem } from './imagem.model';
import { VariacaoTipoAtributo } from './variacao-tipo-atributo.model';
import { TipoAtributo } from './tipo-atributo.model';

export class Variacao {

    id?: number
    idProduto?:number
    codigo?: string
    descricao?:string
    ordem?: number
    precoCusto?: number 
    precoVenda?: number
    precoPromocional?: number
    ativo?: boolean
    estoqueAtual?: number
    listImagem?: Imagem[]
    listTipoAtributo?: TipoAtributo[]

    constructor(dados?: Variacao) {
        if (dados) {
            this.id = dados.id || null;
            this.idProduto = dados.id || null;
            this.codigo = dados.codigo || null;
            this.descricao = dados.descricao || null;
            this.precoCusto = dados.precoCusto || null;
            this.precoVenda = dados.precoVenda || null;
            this.precoPromocional = dados.precoPromocional || null;
            this.listImagem = dados.listImagem || [];
            this.ativo = dados.ativo || true;
            this.estoqueAtual = dados.estoqueAtual || null;
            this.ordem = dados.ordem || null;
            this.listTipoAtributo = dados.listTipoAtributo || []
        }
    }
}