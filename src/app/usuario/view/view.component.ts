import { Component } from '@angular/core';

import { UsuarioService } from '../usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {

  id!: String;
  usuario!: Usuario;
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
   ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['codUser'];
    //console.log("codeUser"+this.id)
        
    this.usuarioService.find(Number(this.id)).subscribe((data: Usuario)=>{
      console.log(data)
      this.usuario = data;
    });
  }

}
