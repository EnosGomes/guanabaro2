import { Component } from '@angular/core';

import { EventoService } from '../evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '../evento';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
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
