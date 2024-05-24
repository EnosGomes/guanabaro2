import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ReservaService } from '../reserva.service';

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reserva-create.component.html',
  styleUrl: './reserva-create.component.css'
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
    this.reservaHotelService.create(this.form.value).subscribe((res:any) => {
         console.log('ReservaHotel created successfully!');
         this.router.navigateByUrl('reservaHotel/index');
    })
  }

}
