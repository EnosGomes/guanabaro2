import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MenuComponent } from "../menu/menu.component";
import {
  
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialog,
  
} from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '../usuario/usuario';
import { async } from 'rxjs';
import { SharedService } from '../shared.service';

@Component({
    selector: 'login-form',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [FormsModule, MatCardModule, MatInputModule, MatButtonModule, CommonModule, ReactiveFormsModule, MenuComponent, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, ModalComponent]
})
export class LoginFormComponent {

  usuarioEncontrado!: Usuario

  @Input()
  error!: string;
  animal!: string;
  name!: string;
  isValido: boolean = true;
  
  routerData: any;

  constructor(private router: Router, public dialog: MatDialog, public usuarioService: UsuarioService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f(){
    return this.form.controls;
  }

  submit() {
    this.getUsuarioAndSenha();    
  }
    getUsuarioAndSenha() {
     this.usuarioService.findByNameAndPassword(
      this.form.value['username'], this.form.value['password'])
          .subscribe((data: Usuario)=> {
              this.usuarioEncontrado = data;

              this.validaCampos(this.usuarioEncontrado)
              this.sharedService.setUsuarioESenha(this.form.value['username'], this.form.value['password'])
          });       
    }

    validaCampos(usuarioEncontrado?: Usuario){
      if(this.usuarioEncontrado == null){
        this.error = "Usuário ou senha inválidos";
        return ;
      }

      if (this.form.value['username'] == this.usuarioEncontrado.nomeUser, this.form.value['password'] == this.usuarioEncontrado.senhaUser) {
        
        localStorage.setItem("usuario", this.usuarioEncontrado.nomeUser);
        this.router.navigateByUrl('usuario/index', { state: {
          dados: this.usuarioEncontrado
        }});
      }
    }

    criarUsuario() {
      this.router.navigateByUrl('usuario/create');
    } 
}
