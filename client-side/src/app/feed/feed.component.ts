import { Component, OnInit } from '@angular/core';
import {EventCriteria} from "../models/EventCriteria";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  eventCriteria: EventCriteria[] = [];

  constructor() { }

  receiveData(event) {
    console.log(event)
    this.eventCriteria = event;
  }

  ngOnInit() {
  }

  validatePriceRange(e) : Boolean {
    return e.priceRanges && e.priceRanges[0] && e.priceRanges[0].min && e.priceRanges[0].max;
  }

  validateDate(e) : Boolean {
    return e.dates && e.dates.start && e.dates.start.dateTime;
  }

}
