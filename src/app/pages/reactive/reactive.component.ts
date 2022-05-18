import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma!: FormGroup;

  constructor( private fb:FormBuilder,
               private validadores:ValidadoresService  ) {

    this.crearFormulario();
    this.cargrDataFormulario();
    this.crearListener();

   }

  ngOnInit(): void {
  }

  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNoValido(){
    return this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched;
  }

  get apellidoNoValido(){
    return this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched;
  }

  get correoNoValido(){
    return this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched;
  }

  get usuarioNoValido(){
    return this.forma.get('usuario')?.invalid && this.forma.get('usuario')?.touched;
  }

  get pass1NoValido(){
    return this.forma.get('pass1')?.invalid && this.forma.get('pass1')?.touched;
  }

  get pass2NoValido(){
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return ( pass1 === pass2 ) ? false : true;
  }

  get distritoNoValido(){
    return this.forma.get('direccion.distrito')?.invalid && this.forma.get('direccion.distrito')?.touched
  }

  get ciudadNoValido(){
    return this.forma.get('direccion.distrito')?.invalid && this.forma.get('direccion.distrito')?.touched
  }

  crearFormulario(){
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)] ],
      apellido: ['', [Validators.required, this.validadores.noApellido]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario: ['', , this.validadores.usuarioNoSirve ], // va despues de la segunda coma "," porque es una validacion asyncro
      pass1: ['', [Validators.required] ],
      pass2: ['', [Validators.required] ],
      direccion: this.fb.group({
        distrito:['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.fb.array([])
    },{
      validators: this.validadores.passIguales( 'pass1','pass2' ) // Estas son validaciones personalizadas contra las validaciones de un formulario
    });
  }

  crearListener(){
  //  this.forma.valueChanges.subscribe( valor => {
  //    console.log(valor);
  //  });

  //  this.forma.statusChanges.subscribe( status => console.log ({ status }) );

    this.forma.get('nombre').valueChanges.subscribe( console.log) // esto es para ver a tiempo real el cambio de un campo en particular

  }

  cargrDataFormulario(){
    this.forma.reset({
      nombre:"",
      apellido:"",
      correo:"",
      direccion:{
        distrito:"",
        ciudad:""
      },
    })
    
  }

  agregarPasatiempos(){
    this.pasatiempos.push( this.fb.control('Nuevo elementico', Validators.required) )
  }

  borrarPasatiempos(i : number){
    this.pasatiempos.removeAt(i);
  }

  guardar(){
    console.log(this.forma);

    if( this.forma.invalid ){
      return Object.values( this.forma.controls ).forEach( control =>{

        if ( control instanceof FormGroup ){
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        }else{
          control.markAsTouched();
        }        
      });
  
    }

    // Posteo de informacion
    this.forma.reset({
      nombre: 'sin nombre'
    });

  }

  

}
