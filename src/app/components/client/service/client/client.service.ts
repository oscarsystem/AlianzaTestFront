import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Client } from '../../model/Client';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  API_URL =  environment.url + '/api/client/';

  constructor(private http: HttpClient) { }

  getAllClients(){
    let url = this.API_URL + 'list';
    return this.http.get<any>(url)
    .pipe(catchError(error => error));
  }

  addClient(client: Client){
    let url = this.API_URL + 'add';
    return this.http.post<any>(url, client)
    .pipe(catchError(error => error));
  }
  
  findClientBySharedKey(sharedKey: string){
    let url = this.API_URL + 'findBySharedKey/'+sharedKey;
    return this.http.get<any>(url)
    .pipe(catchError(error => error));
  }

}
