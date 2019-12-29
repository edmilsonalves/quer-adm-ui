import { GenericService } from '../../../service/generic-service';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class VariacaoService extends GenericService<any>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.URL_API}/variacao`)
  }

  isValid(input: any): boolean {
    return input.valid && (input.dirty || input.touched)
  }

  isInvalid(input: any): boolean {
    return input.invalid && (input.dirty || input.touched)
  }

}
