import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MenuComponent } from "../../menu/menu.component";



@Component({
    selector: 'app-index',
    standalone: true,
    templateUrl: './index.component.html',
    styleUrl: './index.component.css',
    imports: [CommonModule, RouterModule, MatIconModule, MatDividerModule, MatButtonModule, MenuComponent]
})
export class IndexComponent {

  usuarios: Usuario[] = [];
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public usuarioService: UsuarioService) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.usuarioService.getAll().subscribe((data: Usuario[])=>{
      this.usuarios = data;
      console.log(this.usuarios);
    })  
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  deleteUsuario(id:number){
    this.usuarioService.delete(id).subscribe(res => {
         this.usuarios = this.usuarios.filter(item => item.codUser !== id);
         console.log('Usuario deleted successfully!');
    })
  }

}
