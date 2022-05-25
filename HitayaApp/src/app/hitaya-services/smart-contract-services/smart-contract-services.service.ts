import { Injectable } from '@angular/core';
import Web3 from "web3";

declare let require: any;
declare let window: any;
const tokenAbi = require('../../../../../truffle/build/contracts/HAT_TOKEN.json');

const contract = require('@truffle/contract');
const HAT_TOKEN = contract(tokenAbi);





@Injectable({
  providedIn: 'root'
})
export class SmartContractServicesService {

  private account: any = null;
  private enable: any;

  web3: any;
  accounts: Array<String>;


  constructor() {
    if (window.ethereum === undefined) {
      alert('Non-Ethereum browser detected. Install MetaMask');
    }
    else
    {
      if (typeof window.web3 !== 'undefined') {
        this.web3 = window.ethereum;
      } else {
        this.web3 = new Web3.providers.HttpProvider('http://localhost:8545');
      }
      console.log('smart.contarct.service :: constructor :: window.ethereum');
      window.web3 = new Web3(window.ethereum);
      console.log('smart.contract.service :: constructor :: this.web3');
      console.log(this.web3);
      this.enable = this.enableMetaMaskAccount();
    }
  }

  private async enableMetaMaskAccount(): Promise<any> {
    let enable = false;
    await new Promise((resolve, reject) => {
      enable = window.ethereum.eth_requestAccounts;
    });
    return Promise.resolve(enable);
  }

  private async getAccount(): Promise<any> {
    console.log('transfer.service :: getAccount :: start');
    if (this.account == null) {
      this.account = await new Promise((resolve, reject) => {
        console.log('transfer.service :: getAccount :: eth');
        console.log(window.web3.eth);
        window.web3.eth.getAccounts((err, retAccount) => {
          console.log('transfer.service :: getAccount: retAccount');
          console.log(retAccount);
          if (retAccount.length > 0) {
            this.account = retAccount[0];
            resolve(this.account);
          } else {
            alert('transfer.service :: getAccount :: no accounts found.');
            reject('No accounts found.');
          }
          if (err != null) {
            alert('transfer.service :: getAccount :: error retrieving account');
            reject('Error retrieving account');
          }
        });
      }) as Promise<any>;
    }
    return Promise.resolve(this.account);
  }

  public async getUserBalance(): Promise<any> {
    const account = await this.getAccount();
    console.log('transfer.service :: getUserBalance :: account');
    console.log(account);
    return new Promise((resolve, reject) => {
      window.web3.eth.getBalance(account, function (err, balance) {
        console.log('transfer.service :: getUserBalance :: getBalance');
        console.log(balance);
        if (!err) {
          const retVal = {
            account: account,
            balance: balance
          };
          console.log('transfer.service :: getUserBalance :: getBalance :: retVal');
          console.log(retVal);
          resolve(retVal);
        } else {
          reject({ account: 'error', balance: 0 });
        }
      });
    }) as Promise<any>;
   }

   Create_New_User(value) {
    const that = this;
    console.log('User Name : ' +
      value.name + ' User Password : ' + value.password + ' Public Crypto Id : ' + value.cryptoid);
    return new Promise((resolve, reject) => {
      HAT_TOKEN.setProvider(that.web3);
      HAT_TOKEN.deployed().then(function (instance) {
        return instance._create_New_User(
          value.name,
          value.cryptoid,
          value.password,
          {
            from: value.cryptoid
          }
        );
      }).then(function (status) {
        if (status) {
          console.log(status);
          console.log("It worked");
          return resolve({ status: true });
        }
      }).catch(function (error) {
        console.log(error);
        return reject('Create_New_User.service error');
      });
    });
  }

