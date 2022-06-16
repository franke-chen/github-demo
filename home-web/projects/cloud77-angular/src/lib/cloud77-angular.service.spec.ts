import { TestBed } from '@angular/core/testing';

import { Cloud77AngularService } from './cloud77-angular.service';

describe('Cloud77AngularService', () => {
  let service: Cloud77AngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cloud77AngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
