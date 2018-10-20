import { TestBed, inject } from '@angular/core/testing';

import { EventCriteriaToMapService } from './event-criteria-to-map.service';

describe('EventCriteriaToMapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventCriteriaToMapService]
    });
  });

  it('should be created', inject([EventCriteriaToMapService], (service: EventCriteriaToMapService) => {
    expect(service).toBeTruthy();
  }));
});
