import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    pais: ''
  }

  paises : any[] = [];

  constructor( private paisService:PaisService ) { }

  ngOnInit(): void {

    this.paisService.getPaises()
      .subscribe( paises => {
      this.paises = paises;

      this.paises.unshift({
        nombre: '[ Seleccione Pais ]',
        codigo: ''
      })

      console.log( this.paises );
    });
    
  }

  guardar( forma: NgForm){
    console.log(forma);

    if( forma.invalid ){
      Object.values( forma.controls ).forEach( control =>{
        control.markAsTouched();
      });

      return;
    }

    console.log(forma.value);
  }

}
