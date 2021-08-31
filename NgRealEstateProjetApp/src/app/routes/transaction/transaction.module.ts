import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionComponent } from './transaction.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { SharedModule } from '@shared/shared.module';
import { TransactionListComponent } from './transaction-list/transaction-list.component';

const COMPONENTS = [TransactionComponent, TransactionFormComponent, TransactionDetailsComponent, TransactionListComponent];
const COMPONENTS_DYNAMIC = [];
@NgModule({
  imports: [CommonModule, SharedModule, TransactionRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC
})
export class TransactionModule { }
