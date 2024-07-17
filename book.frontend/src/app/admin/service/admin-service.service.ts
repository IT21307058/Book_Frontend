import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// https://localhost:7074/api/Book
const BASIC_URL = "https://localhost:7074/"

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http: HttpClient) { }

  getAllBooks():Observable<any>{
    return this.http.get(BASIC_URL + 'api/Book')
  }

  deleteBook(bookId: number): Observable<any> {
    return this.http.delete(BASIC_URL + 'api/Book/' + bookId);
  }
}
