export class EventCriteria {
  constructor(){}
  state: string = "";
  city: string = "";
  startDateTime: Date = new Date();
  endDateTime: Date = new Date();
  countryCode: string = "US";
  page: number = 0;
}
