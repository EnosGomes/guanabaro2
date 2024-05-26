import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventoService } from '../evento.service';
import { Evento } from '../evento';
import { MenuComponent } from "../../menu/menu.component";

@Component({
    selector: 'app-evento',
    standalone: true,
    templateUrl: './evento-index.component.html',
    styleUrl: './evento-index.component.css',
    imports: [CommonModule, RouterModule, MenuComponent]
})
export class EventoIndexComponent {

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
    })  
  }
  deleteEvento(id:number){
    this.eventoService.delete(id).subscribe(res => {
         this.eventos = this.eventos.filter(item => item.codEvento !== id);
    })
  }

}
