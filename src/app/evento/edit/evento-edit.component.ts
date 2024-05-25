import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventoService } from '../evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '../evento';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './evento-edit.component.html',
  styleUrl: './evento-edit.component.css'
})
export class EventoEditComponent {

  id!: String;
  evento!: Evento;
  form!: FormGroup;
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public eventoService: EventoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['codEvento'];
    this.eventoService.find(Number(this.id)).subscribe((data: Evento)=>{
      this.evento = data;
    }); 
      
    this.form = new FormGroup({
      nomeEvento: new FormControl('', [Validators.required]),
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
    this.eventoService.update(Number(this.id), this.form.value).subscribe((res:any) => {
         console.log('Evento updated successfully!');
         this.router.navigateByUrl('eventos/index');
    })
  }

  // voltar(){
  //   console.log("tentando voltar");
  //   setInterval(() => {
  //     this.router.navigateByUrl('eventos/index');
  //   }, 500)
  // }

}
