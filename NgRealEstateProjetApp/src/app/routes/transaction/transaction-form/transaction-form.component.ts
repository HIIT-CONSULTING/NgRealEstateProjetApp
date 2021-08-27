import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Mandat, Project } from '@shared/models/Agent.model';
import { LoginService } from '@shared/services/login.service';
import { MandatService } from '@shared/services/mandat.service';
import { NotaryService } from '@shared/services/notary.service';
import { TransactionService } from '@shared/services/transaction.service';
import { DialogContentProjectComponent } from 'app/components/dialog-content-project/dialog-content-project.component';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
})
export class TransactionFormComponent implements OnInit {
  mandats: Mandat[];
  mandat: Mandat;
  notarys: any;
  notary: any;
  showSpinner = true;
  typeTransaction: string[];
  listTypologie: string[];
  unsubscribe$: Subject<void>;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private transactionService: TransactionService,
    private notaryService: NotaryService,
    private dialog: MatDialog,
    private translate: TranslateService,
    private mandatService: MandatService
  ) {
    this.typeTransaction = ['achat', 'vente'];
    this.listTypologie = [
      'Demeure',
      'Domaine',
      'Ferme',
      'Maison de campagne',
      'Maison de village',
      'Maison de ville',
      'Maison traditionnelle',
    ];
    this.unsubscribe$ = new Subject();
    this.form = this.fb.group({
      type: [null], //"achat||vente",
      typologie: [null],
      price: [null],
      feesPaidBy: [null],
      quote: [null],
      companyBaseFees: [null],
      companyFullFees: [null],
      compromiseDate: [null],
      provisionalActDate: [null],
      officialActDate: [null],
      mandate: [null],
      notary: [null],
    });
  }

  ngOnInit(): void {
    this.mandatService
      .getAllMandats({ status: 'accepted', 'exists[transaction]': false })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.mandats = res['hydra:member'];
      });

    this.notaryService
      .getAllNotary()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.notarys = res['hydra:member'];
      });
  }
  openDialog() {
    this.dialog
      .open(DialogContentProjectComponent, {
        width: '600px',
        disableClose: true,
        data: {
          title: this.translate.instant('Transaction.title-dialog'),
          type: 'notary',
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.notaryService
          .getAllNotary()
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((res) => {
            this.notarys = res['hydra:member'];
          });
      });
  }
  OnClick() {}
  change(event) {
    if (event.isUserInput) {
      this.form
        .get('mandate')
        .setValue(`/api/v2/mandates/${event.source.value}`);
      this.mandatService
        .getMandat(event.source.value)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => {
          this.mandat = res;
        });
    }
  }
  selectNotary(event) {
    if (event.isUserInput) {
      this.notary = event.source.value;
      this.form.get('notary').setValue(event.source.value['@id']);
    }
  }
  details(id: number) {
    this.router.navigate(['/project', id, 'details']);
  }
  onSubmit() {
    this.transactionService
      .save(this.form.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (response) => {
          this.snackBar.open('transaction est ajouté avec succès!', '', {
            duration: 1000,
            panelClass: ['blue-snackbar'],
            verticalPosition: 'top',
            horizontalPosition: 'end',
          });
          setTimeout(() => {
            this.router.navigate(['/transaction/transactionlist']);
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
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
