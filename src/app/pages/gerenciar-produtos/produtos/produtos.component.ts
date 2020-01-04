import { Component, OnInit, ElementRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { trigger, transition, state, style, animate } from '@angular/animations';
import { Produto } from '../../../model/produto/produto.model'
import { ProdutoService } from '../produto.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'quer-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
  animations: [
      trigger('simpleFadeAnimation', [
          state('in', style({ opacity: 1 })),
          transition(':enter', [
              style({ opacity: 0 }),
              animate(700)
          ]),
          transition(':leave',
              animate(200, style({ opacity: 0 })))
      ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class ProdutosComponent implements OnInit {

  @ViewChild('search', { static: true }) queryElement: ElementRef;

  list: Produto[]
  temp = [];
  carregando: boolean = false;

  constructor(private produtoService: ProdutoService, private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.findByFilter(null);

    jQuery('[data-toggle="popover"]').popover({
      sanitize: false,
      sanitizeFn: function (content) {
        return null;
      }
    });
  }

  findByFilter(query: any) {

    if (this.queryElement != undefined) {
      query = this.queryElement.nativeElement.value
    }

    const params = new HttpParams()
      .set('query', query);

    this.carregando = true;
    this.produtoService.findByParams(params)
      .subscribe((produtos: Produto[]) => {
        this.list = produtos
        this.carregando = false;
      })

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(query) !== -1 || !query || d.gender.toLowerCase().indexOf(query) !== -1 || !query || d.company.toLowerCase().indexOf(query) !== -1 || !query;
    });
  }

  delete(produto: Produto, idx: number){
    this.produtoService.delete(produto.id).subscribe(res =>{
      this.list.splice(this.list.indexOf(produto), 1)
    })
  }

}
