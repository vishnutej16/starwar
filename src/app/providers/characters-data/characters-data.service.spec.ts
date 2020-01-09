import { TestBed } from '@angular/core/testing';

import { CharactersDataService } from './characters-data.service';

describe('CharactersDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CharactersDataService = TestBed.get(CharactersDataService);
    expect(service).toBeTruthy();
  });
});
