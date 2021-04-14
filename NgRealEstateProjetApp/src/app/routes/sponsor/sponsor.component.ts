import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.scss']
})
export class SponsorComponent implements OnInit {

  
  constructor(
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
  }

  navLinks = [
    { path: 'form', label: 'Sponsor.title-form',icon:'list_alt' },
    { path: 'list', label: 'Sponsor.title-list',icon:'' },
  ];

}
