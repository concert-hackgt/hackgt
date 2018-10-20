import { Injectable } from '@angular/core';
import { HttpMethodService } from '../http-method.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private methodHelper: HttpMethodService) {}

  getEventsList(criteria): any {
    return new Promise(resolve => {
      var city = criteria.city
      this.methodHelper.get("https://app.ticketmaster.com/discovery/v2/events.json?apikey=k8X97RqaamacWzZnyGrG7SJAAyhZwh9j")
      .subscribe((data) => {
        var res = data._embedded.events;
        resolve(res);
      });
    });
  }
}
