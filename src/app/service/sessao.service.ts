import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Sessao } from "../model/sessao.model";


const CHAVE_ACCESS_TOKEN = "auth";


@Injectable({
  providedIn: 'root'
})
export class SessaoService {

  private sessao = new BehaviorSubject<Sessao | null>(null);


  constructor() {
    this.restaurarSessao();
  }
  restaurarSessao() {
    const jsonSessao = sessionStorage.getItem(
      CHAVE_ACCESS_TOKEN
    );

    if (!jsonSessao) {
      return;
    }

    const dadosSessao: Sessao = JSON.parse(jsonSessao);
    this.sessao.next(dadosSessao);
  }

  salvarSessao(dadosSessao: Sessao) {
    sessionStorage.setItem(
      CHAVE_ACCESS_TOKEN,
      JSON.stringify(dadosSessao)
    );
    this.sessao.next(dadosSessao);
  }

  limparSessao() {
    sessionStorage.clear();
    this.sessao.next(null);
  }

  getSessao() {
    return this.sessao.asObservable();
  }

  estaLogado() {
    return this.sessao.value !== null;
  }

  getTipoUsuario()  {
    return "";
  }
}
