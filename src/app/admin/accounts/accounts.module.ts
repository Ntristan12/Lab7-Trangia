import { NgModule } from '@angular/core';
import { ReactiveForms Module} from '@angular/forms';
import { CommonModule} from '@angular/common';
import { Accounts RoutingModule} from './accounts-routing.module';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
@NgModule({
imports: [
CommonModule,
ReactiveFormsModule,
AccountsRoutingModule
1,
declarations: [
ListComponent,
AddEditComponent
]
})
export class AccountsModule {}