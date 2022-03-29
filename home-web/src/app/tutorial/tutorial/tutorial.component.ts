import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person, TutorialService } from './turorial.service';
import { version } from "package.json";

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

  title: string = "";
  name = 'Cory Rylan';
  ngOnInit(): void {
    this.title = `Cloud77 Web (v${version})`;
  }

  persons$: Observable<Person[]>;

  reverse(): void {
    import('./string-helper').then(module => {
      this.name = module.reverseString(this.name);
    });
  }
}
