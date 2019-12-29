import { TipoAtributo } from './../model/produto/tipo-atributo.model';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { GenericService } from './generic-service';

@Injectable()
export class TipoAtributoService extends GenericService<TipoAtributo>{

    constructor(protected http: HttpClient) {
        super(http, `${environment.URL_API}/tipo-atributos`)
    }
}
