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
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
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
    this.eventoService.update(Number(this.id), this.form.value).subscribe((res:any) => {
         console.log('Evento updated successfully!');
         this.router.navigateByUrl('evento/index');
    })
  }

}
