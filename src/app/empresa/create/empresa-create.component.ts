import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaService } from '../empresa.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuComponent } from "../../menu/menu.component";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

export const cnpj: RegExp = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;

@Component({
    selector: 'app-create',
    standalone: true,
    templateUrl: './empresa-create.component.html',
    styleUrl: './empresa-create.component.css',
    imports: [CommonModule, ReactiveFormsModule, MenuComponent, NgxMaskDirective, NgxMaskPipe],
    providers: [ provideNgxMask()]
    
})



export class EmpresaCreateComponent {

  tiposEmpresas: string[] = [
    "TURISMO","HOTEL","RESTAURANTE","OUTROS"
  ];

  form!: FormGroup;
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public empresaService: EmpresaService,
    private router: Router
  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      nomeEmpresa: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      emailEmpresa: new FormControl('', [Validators.required, Validators.email]),
      cnpj: new FormControl('', [Validators.required, Validators.minLength(14), Validators.maxLength(14), Validators.pattern(cnpj)]),
      tipoEmpresa: new FormControl('', [Validators.required])
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
    this.empresaService.create(this.form.value).subscribe((res:any) => {
         this.router.navigateByUrl('empresa/index');
    })
  }

}
