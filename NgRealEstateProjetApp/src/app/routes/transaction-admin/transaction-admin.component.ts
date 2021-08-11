import { Subject } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '@shared/services/transaction.service';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-transaction-admin',
	templateUrl: './transaction-admin.component.html',
	styleUrls: ['./transaction-admin.component.scss'],
})
export class TransactionAdminComponent implements OnInit {
	unsubscribe$: Subject<void>;
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private snackBar: MatSnackBar,
		private transactionService: TransactionService
	) {
		this.unsubscribe$ = new Subject();
	}

	@ViewChild(MatPaginator, { static: true }) pager: MatPaginator;
	transactions: any[];

	displayedColumns = [
		'Date De Création',
		'premier agent',
		'deuxième agent',
		'Price',
		'Typologie',
		'CompromiseDate',
		'ProvisionalActDate',
		'OfficialActDate',
		'Notary',
		'Type',
		'Status',
		'Menu',
	];

	ngOnInit(): void {
		this.transactionService.getAllTransaction().subscribe((res) => {
			this.transactions = res['hydra:member'];
		});
	}

	onClick() {}

	refus(id: number) {
		this.transactionService
			.updatTransaction({ status: 'refused' }, id)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((res) => {
				this.transactionService
					.getAllTransaction()
					.pipe(takeUntil(this.unsubscribe$))
					.subscribe(
						(res) => {
							this.snackBar.open('transaction est refusé!', '', {
								duration: 1000,
								panelClass: ['blue-snackbar'],
								verticalPosition: 'top',
								horizontalPosition: 'end',
							});
							this.transactions = res['hydra:member'];
						},
						(error) => {
							this.snackBar.open('veuillez vérifier vos connexions!', '', {
								duration: 1000,
								panelClass: ['red-snackbar'],
								verticalPosition: 'top',
								horizontalPosition: 'end',
							});
						}
					);
			});
	}

	accept(id: number) {
		this.transactionService
			.updatTransaction({ status: 'accepted' }, id)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe((res) => {
				this.transactionService
					.getAllTransaction()
					.pipe(takeUntil(this.unsubscribe$))
					.subscribe(
						(res) => {
							this.snackBar.open('transaction est accepté!', '', {
								duration: 1000,
								panelClass: ['blue-snackbar'],
								verticalPosition: 'top',
								horizontalPosition: 'end',
							});
							this.transactions = res['hydra:member'];
						},
						(error) => {
							this.snackBar.open('veuillez vérifier vos connexions!', '', {
								duration: 1000,
								panelClass: ['red-snackbar'],
								verticalPosition: 'top',
								horizontalPosition: 'end',
							});
						}
					);
			});
	}

	details(id: number) {
		this.router.navigate(['./', id, 'details'], { relativeTo: this.route });
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}
