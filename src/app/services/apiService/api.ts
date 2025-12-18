import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  // Se establece la base url del API a consumir
  // apiURL = 'https://jsonplaceholder.typicode.com'; // Fuente Original funciona solo get
  private apiURL = 'https://jsonplaceholder.typicode.com' /* 'http://10.0.2.2:3000'; 'https://jsonplaceholder.typicode.com/comments' 'http://localhost:3000' */ // Ejecuta json-server -H ip .\dv.json para ejecutar un Fake APIRest

  private handleError(error: HttpErrorResponse) {
    console.error('Api error:', error);
    return throwError(() => error);
  }

  constructor(private http:HttpClient) {}

  //Función que permite mostrar datos particulares de un usuario de la API
  getUsuario(userId: any):Observable<any>{
    return this.http.get(this.apiURL+'/users/'+userId).pipe(
      retry(3), catchError(err => this.handleError(err))
    );
  }

  //Función que permite mostrar el total de registros de usuario de la API
  getUsuarios():Observable<any>{
    return this.http.get(this.apiURL+'/users/').pipe(
      retry(3), catchError(err => this.handleError(err))
    );
  }

  //Función que permite extraer el total de los datos de API
  getPosts():Observable<any>{
    return this.http.get(this.apiURL+'/posts/').pipe(
      retry(3), catchError(err => this.handleError(err))
    );
  }

  //Función que permite traer un registro identidicado en id
  getPost(id:any):Observable<any>{
    return this.http.get(this.apiURL+'/posts/'+id).pipe(
      retry(3), catchError(err => this.handleError(err))
    );
  }

  //Función que permite crear un nuevo registro en la Api
  createPost(post:any):Observable<any>{
    return this.http.post(this.apiURL+'/posts',post,this.httpOptions)
    .pipe(
      retry(3), catchError(err => this.handleError(err))
    );
  }

  //Función que permite actualizar un registro determinado por id
  updatePost(id:any,post:any):Observable<any>{
    return this.http.put(this.apiURL+'/posts/'+id,post,this.httpOptions).pipe(retry(3), catchError(err => this.handleError(err)));
  }

  //Función que permite eliminar un registro determinado por id de la Api
  deletePost(id: any):Observable<any>{
    return this.http.delete(this.apiURL+'/posts/'+id,this.httpOptions).pipe(
      catchError(err => this.handleError(err))
    );
  }
}
