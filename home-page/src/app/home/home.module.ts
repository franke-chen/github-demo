import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { HomeComponent } from "./home/home.component";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: "", component: HomeComponent }
    ])
  ],
  exports: [

  ],
  providers: [

  ]
})
export class HomeModule {
  constructor() {

  }
}
