import { Component, OnInit } from '@angular/core';
import {EventCriteria} from "../models/EventCriteria";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  eventCriteria: EventCriteria[] = [];
  displaySmallFeed: boolean = false;

  constructor() { }

  receiveData(event) {
    this.eventCriteria = event;
  }

  ngOnInit() {
    this.displaySmallFeed = false;
  }

  toggleView(): void {
      this.displaySmallFeed = !this.displaySmallFeed;
  }

  validatePriceRange(e) : Boolean {
    return e.priceRanges && e.priceRanges[0] && e.priceRanges[0].min && e.priceRanges[0].max;
  }

  validateDate(e) : Boolean {
    return e.dates && e.dates.start && e.dates.start.dateTime;
  }

}
