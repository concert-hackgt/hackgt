import { Component, OnInit } from '@angular/core';
import { HttpMethodService } from '../http-method.service';
import { FormControl } from '@angular/forms'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EventsService } from '../logics/events.service';
import { EventCriteria } from '../models/EventCriteria';
// import { runInThisContext } from 'vm';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor(private methodHelper: HttpMethodService,
    private events: EventsService) { }

  ngOnInit() {
    // this.methodHelper.get("http://localhost:8000/api")
    // .subscribe((result) => {
    //   console.log(result);
    // })
    var a  = new EventCriteria();
    a.city = "Atlanta";

    this.events.getEventsList(a).then(data => {
      console.log(data);
    });
  }
}
