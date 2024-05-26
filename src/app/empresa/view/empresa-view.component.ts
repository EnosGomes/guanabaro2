import { Component } from '@angular/core';

import { EmpresaService } from '../empresa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Empresa } from '../empresa';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [],
  templateUrl: './empresa-view.component.html',
  styleUrl: './empresa-view.component.css'
})
export class EmpresaViewComponent {

  id!: String;
  empresa!: Empresa;
    
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
  }

}
