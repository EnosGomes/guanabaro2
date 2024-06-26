import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
  
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private globalLanguage!: string;
  private usuario!: string;
  private senha!: string;

    setGlobalVar(currentLanguage:string) {
      this.globalLanguage = currentLanguage;
    }

    getGlobalVar():string{

        return "https://guanabaroback.onrender.com";
        //return "http://localhost:8080";
    }

    setUsuarioESenha(usuario: string, senha: string): void{
      this.usuario = usuario 
      this.senha = senha
    }
    
    getUsuarioESenha(): string[]{
      return [this.usuario, this.senha]
    }
}