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

  getAllBooks(pageNumber: number, pageSize: number):Observable<any>{
    return this.http.get(`https://localhost:7074/api/Book?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }

  deleteBook(bookId: number): Observable<any> {
    return this.http.delete(BASIC_URL + 'api/Book/' + bookId);
  }

  addBook(bookDto: any):Observable<any>{
    return this.http.post(BASIC_URL + 'api/Book', bookDto);
  }

  getOneBook(bookId: number): Observable<any> {
    return this.http.get(BASIC_URL + 'api/Book/' + bookId);
  }

  updateBook(bookId: number, updates: any): Observable<any> {
    return this.http.patch(BASIC_URL + 'api/Book/' + bookId, updates);
  }
}
