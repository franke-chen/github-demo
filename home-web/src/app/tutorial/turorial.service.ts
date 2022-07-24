
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export class Person {
  constructor(public personId: number, public name: string, public city: string) {

  }
}

const PERSONS: Person[] = [
  new Person(1, 'Mahesh', 'Varanasi'),
  new Person(2, 'Ram', 'Ayodhya'),
  new Person(3, 'Kishna', 'Mathura')
];

const personList$ = of(PERSONS);

@Injectable()
export class  TutorialService {
  constructor() { }

  getPersons(): Observable<Person[]> {
    return personList$;
  }
}
