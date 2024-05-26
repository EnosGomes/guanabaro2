import { Component } from '@angular/core';

import { ReservaService } from '../reserva.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from '../reserva';
import { MenuComponent } from "../../menu/menu.component";

@Component({
    selector: 'app-view',
    standalone: true,
    templateUrl: './reserva.component.html',
    styleUrl: './reserva.component.css',
    imports: [MenuComponent]
})
export class ReservaComponent {

  id!: String;
  reserva!: Reserva;
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public reservaService: ReservaService,
    private route: ActivatedRoute,
    private router: Router
   ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['codReserva'];
        
    this.reservaService.find(Number(this.id)).subscribe((data: Reserva)=>{
      this.reserva = data;
    });
  }

}
