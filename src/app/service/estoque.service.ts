import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic-service';
import { environment } from '../../environments/environment';

@Injectable()
export class EstoqueService extends GenericService<any>{

    constructor(protected http: HttpClient) {
        super(http, `${environment.URL_API}/api/v1/estoque`)
    }

}