import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { ReservaService } from '../reserva.service';
import { MenuComponent } from "../../menu/menu.component";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmpresaService } from '../../empresa/empresa.service';
import { Empresa } from '../../empresa/empresa';


interface Food {
  value: string;
  viewValue: string;
}

@Component({
    selector: 'app-reserva',
    standalone: true,
    templateUrl: './reserva-create.component.html',
    styleUrl: './reserva-create.component.css',
    imports: [CommonModule, ReactiveFormsModule, MenuComponent, MatInputModule, FormsModule, MatFormFieldModule]
})
export class ReservaCreateComponent {

  constructor(
    public reservaHotelService: ReservaService,
    private router: Router,
    public empresaService: EmpresaService
  ) { }


  //empresa!: Empresa;
  empresas! : Empresa[]

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ]

  

  form!: FormGroup;
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
 
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {

    this.empresaService.getAll().subscribe((data: Empresa[])=>{
      this.empresas = data;
    })

    this.form = new FormGroup({
      dataReserva: new FormControl('', Validators.required),
      codUsuario: new FormControl('', Validators.required),
      codEmpresa: new FormControl('', Validators.required),
      tipoQuarto: new FormControl('', Validators.required),
      nomeUsuarioReserva: new FormControl('', Validators.required)
    });
  }
  selectedTeam = '';
  onSelected(value:string): void {
		this.selectedTeam = value;
    console.log(this.selectedTeam);
	}
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    this.reservaHotelService.create(this.form.value).subscribe((res:any) => {
         this.router.navigateByUrl('reserva/index');
    })
  }

}
