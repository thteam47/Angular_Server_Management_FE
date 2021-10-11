import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { detailStatus } from '../interface/detailStatus';
import { Observable } from 'rxjs';
import { SiblingService } from './sibling.service';

const host = window.location.hostname
const apiUrl = 'http://' + host + ':9090';

@Injectable({
  providedIn: 'root'
})
export class DetailStatusService {
  constructor(private httpClient: HttpClient, private sibling: SiblingService) {
  }
  getDetailStatus(id: any): Observable<detailStatus> {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    return this.httpClient.get<detailStatus>(`${apiUrl}/detailsServer/${id}`, httpOptions).pipe()
  }
  getDetail(id: any, timeIn: any, timeOut: any) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
    let dateStart: string = timeIn.toISOString().slice(0, 10);
    let dateEnd: string = timeOut.toISOString().slice(0, 10);
    let hourStart: string = timeIn.toLocaleTimeString('Vn-vi');
    let hourEnd: string = timeOut.toLocaleTimeString('Vn-vi');
    let start = dateStart + "T" + hourStart;
    let end = dateEnd + "T" + hourEnd;
    return this.httpClient.get(`${apiUrl}/detailsServer/${id}?timeIn=${start}&timeOut=${end}
    `, httpOptions).pipe()
  }

}
