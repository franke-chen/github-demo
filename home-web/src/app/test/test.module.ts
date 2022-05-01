import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { ChildOneComponent } from './child-one/child-one.component';
import { ChildTwoComponent } from './child-two/child-two.component';
import { ChildThreeComponent } from './child-three/child-three.component';
import { ChildZeroComponent } from './child-zero/child-zero.component';
import { Cloud77AngularModule } from 'cloud77-angular';

@NgModule({
  declarations: [
    TestComponent,
    ChildOneComponent,
    ChildTwoComponent,
    ChildThreeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: TestComponent,
        children: [
          { path: "", component: ChildZeroComponent },
          { path: "ch1", component: ChildOneComponent },
          { path: "ch2", component: ChildTwoComponent },
          { path: "ch3", component: ChildThreeComponent }
        ]
      }
    ]),
    Cloud77AngularModule
  ],
  bootstrap: [TestComponent]
})
export class TestModule { }
