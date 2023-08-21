import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  addUsuario(usuario: Usuario){
    usuario.id = this.afs.createId();
    return this.afs.collection('/Usuario').add(usuario);
  }

  getAllUsuario(){
    return this.afs.collection('/Usuario').snapshotChanges();
  }

  deleteUsuario(usuario: Usuario){
    return this.afs.doc('/Usuario/'+usuario.id).delete();
  }

  updateUsuario(usuario:Usuario){
    this.deleteUsuario(usuario);
    this.addUsuario(usuario);
  }
}
