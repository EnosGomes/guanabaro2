import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {  MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsuarioService } from '../../usuario/usuario.service';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

export const senhafraca: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
export const cpfQuantidade: RegExp =
/^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;
export const cpfDigitosVerificadores: RegExp = 
/^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/;


export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MatDialogActions, MatDialogClose, 
    MatDialogTitle, MatDialogContent, FormsModule,
     MatFormFieldModule, MatInputModule, MatButtonModule, 
     ReactiveFormsModule, CommonModule, NgxMaskDirective, NgxMaskPipe],
      providers: [ provideNgxMask()],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    public usuarioService: UsuarioService,
    formBuilder: NonNullableFormBuilder
  ) {}

  

  ngOnInit(): void {
    this.form = new FormGroup({
      nomeUser: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      emailUser: new FormControl('', [Validators.required, Validators.email]),
      senhaUser: new FormControl('', [Validators.required, Validators.pattern(senhafraca)]),
      cpfUser: new FormControl('', [Validators.required, Validators.pattern(cpfQuantidade)]),
    })   
  }
  //constructor(public dialogRef: MatDialogRef<ModalComponent>) {}

  

  
  



  onNoClick(): void {
    this.dialogRef.close();
  }

// cadastrarUsuarioTelaLogin(){

//   this.form1 = new FormGroup({
//     nomeUser1: new FormControl('', ),
//     emailUser1: new FormControl('', ),
//     senhaUser1: new FormControl('', ),
//     cpfUser1: new FormControl('', ),
//   });
// }

get f(){
  return this.form.controls;
}

submit(){
  this.usuarioService.create(this.form.value).subscribe((res:any) => {
    localStorage.clear();
    this.dialogRef.close();
})

}

}
