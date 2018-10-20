import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { zip } from 'rxjs/operators';
import { EventCriteria } from '../models/EventCriteria';
import { EventsService } from '../logics/events.service';
import { EventCriteriaToMapService } from '../services/event-criteria-to-map.service';

@Component({
	selector: 'app-input-form',
	templateUrl: './input-form.component.html',
	styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit{
  @Output() searchClick: EventEmitter<any> = new EventEmitter();

	ngOnInit() {
		// this.queryDefaultEvent();
	}

	constructor(private events: EventsService,
		private eventCriteriaTransfer: EventCriteriaToMapService) {}

	keyword: string;
	cityInput: string;
	stateInput: string;
	zipInput: string;
	startDate: string;
	endDate: string;

	states: string[] = [
		'AL', 'AK', "AZ", 'AR', 'CA', "CO", "CT", "DE",
		"DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA",
		"KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN",
		"MS", "MO", "MT", "NE", "NV", "NV", "NH", "NJ",
		"NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA",
		"RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA",
		"WA", "WV", "WI", "WY"
	]

	// Get the state selected
	stateSelected (event) {
		this.stateInput = event;
	}

  queryDefaultEvent() : void {
    var a  = new EventCriteria();
    a.endDateTime.setFullYear(2019);

    this.events.getEventsList(a).then(data => {
      this.searchClick.emit(data);
    });
  }

	// Button click function
	goClick() : void {
		var geocoder = new google.maps.Geocoder();
		var criteria  = new EventCriteria();
		criteria.keyword = this.keyword;
		criteria.city = this.cityInput;
		criteria.state = this.stateInput;
		criteria.startDateTime = new Date(this.startDate);
		criteria.endDateTime = new Date(this.endDate);
		this.eventCriteriaTransfer.setCriteria(criteria);
		this.events.getEventsList(criteria).then(data => {
			// console.log(data);
			this.searchClick.emit(data);
		});
	}
}

