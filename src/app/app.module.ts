import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { FilmesComponent } from './filmes/filmes.component';
import { PlanetasComponent } from './planetas/planetas.component';
import { PersonagensComponent } from './personagens/personagens.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmesComponent,
    PlanetasComponent,
    PersonagensComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
