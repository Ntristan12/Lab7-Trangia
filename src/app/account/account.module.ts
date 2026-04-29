import { NgModule} from '@angular/core';
import { ReactiveForms Module} from '@angular/forms';
import { CommonModule} from '@angular/common';
import { AccountRoutingModule} from './account-routing.module';
import { LayoutComponent } from './Layout.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { VerifyEmailComponent } from './verify-email.component';
import { Forgot PasswordComponent } from './forgot-password.component';
import { ResetPasswordComponent } from './reset-password.component';
@NgModule({
imports: [
CommonModule,
ReactiveFormsModule,
AccountRoutingModule
declarations: [
LayoutComponent,
LoginComponent,
RegisterComponent,
VerifyEmailComponent,
Forgot PasswordComponent,
ResetPasswordComponent
})
export class AccountModule {}