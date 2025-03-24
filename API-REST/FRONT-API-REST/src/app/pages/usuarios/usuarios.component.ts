import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ConexionAPIService } from '../../services/conexion-api.service';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  usuarios!: any;
  unResultado :any;
  unaAccion!:string;
  unMensaje!:string;

  constructor(
    private dataBD: ConexionAPIService,
    private router: Router,
  ) {
  }


  ngOnInit() {
    this.cargarUsuariosBD();
  }

  editarUsuario(unIdUsuario:number) {
    console.log("USUARIO ESCOGIDO",unIdUsuario);
    this.router.navigate(['/usuario', unIdUsuario]);
  }

  async cargarUsuariosBD() {
    await this.dataBD
      .getUsuarios()
      .toPromise()
      .then((data: any) => {
        this.usuarios = data;
        console.log(this.usuarios)
      });
  }


  eliminarUsuario(unaPersona:Usuario){
    //console.log(this.unaDivision);
    this.dataBD.crud_Usuarios(unaPersona, 'eliminar').subscribe(
      (res: any) => {
        this.unResultado = res;

        //console.log(this.unResultado);
        if (this.unResultado.ok == true) {

           Swal.fire({
            icon: 'info',
            title: 'Registro eliminado',
            text: 'Usuario Eliminado',
          });

          this.unaAccion = 'Mensaje:';
          this.unMensaje = 'Usuario Eliminada';
          setTimeout(() => (this.unMensaje = ''), 3000);


          this.cargarUsuariosBD() ;

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
