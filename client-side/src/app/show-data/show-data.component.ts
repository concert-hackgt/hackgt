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
  rawData = {};
  // table: Number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19];
  status: boolean = false;
  failed: boolean = false;
  currentData = [];

  constructor(private events: EventsService) {}

  ngOnInit() { }

  recieveMess($event) {
    if ($event.length != 0) {
      for (var i = 0; i < $event.length; i++) {
        this.rawData = {};
        this.rawData['textDetail'] = $event[i]["name"];
        this.rawData['cardTitle'] = $event[i]["name"];
        this.rawData['dateStart'] = $event[i]["dates"]["start"]["localDate"];
        this.rawData['timeStart'] = $event[i]["dates"]["start"]["localTime"];
        this.rawData['imageSrc'] = $event[i]["images"][9]["url"];
        this.rawData['subTitle'] = $event[i]["_embedded"]["venues"][0]["name"];
        this.rawData['atlContent'] = $event[i]["_embedded"]["venues"][0]["name"];
        this.currentData.push(this.rawData);
        if (i == $event.length - 1) {
          this.status = true;
        }
      }
    } else {
      this.failed = true;
    }
    console.log(this.currentData);
  }
}
