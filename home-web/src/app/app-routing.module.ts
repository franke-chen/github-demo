import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { TokenGuard, APIKeyGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    loadChildren: async () => (await import('./home/home.module')).HomeModule
  },
  {
    path: 'login',
    loadChildren: async () => (await import('./login/login.module')).LoginModule,
    canActivate: [APIKeyGuard]
  },
  {
    path: 'signup',
    loadChildren: async () => (await import('./signup/signup.module')).SignUpModule,
    canActivate: [APIKeyGuard]
  },
  {
    path: 'forget-password',
    loadChildren: async () => (await import('./forget-pwd/forget-pwd.module')).ForgetPasswordModule,
    canActivate: [APIKeyGuard]
  },
  { path: 'dashboard',
    loadChildren: async () => (await import('./dashboard/dashboard.module')).DashboardModule,
    canActivate: [APIKeyGuard, TokenGuard]
  },
  { path: 'tutorial',
    loadChildren: async () => (await import('./tutorial/tutorial.module')).TutorialModule
  },
  {
    path: 'message',
    loadChildren: async () => (await import('./message/message.module')).MessageModule
  },
  {
    path: 'test',
    loadChildren: async () => (await import('./test/test.module')).TestModule
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
