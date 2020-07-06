import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SponsorService } from "app/routes/sponsor/sponsor.service";
import { Observable } from "rxjs";
import {
  Candidate,
  Agent,
  Gender,
  City,
  Country,
  Contact,
  Contact_type,
} from "@shared/models/Agent.model";
import { ContactService } from "../contact.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-update-contact",
  templateUrl: "./update-contact.component.html",
  styleUrls: ["./update-contact.component.scss"],
})
export class UpdateContactComponent implements OnInit {
  id: number;
  contact$: Observable<Contact>;
  contact: Contact;
  agents$: Observable<Agent[]>;
  agents: Agent[] = [];
  gender$: Observable<Gender[]>;
  city$: Observable<City[]>;
  country$: Observable<Country[]>; 
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sponsorService: SponsorService,
    private contactService: ContactService
  ) {}



  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params["id"];
    });

    this.gender$ = this.sponsorService.getGender();
    this.sponsorService.getGender().subscribe((gender) => console.log(gender));

    this.city$ = this.sponsorService.getCity();
    this.sponsorService.getCity().subscribe((city) => console.log(city));

    this.country$ = this.sponsorService.getCountry();
    this.sponsorService
      .getCountry()
      .subscribe((country) => console.log(country));

    this.contactService
      .getContact(this.id)
      .pipe(first())
      .subscribe((user) => {
        console.log(user);
        this.contact = user;
        // user = user;
        this.form.setValue({
          gender: user.gender,
          firstname: user.firstname,
          lastname: user.lastname,
          telephone: user.telephone,
          email: user.email,
          address: {
            city: { id: user.address.city.id, name: user.address.city.name },
            country: user.address.country,
            description: user.address.description,
          },
          birthDay: user.birth_day,
        });
      });
  }

  form = this.fb.group({
    gender: { id: null, name: null },
    firstname: null,
    lastname: null,
    email: [null, Validators.email],
    telephone: [null, Validators.minLength(10)],
    birthDay: null,
    address: this.fb.group({
      description: null,
      city: { id: null, name: null },
      country: { id: null, name: null },
    }),
  });

  onSubmit() {
    this.contact["gender"] = this.form.get("gender").value;
    this.contact["firstname"] = this.form.get("firstname").value;
    this.contact["lastname"] = this.form.get("lastname").value;
    this.contact["telephone"] = this.form.get("telephone").value;
    this.contact["email"] = this.form.get("email").value;
    this.contact["address"] = this.form.get("address").value;
    console.log("ddd", this.contact);

    this.contactService
      .updateContact(this.contact, this.id)
      .subscribe((user) => {
        user = user;
      });

    this.router.navigate(["/contact/contactlist"]);
  }
}
