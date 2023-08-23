import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { SessaoService } from "../service/sessao.service";


@Injectable({
  providedIn: "root",
})
export class AuthGuard{
  constructor(
    private sessionService: SessaoService,
    private router: Router
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
    const user = this.sessionService.getTipoUsuario();
    console.log(user);

    switch (user) {
      case "admin":
        // Rotas permitidas para o usuário admin
        if (route.data["roles"] && route.data["roles"].includes("Admin")) {
          return true;
        }
        break;

      case "user":
        // Rotas permitidas para o usuário comum
        if (route.data["roles"] && route.data["roles"].includes("User")) {
          return true;
        }
        break;

      case "guest":
        // Rotas permitidas para o usuário convidado
        if (route.data["roles"] && route.data["roles"].includes("Guest")) {
          return true;
        }
        break;

      default:
        return this.router.parseUrl("/error");
    }

    // Se o usuário não tiver permissão, redirecione para uma página de acesso negado
    return this.router.parseUrl("/error");
  }
};
