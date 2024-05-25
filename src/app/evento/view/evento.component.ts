import { Component } from '@angular/core';

import { EventoService } from '../evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '../evento';
import { MenuComponent } from "../../menu/menu.component";
import { Observable } from 'rxjs';

@Component({
    selector: 'evento-view',
    standalone: true,
    templateUrl: './evento.component.html',
    styleUrl: './evento.component.css',
    imports: [MenuComponent]
})
export class EventoComponent {

  id: String  | undefined = '';
  evento!:  Evento;
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public eventoService: EventoService,
    private route: ActivatedRoute
   ) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['codEvento'];
        
    this.eventoService.find(Number(this.id)).subscribe((data: Evento)=>{
      this.evento = data;
    });
  }

}
