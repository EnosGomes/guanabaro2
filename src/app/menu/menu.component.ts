import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Usuario } from '../usuario/usuario';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  @Input() dado!: Usuario;
  @Input() algo!: any;

  nomeUsuarioLogado: String | null = ""

  isAdmin! : any ;

  //this.localStorageData = localStorage.getItem("usuario");

  ngOnInit(): void {
    this.nomeUsuarioLogado = localStorage.getItem("usuario");
    this.isAdmin 
    this.isAdminLogado()
  }

  isAdminLogado(){
    this.isAdmin = (localStorage.getItem('usuario')?.trim() === 'admin'.trim());
  }
  

}
