import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { SessaoService } from './sessao.service';
import { of, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private sessaoService: SessaoService
  ) {}

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        //localStorage.setItem('token','true');
        this.simularChamadaAPI(email, password)?.subscribe({
          next: (resposta) => {
            this.sessaoService.salvarSessao(resposta);
            if (res.user?.emailVerified == true) {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/verify-email']);
            }
          },
          error: (erro) => {
            alert(erro);
            //this.formGroup.reset();
          },
        });
      },
      (err) => {
        alert('Erro');
        this.router.navigate(['/login']);
      }
    );
  }

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        alert('Registrando com sucesso!');
        this.router.navigate(['/login']);
        this.sendEmailForVarification(res.user);
      },
      (err) => {
        this.router.navigate(['/register']);
      }
    );
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
  sendEmailForVarification(user: any) {
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

  simularChamadaAPI(email: string, password: string) {
    return email === 'pevieiraf@gmail.com' && password === '123456'
      ? // Usuário válido
        of({
          accessToken: 'adm',
          nome: 'Pedro Henrique',
        })
      : // Usuário inválido
        throwError(() => {
          const error: any = new Error(`Usuário ou senha inválido`);
          error.timestamp = Date.now();
          return error;
        });
  }
}
