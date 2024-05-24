import { Routes } from '@angular/router';

import { IndexComponent } from './usuario/index/index.component';
import { ViewComponent } from './usuario/view/view.component';
import { CreateComponent } from './usuario/create/create.component';
import { EditComponent } from './usuario/edit/edit.component';

export const routes: Routes = [
	{ path: '', component: IndexComponent },
	{ path: 'usuario', redirectTo: 'usuario/index', pathMatch: 'full'},
  	{ path: 'usuario/index', component: IndexComponent },
  	{ path: 'usuario/:codUser/view', component: ViewComponent },
  	{ path: 'usuario/create', component: CreateComponent },
  	{ path: 'usuario/:codUser/edit', component: EditComponent } 
  ];
