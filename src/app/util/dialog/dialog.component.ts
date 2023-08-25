import { Usuario } from './../../model/usuario.model';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empresa } from 'src/app/model/empresa.model';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  salvarValue: string ='';
  emps: Empresa[]=[
    {
      id: "1",
      cnpj: "11.111.1111/1111-11",
      rasao: "TESTE 01",
    },
    {
      id: "1",
      cnpj: "22.222.2222/2222-22",
      rasao: "TESTE 02",
    },
  ]


  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private dataser: DataService,
  ){}

  onSalvar(){
    this.dataser.updateUsuario(this.data);
    //this.dataser.addEmpresa(this.emps);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
