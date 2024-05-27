import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReservaService } from '../reserva.service';
import { Reserva } from '../reserva';
import { MenuComponent } from "../../menu/menu.component";

@Component({
    selector: 'app-index',
    standalone: true,
    templateUrl: './reserva-index.component.html',
    styleUrl: './reserva-index.component.css',
    imports: [CommonModule, RouterModule, MenuComponent]
})
export class ReservaIndexComponent {

  reservas: Reserva[] = [];

  //usuarioLogado:string = localStorage.getItem('usuario');
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public reservaService: ReservaService) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {

    if(localStorage.getItem('usuario') === 'admin'){
      this.reservaService.findReservasByNome(localStorage.getItem('usuario')!).subscribe((data: Reserva[])=>{
        this.reservas = data;
      })
    }
    this.reservaService.getAll().subscribe((data: Reserva[])=>{
      this.reservas = data;
    })  
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  deleteReserva(id:number){
    this.reservaService.delete(id).subscribe(res => {
         this.reservas = this.reservas.filter(item => item.codEmpresa !== id);
    })
  }

}
