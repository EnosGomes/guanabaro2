import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
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
