import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanigatorService {

  length: number = 0;
  limitPage: number = 5;
  numberPage: number = 0;
  columnList = ['serverName', 'password', 'username', 'ip', 'status'];
  displayedColumns: string[] =  ['idServer', ...this.columnList, 'operation'];
  constructor() { }
  
}
