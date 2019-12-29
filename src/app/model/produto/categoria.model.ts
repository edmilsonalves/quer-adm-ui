export class Categoria {
    id?: number
    descricao?: string

    constructor(dados?: Categoria) {
        if (dados) {
            this.id = dados.id || null
            this.descricao = dados.descricao || null
        }
    }
}