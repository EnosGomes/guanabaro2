import { Routes } from '@angular/router';

import { IndexComponent } from './usuario/index/index.component';
import { ViewComponent } from './usuario/view/view.component';
import { CreateComponent } from './usuario/create/create.component';
import { EditComponent } from './usuario/edit/edit.component';
import { EmpresaComponent } from './empresa/index/empresa.component';
import { EmpresaEditComponent } from './empresa/edit/empresa-edit.component';
import { EmpresaViewComponent } from './empresa/view/empresa-view.component';
import { EmpresaCreateComponent } from './empresa/create/empresa-create.component';
import { EventoEditComponent } from './evento/edit/evento-edit.component';
import { EventoIndexComponent } from './evento/index/evento-index.component';
import { EventoCreateComponent } from './evento/create/evento-create.component';
import { ReservaCreateComponent } from './reservahotel/create/reserva-create.component';
import { ReservaEditComponent } from './reservahotel/edit/reserva-edit.component';
import { ReservaIndexComponent } from './reservahotel/index/reserva-index.component';
import { ReservaComponent } from './reservahotel/view/reserva.component';
import { EventoComponent } from './evento/view/evento.component';

export const routes: Routes = [
	{ path: '', component: IndexComponent },
	{ path: 'usuario', redirectTo: 'usuario/index', pathMatch: 'full'},
  	{ path: 'usuario/index', component: IndexComponent },
  	{ path: 'usuario/:codUser/view', component: ViewComponent },
  	{ path: 'usuario/create', component: CreateComponent },
  	{ path: 'usuario/:codUser/edit', component: EditComponent }, 
  	{ path: 'empresa/:codEmpresa/edit', component: EmpresaEditComponent }, 
	{ path: 'empresa/:codEmpresa/view', component: EmpresaViewComponent },
	{ path: 'empresa',  redirectTo: 'empresa/index', pathMatch: 'full'},
  	{ path: 'empresa/index', component: EmpresaComponent },
	{ path: 'empresa/create', component: EmpresaCreateComponent },

	// { path: 'evento/:codEvento/edit', component: EventoEditComponent }, 
	// { path: 'evento',  redirectTo: 'evento/index', pathMatch: 'full'},
  	// { path: 'evento/index', component: EventoComponent },
	// { path: 'evento/create', component: EventoCreateComponent },


	{ path: 'reserva/:codReserva/edit', component: ReservaEditComponent }, 
	{ path: 'reserva',  redirectTo: 'evento/index', pathMatch: 'full'},
  	{ path: 'reserva/index', component: ReservaIndexComponent },
	{ path: 'reserva/create', component: ReservaCreateComponent },
	{ path: 'reserva/:codReserva/view', component: ReservaComponent },

	{ path: 'eventos/:codEvento/edit', component:  EventoEditComponent}, 
	{ path: 'eventos',  redirectTo: 'evento/index', pathMatch: 'full'},
  	{ path: 'eventos/index', component: EventoIndexComponent },
	{ path: 'eventos/create', component: EventoCreateComponent },
	{ path: 'eventos/:codEvento/view', component: EventoComponent },
  ];
