import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmesComponent } from './filmes/filmes.component';
import {PersonagensComponent} from './personagens/personagens.component';
import {PlanetasComponent} from './planetas/planetas.component';

const routes: Routes = [
  { path: 'filmes', component: FilmesComponent },
  { path: 'filmes/:busca', component: FilmesComponent },
  { path: 'detalhesfilmes/:id', component: FilmesComponent },
  { path: 'planetas', component: PlanetasComponent },
  { path: 'planetas/:busca', component: PlanetasComponent },
  { path: 'detalhesplanetas/:id', component: PlanetasComponent },
  { path: 'personagens', component: PersonagensComponent },
  { path: 'personagens/:busca', component: PersonagensComponent },
  { path: 'detalhespersonagens/:id', component: PersonagensComponent },
  { path: '**', redirectTo: '/filmes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
