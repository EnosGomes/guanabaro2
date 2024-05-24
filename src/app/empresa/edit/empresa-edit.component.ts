import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaService } from '../empresa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from '../empresa';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'empresa-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empresa-edit.component.html',
  styleUrl: './empresa-edit.component.css'
})
export class EmpresaEditComponent {

  id!: String;
  empresa!: Empresa;
  form!: FormGroup;
    
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
      console.log(data);
      this.empresa = data;
    }); 
      
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
    console.log(this.form.value);
    this.empresaService.update(Number(this.id), this.form.value).subscribe((res:any) => {
         console.log('Empresa updated successfully!');
         this.router.navigateByUrl('empresa/index');
    })
  }

}
