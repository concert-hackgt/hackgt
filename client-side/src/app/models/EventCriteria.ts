export class EventCriteria {
  constructor(){}
  state: String = "";
  city: String = "";
  startDateTime: Date = new Date();
  endDateTime: Date = new Date();
  countryCode: String = "US";
  page: number = 0;

  getCityLink(): String {
    console.log(this.city)
    return this.city == "" ? this.city : "&city=" + this.city;
  }

  getStateLink(): String {
    return this.state == "" ? this.state : "&stateCode=" + this.state;
  }

  getCountryCodeLink(): String {
    return this.countryCode == "" ? this.countryCode : "&countryCode=" + this.countryCode;
  }

  getPageLink(): String {
    return this.page == 0 ? "" + this.page : "&page=" + this.page;
  }
}