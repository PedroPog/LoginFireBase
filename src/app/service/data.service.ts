import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private afs: AngularFirestore,
  ) {
   }

  addUsuario(usuario: Usuario){
    usuario.id = this.afs.createId();
    return this.afs.collection('/Usuario/').add(usuario);
  }
  addEmpresa(usuario: Usuario){
    return this.afs.doc('/Usuario/'+usuario.id).update(usuario);
  }

  getUsuario(usuario: Usuario){
    return this.afs.doc('/Usuario/'+usuario.email).get;
  }

  getTipo(email: string) {
    return this.afs.doc('/Usuario/' + email).valueChanges();
  }

  getAllUsuario(){
    return this.afs.collection('/Usuario').snapshotChanges();
  }

  deleteUsuario(usuario: Usuario){
    return this.afs.doc('/Usuario/'+usuario.id).delete();
  }
  updateUsuario(usuario: Usuario){
    return this.afs.doc('/Usuario/'+usuario.id).update(usuario);
  }
  getUsuarioByEmail(email: string) {
    return this.afs.doc('/Usuario/' + email).get();
  }

  receberTipo(email: string) {
    this.afs.collection('/Usuario', ref => ref.where('email', '==', email))
      .valueChanges()
      .subscribe((dados: any[]) => {
        if (dados.length > 0) {
          const usuario = dados[0];
          const usuarioId = usuario.id;
          var nome = this.afs.collection('/Usuario').doc(usuarioId);
          nome.get().subscribe((doc: { exists: any; data: () => any; })=>{
            var tipo = doc.data().tipo
            localStorage.setItem("tipo",tipo);
            console.log("Salvo "+localStorage.getItem("tipo"));
          })
        } else {
          console.log('Nenhum usuário encontrado com o email fornecido.');
        }
      });
  }
    /*var nome = this.afs.collection('/Usuario').doc();
    nome.get().subscribe((doc: { exists: any; data: () => any; })=>{
      var tipo = doc.data().tipo
      localStorage.setItem("tipo",tipo);
    })*/
    //return;

  /*receberTipo(){
    var docRef = this.afs.collection('/Usuario').doc('CMFfBV5bAlDLMEHjvO5V');

    docRef.get().subscribe((doc)=>{
      if(doc.exists){
        console.log(doc.data());
        console.log(localStorage.getItem("tipo"));
      }else{
        console.log("Erro no carregamento do documento!");
      }
    });
  }*/
}
