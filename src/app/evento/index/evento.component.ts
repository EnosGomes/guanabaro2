import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventoService } from '../evento.service';
import { Evento } from '../evento';

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css'
})
export class EventoComponent {

  eventos: Evento[] = [];
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public eventoService: EventoService) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.eventoService.getAll().subscribe((data: Evento[])=>{
      this.eventos = data;
      console.log(this.eventos);
    })  
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  deleteEvento(id:number){
    this.eventoService.delete(id).subscribe(res => {
         this.eventos = this.eventos.filter(item => item.codEvento !== id);
         console.log('Evento deleted successfully!');
    })
  }

}
