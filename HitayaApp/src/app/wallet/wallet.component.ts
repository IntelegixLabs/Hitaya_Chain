import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

/*import { QrScannerComponent } from 'angular2-qrscanner';*/

import { ITransfer } from '../hitaya-interfaces/ITransfer';
import { IContact } from '../hitaya-interfaces/IContact';
import { ITransaction } from '../hitaya-interfaces/ITransaction';
import { IUserDetails } from '../hitaya-interfaces/IUserDetails';
import { SmartContractServicesService } from '../hitaya-services/smart-contract-services/smart-contract-services.service';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})

export class WalletComponent implements OnInit {

  userName: string;
  userLayout: boolean = false;
  commonLayout: boolean = false;

  recive: boolean = false;
  send: boolean = false;
  buy: boolean = false;
  swap: boolean = false;
  add_contacts: boolean = false;

  hat_balance: any = 0;
  erc20_symbol: any = "NA";
  user_address: any = 0;
  user_balance: any = 0;

  listtransaction = [];

  public myAngularxQrCode: string = null;


  userForm: FormGroup;
  user: any;

  transfer: ITransaction;
  contact: IContact;
  contact_list = [];

  curr_user_name: String = "UnRegistered";

  amount_field: any = 0;
  amount : number = 0;
  rate_field: number = 0.0;
  rate: number = 0.0;
  time_value_field: number = 0;
  time_duration_type_field: number = 0;
  time_value: number = 0;
  time_duration_type: string = '';
  interest_amount: any = 0;
  total_amount: any = 0;


  constructor(private fb: FormBuilder, private hit_token_servie: SmartContractServicesService, private router: Router) {

    this.userName = sessionStorage.getItem('userName');
    this.myAngularxQrCode = this.userName;
    console.log(this.userName);
    if (this.userName != null) {
      this.userLayout = true;
    }
    else {
      this.commonLayout = true;
    }
    this.getAccountAndBalance();

  }

  ngOnInit(): void {

    this.getContacts();
    this.getusername();
    this.gettransaction();
    this.geterc20token();
    this.geterc20sysnbol();

  }


  addcontact() {
    if (this.add_contacts == false) {
      this.add_contacts = true;
    }
    else {
      this.add_contacts = false;
    }

  }

  ReciveQr() {
    if (this.recive == true) {
      this.recive = false;
    }
    else {
      this.recive = true;
      this.send = false;
      this.buy = false;
      this.swap = false;
    }
  }

  sendtoken() {
    if (this.send == true) {
      this.send = false;
    }
    else {
      this.send = true;
      this.recive = false;
      this.buy = false;
      this.swap = false;
    }

  }

  buytoken() {
    if (this.buy == true) {
      this.buy = false;
    }
    else {
      this.buy = true;
      this.send = false;
      this.recive = false;
      this.swap = false;
    }

  }

  swaptoken() {
    if (this.swap == true) {
      this.swap = false;
    }
    else {
      this.swap = true;
      this.send = false;
      this.buy = false;
      this.recive = false;
    }

  }

  calcTotalLoanPay(amount: number, rate: number, time_value: number, time_duration_type: string) {


    var p = 0, r = 0, t = 0, time = 0, time_statement = '';

    p = amount;

    this.amount_field = amount;
    this.rate = rate;
    this.time_value = time_value;
    this.time_duration_type = time_duration_type;

    // Converting rate to decimal
    r = rate / 100

    if(p == 0 || p == undefined)
    {
      this.amount_field = '--';
    }
    // Getting Time Duration Type
    if (time_duration_type == 'days') {
      time = time_value / 365;

      if (time_value > 1) {
        time_statement = " Days";
      }
      else {
        time_statement = " Day";
      }
    }
    else if (time_duration_type == 'weeks') {
      time = time_value / 52;

      if (time_value > 1) {
        time_statement = " Weeks";
      }
      else {
        time_statement = " Week";
      }
    }
    else if (time_duration_type == 'months') {
      time = time_value / 12;

      if (time_value > 1) {
        time_statement = " Months";
      }
      else {
        time_statement = " Month";
      }
    }
    else if (time_duration_type == 'years') {
      time = time_value;

      if (time_value > 1) {
        time_statement = " Years";
      }
      else {
        time_statement = " Year";
      }
    }

    t = time;

    this.total_amount = (p * (1 + (r * t)));
    this.interest_amount = this.total_amount - p;

    if(this.total_amount == 0 || this.total_amount == undefined) {
      this.total_amount = '--';
    }

    if(this.interest_amount == 0 || this.interest_amount == undefined) {
      this.interest_amount = '--';
    }
  }





