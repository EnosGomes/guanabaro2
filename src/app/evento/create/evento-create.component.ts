import { Component } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';

import { EventoService } from '../evento.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { MenuComponent } from "../../menu/menu.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
    selector: 'app-create',
    standalone: true,
    templateUrl: './evento-create.component.html',
    styleUrl: './evento-create.component.css',
    imports: [CommonModule, ReactiveFormsModule, MenuComponent, MatFormFieldModule, MatDatepickerModule, JsonPipe, MatInputModule, FormsModule, NgxMaskDirective, NgxMaskPipe],
    providers: [
      provideNativeDateAdapter(), provideNgxMask()
    ],
})
export class EventoCreateComponent {

  categoriasEventos: string [] = ["SHOW","FESTA","CASAMENTO","OUTROS"]

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
    this.eventoService.create(this.form.value).subscribe((res:any) => {
         this.router.navigateByUrl('eventos/index');
    })
  }

}
