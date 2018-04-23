import { Injectable } from '@angular/core';
import { CLIENTS } from '../components/clients/clients.json';
import { Client } from '../models/client';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { map } from 'rxjs/operators';

@Injectable()
export class ClientService {

  getClientsUrl = 'http://localhost:8080/api/clients?order=desc';
  getClientUrl = 'http://localhost:8080/api/clients/';
  createClientUrl = 'http://localhost:8080/api/clients';
  updateClientUrl = 'http://localhost:8080/api/clients/';
  deleteClientUrl = 'http://localhost:8080/api/clients/';

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private httpClient: HttpClient) { }

  getClients(): Observable<Client[]> {
    // return of(CLIENTS);
    return this.httpClient.get<Client[]>(this.getClientsUrl);
    // Other option would be to do the cast manually
    // return this.httpClient.get(this.getClientsUrl).pipe(
    // map( response => response as Client[])
    // );
  }

  getClient(id: number): Observable<Client> {
    return this.httpClient.get<Client>(this.getClientUrl + id);
  }

  create(client: Client): Observable<Client> {
    return this.httpClient.post<Client>(this.createClientUrl, client, { headers: this.headers });
  }

  update(client: Client): Observable<Client> {
    return this.httpClient.put<Client>(
      this.updateClientUrl + client.id,
      client,
      { headers: this.headers });
  }

  delete(id: number): Observable<Client> {
    return this.httpClient.delete<Client>(
      this.deleteClientUrl + id,
      { headers: this.headers }
    );
  }
}
