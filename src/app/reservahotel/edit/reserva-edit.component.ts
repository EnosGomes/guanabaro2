import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservaService } from '../reserva.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from '../reserva';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuComponent } from "../../menu/menu.component";

@Component({
    selector: 'app-edit',
    standalone: true,
    templateUrl: './reserva-edit.component.html',
    styleUrl: './reserva-edit.component.css',
    imports: [CommonModule, ReactiveFormsModule, MenuComponent]
})
export class ReservaEditComponent {

  id!: String;
  reservaHotel!: Reserva;
  form!: FormGroup;
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public reservaHotelService: ReservaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['codUser'];
    this.reservaHotelService.find(Number(this.id)).subscribe((data: Reserva)=>{
      this.reservaHotel = data;
    }); 
      
    this.form = new FormGroup({
      nomeUser: new FormControl('', [Validators.required]),
      emailUser: new FormControl('', Validators.required),
      senhaUser: new FormControl('', Validators.required),
      cpfUser: new FormControl('', Validators.required)
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
    this.reservaHotelService.update(Number(this.id), this.form.value).subscribe((res:any) => {
         console.log('ReservaHotel updated successfully!');
         this.router.navigateByUrl('reservaHotel/index');
    })
  }

}
