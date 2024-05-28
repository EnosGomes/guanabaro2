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
  stringVindaDoModal!: string;
  name!: string;
  isValido: boolean = true;
  usuarioLocalStorage: any
  isChecked: any
  usuarioOnInit!: string | null
  
  routerData: any;

  constructor(private router: Router, public dialog: MatDialog, public usuarioService: UsuarioService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {   
    this.usuarioOnInit = localStorage.getItem('usuariolembrado')
    console.log("---------");
    console.log("Usuario on init: "+this.usuarioOnInit);
    console.log("checkbox marcado on init: "+this.form.value['lembrar']);
    console.log("--------");
   }

   salvarUsuarioPeloLembrarCheckBox(){
    console.log("checkbox marcado no submit: "+this.form.value['lembrar']);
    console.log("Usuario lembrado storage antes de salvar: "+localStorage.getItem('usuariolembrado'));
    console.log("-----------");

    if(this.form.value['lembrar'] && localStorage.getItem('usuariolembrado') != localStorage.getItem('usuario')){
      console.log("Dentro o if");
      console.log("checkbox marcado no submit: "+this.form.value['lembrar']);
    console.log("Usuario lembrado storage antes de salvar: "+localStorage.getItem('usuariolembrado'));
    console.log("----------------");
      
      localStorage.setItem('usuariolembrado', this.form.value['username']);
    } else {
      localStorage.setItem('usuariolembrado', '');
    }

    
   }

  openDialog(): void {
    console.log("tentando abrir o dialog");
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.stringVindaDoModal = result;
    });
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(localStorage.getItem('usuariolembrado'), [Validators.required]),
    password: new FormControl('', [Validators.required]),
    lembrar: new FormControl('', ),
  });

  get f(){
    return this.form.controls;
  }

  submit() {
    //this.openDialog()
    console.log("usuario onInit antes de enviar:" + this.usuarioOnInit);
    this.salvarUsuarioPeloLembrarCheckBox()
    this.getUsuarioAndSenha();    
  }
    getUsuarioAndSenha() {
     this.usuarioService.findByNameAndPassword(
      this.form.value['username'], this.form.value['password'])
          .subscribe((data: Usuario)=> {
              this.usuarioEncontrado = data;

              this.validaCampos(this.usuarioEncontrado)

              //metodo deveria mandar o usuario encontrado
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
