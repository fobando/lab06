import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { AtmoperationsComponent } from './components/atmoperations/atmoperations.component';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { MainopComponent } from './components/mainop/mainop.component';

import { TransGuardService } from './services/trans-guard.service';

const myRoutes: Routes = [

  { path : 'auth' , component : AuthenticateComponent },
  { path : '' , redirectTo : '/auth', pathMatch : 'full' },
  { path : 'mainoperation' , component : MainopComponent, canActivate: [TransGuardService],
      children: [
        { path : 'transactionlist' , component : TransactionListComponent, canActivate: [TransGuardService] },
        { path : 'operations' , component : AtmoperationsComponent }
      ]},
];

  @NgModule({
    imports: [ RouterModule.forRoot( myRoutes, { enableTracing: true })], // <-- debugging purposes only
    exports : [ RouterModule ]
})

export class AppRoutingModule {}
