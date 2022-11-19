import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ServiciosServidorService } from "../servicios-servidor.service";
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup } from "@angular/forms";
import Swal from 'sweetalert2';


interface Vehiculo {
  idVehiculo: string;
  numeroChasis: string;
  placa: string;
  marca: string;
  modelo: string;
  color: string;
  tipo: string;
  descripcion: string;
  idPropietario: string;
}

interface Sede{
  idSede:String,
  sede:String
}

interface Servicio{
  idServicio:String,
  servicio:String
}

interface Estado{
  idEstado:String,
  estado:String
}

@Component({
  selector: 'app-reporte-vehiculos',
  templateUrl: './reporte-vehiculos.component.html',
  styleUrls: ['./reporte-vehiculos.component.scss']
})
export class ReporteVehiculosComponent implements OnInit {
  listOfData: Vehiculo[] = [];
  campoBusqueda:String = "";
  placaSeleccionada:String = "";
  isVisible = false;
 //variables revisiones
 listOfDataSedes: Sede[] = [];
 listOfDataServicios: Servicio[] = [];
 listOfDataEstados: Estado[] = [];

 //datos seleccionados
 servicioSeleccionado:String = "";
 sedeSeleccionada:String = "";
 estadoSeleccionado:String = "";
 idVehiculoSeleccionado:String = "";
  datosVehiculo = {
    "idVehiculo": "",
    "numeroChasis":"",
    "placa": "",
    "marca": "",
    "modelo":"",
    "color": "",
    "tipo": "",
    "descripcion": "",
    "idPropietario": ""
  };

  //contenidos modales
  contenidoModalDetalle:boolean=false;
  contenidoModalServicio:boolean=false;
  //datos alertas
  datosAlerta:any = {"funcion":null,"contenido":"","titulo":"","icono":"warning","mensajeExitoso":"","mensajeError":""};

 //formularios
  formGroupRevision:FormGroup = new FormGroup({});

  constructor(private serviceRequest: ServiciosServidorService,
    private fb: FormBuilder) {
      //  datos["id_mecanico"] = "63704c18f323b613140e097e";
  //datos["id_empleado"] = "637050c5cf797f17443a463d";
      this.formGroupRevision = this.fb.group({
        fechaRegistro: [new Date()],
        fechaEntrada: [new Date()],
        fechaSalida: [new Date()],
        idVehiculo: [""],
        idEstado: [""],
        nivelAceite: [""],
        nivelLiquidoFrenos: [""],
        nivelRefrigerante: [""],
        nivelLiquidoDireccion: [""],
        idSede: [""],
        idServicio: [""],
        idMecanico: [""],
        idEmpleado:[""],
        descripcion:[""]
      });
  }

  ngOnInit(): void {
    this.getVehiculos("");
    this.getSedes("");
    this.getServicios("");
    this.getEstados("");
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

  verDetalle(placa:any){
    this.getVehiculos(placa);
    this.listOfData.forEach(element => {
    this.datosVehiculo.color = element.color;
    this.datosVehiculo.placa = element.placa;
    this.datosVehiculo.descripcion = element.descripcion;
    this.datosVehiculo.idPropietario = element.idPropietario;
    this.datosVehiculo.idVehiculo = element.idVehiculo;
    this.datosVehiculo.modelo = element.modelo;
    this.datosVehiculo.marca = element.marca;
    this.datosVehiculo.numeroChasis = element.numeroChasis;
    this.datosVehiculo.tipo = element.tipo;

   });
   this.contenidoModalServicio=false;
   this.contenidoModalDetalle=true;
   this.showModal();
  }

  solicitarServicio(idVehiculo:String){
    this.contenidoModalServicio=true;
    this.contenidoModalDetalle=false;
    this.idVehiculoSeleccionado = idVehiculo;
    this.showModal();
  }
/*------------------REVISIONES-------------------- */
getSedes(filter: any): void {
  this.serviceRequest.listarGet("sedes", filter).subscribe(
    (data) => {
      this.listOfDataSedes = data;
    },

    (error) => {
      console.log(error);
    }
  );
}
getServicios(filter: any): void {
  this.serviceRequest.listarGet("servicios", filter).subscribe(
    (data) => {
      this.listOfDataServicios = data;
    },

    (error) => {
      console.log(error);
    }
  );
}

getEstados(filter: any): void {
  this.serviceRequest.listarGet("estados", filter).subscribe(
    (data) => {
      this.listOfDataEstados = data;
    },

    (error) => {
      console.log(error);
    }
  );
}

confirmarGuardarRevision(){
  this.datosAlerta.contenido ="¿Esta seguro de realizar la solicitud de revisión?";
  this.datosAlerta.funcion = this.guardarRevision;
  this.datosAlerta.mensajeExitoso = "Solicitud almacenada  con éxito";
  this.datosAlerta.mensajeError = "Hay un problema, Intentalo mas tarde";
  this.alertConfirmation();
}

/*
  "fechaRegistro": "2022-11-16T04:18:15.816Z",
  "fechaEntrada": "2022-11-16T04:18:15.816Z",
  "fechaSalida": "2022-11-16T04:18:15.816Z",
  "idVehiculo": "6373bc8f308ca0256004e038",
  "idEstado": "est1",
  "nivelAceite": "-",
  "nivelLiquidoFrenos": "-",
  "nivelRefrigerante": "-",
  "nivelLiquidoDireccion": "-",
  "idSede": "sed1",
  "idServicio": "ser01",
  "idMecanico": "string",
  "idEmpleado": "1212"
*/
guardarRevision=()=>{
  const datos = this.formGroupRevision.getRawValue();
  datos["fechaRegistro"] = new Date();
  datos["fechaEntrada"] = new Date();
  datos["fechaSalida"] = new Date();
  datos["idVehiculo"]= ""+this.idVehiculoSeleccionado;
  datos["nivelAceite"] = "-";
  datos["nivelLiquidoFrenos"] = "-";
  datos["nivelRefrigerante"] = "-";
  datos["nivelLiquidoDireccion"] = "-";
  datos["idMecanico"] = "63704c18f323b613140e097e";
  datos["idEmpleado"] = "637050c5cf797f17443a463d";
  
  this.serviceRequest.guardarPost("revisiones", JSON.stringify(datos)).subscribe(
    (data) => {
      Swal.fire('Exito', this.datosAlerta.mensajeExitoso, 'success');
    },
    (error) => {
      Swal.fire('Error', this.datosAlerta.mensajeError, 'error');
    }
  );
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
}
