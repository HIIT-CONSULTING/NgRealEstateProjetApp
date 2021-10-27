import { Component } from "@angular/core";

@Component({
  selector: "app-transaction",
  templateUrl: "./transaction.component.html",
  styleUrls: ["./transaction.component.scss"],
})
export class TransactionComponent {
  constructor() {}

  navLinks = [
    { path: "addtransaction", label: "Transaction.title", icon: "list_alt" },
    { path: "transactionlist", label: "Transaction.title-list", icon: "" },
  ];
}
