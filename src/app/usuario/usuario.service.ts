import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
     
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
  
import { Usuario } from './usuario';
import { SharedService } from '../shared.service';
  
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  private apiURL = "http://localhost:8080";
    
  /*------------------------------------------
  --------------------------------------------
  Http Header Options
  --------------------------------------------
  --------------------------------------------*/
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
   
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(private httpClient: HttpClient,
    private sharedService: SharedService
  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  getAll(): Observable<any> {
  
    return this.httpClient.get(this.sharedService.getGlobalVar() + '/usuarios')
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  create(usuario:Usuario): Observable<any> {
  
    return this.httpClient.post(this.sharedService.getGlobalVar() + '/usuarios', JSON.stringify(usuario), this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }  
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  find(id:number): Observable<any> {
  
    return this.httpClient.get(this.sharedService.getGlobalVar() + '/usuarios/' + id)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }

  findByNameAndPassword(usuarioForm:string, senhaForm: string): Observable<any> {
  
    return this.httpClient.post(this.sharedService.getGlobalVar() + '/usuarios/login', 
    JSON.stringify({
      nomeUser: usuarioForm,
      senhaUser: senhaForm
    }), this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  update(id:number, usuario:Usuario): Observable<any> {
  
    return this.httpClient.put(this.sharedService.getGlobalVar() + '/usuarios/' + id, JSON.stringify(usuario), this.httpOptions)
 
    .pipe( 
      catchError(this.errorHandler)
    )
  }
       
  /**
   * Write code on Method
   *
   * @return response()
   */
  delete(id:number){
    return this.httpClient.delete(this.sharedService.getGlobalVar() + '/usuarios/' + id, this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
      
  /** 
   * Write code on Method
   *
   * @return response()
   */
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}