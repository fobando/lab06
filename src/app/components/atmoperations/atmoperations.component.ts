import { Component, OnInit } from '@angular/core';
import { AtmServiceService } from '../../services/atm-service.service';
import { AtmResponseOperation,AtmResponseOperationBalance } from '../../models/atm.interface';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-atmoperations',
  templateUrl: './atmoperations.component.html',
  styleUrls: ['./atmoperations.component.css']
})
export class AtmoperationsComponent implements OnInit {

  public currentOperation   : string = '';
  public currentBalance     : number = 0;
  public atmResponse        : AtmResponseOperation = <AtmResponseOperation>{};
  public atmResponseBalance : AtmResponseOperationBalance = <AtmResponseOperationBalance>{};

  public operation: number = 0;
  public theForm: FormGroup;

  constructor(public atmService : AtmServiceService,
  public route : ActivatedRoute) { }

  ngOnInit() {

        let acctNumber = this.atmService.getAccountNumber();

        this.theForm = new FormGroup({
          amount : new FormControl(0, Validators.required)
        });

        this.route.params.subscribe(data => {

            console.log('received parameter', data['arg']);

               switch (data['arg']) {
                     case 'deposit'   : { this.operation = 1; this.currentOperation = 'Making a Deposit'; this.theForm.reset(); break; }
                     case 'withdrawl' : { this.operation = 2; this.currentOperation = 'Making a Withdrawl'; this.theForm.reset(); break; }
               }
        });

  }

  doOperation(form: FormGroup) {

    if (this.operation === 1) {
      this.makeADeposit(this.atmService.getAccountNumber(), form.value.amount);
    } else {
      this.makeAWithdraw(this.atmService.getAccountNumber(), form.value.amount);
    }

    form.reset();
  }

  showBalance(acct: string) {

    this.currentOperation = 'Querying Balance';

    this.atmService.getCurrentBalance(acct).subscribe(result => {
      this.atmResponseBalance = result;
      this.currentBalance = result.currentBalance;
    });
  }

  makeADeposit(acct: string, amount: number) {

    this.atmService.deposit(acct, amount).then(result => {
      this.atmResponse = result;
      this.currentBalance = result.currentBalance;
    });
  }

  makeAWithdraw(acct: string, amount: number) {

    this.atmService.withDraw(acct, amount).then(result => {
      this.atmResponse = result;
      this.currentBalance = result.currentBalance;

    });
  }

  showPanel() {
    return this.atmService.accountValid;
  }

}
