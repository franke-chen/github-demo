import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person, TutorialService } from './turorial.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css'],
  providers: [TutorialService]
})
export class TutorialComponent implements OnInit {

  constructor(private service: TutorialService) {
    this.persons$ = this.service.getPersons();
  }

  name = 'Cory Rylan';
  ngOnInit(): void {

  }

  persons$: Observable<Person[]>;

  reverse(): void {
    import('./string-helper').then(module => {
      this.name = module.reverseString(this.name);
    });
  }
}
