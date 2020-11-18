import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NetService} from '../net.service';

@Component({
  selector: 'app-planetas',
  templateUrl: './planetas.component.html',
  styleUrls: ['./planetas.component.css']
})
export class PlanetasComponent {

  public listPlanetas = [];
  private busca = '';
  private planetas = [];
  constructor(private net:NetService, private route: Router, private activeRoute: ActivatedRoute) {
    this.busca = '';
    this.activeRoute.params.subscribe( params => {
      if (this.route.url.indexOf('/planetas') >= 0) {
        if (decodeURI(params['busca']) == 'undefined')
          this.busca = '';
        else this.busca = decodeURI(params['busca']);
      } else if (this.route.url.indexOf('/detalhesplanetas') >= 0) {
        
        if (params['id'] != 'undefined')
          this.planetas = String(params['id']).split(',');
      }

      console.log(this.busca, params['busca'], params['id']);

      this.getPlanetas();
    });
   }

  getPlanetas () {
    this.net.get('planets').subscribe((data) => {
      console.log(this.planetas.length);
      if (this.planetas.length > 0)
      this.listPlanetas = data.results.filter((elem, indx) => {
        return this.planetas.indexOf(String(indx + 1)) >= 0;
      });
      else this.listPlanetas = (this.busca !== '' && this.busca !== undefined ? data.results.filter((elem) => String(elem.name).toLowerCase().startsWith(this.busca.toLowerCase())) : data.results);

      for (let planetas of this.listPlanetas) {
        let filmes = "";
        for (let film of planetas.films) {
          let id = film.replace('http://swapi.dev/api/films/', '').match(/[0-9]+/ig);
          filmes += (filmes !== '' ? ',' : '') + (id != null ? id : '');
        }
        planetas["filmes"] = filmes;

        let pessoas = "";
        for (let person of planetas.residents) {
          let id = person.replace('http://swapi.dev/api/people/', '').match(/[0-9]+/ig);
          pessoas += (pessoas !== '' ? ',' : '') + (id != null ? id : '');
        }
        planetas["pessoas"] = pessoas;
      }
    });
  }

}
