import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.scss']
})
export class SponsorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  navLinks = [
    { path: 'form', label: 'Faire une demande de parrainage',icon:'list_alt' },
    { path: 'list', label: 'Liste des candidatures',icon:'' },
  ];

}
