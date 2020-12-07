import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent{


  navLinks = [
    { path: 'contactform', label: 'Créer un nouveau contact',icon:'list_alt' },
    { path: 'contactlist', label: 'Liste des contacts',icon:'' },
  ];
}

