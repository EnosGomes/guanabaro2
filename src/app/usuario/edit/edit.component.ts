import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioService } from '../usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../usuario';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuComponent } from "../../menu/menu.component";

@Component({
    selector: 'app-edit',
    standalone: true,
    templateUrl: './edit.component.html',
    styleUrl: './edit.component.css',
    imports: [CommonModule, ReactiveFormsModule, MenuComponent]
})
export class EditComponent {

  id!: String;
  usuario!: Usuario;
  form!: FormGroup;
    
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
    this.usuarioService.find(Number(this.id)).subscribe((data: Usuario)=>{
      this.usuario = data;
    }); 
      
    this.form = new FormGroup({
      nomeUser: new FormControl('', [Validators.required]),
      emailUser: new FormControl('', Validators.required),
      senhaUser: new FormControl('', Validators.required),
      cpfUser: new FormControl('', Validators.required)
    });
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    this.usuarioService.update(Number(this.id), this.form.value).subscribe((res:any) => {
         this.router.navigateByUrl('usuario/index');
    })
  }

}
