import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ServiciosServidorService } from "../servicios-servidor.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import Swal from 'sweetalert2';

interface Revision {
  idRevision: string;
  fechaRegistro: string;
  fechaEntrada: string;
  fechaSalida: string;
  idVehiculo: string;
  idEstado: string;
  nivelAceite:string;
  nivelLiquidoFrenos:string;
  nivelRefrigerante:string;
  nivelLiquidoDireccion:string;
  idSede:string;
  idServicio:string;
  idMecanico:string;
  idEmpleado:string;
  placa:string;
}

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

interface Mecanico {
  idMecanico: string;
  idUsuario: string;
  nivelEstudios: number;
}

@Component({
  selector: 'app-reporte-revisiones',
  templateUrl: './reporte-revisiones.component.html',
  styleUrls: ['./reporte-revisiones.component.scss']
})

export class ReporteRevisionesComponent implements OnInit {
  listOfDataMecanicos:Mecanico[]=[];
  listOfData: Revision[] = [];
  campoSeleccionado:String = "";
  campoBusqueda:String = "";
  vehiculoEncontrado:any;
  listaDatos:any[]=[];
  mecanicoSeleccionado:String = "";
  descripcion:String = "";
  isVisible:boolean = false;
  revisionSeleccionada:String="";
   //datos alertas
   datosAlerta:any = {"funcion":null,"contenido":"","titulo":"","icono":"warning","mensajeExitoso":"","mensajeError":""};

  formGroupMecanico:FormGroup = new FormGroup({});
  formGroupRevision:FormGroup = new FormGroup({});
  constructor(private serviceRequest: ServiciosServidorService,private fb: FormBuilder) {

    this.formGroupRevision = this.fb.group({
      idRevision: [""],
      idMecanico: [""],
      descripcion: [""]
    });
  }

  async ngOnInit(){
    this.getMecanicos("");
    this.getRevisiones("").then(
      (lista)=>{
        let i = 0;
        for (let elem of this.listOfData) {
           this.buscarVehiculo(elem.idVehiculo).then((val:any)=>{
            this.listaDatos.push(
              {
                "idRevision":elem.idRevision,
                "fechaRegistro":elem.fechaRegistro,
                "placa":val.placa,
                "idEstado":this.getEstado(elem.idEstado),
                "idServicio":this.getServicio(elem.idServicio)
              }
              );
           }).catch((err)=>{
              console.log(err);
           })
          i++;
        }
      }

    ).catch((err)=>{
      console.log(err);
    })
  }


  confirmarAsignarRevision(){
    this.datosAlerta.contenido ="¿Esta seguro que desea asignar el mecánico?";
    this.datosAlerta.funcion = this.actualizarRevision;
    this.datosAlerta.mensajeExitoso = "Mecanico asignado con éxito";
    this.datosAlerta.mensajeError = "Hay un problema, Intentalo mas tarde";
    this.alertConfirmation();    

  }

  actualizarRevision(){
    const datos = this.formGroupRevision.getRawValue();
    datos["idREvision"] = this.revisionSeleccionada;
    this.serviceRequest
      .patchData("revisiones", JSON.stringify(datos), datos.idREvision)
      .subscribe(
        (data) => {
          Swal.fire('Exito', this.datosAlerta.mensajeExitoso, 'success');
          /*
          const listNueva = JSON.parse(JSON.stringify(this.listOfData));
          for (const i in listNueva) {
            if (listNueva[i].idUsuario == datos.idUsuario) {
              listNueva[i] = datos;
              break;
            }
          }*/
          //this.listOfData = listNueva;
          //this.listOfDataAll = listNueva;
        },
        (error) => {
          Swal.fire('Error', error, 'error');
        }
      );
  }

  getEstado(idEstado:any){
    let estado = "";
    if(idEstado == "est1"){
      estado = "Solicitado";
    }else if(idEstado == "est2"){
      estado = "En Revision";
    }else if(idEstado == "est3"){
      estado = "Pruebas";
    }else if(idEstado == "est4"){
      estado = "Listo para entregar";
    }else if(idEstado == "est5"){
      estado = "Entregado";
    }
    return estado;
  }

  getServicio(idServicio:any){
    let servicio = "";
    if(idServicio == "ser01"){
      servicio = "Revisión Mécanica";
    }else if(idServicio == "ser02"){
      servicio = "Revisión Eléctrica";
    }else if(idServicio == "ser03"){
      servicio = "Montallantas";
    }
    return servicio;
  }

  getRevisiones(filter: any){

    return new Promise((resolve,reject)=>{
      this.serviceRequest.listarGet("revisiones", filter).subscribe(
        (data) => {
          this.listOfData = data;
          return resolve(this.listOfData);
          
        },
   
        (error) => {
          return reject("error")
        }
      )
    })
  }


 buscarVehiculo(idVehiculo:any){
  return new Promise((resolve,reject)=>{
    this.serviceRequest.listarGet("vehiculos/"+idVehiculo).subscribe(
      (data) => {
        this.vehiculoEncontrado = data;
        return resolve(this.vehiculoEncontrado);
      },
  
      (error) => {
        console.log(error);
        return reject(error);
      }
    );

  })

}

  buscarRevisionesPorEstado(){

  }

  buscarRevisionPorPlaca(){

  }

  asignarMecanico(idRevision:String){
    this.showModal();
    this.revisionSeleccionada = idRevision;
    alert(idRevision);
  }

/*------------------REVISIONES-------------------- */
showModal(): void {
  this.isVisible = true;
}

handleOk(): void {
  this.isVisible = false;
}

handleCancel(): void {
  this.isVisible = false;
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



////////////////////////////////////////////////
getMecanicos(filter: any){

  return new Promise((resolve,reject)=>{
    this.serviceRequest.listarGet("mecanicos", filter).subscribe(
      (data) => {
        this.listOfDataMecanicos = data;
        return resolve(this.listOfData);
        
      },
 
      (error) => {
        return reject("error")
      }
    )
  })
}
  

}
