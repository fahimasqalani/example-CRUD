import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Candidate } from './candidate';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiurl = "http://139.59.226.52:9876/interview/";

  constructor(private http: HttpClient) { }

  // public getUsers() {
  //   return this.http.get(this.apiurl);
  // }

  /*========================================
     CRUD Methods for consuming RESTful API
   =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // HttpClient API get() method => Fetch candidates list
  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(this.apiurl)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API get() method => Fetch employee
  getCandidate(id): Observable<Candidate> {
    return this.http.get<Candidate>(this.apiurl + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API post() method => Create employee
  createCandidate(candidate): Observable<Candidate> {
    return this.http.post<Candidate>(this.apiurl, JSON.stringify(candidate), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Search candidates
  // searchCandidate(id): Observable<Candidate> {
  //   return this.http.get<Candidate>(this.apiurl + id, this.httpOptions)
  // }

  // HttpClient API put() method => Update candidate
  updateCandidate(id, candidate): Observable<Candidate> {
    return this.http.put<Candidate>(this.apiurl, JSON.stringify(candidate), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API delete() method => Delete candidate
  deleteCandidate(id) {
    return this.http.delete<Candidate>(this.apiurl + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  swalNotification(icon, title, text, cancel) {
    return Swal.fire({
      icon: "warning",
      title: 'Success!',
      text: text,
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonColor: '#5867dd',
      confirmButtonText: 'OK'
    })
}

  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    } Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: errorMessage,
    })
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
