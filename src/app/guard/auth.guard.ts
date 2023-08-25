import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { SessaoService } from "../service/sessao.service";
import { DataService } from "../service/data.service";
import { Usuario } from "../model/usuario.model";


@Injectable({
  providedIn: "root",
})
export class AuthGuard{
  constructor(
    private sessionService: SessaoService,
    private router: Router,
    private data: DataService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Se o usuário estiver sem sessão,
    // o enviamos para a tela de login
    if (!this.sessionService.estaLogado()) {
      return this.router.parseUrl("/login");
    }

    var user = localStorage.getItem("tipo");
    console.log(user);


    switch (user) {
      case "admin":
        // Rotas permitidas para o usuário admin
        if (route.data["roles"] && route.data["roles"].includes("admin")) {
          return true;
        }
        break;

      case "user":
        // Rotas permitidas para o usuário comum
        if (route.data["roles"] && route.data["roles"].includes("user")) {
          return true;
        }
        break;

      case "guest":
        // Rotas permitidas para o usuário convidado
        if (route.data["roles"] && route.data["roles"].includes("guest")) {
          return true;
        }
        break;

    }

    // Se o usuário não tiver permissão, redirecione para uma página de acesso negado
    return this.router.parseUrl("/error");
  }
};
