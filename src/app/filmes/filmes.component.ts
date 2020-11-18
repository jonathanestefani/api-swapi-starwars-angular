import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NetService} from '../net.service';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.css']
})
export class FilmesComponent {

  public listFilmes = [];
  private busca = '';
  private filmes = [];
  constructor(private net:NetService, private route: Router, private activeRoute: ActivatedRoute) {
    this.busca = '';

    this.activeRoute.params.subscribe( params => {
      if (this.route.url.indexOf('/filmes') >= 0) {
        if (decodeURI(params['busca']) == 'undefined')
          this.busca = '';
        else this.busca = decodeURI(params['busca']);
      } else if (this.route.url.indexOf('/detalhesfilmes') >= 0) {
        if (params['id'] != 'undefined')
          this.filmes = String(params['id']).split(',');
      }

      this.getFilmes();
    });
   }

  getFilmes () {
    this.net.get('films').subscribe((data) => {
      if (this.filmes.length > 0)
        this.listFilmes = data.results.filter((elem) => {
          return this.filmes.indexOf(String(elem.episode_id)) >= 0;
        });
      else this.listFilmes = (this.busca !== '' && this.busca !== undefined ? data.results.filter((elem) => String(elem.title).toLowerCase().startsWith(this.busca.toLowerCase())) : data.results);

      for (let filme of this.listFilmes) {
        let planets = "";
        for (let film of filme.planets) {
          let id = film.replace('http://swapi.dev/api/planets/', '').match(/[0-9]+/ig);
          planets += (planets !== '' ? ',' : '') + (id != null ? id : '');
        }
        filme["planetas"] = planets;

        let pessoas = "";
        for (let person of filme.characters) {
          let id = person.replace('http://swapi.dev/api/people/', '').match(/[0-9]+/ig);
          pessoas += (pessoas !== '' ? ',' : '') + (id != null ? id : '');
        }
        filme["pessoas"] = pessoas;
      }

      console.log(this.listFilmes);
    });
  }

}
