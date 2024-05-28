import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
     
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
  
import { Reserva } from './reserva';
import { SharedService } from '../shared.service';
  
@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  reservaRequest!: Reserva;
  
  //private apiURL = "http://localhost:8080";
    
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
  constructor(private httpClient: HttpClient, private sharedService: SharedService) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  getAll(): Observable<any> {
  
    return this.httpClient.get(this.sharedService.getGlobalVar() + '/reservas')
  
    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(reservaHotel: any): Observable<any> {  


    return this.httpClient.post(this.sharedService.getGlobalVar() + '/reservas', JSON.stringify({
      dataReserva: reservaHotel['dataReserva'],
      codEmpresa: reservaHotel['tipoEmpresa']['codEmpresa'],
      nomeEmpresaReserva: reservaHotel['tipoEmpresa']['nomeEmpresa'],
      tipoQuarto: reservaHotel['tipoQuarto'],
      urlRedirecionamento: reservaHotel['urlRedirecionamento'],
      nomeUsuarioReserva: localStorage.getItem('usuario')
    }), this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  find(id:number): Observable<any> {
  
    return this.httpClient.get(this.sharedService.getGlobalVar() + '/reservas/' + id)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id:number, reservaHotel:any): Observable<any> {
  
    return this.httpClient.put(this.sharedService.getGlobalVar() + '/reservas/' + id, JSON.stringify({
      dataReserva: reservaHotel['dataReserva1'],
      codEmpresa: reservaHotel['tipoEmpresa1']['codEmpresa1'],
      nomeEmpresaReserva: reservaHotel['tipoEmpresa1']['nomeEmpresa1'],
      tipoQuarto: reservaHotel['tipoQuarto1'],
      urlRedirecionamento: reservaHotel['urlRedirecionamento']
    }), this.httpOptions)
 
    .pipe( 
      catchError(this.errorHandler)
    )
  }

  delete(id:number){
    return this.httpClient.delete(this.sharedService.getGlobalVar() + '/reservas/' + id, this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }

  findReservasByNome(nomeUsuario:string): Observable<any> {
  
    return this.httpClient.post(this.sharedService.getGlobalVar() + '/reservas/nome', 
    JSON.stringify({
      nomeUser: nomeUsuario
    }), this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
  
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