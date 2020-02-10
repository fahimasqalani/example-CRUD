import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiurl = "http://139.59.226.52:9876/interview";
  constructor(private http: HttpClient) { }

  public getUsers(){
    return this.http.get(this.apiurl);
  }
}
