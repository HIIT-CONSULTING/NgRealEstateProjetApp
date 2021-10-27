import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '@shared/services/transaction.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss'],
})
export class TransactionDetailsComponent implements OnInit {
  showSpinner = true;
  id: string;
  transaction: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.transactionService.getTransaction(this.id).subscribe((res) => {
      this.transaction = res;
      if (res != {}) this.showSpinner = false;
    });
  }
}
