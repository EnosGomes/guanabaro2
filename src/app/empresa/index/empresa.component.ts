import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmpresaService } from '../empresa.service';
import { Empresa } from '../empresa';
import { MenuComponent } from "../../menu/menu.component";

@Component({
    selector: 'app-empresa',
    standalone: true,
    templateUrl: './empresa.component.html',
    styleUrl: './empresa.component.css',
    imports: [CommonModule, RouterModule, MenuComponent]
})
export class EmpresaComponent {

  empresas: Empresa[] = [];
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public empresaService: EmpresaService) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {

    this.empresaService.getAll().subscribe((data: Empresa[])=>{
      this.empresas = data;
    })  
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  deleteEmpresa(id:number){
    this.empresaService.delete(id).subscribe(res => {
         this.empresas = this.empresas.filter(item => item.codEmpresa !== id);
    })
  }

}
