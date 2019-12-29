export class Campo {
    id?: number
    tipo?: string
    label?: string
    value?: any

    constructor(dados?: Campo) {
        if(dados){
            this.id = dados.id || null
            this.tipo = dados.tipo
            this.label = dados.label || null
            this.value = dados.value || null
        }
    }
}