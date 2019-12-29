import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { GenericService } from './generic-service';
import { Categoria } from '../model/produto/categoria.model';
import { Option } from '../model/option.model';



@Injectable()
export class UnidadeMedidaService extends GenericService<Option>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.URL_API}/api/v1/unidade-medida`)
  }
  
}
