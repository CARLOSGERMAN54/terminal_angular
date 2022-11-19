import { Component } from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {LoginComponent} from "./login/login.component";
import {RegistroUsuarioComponent} from "./registro-usuario/registro-usuario.component";
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mostrarLogin:boolean = true;
  mostrarRegistroUsuarios:boolean = false;
  title = 'terminal-angular';

  interfazRegistroUsuarios = true;
  interfazReporteUsuarios = false;
  interfazRegistroVehiculo = false;
  interfazReporteVehiculos = false;
  interfazRegistroRevision = false;
  interfazReporteRevisiones = false;

  ejecutarEstado(e:any){
    if(e.nombre == "iniciar"){
      this.mostrarLogin = e.estado
    }
    if(e.nombre == "registro-usuario"){
      this.mostrarRegistroUsuarios = e.estado
      this.mostrarLogin = false;
    }
  }

  estadoComponente(interfaz:string):void{
    if(interfaz == "registro-usuarios"){
      this.interfazRegistroUsuarios = true;
      this.interfazReporteUsuarios = false;
      this.interfazRegistroVehiculo =false;
      this.interfazReporteVehiculos = false;
      this.interfazRegistroRevision = false;
      this.interfazReporteRevisiones = false;
    }
    if(interfaz == "reporte-usuarios"){
      this.interfazRegistroUsuarios = false;
      this.interfazReporteUsuarios =true;
      this.interfazRegistroVehiculo =false;
      this.interfazReporteVehiculos = false;
      this.interfazRegistroRevision = false;
      this.interfazReporteRevisiones = false;
    }
    if(interfaz == "registro-vehiculo"){
      this.interfazRegistroUsuarios = false;
      this.interfazReporteUsuarios =false;
      this.interfazRegistroVehiculo =true;
      this.interfazReporteVehiculos = false;
      this.interfazRegistroRevision = false;
      this.interfazReporteRevisiones = false;
    }
    if(interfaz == "reporte-vehiculos"){
      this.interfazRegistroUsuarios = false;
      this.interfazReporteUsuarios =false;
      this.interfazRegistroVehiculo =false;
      this.interfazReporteVehiculos = true;
      this.interfazRegistroRevision = false;
      this.interfazReporteRevisiones = false;
    }
    if(interfaz == "registro-revision"){
      this.interfazRegistroUsuarios = false;
      this.interfazReporteUsuarios =false;
      this.interfazRegistroVehiculo =false;
      this.interfazReporteVehiculos = false;
      this.interfazRegistroRevision = true;
      this.interfazReporteRevisiones = false;
    }
    if(interfaz == "reporte-revision"){
      this.interfazRegistroUsuarios = false;
      this.interfazReporteUsuarios =false;
      this.interfazRegistroVehiculo =false;
      this.interfazReporteVehiculos = false;
      this.interfazRegistroRevision = false;
      this.interfazReporteRevisiones = true;
    }
  }
}
