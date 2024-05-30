import { Component, Inject } from '@angular/core';
import { CommonModule, DatePipe, JsonPipe, formatDate } from '@angular/common';

import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { ReservaService } from '../reserva.service';
import { MenuComponent } from "../../menu/menu.component";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmpresaService } from '../../empresa/empresa.service';
import { Empresa } from '../../empresa/empresa';
import {DateAdapter, MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Reserva } from '../reserva';

import { LOCALE_ID, NgModule } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
declare var moment: any;
const useValue = 'pt-BR';
@Component({
    selector: 'app-reserva',
    standalone: true,
    templateUrl: './reserva-create.component.html',
    styleUrl: './reserva-create.component.css',
    providers: [
      provideNativeDateAdapter(), DatePipe, { provide: LOCALE_ID, useValue: 'pt-BR' } 
    , ],
    imports: [CommonModule, 
      ReactiveFormsModule, MenuComponent, MatInputModule, FormsModule, 
      MatFormFieldModule, MatDatepickerModule, JsonPipe ]
})
export class ReservaCreateComponent {

  tiposQuarto: string [] = ["DUPLO","CASAL","SOLTEIRO"]
  reserva!: Reserva;
  empresas! : Empresa[]
  form!: FormGroup;
  minDate: Date;
  maxDate: Date;
  myDate: Date = new Date();
  anoCalendarioLimite: number = 0;
  mesCalendarioLimite: number = 0;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(
    private _adapter: DateAdapter<any>,
    public reservaHotelService: ReservaService,
    private router: Router,
    public empresaService: EmpresaService,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    
  ) { 
     const currentYear = new Date().getFullYear();

     //console.log(new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }));

     this.anoCalendarioLimite = new Date().getUTCDate();
     this.mesCalendarioLimite = new Date().getMonth();
     this.minDate = new Date(currentYear - 0, this.mesCalendarioLimite, this.anoCalendarioLimite);
     this.maxDate = new Date(currentYear + 1, 11, 31)

    //console.log( typeof formatDate(this.myDate, 'dd-MM-yyyy', 'en'));


  }
  
    
  ngOnInit(): void {
    this._locale = 'pt-BR';
    this._adapter.setLocale(this._locale);
    this.empresaService.getAll().subscribe((data: Empresa[])=>{
      this.empresas = data;
    })

    this.form = new FormGroup({
      dataReserva: new FormControl('', Validators.required),
      tipoEmpresa: new FormControl('', Validators.required),
      tipoQuarto: new FormControl('', Validators.required),
      urlRedirecionamento: new FormControl('', Validators.required),
      urlPagamento: new FormControl('https://www.google.com.br', )
    });
  }
  selectedTeam = '';
  onSelected(value:string): void {
		this.selectedTeam = value;
	}
    
  get f(){
    return this.form.controls;
  }
  submit(){

    this.pagarConta();
    this.reservaHotelService.create(this.form.value).subscribe((res:any) => {
         this.router.navigateByUrl('reserva/index');
    })
  }

  pagarPorLink(){
  
    // No incognito window found, open a new one.
    //windows.create({url: "https://google.com", incognito: true});
    window.open(this.reserva.urlPagamento.toLocaleLowerCase(), "mozillaTab");
}
pagarConta(){
  console.log("conta paga");
}
}
