import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ServiciosServidorService } from "../servicios-servidor.service";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss']
})
export class RegistroUsuarioComponent implements OnInit {
  isVisible = false;
  datosAlerta:any = {"funcion":null,"contenido":"","titulo":"","icono":"warning","mensajeExitoso":"","mensajeError":""};

  mostrarMecanico:boolean = false;
  mostrarPropietario:boolean = false;
  mostrarEmpleado:boolean = false;

  formGroupTipo:FormGroup = new FormGroup({});
  formGroup: FormGroup = new FormGroup({});
  formGroupPropietario: FormGroup = new FormGroup({});
  formGroupMecanico: FormGroup = new FormGroup({});
  formGroupEmpleado: FormGroup = new FormGroup({});
  constructor( private serviceRequest: ServiciosServidorService,
               private fb: FormBuilder) { 
    
    this.formGroup = this.fb.group({
      idUsuario: [""],
      nombres: [""],
      apellidos: [""],
      idTipoUsuario: [""],
      idEstado: ["est01"],
      correo: [""],
      telefono: [""],
      fechaNacimiento: [new Date()],
      password: [""]
    });

    this.formGroupPropietario = this.fb.group({
      idUsuario: [""],
      ciudadResidencia: [""],
      direccion: [""]
    });
    this.formGroupMecanico = this.fb.group({
      idUsuario: [""],
      nivelEstudios: [""],
      direccion: [""]
    });
    this.formGroupEmpleado = this.fb.group({
      idUsuario: [""],
      cargo: [""],
      direccion: [""]
    });
  }

  ngOnInit(): void {
  
  }

  seleccionTipo():void{
    const datos = this.formGroup.getRawValue();
    let tipo = datos["idTipoUsuario"];
    if(tipo){
      if(tipo == "propietario"){
        this.mostrarPropietario = true;
        this.mostrarMecanico = false;
        this.mostrarEmpleado = false;
      }
      else if (tipo=="mecanico") {
        this.mostrarPropietario = false;
        this.mostrarMecanico = true;
        this.mostrarEmpleado = false;
      } 
      else{
        this.mostrarPropietario = false;
        this.mostrarMecanico = false;
        this.mostrarEmpleado = true;
      }
    }
    
  }

  confirmarGuardarUsuario():void{
    this.datosAlerta.contenido ="¿Esta seguro de almacenar los datos del usuario?";
    this.datosAlerta.funcion = this.guardarUsuario;
    this.datosAlerta.mensajeExitoso = "Usuario almacenado con éxito";
    this.datosAlerta.mensajeError = "Hay un problema, Intentalo mas tarde";
    this.alertConfirmation();
  }

  guardarUsuario=()=>{
    const datos = this.formGroup.getRawValue();
    datos["fechaNacimiento"] = new Date(datos["fechaNacimiento"]);
    datos["telefono"] = ""+datos["telefono"];
    let tipoUsuario = datos["idTipoUsuario"].toString();
    let mecanico = "mecanico";
    let propietario= "propietario";
    let empleado = "empleado";
    let ruta = "";
    if(tipoUsuario==propietario){
      ruta = "propietarios";
      this.formGroupTipo = this.formGroupPropietario;
    }else if(tipoUsuario==mecanico){
      ruta = "mecanicos";
      this.formGroupTipo = this.formGroupMecanico;
    }else if(tipoUsuario==empleado){
      ruta = "empleados";
      this.formGroupTipo = this.formGroupEmpleado;
    }
    else{
      console.log("no se hace nada");
      return;
    }
    this.serviceRequest.guardarPost("usuarios", JSON.stringify(datos)).subscribe(
      (data) => {
        const datosTipo = this.formGroupTipo.getRawValue();
        datosTipo["idUsuario"] = data.idUsuario;
        this.serviceRequest.guardarPost(ruta, JSON.stringify(datosTipo)).subscribe(
          (data) => {
            Swal.fire('Exitoso', this.datosAlerta.mensajeExitoso, 'success');
          },
          (error) => {
            Swal.fire('Error', this.datosAlerta.mensajeExitoso, 'error');
          }
        );
      },
      (error) => {
        Swal.fire('Error', this.datosAlerta.mensajeExitoso, 'error');
      }
    );
  }


  alertConfirmation() {
    Swal.fire({
      title: this.datosAlerta.titulo,
      text: this.datosAlerta.contenido,
      icon: this.datosAlerta.icono,
      showCancelButton: true,
      confirmButtonText: 'ok',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.datosAlerta.funcion();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

}
