import { TransactionComponent } from "./transaction.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TransactionDetailsComponent } from "./transaction-details/transaction-details.component";
import { TransactionFormComponent } from "./transaction-form/transaction-form.component";
import { TransactionListComponent } from "./transaction-list/transaction-list.component";

const routes: Routes = [
  {
    path: "",
    component: TransactionComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "addtransaction",
      },
      { path: "transactionlist", component: TransactionListComponent },
      { path: "addtransaction", component: TransactionFormComponent },
    ],
  },
  {
    path: ":id/details",
    component: TransactionDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionRoutingModule {}
