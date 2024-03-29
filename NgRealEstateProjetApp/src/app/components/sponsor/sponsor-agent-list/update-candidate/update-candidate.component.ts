import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Agent,
  Candidate,
  Gender,
  City,
  Country,
} from '@shared/models/Agent.model';
import { SponsorService } from '@shared/services/sponsor.service';
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment';

@Component({
  selector: 'app-update-candidate',
  templateUrl: './update-candidate.component.html',
  styleUrls: ['./update-candidate.component.scss'],
})
export class UpdateCandidateComponent implements OnInit {
  id: number;
  candidate$: Observable<Candidate>;
  candidate: Candidate;
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
    private snackBar: MatSnackBar,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });

    this.sponsorService.getCandidate(this.id).subscribe((user) => {
      this.city$ = this.sponsorService.getCitys(user.address.country.id);
      this.form.setValue({
        firstname: user.firstname,
        lastname: user.lastname,
        cin: user.cin,
        email: user.email,
        telephone: user.telephone,
        birthDay: user.birth_day,
        address: {
          description: user.address.description ?? '',
          secondAddress: user.address.second_address ?? '',
          zipCode: user.address.zip_code ?? '',
          country: user.address.country.id,
          city: user.address.city.id,
        },
        gender: user.gender.id,
      });
    });

    this.gender$ = this.sponsorService.getGender();
    this.country$ = this.sponsorService.getCountry();
  }

  OnCountry(id: number) {
    this.city$ = this.sponsorService.getCitys(id);
  }

  form = this.fb.group({
    firstname: [
      null,
      [
        Validators.required,
        Validators.pattern(
          /^([a-zA-Zàáâçèéêòóôùúû]{1,}\s?'?-?_?[a-zA-Zàáâçèéêòóôùúû]{2,}(\s?'?-?_?[a-zA-Zàáâçèéêòóôùúû]{2,})?$)/
        ),
      ],
    ],
    lastname: [
      null,
      [
        Validators.required,
        Validators.pattern(
          /^([a-zA-Zàáâçèéêòóôùúû]{1,}\s?'?-?_?[a-zA-Zàáâçèéêòóôùúû]{2,}(\s?'?-?_?[a-zA-Zàáâçèéêòóôùúû]{2,})?$)/
        ),
      ],
    ],
    cin: [null, Validators.required],
    email: [null, Validators.email],
    telephone: [
      null,
      [
        Validators.required,
        Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
      ],
    ],
    birthDay: null,
    address: this.fb.group({
      description: null,
      zipCode: null,
      secondAddress: null,
      city: null,
      country: null,
    }),
    gender: null,
  });

  onSubmit() {
    this.form
      .get('birthDay')
      .setValue(moment(this.form.get('birthDay').value).format('YYYY-MM-DD'));
    this.sponsorService.update(this.form, this.id).subscribe(
      (data) => {
        this.snackBar.open('le candidat est modifié avec succès!', '', {
          duration: 1000,
          panelClass: ['blue-snackbar'],
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
        setTimeout(() => {
          this.router.navigate(['/sponsorship/list']);
        }, 2000);
      },

      (error) => {
        this.snackBar.open('veuillez vérifier vos informations!', '', {
          duration: 1000,
          panelClass: ['red-snackbar'],
          verticalPosition: 'top',
          horizontalPosition: 'end',
        });
      }
    );
  }
}
