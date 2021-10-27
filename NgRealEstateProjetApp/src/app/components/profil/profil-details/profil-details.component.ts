import { Component, OnInit } from "@angular/core";
import { Agent } from "@shared/models/Agent.model";
import { LoginService } from "@shared/services/login.service";

@Component({
  selector: "app-profil-details",
  templateUrl: "./profil-details.component.html",
  styleUrls: ["./profil-details.component.scss"],
})
export class ProfilDetailsComponent implements OnInit {
  user: Agent;
  isMen: boolean;
  showSpinner: boolean = false;
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.user = this.loginService.getCurentUser();
    this.isMen = this.user.gender.name == "Homme" ? true : false;
  }
}
