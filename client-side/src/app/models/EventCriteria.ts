export class EventCriteria {
  constructor(){}
  state: string = "";
  city: string = "";
  startDateTime: Date = new Date();
  endDateTime: Date = new Date();
  countryCode: string = "US";
  page: number = 0;

  getCityLink(): string {
    console.log(this.city)
    return this.city == "" ? this.city : "&city=" + this.city;
  }

  getStateLink(): string {
    return this.state == "" ? this.state : "&stateCode=" + this.state;
  }

  getCountryCodeLink(): string {
    return this.countryCode == "" ? this.countryCode : "&countryCode=" + this.countryCode;
  }

  getPageLink(): string {
    return this.page == 0 ? "" + this.page : "&page=" + this.page;
  }
}