import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { EventCriteria } from '../models/EventCriteria';

@Injectable({
  providedIn: 'root'
})
export class EventCriteriaToMapService {

  public eventCriteria = new Subject<EventCriteria>();

  getCriteria$ = this.eventCriteria.asObservable();

  constructor() { }

  setCriteria(criteria): void {
    console.log(criteria + "abc");
    this.eventCriteria.next(criteria);
  }
}
