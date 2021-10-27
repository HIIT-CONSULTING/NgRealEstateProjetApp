import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-sponsor",
  templateUrl: "./sponsor.component.html",
  styleUrls: ["./sponsor.component.scss"],
})
export class SponsorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  navLinks = [
    { path: "form", label: "Sponsor.title-form", icon: "list_alt" },
    { path: "list", label: "Sponsor.title-list", icon: "" },
  ];
}
