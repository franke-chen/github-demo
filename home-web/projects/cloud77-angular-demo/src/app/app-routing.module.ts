import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildAAComponent } from './child-a-a/child-a-a.component';
import { ChildAComponent } from './child-a/child-a.component';
import { ChildBComponent } from './child-b/child-b.component';
import { ChildCComponent } from './child-c/child-c.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "child-a", component: ChildAComponent },
  { path: "child-b", component: ChildBComponent },
  { path: "child-c", component: ChildCComponent },
  { path: "child-a/a", component: ChildAAComponent },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
