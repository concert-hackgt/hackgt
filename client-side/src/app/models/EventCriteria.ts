export class EventCriteria {
  constructor(){}
  state: String = "";
  city: String = "";
  startDateTime: Date = new Date();
  endDateTime: Date = new Date();
  countryCode: String = "US";
  page: number = 0;

  getCityLink(): String {
    return this.city == "" || this.city == undefined ? "" : "&city=" + this.city;
  }

  getStateLink(): String {
    return this.state == "" || this.state == undefined ? "" : "&stateCode=" + this.state;
  }

  getCountryCodeLink(): String {
    return this.countryCode == "" || this.countryCode == undefined ? "" : "&countryCode=" + this.countryCode;
  }

  getPageLink(): String {
    return this.page == 0 ? "" + this.page : "&page=" + this.page;
  }
}