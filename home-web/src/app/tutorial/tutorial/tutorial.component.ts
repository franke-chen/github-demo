import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person, TutorialService } from './turorial.service';
import info from 'package.json';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css'],
  providers: [TutorialService]
})
export class TutorialComponent implements OnInit {

  title = '';
  name = 'Cory Rylan';

  persons$: Observable<Person[]>;

  constructor(private service: TutorialService) {
    this.persons$ = this.service.getPersons();
  }

  ngOnInit(): void {
    this.title = `Cloud77 Web (v${info.version})`;
  }

  reverse(): void {
    import('./string-helper').then(module => {
      this.name = module.reverseString(this.name);
    });
  }
}
