import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaService } from '../empresa.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuComponent } from "../../menu/menu.component";

@Component({
    selector: 'app-create',
    standalone: true,
    templateUrl: './empresa-create.component.html',
    styleUrl: './empresa-create.component.css',
    imports: [CommonModule, ReactiveFormsModule, MenuComponent]
})
export class EmpresaCreateComponent {

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
      nomeEmpresa: new FormControl('', [Validators.required]),
      emailEmpresa: new FormControl('', Validators.required),
      cnpj: new FormControl('', Validators.required),
      tipoEmpresa: new FormControl('', Validators.required)
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
