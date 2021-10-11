import { changeRole } from './../interface/changeRole';
import { ifUser } from './../interface/ifUser';
import { SiblingService } from 'src/app/services/sibling.service';
import { catchError, tap } from 'rxjs/operators';
import { User } from './../interface/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { changePas } from '../interface/pass';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'Application/json' }),
}

const host = window.location.hostname
const apiUrl = 'http://'+host+':9090';
@Injectable({
  providedIn: 'root'
})

export class UserService {  
  accessToken:string = "";
  constructor(private httpClient: HttpClient,private sibling: SiblingService) { }
  loginAdmin(user: User) {
    let body = JSON.stringify(user);
    return this.httpClient.post(`${apiUrl}/admin`, body, httpOptions).pipe();
  }
  logoutUser(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.httpClient.get(`${apiUrl}/logout`, httpOptions).pipe();
  }
  getUser(){
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.httpClient.get(`${apiUrl}/getUser`, httpOptions).pipe();
  }
  changePassUser(pass:changePas, id: string){
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify(pass);
    return this.httpClient.put(`${apiUrl}/changePasswordUser/${id}`,body, httpOptions).pipe();
  }
  updateUser(info:ifUser, id: string){
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify(info);
    return this.httpClient.put(`${apiUrl}/updateUser/${id}`,body, httpOptions).pipe();
  }
  getAllUser(){
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.httpClient.get(`${apiUrl}/getlistUser`, httpOptions).pipe();
  }
  deleteUser(id:string){
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.httpClient.delete(`${apiUrl}/deleteUser/${id}`, httpOptions).pipe();
  }
  addUser(data: User){
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify(data);
    return this.httpClient.post(`${apiUrl}/addUser`,body, httpOptions).pipe();
  }
  changeRole(data: changeRole,idUser: string){
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let body = JSON.stringify(data);
    return this.httpClient.put(`${apiUrl}/changeAction/${idUser}`,body, httpOptions).pipe();
  }
}
