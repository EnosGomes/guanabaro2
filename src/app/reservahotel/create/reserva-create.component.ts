import { Component } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';

import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { ReservaService } from '../reserva.service';
import { MenuComponent } from "../../menu/menu.component";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmpresaService } from '../../empresa/empresa.service';
import { Empresa } from '../../empresa/empresa';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Reserva } from '../reserva';


interface Food {
  value: string;
  viewValue: string;
}

@Component({
    selector: 'app-reserva',
    standalone: true,
    templateUrl: './reserva-create.component.html',
    styleUrl: './reserva-create.component.css',
    providers: [
      provideNativeDateAdapter()
    ],
    imports: [CommonModule, 
      ReactiveFormsModule, MenuComponent, MatInputModule, FormsModule, 
      MatFormFieldModule, MatDatepickerModule, JsonPipe ]
})
export class ReservaCreateComponent {

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(
    public reservaHotelService: ReservaService,
    private router: Router,
    public empresaService: EmpresaService
  ) { }
  reserva!: Reserva;
  empresas! : Empresa[]
  form!: FormGroup;
    
  ngOnInit(): void {

    //console.log("History"+history.state.dados.nomeUser);

    this.empresaService.getAll().subscribe((data: Empresa[])=>{
      this.empresas = data;
    })

    this.form = new FormGroup({
      dataReserva: new FormControl('', Validators.required),
      tipoEmpresa: new FormControl('', Validators.required),
      tipoQuarto: new FormControl('', Validators.required)
    });
  }
  selectedTeam = '';
  onSelected(value:string): void {
		this.selectedTeam = value;
    console.log(this.selectedTeam);
	}
    
  get f(){
    return this.form.controls;
  }
  submit(){

   
    //localStorage.getItem('usuario')!;

    console.log("Reserva: "+this.form.value);

    console.log( this.form.value.tipoEmpresa.codEmpresa);
    this.reservaHotelService.create(this.form.value).subscribe((res:any) => {
         this.router.navigateByUrl('reserva/index');
    })
  }

}
