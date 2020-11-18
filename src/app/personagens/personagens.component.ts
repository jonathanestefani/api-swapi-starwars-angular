import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NetService} from '../net.service';

@Component({
  selector: 'app-personagens',
  templateUrl: './personagens.component.html',
  styleUrls: ['./personagens.component.css']
})
export class PersonagensComponent {
  public listPersonagens = [];
  private busca = '';
  private filmes = [];
  constructor(private net:NetService, private route: Router, private activeRoute: ActivatedRoute) {
    this.busca = '';
    this.activeRoute.params.subscribe( params => {
      if (this.route.url.indexOf('/planetas') >= 0) {
          if (decodeURI(params['busca']) == 'undefined')
            this.busca = '';
          else this.busca = decodeURI(params['busca']);
      } else if (this.route.url.indexOf('/detalhesplanetas') >= 0) {
        if (params['id'] != 'undefined')
          this.filmes = String(params['id']).split(',');
      }

      this.getPersonagens();
    });
   }

  getPersonagens () {
    this.net.get('people').subscribe((data) => {
      this.listPersonagens = (this.busca !== '' && this.busca !== undefined ? data.results.filter((elem) => String(elem.name).toLowerCase().startsWith(this.busca.toLowerCase())) : data.results);
      for (let persons of this.listPersonagens) {
        let filmes = "";
        for (let film of persons.films) {
          //console.log(film.replace('http://swapi.dev/api/films/', '').match(/[0-9]+/ig));
          let id = film.replace('http://swapi.dev/api/films/', '').match(/[0-9]+/ig);
          filmes += (filmes !== '' ? ',' : '') + (id != null ? id : '');
        }
        persons["filmes"] = filmes;
      }

      console.log(this.listPersonagens);
    });
  }
}
