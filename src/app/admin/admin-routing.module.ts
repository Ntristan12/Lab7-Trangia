import { NgModule} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
Import { SubNavComponent } from './subnav.component';
import { LayoutComponent } from './Layout.component';
import { OverviewComponent } from './overview.component';
const accountsModule = () => import('./accounts/accounts.module').then(x => x. AccountsModule);
const routes: Routes = [
{ path:, component: SubNavComponent, outlet: subnav',
path:", component: LayoutComponent,
children:
{ path:, component: OverviewComponent },
{ path: 'accounts', LoadChildren: accountsModule}
1
1:
}
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
export class AdminRoutingModule {}