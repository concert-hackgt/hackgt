import { Component } from '@angular/core';
import { zip } from 'rxjs/operators';
import { EventCriteria } from '../models/EventCriteria';
import { EventsService } from '../logics/events.service';

@Component({
	selector: 'app-input-form',
	templateUrl: './input-form.component.html',
	styleUrls: ['./input-form.component.css']
})
export class InputFormComponent {

	constructor(private events: EventsService) {}

	cityInput: String;
	stateInput: String;
	zipInput: String;
	startDate: String;
	endDate: String;

	states: String[] = [
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
		var a  = new EventCriteria();
		a.endDateTime.setFullYear(2019);

		this.events.getEventsList(a).then(data => {
			console.log(data);
		});
		// console.log(this.cityInput);
		// console.log(this.stateInput);
		// console.log(this.zipInput);
		// console.log(this.startDate);
		// console.log(this.endDate);
	}
}
