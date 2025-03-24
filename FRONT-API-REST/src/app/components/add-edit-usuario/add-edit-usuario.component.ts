import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from '../../interfaces/usuario.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionAPIService } from '../../services/conexion-api.service';

@Component({
  selector: 'app-add-edit-usuario',
  templateUrl: './add-edit-usuario.component.html',
  styleUrl: './add-edit-usuario.component.css'
})
export class AddEditUsuarioComponent {

  unUsuario_id!: number;
  unUsuario: Usuario ={
    id_usuario:-1,
    contrasena:'',
    email:'',
    numero_telefono:'',
    minibiografia:'',
    id_persona:'',
  };
  unResultado: any;
  unaAccion!: string;
  unMensaje!: string;
  
  constructor(
    private router: Router,
    private parametros: ActivatedRoute,
    private dataBD: ConexionAPIService,
  ) {
 
    this.parametros.params.subscribe((params) => {
      this.unUsuario_id = params['id'];
 
      console.log("USUARIO",this.unUsuario_id);
 
      if (this.unUsuario_id != -1){
        this.cargarUsuarioBD()
      }
    });
  }
 
    async cargarUsuarioBD() {
    await this.dataBD
      .getUnUsuario(this.unUsuario_id)
      .toPromise()
      .then((data: any) => {
        this.unUsuario= data;
        console.log(this.unUsuario)
      });
  }

  guardar(){
    console.log("llamo a Guardar")
 
    if (this.unUsuario_id == -1) {
      this.nuevoUsuario();
    } else {
      this.actualizarUsuario();
    }
  }
 
 
  actualizarUsuario() {
    //console.log(this.unaDivision);
    this.dataBD.crud_Usuarios(this.unUsuario, 'modificar').subscribe(
      (res: any) => {
        this.unResultado = res;
 
 
        console.log('RESULTADO_ACTUALIZAR', this.unResultado);
 
 
        if (this.unResultado.ok == true) {
          console.log(this.unResultado);
          this.unaAccion = 'Mensaje:';
          this.unMensaje = 'Registro de Usuario Actualizado...';
          setTimeout(() => (this.unMensaje = ''), 3000);
 
 
          Swal.fire({
            icon: 'info',
            title: 'Information',
            text: this.unMensaje,
          });
 
 
          this.router.navigate(['/usuarios']);
        } else {
          this.unaAccion = 'Error:';
          this.unMensaje = this.unResultado.msg;
          setTimeout(() => (this.unMensaje = ''), 3000);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
 
 
  async nuevoUsuario() {
    await this.dataBD.crud_Usuarios(this.unUsuario, 'insertar').subscribe(
      (res: any) => {
        this.unResultado = res;
 
 
        console.log('RESULTADO_NUEVO', this.unResultado);
 
 
        if (this.unResultado.ok == true) {
          this.unaAccion = 'Mensaje:';
          this.unMensaje = 'Usuario Insertado';
          Swal.fire({
            icon: 'info',
            title: 'Information',
            text: this.unMensaje,
          });
 
 
          setTimeout(() => (this.unMensaje = ''), 3000);
 
 
          this.router.navigate(['/usuarios']);
        } else {
          Swal.fire({
            icon: 'info',
            title: 'Error',
            text: "Error:"+this.unResultado.msg
          });
          this.unaAccion = 'Error:';
          this.unMensaje = this.unResultado.msg;
          setTimeout(() => (this.unMensaje = ''), 3000);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

}
