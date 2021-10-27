import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TransactionAdminRoutingModule } from "./transaction-admin-routing.module";
import { TransactionAdminComponent } from "./transaction-admin.component";
import { TransactionDetailsComponent } from "./transaction-details/transaction-details.component";
import { SharedModule } from "@shared/shared.module";

@NgModule({
  declarations: [TransactionAdminComponent, TransactionDetailsComponent],
  imports: [CommonModule, TransactionAdminRoutingModule, SharedModule],
})
export class TransactionAdminModule {}
