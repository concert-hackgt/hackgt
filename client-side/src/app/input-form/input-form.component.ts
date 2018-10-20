import { Component } from '@angular/core';
import { zip } from 'rxjs/operators';

@Component({
	selector: 'app-input-form',
	templateUrl: './input-form.component.html',
	styleUrls: ['./input-form.component.css']
})
export class InputFormComponent {

	constructor() {}

	cityInput: String;
	stateInput: String;
	zipInput: String;
	startDate: String;
	endDate: String;
	States: String[] = [
		'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
		'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
		'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
		'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
		'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
		'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas',
		'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
	];

	// Get the state selected
	stateSelected (event) {
		this.stateInput = event;
	}

	// Button click function
	goClick() : void {
		console.log(this.cityInput);
		console.log(this.stateInput);
		console.log(this.zipInput);
		console.log(this.startDate);
		console.log(this.endDate);
	}
}
