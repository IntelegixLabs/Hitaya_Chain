import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QRCodeModule } from 'angularx-qrcode';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './loading/loading.component';
import { RegistrationComponent } from './registration/registration.component';
import { CommonLayoutComponent } from './common-layout/common-layout.component';
import { FooterComponent } from './footer/footer.component';
import { WalletComponent } from './wallet/wallet.component';
import { EditUserDetailsComponent } from './edit-user-details/edit-user-details.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { LoanNotificationComponent } from './loan-notification/loan-notification.component';
import { LoanRequestHistoryComponent } from './loan-request-history/loan-request-history.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { NFTComponent } from './nft/nft.component';
import { LoanCheckoutComponent } from './loan-checkout/loan-checkout.component';
import { NftDetailsComponent } from './nft-details/nft-details.component';
import { NftPurchaseSuccessComponent } from './nft-purchase-success/nft-purchase-success.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    RegistrationComponent,
    CommonLayoutComponent,
    FooterComponent,
    WalletComponent,
    EditUserDetailsComponent,
    UserDashboardComponent,
    LoanNotificationComponent,
    LoanRequestHistoryComponent,
    UserLayoutComponent,
    NFTComponent,
    LoanCheckoutComponent,
    NftDetailsComponent,
    NftPurchaseSuccessComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
