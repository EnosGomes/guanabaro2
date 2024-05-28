import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, NonNullableFormBuilder } from '@angular/forms';
import { MenuComponent } from "../../menu/menu.component";
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';

export const senhafraca: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
export const cpfQuantidade: RegExp =
/^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;
export const cpfDigitosVerificadores: RegExp = 
/^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}/;

@Component({
    selector: 'app-create',
    standalone: true,
    templateUrl: './create.component.html',
    styleUrl: './create.component.css',
    imports: [CommonModule, ReactiveFormsModule, MenuComponent, NgxMaskDirective, NgxMaskPipe],
    providers: [ provideNgxMask()]
})
export class CreateComponent {
[x: string]: any;

  form!: FormGroup;
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public usuarioService: UsuarioService,
    private router: Router,
    formBuilder: NonNullableFormBuilder
  ) {
   }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    // this.form = new FormGroup({
    //   nomeUser: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    //   emailUser: new FormControl('', [Validators.required, Validators.email]),
    //   senhaUser: new FormControl('', [Validators.required, Validators.pattern(senhafraca)]),
    //   cpfUser: new FormControl('', [Validators.required, Validators.pattern(cpfQuantidade)]),
    // });

    this.form = new FormGroup({
      nomeUser: new FormControl('', ),
      emailUser: new FormControl('', ),
      senhaUser: new FormControl('', ),
      cpfUser: new FormControl('',),
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
    this.usuarioService.create(this.form.value).subscribe((res:any) => {
         this.router.navigateByUrl('usuario/index');
    })
  }

   validaCPF(cpf: any) {
    var Soma = 0
    var Resto
  
    var strCPF = String(cpf).replace(/[^\d]/g, '')
    
    if (strCPF.length !== 11)
       return false
    
    if ([
      '00000000000',
      '11111111111',
      '22222222222',
      '33333333333',
      '44444444444',
      '55555555555',
      '66666666666',
      '77777777777',
      '88888888888',
      '99999999999',
      ].indexOf(strCPF) !== -1)
      return false
  
    for (let i=1; i<=9; i++)
      Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  
    Resto = (Soma * 10) % 11
  
    if ((Resto == 10) || (Resto == 11)) 
      Resto = 0
  
    if (Resto != parseInt(strCPF.substring(9, 10)) )
      return false
  
    Soma = 0
  
    for (let i = 1; i <= 10; i++)
      Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i)
  
    Resto = (Soma * 10) % 11
  
    if ((Resto == 10) || (Resto == 11)) 
      Resto = 0
  
    if (Resto != parseInt(strCPF.substring(10, 11) ) )
      return false
  
    return true
  }

}
