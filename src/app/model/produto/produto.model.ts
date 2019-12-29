import { Campo } from '../campo.extra.model';
import { Imagem } from './imagem.model';
import { Estoque } from './estoque.model';
import { Variacao } from './variacao.model';
import { Option } from '../option.model';


export class Produto {

  id?: number
  codigo?: string
  nome?: string
  descricao?: string
  status?: number
  precoCusto?: number
  despesasAcessoriais?: number
  precoVenda?: number
  precoPromocional?: number
  tipo?: number
  tipoDescricao?: string
  movimentaEstoque: boolean
  possuiVariacao: boolean
  qtdeVariacao?: number
  peso?: number
  largura?: number
  altura?: number
  comprimento?: number
  comissao?: number
  idCategoria?: number
  imagemDestaque?: string
  camposExtra?: Campo[]
  idUnidadeMedida?: number
  estoqueAtual?: number
  estoqueMinimo?: number
  listVariacao?: Variacao[]
  listImagem?: Imagem[] = []
  fornecedor?: Fornecedor
  abaManipulada?: AbaManipulada

  listCategoria: Option[];
	listUnidadeMedida: Option[];

  constructor(dados?: Produto) {
    if (dados) {
      this.id = dados.id || null
      this.codigo = dados.codigo || null
      this.nome = dados.nome || null
      this.descricao = dados.descricao || null
      this.status = dados.status || null
      this.precoCusto = dados.precoCusto || null
      this.despesasAcessoriais = dados.despesasAcessoriais || null
      this.precoVenda = dados.precoVenda || null
      this.precoPromocional = dados.precoPromocional || null
      this.tipo = dados.tipo || null
      this.tipoDescricao = dados.tipoDescricao || null
      this.movimentaEstoque = dados.movimentaEstoque || false
      this.possuiVariacao = dados.possuiVariacao || false
      this.qtdeVariacao = dados.qtdeVariacao || null
      this.peso = dados.peso || null
      this.largura = dados.largura || null
      this.altura = dados.altura || null
      this.comprimento = dados.comprimento || null
      this.comissao = dados.comissao || null
      this.idCategoria = dados.idCategoria || null
      this.imagemDestaque = dados.imagemDestaque || null
      this.camposExtra = dados.camposExtra || []
      this.idUnidadeMedida = dados.idUnidadeMedida || null
      this.estoqueAtual = dados.estoqueAtual || null
      this.estoqueMinimo = dados.estoqueMinimo || null
      this.listVariacao = dados.listVariacao || []
      this.listImagem = dados.listImagem || []
      this.fornecedor = dados.fornecedor || null
      this.abaManipulada = dados.abaManipulada || null

      this.listCategoria = dados.listCategoria || []
      this.listUnidadeMedida = dados.listUnidadeMedida || []
    }
  }
}

export class Fornecedor {
  id?: number
  nome?: string
}

/**
 * utilizado somente pra verificar quais abas foram abertas
 */
export class AbaManipulada {
  variacao?: boolean;
  imagens?: boolean;

  constructor(variacao: boolean, imagens: boolean) {
    this.variacao = variacao
    this.imagens = imagens
  }
}