  login(value) {
    const that = this;
    console.log(' User Password : ' + value.password + ' Public Crypto Id : ' + value.crypto_id);
    return new Promise((resolve, reject) => {
      HAT_TOKEN.setProvider(that.web3);
      HAT_TOKEN.deployed().then(function (instance) {
        return instance.login(
          value.password,
          {
            from: value.crypto_id
          }
        );
      }).then(function (status) {
        if (status) {
          return resolve({ status: true });
        }
        else {
          return resolve({ status: false });
        }
      }).catch(function (error) {
        console.log(error);
        return reject('login.service error');
      });
    });
  }



  add_contact(value) {
    const that = this;
    console.log(value);
    return new Promise((resolve, reject) => {
      HAT_TOKEN.setProvider(that.web3);
      HAT_TOKEN.deployed().then(function (instance) {
        return instance._create_New_Contact(
          value.owner,
          value.contactid,
          value.name,
          value.type,
          {
            from: value.owner
          }
        );
      }).then(function (status) {
        if (status) {
          return resolve({ status: true });
        }
      }).catch(function (error) {
        console.log(error);
        return reject('Create New Contact Error.service error');
      });
    });
  }


  change_dapp_Admin(value, dapp_admin) {
    const that = this;
    console.log(value, dapp_admin);
    return new Promise((resolve, reject) => {
      HAT_TOKEN.setProvider(that.web3);
      HAT_TOKEN.deployed().then(function (instance) {
        return instance.change_admin(
          value.cryptoid,
          {
            from: dapp_admin
          }
        );
      }).then(function (status) {
        if (status) {
          return resolve({ status: true });
        }
      }).catch(function (error) {
        console.log(error);
        return reject('Change Dapp Admin Error.service error');
      });
    });
  }


  view_contacts() {
    const that = this;
    return new Promise((resolve, reject) => {
      HAT_TOKEN.setProvider(that.web3);
      HAT_TOKEN.deployed().then(function (instance) {
        return instance.contacts_view(
          //{
          //  from: value.crypto_id
          //}
        );
      }).then(function (status) {
        if (status) {
          return resolve(status);
        }
        else {
          return resolve({ status });
        }
      }).catch(function (error) {
        console.log(error);
        return reject('Contact View service error');
      });
    });
  }


  view_Users() {
    const that = this;
    return new Promise((resolve, reject) => {
      HAT_TOKEN.setProvider(that.web3);
      HAT_TOKEN.deployed().then(function (instance) {
        return instance.user_view(
          //{
          //  from: value.crypto_id
          //}
        );
      }).then(function (status) {
        if (status) {
          return resolve(status);
        }
        else {
          return resolve({ status });
        }
      }).catch(function (error) {
        console.log(error);
        return reject('User View service error');
      });
    });
  }



  view_Transaction() {
    const that = this;
    return new Promise((resolve, reject) => {
      HAT_TOKEN.setProvider(that.web3);
      HAT_TOKEN.deployed().then(function (instance) {
        return instance.transaction_view(
          //{
          //  from: value.crypto_id
          //}
        );
      }).then(function (status) {
        if (status) {
          return resolve(status);
        }
        else {
          return resolve({ status });
        }
      }).catch(function (error) {
        console.log(error);
        return reject('Transaction View service error');
      });
    });
  }


  air_drop(value) {
    const that = this;
    console.log(value);
    return new Promise((resolve, reject) => {
      HAT_TOKEN.setProvider(that.web3);
      HAT_TOKEN.deployed().then(function (instance) {
        return instance.airdrop(
          value.reciver,
          value.amount,
          {
            from: value.sender
          }
        );
      }).then(function (status) {
        if (status) {
          return resolve({ status: true });
        }
      }).catch(function (error) {
        console.log(error);
        return reject('AirDrop.service error');
      });
    });
  }

  transfer(value, typex) {
    const that = this;
    console.log(value);
    return new Promise((resolve, reject) => {
      HAT_TOKEN.setProvider(that.web3);
      HAT_TOKEN.deployed().then(function (instance) {
        return instance.transfer(
          value.reciver,
          value.amount,
          typex,
          {
            from: value.sender
          }
        );
      }).then(function (status) {
        if (status) {
          return resolve({ status: true });
        }
      }).catch(function (error) {
        console.log(error);
        return reject('Change_Employee_Admin_Error.service error');
      });
    });
  }


