export class Option {
    id?: number
    descricao?: string

    constructor(dados?: Option) {
        if (dados) {
            this.id = dados.id || null
            this.descricao = dados.descricao || null
        }
    }
}