import { Option } from '../option.model';

export class TipoAtributo {

    id?: number
    descricao?: string;
    idAtributoSelecionado?:number
    listAtributo?: Option[]

    constructor(dados?: TipoAtributo) {
        if (dados) {
            this.id = dados.id || null;
            this.descricao = dados.descricao || null;
            this.idAtributoSelecionado = dados.idAtributoSelecionado
            this.listAtributo = dados.listAtributo || []
        }
    }
}