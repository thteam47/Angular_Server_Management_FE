import { getServer } from './../interface/getServer';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { SiblingService } from 'src/app/services/sibling.service';
import { UserService } from 'src/app/services/user.service';
import { User } from './../interface/user';
import { changePas } from './../interface/pass';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Server } from '../interface/server';
import { detailsServer } from '../interface/detailsServer';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HTML5_FMT } from 'moment';
const host = window.location.hostname
const apiUrl = 'http://'+host+':9090';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  
  constructor(private httpClient: HttpClient,private cookieService: CookieService, private auth: UserService, private sibling: SiblingService, private router :Router) {
    
  }
  getAll(limit: number, num: number): Observable<getServer> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.httpClient.get<getServer>(`${apiUrl}/dashboard/${limit}/${num}`, httpOptions).pipe();
  }
  searchField(key: any, field: string, limit: number, num: number): Observable<getServer> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.httpClient.get<getServer>(`${apiUrl}/search/${field}/${key}/${limit}/${num}`, httpOptions).pipe()
  }
  createServer(server: Server){
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify(server);
    return this.httpClient.post(`${apiUrl}/addServer`, body, httpOptions).pipe();
  }
  editServer(detailsServer: detailsServer, id: string) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify(detailsServer);
    return this.httpClient.put(`${apiUrl}/detailsServer/${id}`, body, httpOptions).pipe();   
  }
  changePass(pass: changePas, id: string) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify(pass);
    return this.httpClient.put(`${apiUrl}/changePassword/${id}`, body, httpOptions).pipe();
  }
  deleteSer(id: string) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.httpClient.delete(`${apiUrl}/delete/${id}`, httpOptions).pipe()
  }
  disconnect(id: string) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };    
    return this.httpClient.get(`${apiUrl}/disconnect/${id}`, httpOptions).pipe()
  }
  connect(con: User) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify(con);
    return this.httpClient.post(`${apiUrl}/connect`, body, httpOptions);
  }
  checkServerName(serverName: string) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.httpClient.get(`${apiUrl}/queryname?serverName=${serverName}`, httpOptions).pipe()
  }
  export(check: boolean,limit: number, num: number) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.httpClient.get(`${apiUrl}/export?page=${check}&numberPage=${num}&limitPage=${limit}`, httpOptions).pipe()
  }

}
