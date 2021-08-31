import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionAdminComponent } from './transaction-admin.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';


const routes: Routes = [
  {
    path: '', 
    component: TransactionAdminComponent
    
  },
  { 
      path:':id/details',
      component:  TransactionDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionAdminRoutingModule { }
