import { GenericService } from '../../../service/generic-service';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class TipoAtributoService extends GenericService<any>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.URL_API}/api/v1/tipo-atributo`)
  }

}
