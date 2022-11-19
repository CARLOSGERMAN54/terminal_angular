import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ServiciosServidorService } from "../servicios-servidor.service";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import Swal from 'sweetalert2';

interface Vehiculo {
  idVehiculo: string;
  numeroChasis: string;
  placa: number;
  marca: string;
  modelo: string;
  color: string;
  tipo: string;
  descripcion: string;
  idPropietario: string;
}

@Component({
  selector: 'app-registro-vehiculo',
  templateUrl: './registro-vehiculo.component.html',
  styleUrls: ['./registro-vehiculo.component.scss']
})
export class RegistroVehiculoComponent implements OnInit {
  //variables
  listOfData: Vehiculo[] = [];
  campoBusqueda:String = "";
  resultadoBusquedaPropietario:boolean = false;
  datosAlerta:any = {"funcion":null,"contenido":"","titulo":"","icono":"warning","mensajeExitoso":"","mensajeError":""};
  formGroupVehiculo:FormGroup = new FormGroup({});
  constructor(private serviceRequest: ServiciosServidorService,
    private fb: FormBuilder) {
    this.formGroupVehiculo = this.fb.group({
      
      idPropietario: [""],
      numeroChasis: [""],
      placa: [""],
      marca: [""],
      modelo: [""],
      color: [""],
      tipo: [""],
      descripcion: [""]
      
    });
  }


  ngOnInit(): void {
  }

  confirmarGuardarVehiculo(){
    this.datosAlerta.contenido ="¿Esta seguro de almacenar los datos del vehiculo?";
    this.datosAlerta.funcion = this.guardarVehiculo;
    this.datosAlerta.mensajeExitoso = "Vehiculo almacenado con éxito";
    this.datosAlerta.mensajeError = "Hay un problema, Intentalo mas tarde";
    this.alertConfirmation();
  }

  seleccionTipo(){

  }

guardarVehiculo=()=>{
  if(this.resultadoBusquedaPropietario){
    const datos = this.formGroupVehiculo.getRawValue();
    let placa = datos["placa"];
    placa = placa+"";
    if(this.listOfData.length ==0){
      let ruta = "vehiculos";
      this.serviceRequest.guardarPost("vehiculos", JSON.stringify(datos)).subscribe(
        (data) => {
          Swal.fire('Exito', this.datosAlerta.mensajeExitoso, 'success');
        },
        (error) => {
          Swal.fire('Error', this.datosAlerta.mensajeError, 'error');
        }
      );
    }
    else{
      Swal.fire('Error', 'El vehiculo de placa '+placa+' ya se encuentra registrado', 'error');
    }
  }
  else{
    Swal.fire('Error', 'No se encuentra registrado como  propietario', 'error');
  }

}

buscarPropietario = ()=>{
  const datos = this.formGroupVehiculo.getRawValue();
  let idUsuario = datos["idPropietario"];
  let ruta = "usuarios/"+idUsuario+"/propietarios";
  this.serviceRequest.listarGet(ruta).subscribe(
    (data) => {
      this.resultadoBusquedaPropietario = true;
    },

    (error) => {
      this.resultadoBusquedaPropietario = false;
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

  getVehiculos(filter: any): void {
    this.serviceRequest.listarGet("vehiculos", filter).subscribe(
      (data) => {
        this.listOfData = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  buscarVehiculoPorPlaca(){
    this.getVehiculos(this.campoBusqueda);
  }

}
