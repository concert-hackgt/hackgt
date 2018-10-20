import { Component, OnInit, ViewChild } from '@angular/core';
import { zip } from 'rxjs/operators';
import { EventCriteria } from '../models/EventCriteria';
import { EventsService } from '../logics/events.service';
import { EventCriteriaToMapService } from '../services/event-criteria-to-map.service';

@Component({
	selector: 'app-input-form',
	templateUrl: './input-form.component.html',
	styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {

	@ViewChild('gmap') gmapElement: any;
  	map: google.maps.Map;

	ngOnInit() {
		// var atlanta = {lat: 33.758688, lng: -84.391449};
		// var mapProp = {
		// 	center: atlanta,
		// 	zoom: 15,
		// 	mapTypeId: google.maps.MapTypeId.ROADMAP
		// };
		// this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
		// var marker = new google.maps.Marker({position: uluru, map: this.map});
		// var marker = new google.maps.Marker({position: uluru1, map: this.map});
	}

	constructor(private events: EventsService,
		private eventCriteriaTransfer: EventCriteriaToMapService) {}

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

	// Button click function
	goClick() : void {
		var geocoder = new google.maps.Geocoder();
		var criteria  = new EventCriteria();
		criteria.city = this.cityInput;
		criteria.state = this.stateInput;
		criteria.startDateTime = new Date(this.startDate);
		criteria.endDateTime = new Date(this.endDate);
		this.eventCriteriaTransfer.setCriteria(criteria);
	}
}
