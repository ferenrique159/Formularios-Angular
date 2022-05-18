import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate{
  [s:string]: boolean 
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  usuarioNoSirve( control: FormControl ):Promise<ErrorValidate> | Observable<ErrorValidate>{

    if( !control.value ){
      return Promise.resolve(null);
    }

    return new Promise ( ( resolve, reject ) =>{

      setTimeout(() => {

        if( control.value === 'strider' ){
          resolve({ existe:true });
        } else {
            resolve(null);
        }

      }, 3500 );

    });

  }


  noApellido( control: FormControl ): ErrorValidate{

    if ( control.value?.toLowerCase() === 'zacarias' ){

      return{
        noApellido: true
      }

    }

    return null;
  }

  passIguales( pass1Name:string, pass2Name:string ){
    return( FormGroup:FormGroup ) =>{

      const pass1Control = FormGroup.controls[pass1Name];
      const pass2Control = FormGroup.controls[pass2Name];

      if( pass1Control.value === pass2Control.value ){
        pass2Control.setErrors(null)
      }else{
        pass2Control.setErrors({noEsIgual:true})
      }

    }
  }



}
