export class MenuProduto {

  abaAtual: string;
  disabled: boolean;
  isVariacao?: boolean
  isFornecedor?: boolean
  isEstoque?: boolean

  constructor(dados?: MenuProduto) {
    if (dados) {
      this.abaAtual = dados.abaAtual || "";
      this.disabled = dados.disabled || false;
      this.isVariacao = dados.isVariacao || false;
      this.isFornecedor = dados.isFornecedor || false;
      this.isEstoque = dados.isEstoque || false;
    }
  }
}
