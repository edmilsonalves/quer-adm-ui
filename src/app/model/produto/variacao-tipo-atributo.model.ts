import { Option } from '../option.model';

export class VariacaoTipoAtributo {
    id?: number
    descricao?: string
    idAtributoSelecionado?:number
    atributos?: Option[]
    
    constructor(dados?: VariacaoTipoAtributo) {
        if (dados) {
            this.id = dados.id || null
            this.descricao = dados.descricao || null
            this.idAtributoSelecionado = dados.idAtributoSelecionado || null
            this.atributos = dados.atributos || null
        }
    }
}