import { Component, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Usuario } from '../model/usuario.model';
import { DataService } from '../service/data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  teste: string = '';

  usuarioList: Usuario[]=[];
  usuarioObj: Usuario = {
    id: '',
    name: '',
    tipo: ''
  }
  id : string = '';
  name: string = '';
  tipo: string = '';

  constructor(
    private auth: AuthService,
    private data: DataService,
  ){}
  ngOnInit(): void {
    this.getAllUsuario();
  }


  getAllUsuario(){
    this.data.getAllUsuario().subscribe(res => {
      this.usuarioList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching student data');
    })
  }

  resetForm(){
    this.id = '';
    this.name = '';
    this.tipo= '';
  }


  addUsuario(){
    if(this.name == '' || this.tipo == ''){
      alert('Fill all input fields');
    }
    this.usuarioObj.id = '';
    this.usuarioObj.name = this.name;
    this.usuarioObj.tipo = this.tipo;


    this.data.addUsuario(this.usuarioObj);
    this.resetForm();
  }

  updateUsuario(){

  }

  deleteUsuario(usuario:Usuario){
    if(window.confirm('Os seguintes dados serão deleteados '+usuario.name+' tem certeza desse procedimento? ')){
      this.data.deleteUsuario(usuario);
    }

  }
}
