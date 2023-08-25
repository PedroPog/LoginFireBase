import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SessaoService } from './service/sessao.service';
import { Sessao } from './model/sessao.model';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "consolelog-guards";
  sessao$: Observable<Sessao | null>;


  constructor(
    private sessaoService: SessaoService,
    private auth: AuthService,
  ) {
    this.sessao$ = this.sessaoService.getSessao();
  }

  logout() {
    this.auth.logout();
  }
}
