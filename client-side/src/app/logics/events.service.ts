import { Injectable } from '@angular/core';
import { HttpMethodService } from '../http-method.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { EventCriteria } from '../models/EventCriteria';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private methodHelper: HttpMethodService) {}

  getEventsList(criteria: EventCriteria): any {
    return new Promise(resolve => {
      var startDateTime = criteria.startDateTime.toISOString().replace(/\.[0-9]{3}/, '');
      var endDateTime = criteria.endDateTime.toISOString().replace(/\.[0-9]{3}/, '');
      var url = environment.HOST + "/discovery/v2/events.json?apikey=" 
        + environment.APIKEY + criteria.getCityLink() + "&startDateTime=" + startDateTime
        + "&endDateTime=" + endDateTime + criteria.getCountryCodeLink() + criteria.getStateLink();
      this.methodHelper.get(url).subscribe((data) => {
        if (data._embedded != undefined) {
          resolve(data._embedded.events);
        }
        resolve([])
      });
    });
  }
}
