import {Http, Response, Headers} from '@angular/http';
import {Component,Inject, Injectable} from '@angular/core';

@Injectable()
export class ApiService {
  public http : Http;
    public result : Response;
    constructor(thisHttp : Http){
        this.http = thisHttp;
        }
        
   getData(file) {
       // just use "stubby", the stubbed JSON file for now
       return this.http.get( '../../' + file);
   }
}
