import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sv-questionario',
  templateUrl: './questionario.component.html',
  styleUrls: ['./questionario.component.scss']
})
export class QuestionarioComponent implements OnInit {

  config: any;
  collection = { count: 60, data: [] };

  constructor() {

    //Create dummy data
    for (var i = 0; i < this.collection.count; i++) {
      this.collection.data.push(
        {
          codSingular: i + 100,
          nome: "UNIMED CURITIBA " + (i + 1),
          categoria: "0032 - Atualização de perfil" + (i + 1),
          situacao: "Ativo/Aprovado	" + (i + 1),
          criadoEm: "12/08/2019 17:45:52",
          alteradoEm: "20/09/2019 17:32:12"
        }
      );
    }
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };

  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  ngOnInit() {
  }

}
