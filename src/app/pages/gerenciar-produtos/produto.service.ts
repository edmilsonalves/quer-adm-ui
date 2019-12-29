import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GenericService } from '../../service/generic-service';

@Injectable()
export class ProdutoService extends GenericService<any>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.URL_API}/api/v1/produto`)
  }

  isValid(input: any): boolean {
    return input.valid && (input.dirty || input.touched)
  }

  isInvalid(input: any): boolean {
    return input.invalid && (input.dirty || input.touched)
  }

}
