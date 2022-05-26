import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoadingComponent } from './loading/loading.component';
import { RegistrationComponent } from './registration/registration.component';
import { WalletComponent } from './wallet/wallet.component';
import { EditUserDetailsComponent } from './edit-user-details/edit-user-details.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { LoanNotificationComponent } from './loan-notification/loan-notification.component';
import { LoanRequestHistoryComponent } from './loan-request-history/loan-request-history.component';
import { NFTComponent } from './nft/nft.component';

import { AuthGuardService } from './hitaya-services/auth-guard/auth-guard.service';
import { LoanCheckoutComponent } from './loan-checkout/loan-checkout.component';
import { NftDetailsComponent } from './nft-details/nft-details.component';
import { NftPurchaseSuccessComponent } from './nft-purchase-success/nft-purchase-success.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', component: LoadingComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'wallet', component: WalletComponent/*, canActivate: [AuthGuardService] */ },
  { path: 'nft', component: NFTComponent/*, canActivate: [AuthGuardService] */ },
  { path: 'edit-user', component: EditUserDetailsComponent/*, canActivate: [AuthGuardService]*/ },
  { path: 'user-dashboard', component: UserDashboardComponent/*, canActivate: [AuthGuardService] */ },
  { path: 'loan-notification', component: LoanNotificationComponent/*, canActivate: [AuthGuardService] */ },
  { path: 'loan-history', component: LoanRequestHistoryComponent/*, canActivate: [AuthGuardService] */ },
  { path: 'loan-request-checkout', component: LoanCheckoutComponent },
  { path: 'nft-details', component: NftDetailsComponent },
  { path: 'nft-purchase-success', component: NftPurchaseSuccessComponent },
  { path: 'admin', component: AdminDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
