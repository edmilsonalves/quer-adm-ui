export class BaseResponse {

    message?: string
    dataList?: any
    entity?: any
  
    constructor(dados?: BaseResponse) {
      if (dados) {
        this.message = dados.message || null;
        this.dataList = dados.dataList || null;
        this.entity = dados.entity || null;
      }
    }
  }
  