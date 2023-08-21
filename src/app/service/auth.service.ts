import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { SessaoService } from './sessao.service';
import { of, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { DataService } from './data.service';
import { Usuario } from '../model/usuario.model';
import { Sessao } from '../model/sessao.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private sessaoService: SessaoService,
    private data: DataService
  ) {}


  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.simularChamadaAPI(email).subscribe({
          next: (resposta: Sessao) => {
            this.sessaoService.salvarSessao(resposta);
            if (res.user?.emailVerified === true) {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/verify-email']);
            }
          },
          error: (erro: any) => {
            alert(erro);
          },
        });
      })
      .catch((err) => {
        alert('Erro de login primaria');
        this.router.navigate(['/login']);
      });
  }

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        alert('Registrado com sucesso!');
        this.router.navigate(['/login']);
        this.sendEmailForVerification(res.user);
        const newUser: Usuario = {
          id: '',
          name: 'Temp',
          tipo: 'Guest',
          email: email,
        };
        this.data.addUsuario(newUser);
      })
      .catch((err) => {
        this.router.navigate(['/register']);
      });
  }

  logout() {
    this.fireauth.signOut().then(
      () => {
        //localStorage.removeItem('token');
        this.sessaoService.limparSessao();
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['/verify-email']);
      },
      (err) => {
        alert('Erro!');
      }
    );
  }
  sendEmailForVerification(user: any) {
    console.log(user);
    user.sendEmailVerification().then(
      (res: any) => {
        this.router.navigate(['/verify-email']);
      },
      (err: any) => {
        alert('Something went wrong. Not able to send mail to your email.');
      }
    );
  }

  private simularChamadaAPI(email: string) {

    return this.data.getUsuarioByEmail(email).pipe(
      switchMap((doc) => {
        let usuarioData = doc.data() as Usuario;
        console.log(email);

        if (email === usuarioData.email) {
          const resposta: Sessao = {
            accessToken: usuarioData.tipo,
            nome: usuarioData.name,
          };
          return of(resposta);
        } else {
          return throwError(() => {
            const error: any = new Error(`Usuário ou senha inválida`);
            error.timestamp = Date.now();
            return error;
          });
        }
      }),
      catchError((error: any) => {
        return throwError(() => {
          const customError: any = new Error(`Usuário não encontrado`);
          customError.timestamp = Date.now();
          return customError;
        });
      })
    );
  }
}


