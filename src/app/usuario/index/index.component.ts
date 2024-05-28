import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Route, Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MenuComponent } from "../../menu/menu.component";
import { SharedService } from '../../shared.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioPagamento } from '../usuarioPagamento';
import { BrowserModule } from '@angular/platform-browser';



@Component({
    selector: 'app-index',
    standalone: true,
    templateUrl: './index.component.html',
    styleUrl: './index.component.css',
    imports: [CommonModule, RouterModule, MatIconModule, MatDividerModule, MatButtonModule, MenuComponent, ReactiveFormsModule]
})
export class IndexComponent {

  usuarios: Usuario[] = [];

  usuarioObjeto!: Usuario;

  dadosUsuaraioRouter!: Usuario;

  //Usuario e senha logados
  usuario!: string;
  senha!: string;

  isAdmin: any

  urlPagamento: String = ''
  usuarioPagamento!: UsuarioPagamento;



@Input() dados! : any
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public usuarioService: UsuarioService, private sharedService: SharedService, private router: Router) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {

    

    this.isAdmin = localStorage.getItem('usuario')?.trim() === 'admin'.trim()
    this.isAdminLogado()
    this.usuario = this.sharedService.getUsuarioESenha()[0];
    this.senha = this.sharedService.getUsuarioESenha()[1];

    this.usuarioService.getAll().subscribe((data: Usuario[])=>{
      this.usuarios = data;
    }) 
  }

  deleteUsuario(id:number){
    this.usuarioService.delete(id).subscribe(res => {
         this.usuarios = this.usuarios.filter(item => item.codUser !== id);
    })
  }

  isAdminLogado(){
    if(this.isAdmin) {      
      return true
    } else {
      this.router.navigateByUrl('reserva/index');
      return false
    }
  }

  pagarConta(){
    this.usuarioService.pagar(localStorage.getItem('usuario')!).subscribe((data: UsuarioPagamento)=>{
      this.usuarioPagamento = data;
    })
  }

  pagarPorLink(){
  
      // No incognito window found, open a new one.
      //windows.create({url: "https://google.com", incognito: true});
      window.open(this.usuarioPagamento.urlPagamento.toLocaleLowerCase(), "mozillaTab");
  }


  

}
