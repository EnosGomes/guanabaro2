import { Component } from '@angular/core';

import { ReservaService } from '../reserva.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from '../reserva';
import { MenuComponent } from "../../menu/menu.component";
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-view',
    standalone: true,
    templateUrl: './reserva.component.html',
    styleUrl: './reserva.component.css',
    imports: [MenuComponent, FormsModule, CommonModule]
})
export class ReservaComponent {

  form! : FormGroup;

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
    private router: Router,
    private formBuilder: FormBuilder
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

    this.form = this.formBuilder.group({
      date:["2018-08-03T00:00:00+00:00"]
    });

}

}