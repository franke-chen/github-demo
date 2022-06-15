import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-child-zero',
  templateUrl: './child-zero.component.html',
  styleUrls: ['./child-zero.component.css']
})
export class ChildZeroComponent implements OnInit {

  markdown = '# hello\n+ todo1\n+ todo2';

  pwd = "Abc123.456";

  showDetails: boolean = false;

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  onStrengthChanged(strength: number) {
    console.log('password strength = ', strength);
  }

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
