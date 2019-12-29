export class Imagem{
    id?: number
    nome?: string
    type?: string
    file?: string | ArrayBuffer
    ordem?: number

    constructor(dados?: Imagem) {
      if (dados) {
        this.id = dados.id || null;
        this.nome = dados.nome || null;
        this.type = dados.type || null;
        this.file = dados.file || null;
        this.ordem = dados.ordem || null;
      }
    }

  }
  