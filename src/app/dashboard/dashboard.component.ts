import { Component, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Usuario } from '../model/usuario.model';
import { DataService } from '../service/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../util/dialog/dialog.component';
import { Empresa } from '../model/empresa.model';
import { getAuth } from 'firebase/auth';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  DATABASE: Usuario[]= [];
  displayedColumns: string[] = [
    'id',
    'name',
    'tipo',
    'email',
  ];
  datalist = new MatTableDataSource<Usuario>(this.DATABASE);


  teste: string = '';

  usuarioList: Usuario[]=[];
  usuarioObj: Usuario = {
    id: '',
    name: '',
    tipo: '',
    email: '',
    cnpj: '',
  }
  id : string = '';
  name: string = '';
  tipo: string = '';
  email:string= '';

  constructor(
    private auth: AuthService,
    private data: DataService,
    public dialog: MatDialog,
  ){
    this.list();
  }
  ngOnInit(): void {
    this.getAllUsuario();
    //this.data.receberTipo();
  }

  list(){
    return this.data.getAllUsuario().subscribe((resultado) =>{
      this.DATABASE = resultado.map((e:any) =>{
        const data  = e.payload.doc.data();
        data.id = e.payload.doc.id;
        this.datalist = new MatTableDataSource<Usuario>(this.DATABASE);
        console.log("passou aqui")
        return data;
      });

    })
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

  /*resetForm(){
    this.id = '';
    this.name = '';
    this.tipo= '';
  }*/


  addUsuario(){
    if(this.name == '' || this.tipo == ''){
      alert('Fill all input fields');
    }
    this.usuarioObj.id = '';
    this.usuarioObj.name = this.name;
    this.usuarioObj.tipo = this.tipo;


    this.data.addUsuario(this.usuarioObj);
  }

  updateUsuario(){

  }

  deleteUsuario(usuario:Usuario){
    if(window.confirm('Os seguintes dados serão deleteados '+usuario.name+' tem certeza desse procedimento? ')){
      this.data.deleteUsuario(usuario);
    }
  }

  openEdit(usuario:Usuario){
    const dialogRef = this.dialog.open(DialogComponent,{
      data: usuario,

    });
    dialogRef.afterClosed().subscribe(result =>{
      console.log(`Dialog result: ${result}`);
    })
  }
}
