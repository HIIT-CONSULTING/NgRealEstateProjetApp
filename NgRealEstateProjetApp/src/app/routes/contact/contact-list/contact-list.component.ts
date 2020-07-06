import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Contact } from "@shared/models/Agent.model";
import { ContactService } from "../contact.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.scss"],
})
export class ContactListComponent implements OnInit {
  contacts$: Observable<any[]>;
  contacts: any[];
  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contacts$ = this.contactService.getContacts();
    this.contactService.getContacts().subscribe((contacts) => {
      this.contacts = contacts;
      console.log("contacts", this.contacts);
    });
  }

  onClick() {
    this.router.navigate(["/contact/contactform"]);
  }
  Delete(id: number) {
    this.contactService
      .deleteContact(id)
      .subscribe((Response) => console.log(Response));
      this.contacts$ = this.contactService.getContacts();
      this.contactService.getContacts().subscribe((contacts) => {
        this.contacts = contacts;
        console.log("contacts", this.contacts);
      });
  }

  Update(id: number) {

    this.router.navigate(["/contact", id, "update"]);
  }
  details(id: number) {
    this.router.navigate(["/contact", id, "details"]);
  }
}
