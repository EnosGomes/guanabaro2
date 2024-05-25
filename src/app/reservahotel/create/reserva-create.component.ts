import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ReservaService } from '../reserva.service';
import { MenuComponent } from "../../menu/menu.component";

@Component({
    selector: 'app-reserva',
    standalone: true,
    templateUrl: './reserva-create.component.html',
    styleUrl: './reserva-create.component.css',
    imports: [CommonModule, ReactiveFormsModule, MenuComponent]
})
export class ReservaCreateComponent {

  form!: FormGroup;
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public reservaHotelService: ReservaService,
    private router: Router
  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      dataReserva: new FormControl('', Validators.required),
      codUsuario: new FormControl('', Validators.required),
      codEmpresa: new FormControl('', Validators.required),
      tipoQuarto: new FormControl('', Validators.required)
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
    this.reservaHotelService.create(this.form.value).subscribe((res:any) => {
         console.log('ReservaHotel created successfully!');
         this.router.navigateByUrl('reserva/index');
    })
  }

}
