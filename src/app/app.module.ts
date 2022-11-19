import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ReporteUsuariosComponent } from './reporte-usuarios/reporte-usuarios.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { RegistroVehiculoComponent } from './registro-vehiculo/registro-vehiculo.component';
import { ReporteVehiculosComponent } from './reporte-vehiculos/reporte-vehiculos.component';
import { RegistroRevisionComponent } from './registro-revision/registro-revision.component';
import { ReporteRevisionesComponent } from './reporte-revisiones/reporte-revisiones.component';


registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegistroUsuarioComponent,
    ReporteUsuariosComponent,
    RegistroVehiculoComponent,
    ReporteVehiculosComponent,
    RegistroRevisionComponent,
    ReporteRevisionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzInputModule,
    FormsModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzIconModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzModalModule,
    NzTableModule,
    NzDividerModule

  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
