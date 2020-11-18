import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NetService {

  private URI: string = "http://swapi.dev/api/";
  constructor(private http: HttpClient) {}

  get(recurso:string):any {
    return this.http.get(this.URI + recurso);
  }

}
