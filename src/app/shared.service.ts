import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
  
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private globalLanguage!: string;

    setGlobalVar(currentLanguage:string) {
      this.globalLanguage = currentLanguage;
    }

    getGlobalVar():string{

        return "https://guanabaroback.onrender.com";
        //return "http://localhost:8080";
    }
    
}