import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '@shared/services/transaction.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private transactionService: TransactionService,
  ) {}
  
  
  @ViewChild(MatPaginator, { static: true }) pager: MatPaginator;
  transactions: any[];

  displayedColumns = [
    "Date De Création",
    "Nom d'agent 2",
    "Price",
    "Typologie",
    "CompromiseDate",
    "ProvisionalActDate",
    "OfficialActDate",
    "Notary",
    "Type",
    "Status",
    "Menu",
  ];

  ngOnInit(): void {
    this.transactionService.getAllTransaction().subscribe((res) => {
      this.transactions = res['hydra:member'];
    });
  }

  Onpage() {
    
  }
  
  onClick() {
    this.router.navigate(["transaction/addtransaction"]);
  }

  details(id: number) {
    this.router.navigate(["/transaction", id, "details"]);
  }
}
