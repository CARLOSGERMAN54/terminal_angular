import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiciosServidorService {

  constructor(private http: HttpClient) { }

  guardarPost(ruta: string, data: string): Observable<any> {
    let url = 'http://localhost:3000/' + ruta;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const httpOptions = {
      headers,
    };
    return this.http.post(url, data, httpOptions);
  }

  listarGet(model: string, dataFilter?: any): Observable<any> {
    let url = 'http://localhost:3000/' + model;
    if (dataFilter) {
      //
      const filter = { where: { placa: { like: dataFilter, options: 'i' } } };
      const params = new HttpParams().append('filter', JSON.stringify(filter));
      const httpOptions = {
        params,
      };
      return this.http.get(url, httpOptions);
    } else {
      return this.http.get(url);
    }
  }

  listarUsuarioPorCedula(model: string,dataFilter?: any): Observable<any> {
    let url = 'http://localhost:3000/' + model;
    if (dataFilter) {
      //
      const filter = { where: { idUsuario: { like: dataFilter, options: 'i' } } };
      const params = new HttpParams().append('filter', JSON.stringify(filter));
      const httpOptions = {
        params,
      };
      return this.http.get(url, httpOptions);
    } else {
      return this.http.get(url);
    }
  }

  listarUsuariosPorTipo(model: string,dataFilter?: any): Observable<any> {
    let url = 'http://localhost:3000/' + model;
    if (dataFilter) {
      //
      const filter = { where: { idTipoUsuario: { like: dataFilter, options: 'i' } } };
      const params = new HttpParams().append('filter', JSON.stringify(filter));
      const httpOptions = {
        params,
      };
      return this.http.get(url, httpOptions);
    } else {
      return this.http.get(url);
    }
  }

  //actualizar revisiones
  patchData(model: string, data: string, code: string): Observable<any> {
    let url = 'http://localhost:3000/' + model + '/' + code;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const httpOptions = {
      headers,
    };
    return this.http.patch(url, data, httpOptions);
  }




}