  mint(value) {
    const that = this;
    console.log(value);
    console.log("Air Drop Service");
    return new Promise((resolve, reject) => {
      HAT_TOKEN.setProvider(that.web3);
      HAT_TOKEN.deployed().then(function (instance) {
        return instance.mint(
          value.reciver,
          value.amount,
          {
            from: value.sender
          }
        );
      }).then(function (status) {
        if (status) {
          return resolve({ status: true });
        }
      }).catch(function (error) {
        console.log(error);
        return reject('Mint Token Error.service error');
      });
    });
  }


  burn(value, id) {
    console.log("Admin Id " + id);
    const that = this;
    console.log(value);
    return new Promise((resolve, reject) => {
      HAT_TOKEN.setProvider(that.web3);
      HAT_TOKEN.deployed().then(function (instance) {
        return instance.burn(
          value,
          {
            from: id
          }
        );
      }).then(function (status) {
        if (status) {
          return resolve({ status: true });
        }
      }).catch(function (error) {
        console.log(error);
        return reject('Burn Token Error.service error');
      });
    });
  }



  view_HAT_balance(address) {
    const that = this;
    console.log(address);
    return new Promise((resolve, reject) => {
      console.log("ERC20 Balance");
      HAT_TOKEN.setProvider(that.web3);
      console.log(address);
      HAT_TOKEN.deployed().then(function (instance) {
        return instance.balanceOf(
          address
        );
      }).then(function (status) {
        console.log(status);
        if (status) {
          return resolve(status);
        }
      }).catch(function (error) {
        console.log(error);
        return reject('View Hat Balance Error.service error');
      });
    });
  }



  view_dapp_admin() {
    const that = this;
    return new Promise((resolve, reject) => {
      HAT_TOKEN.setProvider(that.web3);
      HAT_TOKEN.deployed().then(function (instance) {
        return instance.admin(
        );
      }).then(function (status) {
        console.log(status);
        if (status) {
          return resolve(status);
        }
      }).catch(function (error) {
        console.log(error);
        return reject('View Hat Balance Error.service error');
      });
    });
  }


  view_decimals() {
    const that = this;
    return new Promise((resolve, reject) => {
      HAT_TOKEN.setProvider(that.web3);
      HAT_TOKEN.deployed().then(function (instance) {
        return instance.decimals(
        );
      }).then(function (status) {
        console.log(status);
        if (status) {
          return resolve(status);
        }
      }).catch(function (error) {
        console.log(error);
        return reject('View Decimals Error.service error');
      });
    });
  }

  view_total_supply() {
    const that = this;
    return new Promise((resolve, reject) => {
      HAT_TOKEN.setProvider(that.web3);
      HAT_TOKEN.deployed().then(function (instance) {
        return instance.totalSupply(
        );
      }).then(function (status) {
        console.log(status);
        if (status) {
          return resolve(status);
        }
      }).catch(function (error) {
        console.log(error);
        return reject('View Total Supply Error.service error');
      });
    });
  }


  view_name() {
    const that = this;
    return new Promise((resolve, reject) => {
      HAT_TOKEN.setProvider(that.web3);
      HAT_TOKEN.deployed().then(function (instance) {
        return instance.name(
        );
      }).then(function (status) {
        console.log(status);
        if (status) {
          return resolve(status);
        }
      }).catch(function (error) {
        console.log(error);
        return reject('View Name Error.service error');
      });
    });
  }


  view_symbol() {
    const that = this;
    return new Promise((resolve, reject) => {
      HAT_TOKEN.setProvider(that.web3);
      HAT_TOKEN.deployed().then(function (instance) {
        return instance.symbol(
        );
      }).then(function (status) {
        console.log(status);
        if (status) {
          return resolve(status);
        }
      }).catch(function (error) {
        console.log(error);
        return reject('View Symbol Error.service error');
      });
    });
  }
}
