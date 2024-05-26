import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from "../menu/menu.component";
import { throwError } from 'rxjs';

@Component({
    selector: 'login-form',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [MatCardModule, MatInputModule, MatButtonModule, CommonModule, ReactiveFormsModule, MenuComponent]
})
export class LoginFormComponent {

  usuario: String = "sabrina"
  senha: String = "123"

  @Input()
  error!: string;


  constructor(private router: Router) {}

  ngOnInit(): void {
  
  }

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f(){
    return this.form.controls;
  }

  submit() {
    if (!this.validaUsuarioESenha(this.form.value['username'], this.form.value['password'])) {
      this.error = "Usuário ou Senha Inválido!";
     return;
    }

    this.router.navigateByUrl('usuario/index');
  }

  validaUsuarioESenha(usuarioForm: any, passwordForm: any): boolean{   
    return usuarioForm == this.usuario && passwordForm == this.senha;
    } 

}
