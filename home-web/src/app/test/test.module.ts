import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TestComponent } from './test.component';
import { ChildOneComponent } from './child-one/child-one.component';
import { ChildTwoComponent } from './child-two/child-two.component';
import { ChildThreeComponent } from './child-three/child-three.component';
import { ChildZeroComponent } from './child-zero/child-zero.component';
import { Cloud77UIModule } from '@franke-chen/cloud77-ui-angular';
import { CdkTreeModule } from '@angular/cdk/tree';
import { CdkTableModule } from '@angular/cdk/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MarkdownModule } from 'ngx-markdown';
import { GridsterModule } from 'angular-gridster2';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    TestComponent,
    ChildZeroComponent,
    ChildOneComponent,
    ChildTwoComponent,
    ChildThreeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TestComponent,
        children: [
          { path: '', component: ChildZeroComponent },
          { path: 'ch1', component: ChildOneComponent },
          { path: 'ch2', component: ChildTwoComponent },
          { path: 'ch3', component: ChildThreeComponent }
        ]
      }
    ]),
    Cloud77UIModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CdkTreeModule,
    CdkTableModule,
    DragDropModule,
    MarkdownModule.forRoot(),
    GridsterModule,
    MatPasswordStrengthModule,
    MatTableModule
  ],
  bootstrap: [TestComponent]
})
export class TestModule { }
