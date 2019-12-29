import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ErrorHandler } from '../app.error-handler'

export class GenericService<T> {

    constructor(protected http: HttpClient, private URL_API: string) { }

    read<T>(model: T | any): Observable<T | T[]> {
        return this.http.get<T | T[]>(`${this.URL_API}/${model.tableName}`);
    }
    

    // FIND ALL
    findAll<T>(): Observable<T | T[]> {
        return this.http.get<T | T[]>(this.URL_API).pipe(
            catchError(ErrorHandler.handleError)
        )
    }

    // FIND BY FILTER
    findByParams<T>(params: HttpParams): Observable<T | T[]> {
        return this.http.get<T | T[]>(this.URL_API, { params: params }).pipe(
            catchError(ErrorHandler.handleError)
        )
    }

    // FIND BY ID
    findById(id: number): Observable<T> {
        return this.http.get<T>(`${this.URL_API}/${id}`).pipe(
            catchError(ErrorHandler.handleError)
        );
    }

    // SALVAR
    insert<T>(request: T): Observable<T> {
        return this.http.post<T>(this.URL_API, request).pipe(
            catchError(ErrorHandler.handleError)
        );
    }

    // UPDATE
    update<T>(request: T): Observable<T> {
        return this.http.put<T>(`${this.URL_API}/${request['id']}`, request).pipe(
            catchError(ErrorHandler.handleError)
        );
    }

    // DELETE 
    delete<T>(id: number): Observable<T> {
        return this.http.delete<T>(`${this.URL_API}/${id}`).pipe(
            catchError(ErrorHandler.handleError)
        );
    }
}