import { Component, OnInit } from '@angular/core';
import { EventCriteria } from '../models/EventCriteria';
import { EventsService } from '../logics/events.service';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.css']
})
export class ShowDataComponent implements OnInit {

  imageSrc: String;
  cardTitle: String;
  subTitle: String;
  atlContent: String;
  textDetail: String;
  timeStart: String;
  dateStart: String;

  constructor(private events: EventsService) {}

  ngOnInit() { }

  recieveMess(event) {
    // console.log(event);
    this.textDetail = event[0].info;
    this.cardTitle = event[0].name;
    this.dateStart = event[0].dates.start.localDate;
    this.timeStart = event[0].dates.start.localTime;
    this.imageSrc = event[0].images.url;
    this.subTitle = event[0].accessibility.info;
    this.atlContent = event[0].cardTitle;
    console.log(this.cardTitle);
    console.log(this.textDetail);
    console.log(this.imageSrc);
  }
}
