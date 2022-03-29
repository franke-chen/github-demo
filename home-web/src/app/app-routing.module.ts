import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { RouteActivateGuard } from './route-activate.guard';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', loadChildren: async () => (await import("./home/home.module")).HomeModule },
  { path: 'login', loadChildren: async () => (await import("./login/login.module")).LoginModule },
  { path: 'signup', loadChildren: async () => (await import("./signup/signup.module")).SignUpModule },
  { path: 'forget-password', loadChildren: async () => (await import("./forget-pwd/forget-pwd.module")).ForgetPasswordModule },
  { path: 'dashboard', loadChildren: async () => (await import("./dashboard/dashboard.module")).DashboardModule, canActivate: [RouteActivateGuard] },
  { path: "tutorial", loadChildren: async () => (await import("./tutorial/tutorial.module")).TutorialModule },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
