import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaService } from '../empresa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from '../empresa';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MenuComponent } from "../../menu/menu.component";

export const cnpj: RegExp = /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/;

@Component({
    selector: 'empresa-edit',
    standalone: true,
    templateUrl: './empresa-edit.component.html',
    styleUrl: './empresa-edit.component.css',
    providers: [provideNgxMask()],
    imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe, MenuComponent]
})
export class EmpresaEditComponent {

  id!: String;
  empresa!: Empresa;
  form!: FormGroup;

  tiposEmpresas: string[] = [
    "TURISMO","HOTEL","RESTAURANTE","OUTROS"
  ];
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public empresaService: EmpresaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['codEmpresa'];
    this.empresaService.find(Number(this.id)).subscribe((data: Empresa)=>{
      this.empresa = data;
    }); 
      
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
    this.empresaService.update(Number(this.id), this.form.value).subscribe((res:any) => {
         this.router.navigateByUrl('empresa/index');
    })
  }

}
