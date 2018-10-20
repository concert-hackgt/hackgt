import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { EventCriteria } from '../models/EventCriteria';

@Injectable({
  providedIn: 'root'
})
export class EventCriteriaToMapService {

  public eventCriteria = new Subject<EventCriteria>();
  public eventCriteria1 = new Subject<any>();

  getCriteria$ = this.eventCriteria.asObservable();
  getCriteria1$ = this.eventCriteria1.asObservable();

  constructor() { }

  setCriteria(criteria): void {
    this.eventCriteria.next(criteria);
  }

  setCriteria1(data): void {
    this.eventCriteria1.next(data);
  }
}
