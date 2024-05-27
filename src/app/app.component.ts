import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginFormComponent } from "./login/login.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, RouterOutlet, LoginFormComponent]
})
export class AppComponent {
  title = 'my-crud-app';

  ngOnInit():void {
    localStorage.getItem('usuario')
  }

  
}
