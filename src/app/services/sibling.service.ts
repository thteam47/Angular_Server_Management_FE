import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiblingService {

  private role = new BehaviorSubject<string>("");
  private token = new BehaviorSubject<string>("token");
  currentRole = this.role.asObservable();
  currentToken = this.token.asObservable();
  sendMessage = new Subject<string>();
  constructor() { }
  communicateMessage(msg:any) {
    this.sendMessage.next(msg);
  }
  changeRole(role:string) {
    this.role.next(role)
  }
  changeTOken(token:string) {
    this.token.next(token)
  }
  
  
}
