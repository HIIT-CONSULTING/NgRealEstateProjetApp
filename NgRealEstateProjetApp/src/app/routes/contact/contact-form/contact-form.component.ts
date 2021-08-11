import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {
	Agent,
	Gender,
	City,
	Country,
	Contact_type,
} from '@shared/models/Agent.model';
import { SponsorService } from '@shared/services/sponsor.service';
import { ContactService } from '@shared/services/contact.service';
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment';

@Component({
	selector: 'app-contact-form',
	templateUrl: './contact-form.component.html',
	styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
	agents$: Observable<Agent[]>;
	agents: Agent[] = [];
	gender$: Observable<Gender[]>;
	city$: Observable<City[]>;
	country$: Observable<Country[]>;
	contact_type$: Observable<Contact_type[]>;

	constructor(
		private fb: FormBuilder,
		private translate: TranslateService,
		private route: ActivatedRoute,
		private router: Router,
		private sponsorService: SponsorService,
		private contactService: ContactService,
		private snackBar: MatSnackBar,
		private dateAdapter: DateAdapter<Date>
	) {
		this.dateAdapter.setLocale('en-GB');
	}

	form = this.fb.group({
		gender: {
			id: null,
			name: null,
		},
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
		email: [null, Validators.email],
		telephone: [
			null,
			[
				Validators.required,
				Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
			],
		],
		birthDay: null,
		societe: null,
		channelType: null,
		notes: null,

		address: this.fb.group({
			description: [null],
			city: [null, Validators.required],
			country: [null, Validators.required],
		}),
	});
	formatDate() {
		this.form
			.get('birthDay')
			.setValue(moment(this.form.get('birthDay').value).format('YYYY-MM-DD'));
	}
	onSubmit() {
		this.formatDate();
		this.contactService.addContact(this.form.value).subscribe(
			(data) => {
				this.snackBar.open('le contact est ajouté avec succès!', '', {
					duration: 1000,
					panelClass: ['blue-snackbar'],
					verticalPosition: 'top',
					horizontalPosition: 'end',
				});
				setTimeout(() => {
					this.router.navigate(['/contact/contactlist']);
				}, 2000);
			},
			(error) => {
				this.snackBar.open("l'email ou le numéro de téléphone  existe déjà", '', {
					duration: 2000,
					panelClass: ['red-snackbar'],
					verticalPosition: 'top',
					horizontalPosition: 'end',
				});
			}
		);
	}

	OnCountry(id: number) {
		this.city$ = this.sponsorService.getCitys(id);
	}

	ngOnInit() {
		this.gender$ = this.sponsorService.getGender();
		this.country$ = this.sponsorService.getCountry();
	}

	getErrorMessage(form: FormGroup) {
		return form.get('email').hasError('required')
			? 'enter an email'
			: form.get('email').hasError('email')
			? this.translate.instant('searchAgent.form.email.error')
			: '';
	}
}
