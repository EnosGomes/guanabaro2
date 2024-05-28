import { Component, Inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';

import { ReservaService } from '../reserva.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from '../reserva';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { MenuComponent } from "../../menu/menu.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DateAdapter, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { Empresa } from '../../empresa/empresa';
import { EmpresaService } from '../../empresa/empresa.service';

@Component({
    selector: 'app-edit',
    standalone: true,
    templateUrl: './reserva-edit.component.html',
    styleUrl: './reserva-edit.component.css',
    imports: [CommonModule, ReactiveFormsModule, MenuComponent, MatInputModule, FormsModule, 
      MatFormFieldModule, MatDatepickerModule, JsonPipe],
      providers: [
        provideNativeDateAdapter()
      ],
})
export class ReservaEditComponent {

  id!: String;
  reservaHotel!: Reserva;
  form1!: FormGroup;

  tiposQuarto: string [] = ["DUPLO","CASAL","SOLTEIRO"]

  empresas! : Empresa[]
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    private _adapter: DateAdapter<any>,
    public reservaHotelService: ReservaService,
    private route: ActivatedRoute,
    private router: Router,
    public empresaService: EmpresaService,
    @Inject(MAT_DATE_LOCALE) private _locale: string
  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this._locale = 'pt-BR';
    this._adapter.setLocale(this._locale);
    this.id = this.route.snapshot.params['codReserva'];
    this.reservaHotelService.find(Number(this.id)).subscribe((data: Reserva)=>{
      this.reservaHotel = data;
    }); 

    this.empresaService.getAll().subscribe((data: Empresa[])=>{
      this.empresas = data;
    });
      
    this.form1 = new FormGroup({
      dataReserva1: new FormControl('', [Validators.required]),
      tipoEmpresa1: new FormControl('', Validators.required),
      tipoQuarto1: new FormControl('', Validators.required),
      urlRedirecionamento1: new FormControl('', Validators.required)
    });
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form1.controls;
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    this.reservaHotelService.update(Number(this.id), this.form1.value).subscribe((res:any) => {
         this.router.navigateByUrl('reserva/index');
    })
  }
}

