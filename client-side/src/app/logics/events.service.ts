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
      var city = criteria.city;
      var startDateTime = criteria.startDateTime.toISOString().replace(/\.[0-9]{3}/, '');
      var endDateTime = criteria.endDateTime.toISOString().replace(/\.[0-9]{3}/, '');
      var countryCode = criteria.countryCode;
      var url = environment.HOST + "/discovery/v2/events.json?apikey=" 
        + environment.APIKEY + "&city" + city + "" + "&startDateTime=" + startDateTime
        + "&endDateTime=" + endDateTime + "&countryCode=" + countryCode

      this.methodHelper.get(url)
      .subscribe((data) => {
        var res = data._embedded.events;
        resolve(res);
      });
    });
  }
}
