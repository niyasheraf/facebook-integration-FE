import { TestBed } from '@angular/core/testing';

import { IntegrationServiceService } from './integration-service.service';

describe('IntegrationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IntegrationServiceService = TestBed.get(IntegrationServiceService);
    expect(service).toBeTruthy();
  });
});
