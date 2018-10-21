import { Component, OnInit } from '@angular/core';
import { EventCriteria } from '../models/EventCriteria';
import { EventsService } from '../logics/events.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
// import { FlipModule } from 'ngx-flip';

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
  status: boolean = false;
  failed: boolean = false;
  currentData = [];
  // flip: String = 'inactive';

  constructor(private events: EventsService) {}

  ngOnInit() { }

  recieveMess($event) {
    if (this.currentData.length != 0) {
      this.currentData = [];
    }
    if ($event.length != 0) {
      this.currentData = [];
      for (var i = 0; i < $event.length; i++) {
        this.rawData = {};
        this.rawData['textDetail'] = $event[i]["name"];
        this.rawData['cardTitle'] = $event[i]["name"];
        this.rawData['dateStart'] = $event[i]["dates"]["start"]["localDate"];
        this.rawData['timeStart'] = $event[i]["dates"]["start"]["localTime"];
        this.rawData['imageSrc'] = $event[i]["images"][0]["url"];
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
  }

  // toggleFlip() {
  //   this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  // }
  viewPopUp(event) {
    console.log(event);
  }
}
