import { Component } from '@angular/core';

import { EventoService } from '../evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '../evento';
import { MenuComponent } from "../../menu/menu.component";

@Component({
    selector: 'app-view',
    standalone: true,
    templateUrl: './evento.component.html',
    styleUrl: './evento.component.css',
    imports: [MenuComponent]
})
export class ViewComponent {

  id!: String;
  evento!: Evento;
    
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
    this.id = this.route.snapshot.params['codUser'];
    //console.log("codeUser"+this.id)
        
    this.eventoService.find(Number(this.id)).subscribe((data: Evento)=>{
      console.log(data)
      this.evento = data;
    });
  }

}
