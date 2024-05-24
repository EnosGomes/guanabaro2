import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventoService } from '../evento.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class EventoCreateComponent {

  form!: FormGroup;
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public eventoService: EventoService,
    private router: Router
  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      nomeEvento: new FormControl('', [Validators.required]),
      emailEvento: new FormControl('', Validators.required),
      senhaEvento: new FormControl('', Validators.required),
      cpfEvento: new FormControl('', Validators.required)
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
    this.eventoService.create(this.form.value).subscribe((res:any) => {
         console.log('Evento created successfully!');
         this.router.navigateByUrl('evento/index');
    })
  }

}
