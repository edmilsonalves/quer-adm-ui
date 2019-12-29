export class Estoque {

  id?: number
  minimo?: number
  maximo?: number
  atual?: number
  alerta?: number

  constructor(dados?: Estoque) {
    if (dados) {
      this.id = dados.id || null
      this.minimo = dados.minimo || null
      this.maximo = dados.maximo || null
      this.atual = dados.atual || null
      this.alerta = dados.alerta || null
    }
  }
}

