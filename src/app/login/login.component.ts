import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from "@angular/router";
import { of, throwError } from "rxjs";
import { SessaoService } from "../service/sessao.service";
import {
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //email: string= '';
  //password: string= '';

  formGroup: FormGroup = new FormGroup({
    email: new FormControl<string>("", {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email,
      ],
    }),
    password: new FormControl<string>("", {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(6),
      ],
    }),
  });

  constructor(
    private auth: AuthService,
    private sessaoService: SessaoService,
  ){}

  ngOnInit(){

  }
  login(){
    if(this.formGroup.invalid){
      return;
    }
    const { email, password } = this.formGroup.value;

    this.auth.login(email,password);
  }
}
