declare const particlesJS: any;

import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { particlesConfig } from "../../../assets/data/particles";
import { LoginService } from "@core/login.service";
import { first } from "rxjs/operators";
import { throwError } from 'rxjs';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  reactiveForm: FormGroup;
  returnUrl: string;
  error: {};
  loginError: string="";
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    this.reactiveForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    particlesJS("particles", particlesConfig, () => {
      console.log("callback - particles.js config loaded");
    });
  }
  // getter pratique pour un accès facile aux champs de formulaire

  get f() {
    return this.reactiveForm.controls;
  }

  login() {
    debugger;
    this.loginService.login(this.reactiveForm.value).subscribe(
      
      (data) => {
        
        console.log('data',data);
       
        if (this.loginService.isLoggedIn()) {
          
          this.router.navigate(["/annuaire"]);
        } 
        else {
          this.router.navigate(["/login"]);

        }
      },
     
      (error)=>{
      
      this.loginError = "email or password is incorrect.";
      console.log(this.loginError);
      return throwError(error);
    }
    );
  }
}
