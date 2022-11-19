import { Component,Output,EventEmitter, OnInit } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() eventoEstado = new EventEmitter<any>();
  value?: string;
  constructor() { }

  ngOnInit(): void {
  }




  ejecutarLogin():void{
    let obj = {
      nombre:"iniciar",
      estado:true
    }
    this.eventoEstado.emit(obj)

  }
  ejecutarRegistroUsuario():void{
    let obj = {
      nombre:"registro-usuario",
      estado:true
    }
    this.eventoEstado.emit(obj)
  }

}
