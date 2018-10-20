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
		this.queryDefaultEvent();
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
		var self = this;
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			var geocoder;
			geocoder = new google.maps.Geocoder();
			var latlng = new google.maps.LatLng(pos.lat, pos.lng);

			geocoder.geocode(
					{'latLng': latlng}, 
					function(results, status) {
							if (status == google.maps.GeocoderStatus.OK) {
									if (results[0]) {
											var add= results[0].formatted_address ;
											var value=add.split(", ");
											var defaultCriteria = new EventCriteria()
											var count = value.length
											defaultCriteria.endDateTime.setFullYear(2019);
											defaultCriteria.city = value[count-3]
											defaultCriteria.state = value[count - 2].substring(0,2);
											self.events.getEventsList(defaultCriteria).then(data => {
												self.eventCriteriaTransfer.setCriteria1({
													"pos": pos,
													"data": data
												});
												self.searchClick.emit(data);
											});
											self.eventCriteriaTransfer.setCriteria(defaultCriteria);
									}
									else  {
											alert("Address not found");
									}
							}
							else {
									alert(status);
							}
					}
			);
			// map.setCenter(pos);
		}, function() {
			// handleLocationError(true, infoWindow, map.getCenter());
		});
  }

	// Button click function
	goClick() : void {
		var criteria  = new EventCriteria();
		criteria.keyword = this.keyword;
		criteria.city = this.cityInput;
		criteria.state = this.stateInput;
		criteria.startDateTime = new Date(this.startDate);
		criteria.endDateTime = new Date(this.endDate);
		this.eventCriteriaTransfer.setCriteria(criteria);
		var self = this;
		this.events.getEventsList(criteria).then(data => {
			var geocoder;
			geocoder = new google.maps.Geocoder();
			geocoder.geocode({'address': this.cityInput}, function(results, status){
				 var pos = {
					 "lat": results[0].geometry.location.lat(),
					 "lng": results[0].geometry.location.lng()
				 }
				 self.eventCriteriaTransfer.setCriteria1({
					"pos": pos,
					"data": data
				});
			})
			this.searchClick.emit(data);
		});
	}
}

