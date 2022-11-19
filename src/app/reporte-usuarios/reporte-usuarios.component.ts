import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ServiciosServidorService } from "../servicios-servidor.service";

interface Usuario {
  idUsuario: string;
  nombres: string;
  apellidos: number;
  idTipoUsuario: string;
  idEstado: string;
  correo: string;
  telefono: string;
  fechaNacimiento: string;
}

@Component({
  selector: 'app-reporte-usuarios',
  templateUrl: './reporte-usuarios.component.html',
  styleUrls: ['./reporte-usuarios.component.scss']
})
export class ReporteUsuariosComponent implements OnInit {
  listOfData: Usuario[] = [];
  campoSeleccionado:String = "";
  campoBusqueda:String = "";

  constructor(private serviceRequest: ServiciosServidorService) { }

  ngOnInit(): void {
    this.getUsers("");
  }
  getUsers(filter: any): void {
    this.serviceRequest.listarGet("usuarios", filter).subscribe(
      (data) => {
        this.listOfData = data;
      },

      (error) => {
        console.log(error);
      }
    );
  }

  buscarUsuarioPorCedula(){
    this.serviceRequest.listarUsuarioPorCedula("usuarios",this.campoBusqueda).subscribe(
      (data) => {
        this.listOfData = data;
      },

      (error) => {
        console.log(error);
      }
    );
  }
  buscarUsuariosPorTipo(){
    this.serviceRequest.listarUsuariosPorTipo("usuarios",this.campoSeleccionado).subscribe(
      (data) => {
        this.listOfData = data;
      },

      (error) => {
        console.log(error);
      }
    );
  }
}
