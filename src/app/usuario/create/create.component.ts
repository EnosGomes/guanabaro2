import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  form!: FormGroup;
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public usuarioService: UsuarioService,
    private router: Router
  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
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
    console.log(this.form.value);
    this.usuarioService.create(this.form.value).subscribe((res:any) => {
         console.log('Usuario created successfully!');
         this.router.navigateByUrl('usuario/index');
    })
  }

}