  getAccountAndBalance = () => {
    const that = this;
    this.hit_token_servie.getUserBalance().
      then(function (retAccount: any) {
        that.user_address = retAccount.account;
        that.user_balance = retAccount.balance / (10 ** 18);
        console.log('transfer.components :: getAccountAndBalance :: that.user');
        console.log(that.user);
      }).catch(function (error) {
        console.log(error);
      });
  }

  //getHatBalance = () => {
  //  const that = this;
  //  console.log(this.user.address);
  //  this.hat_token_servie.view_HAT_balance(this.userName).
  //    then(function (balance: any) {
  //      that.hat_balance = balance;
  //      console.log(that.hat_balance);
  //      console.log("IT Worked HAT BALANCE");
  //    }).catch(function (error) {
  //      console.log(error);
  //    });
  //}

  getContacts = () => {
    const that = this;
    this.hit_token_servie.view_contacts().
      then(function (employee_data: any) {
        for (var i = 0; i < employee_data.length; i++) {
          console.log(employee_data[i][0]);
          if (that.userName == employee_data[i][0]) {
            that.contact_list.push(employee_data[i]);
          }
        }

        console.log("IT Worked LA LA");
      }).catch(function (error) {
        console.log(error);
      });
  }

  gettransaction = () => {
    const that = this;
    this.hit_token_servie.view_Transaction().
      then(function (trans_data: any) {
        for (var i = 0; i < trans_data.length; i++) {
          if (that.userName == trans_data[i][0] || that.userName == trans_data[i][1]) {
            that.listtransaction.push(trans_data[i]);
          }
        }

        console.log("Transaction List Fetched From Blockchain");
      }).catch(function (error) {
        console.log(error);
      });
  }

  submitTransferForm(form: NgForm) {
    console.log('transfer.components :: submitForm :: this.userForm.value');
    this.transfer = { sender: this.user_address, reciver: form.value.crypto, amount: form.value.amount };
    // TODO: service call
    this.hit_token_servie.transfer(this.transfer, form.value.typex).
      then(function () { }).catch(function (error) {
        console.log(error);
      });
  }


  burn(form: NgForm) {
    console.log('transfer.components :: submitForm :: this.userForm.value');
    // TODO: service call
    this.hit_token_servie.burn(form.value.amt, this.user_address).
      then(function () { }).catch(function (error) {
        console.log(error);
      });
  }



  SubmitAddContact(form: NgForm) {
    console.log("Add Contact Fuction Started");
    this.contact = { owner: this.user_address, contactid: form.value.crypto, name: form.value.name, type: form.value.type };
    console.log(this.contact);
    this.hit_token_servie.add_contact(this.contact).
      then(function () { }).catch(function (error) {
        console.log(error);
      });
  }


  getusername = () => {
    console.log("Get user name function started");
    const that = this;
    this.hit_token_servie.view_Users().
      then(function (employee_data: any) {
        for (var i = 0; i < employee_data.length; i++) {
          console.log(employee_data[i][0]);
          if (that.userName == employee_data[i][1]) {
            that.curr_user_name = String(employee_data[i][0]);
            that.hat_balance = employee_data[i][3];
            console.log(that.curr_user_name);
            console.log("Employee Data");
            console.log(employee_data);
          }
        }
      }).catch(function (error) {
        console.log(error);
      });
  }

  geterc20token = () => {
    console.log("Get ERC20 Balance");
    const that = this;
    console.log(that.user_address);
    console.log("User Address");
    this.hit_token_servie.view_HAT_balance(that.user_address).
      then(function (balance: any) {
        that.hat_balance = balance;
        console.log(that.hat_balance);
      }).catch(function (error) {
        console.log(error);
      });
  }

  geterc20sysnbol = () => {
    console.log("Get ERC20 Symbol");
    const that = this;
    this.hit_token_servie.view_symbol().
      then(function (symbol: any) {
        that.erc20_symbol = symbol;
        console.log(that.erc20_symbol);
      }).catch(function (error) {
        console.log(error);
      });
  }

}
