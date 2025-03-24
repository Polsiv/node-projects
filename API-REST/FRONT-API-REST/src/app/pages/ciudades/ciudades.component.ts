import { Component } from '@angular/core';
import { ConexionAPIService } from '../../services/conexion-api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Ciudad } from '../../interfaces/ciudad.interface';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrl: './ciudades.component.css'
})
export class CiudadesComponent {
  ciudades!: any;
  unResultado :any;
  unaAccion!:string;
  unMensaje!:string;

  constructor(
    private dataBD: ConexionAPIService,
    private router: Router,
  ) {
  }


  ngOnInit() {
    this.cargarCiudadesBD();
  }

  editarCiudad(unIdCiudad:number) {
    console.log("CIUDAD ESCOGIDA",unIdCiudad);
    this.router.navigate(['/ciudad', unIdCiudad]);
  }

  async cargarCiudadesBD() {
    await this.dataBD
      .getCiudades()
      .toPromise()
      .then((data: any) => {
        this.ciudades = data;
        console.log(this.ciudades)
      });
  }

  eliminarCiudad(unaCiudad:Ciudad){
      //console.log(this.unaDivision);
      this.dataBD.crud_Ciudades(unaCiudad, 'eliminar').subscribe(
        (res: any) => {
          this.unResultado = res;
  
          //console.log(this.unResultado);
          if (this.unResultado.ok == true) {
  
             Swal.fire({
              icon: 'info',
              title: 'Registro eliminado',
              text: 'Ciudad Eliminada',
            });
  
            this.unaAccion = 'Mensaje:';
            this.unMensaje = 'Ciudad Eliminada';
            setTimeout(() => (this.unMensaje = ''), 3000);
  
  
            this.cargarCiudadesBD() ;
  
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Error',
              text: this.unResultado.msg + "Error:" + this.unResultado.error.original.sqlMessage,
            });
      
  
            this.unaAccion = 'Error:';
            this.unMensaje = this.unResultado.msg;
            setTimeout(() => (this.unMensaje = ''), 3000);
          }
        }
        ,(error:any) => {
          console.error(error)
        }
      );
    }
}
