import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventoService } from '../evento.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuComponent } from "../../menu/menu.component";

@Component({
    selector: 'app-create',
    standalone: true,
    templateUrl: './evento-create.component.html',
    styleUrl: './evento-create.component.css',
    imports: [CommonModule, ReactiveFormsModule, MenuComponent]
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
      categoriaEvento: new FormControl('', Validators.required),
      dataEvento: new FormControl('', Validators.required),
      horaEvento: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      localidade: new FormControl('', Validators.required)
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
         this.router.navigateByUrl('eventos/index');
    })
  }

}
