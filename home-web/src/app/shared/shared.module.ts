import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NotFoundComponent } from "./not-found/not-found.component";
import { BannerComponent } from "./banner/banner.component";
import { FooterComponent } from "./footer/footer.component";


@NgModule({
  declarations: [
    BannerComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BannerComponent,
    FooterComponent,
    NotFoundComponent
  ],
  providers: [

  ]
})
export class SharedModule {
  constructor() {

  }
}
