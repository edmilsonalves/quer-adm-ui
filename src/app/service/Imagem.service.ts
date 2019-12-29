import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic-service';
import { environment } from '../../environments/environment';
import { Imagem } from '../model/produto/imagem.model';

@Injectable()
export class ImagemService extends GenericService<Imagem[]>{

    constructor(protected http: HttpClient) {
        super(http, `${environment.URL_API}/imagens`)
    }

    // imagens: Imagem[] = [
    //     {
    //         id: 1,
    //         name: 'Coca cola',
    //         type: 'jpg',
    //         file: 'C:\tmp\img-tmp\ervilha.jpg',
    //         order: 1
    //     },
    //     {
    //         id: 2,
    //         name: 'Ketchup',
    //         type: 'jpg',
    //         file: './assets/img/produtos/ketchup.jpg',
    //         order: 2
    //     },
    //     {
    //         id: 3,
    //         name: 'Leite condensado',
    //         type: 'jpg',
    //         file: './assets/img/produtos/leite condensado.jpg',
    //         order: 3
    //     }
    // ];

}