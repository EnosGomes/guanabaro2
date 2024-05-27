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
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  create(reservaHotel: any): Observable<any> {

    console.log(reservaHotel['dataReserva']);
    console.log(reservaHotel['tipoEmpresa']['codEmpresa']);
    console.log(reservaHotel['tipoQuarto']);

    console.log("localStorage usuario: "+localStorage.getItem('usuario'));

    // this.reservaRequest.nomeUsuarioReserva = localStorage.getItem('usuario')!;
    // this.reservaRequest.codEmpresa = reservaHotel.tipoEmpresa.codEmpresa;

  
    return this.httpClient.post(this.sharedService.getGlobalVar() + '/reservas', JSON.stringify({
      dataReserva: reservaHotel['dataReserva'],
      codEmpresa: reservaHotel['tipoEmpresa']['codEmpresa'],
      tipoQuarto: reservaHotel['tipoQuarto'],
      nomeUsuarioReserva: localStorage.getItem('usuario')
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
  find(id:number): Observable<any> {
  
    return this.httpClient.get(this.sharedService.getGlobalVar() + '/reservas/' + id)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  update(id:number, reservaHotel:Reserva): Observable<any> {
  
    return this.httpClient.put(this.sharedService.getGlobalVar() + '/reservas/' + id, JSON.stringify(reservaHotel), this.httpOptions)
 
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
    return this.httpClient.delete(this.sharedService.getGlobalVar() + '/reservaHotels/' + id, this.httpOptions)
  
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