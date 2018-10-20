export class EventCriteria {
  constructor(){}
  keyword: string = "";
  state: string = "";
  city: string = "";
  startDateTime: Date = new Date();
  endDateTime: Date = new Date();
  countryCode: string = "US";
  page: number = 0;

  getKeyword(): string {
    return this.keyword == "" || this.keyword == undefined ? "" : "&keyword=" + this.keyword;
  }

  getCityLink(): string {
    return this.city == "" || this.city == undefined ? "" : "&city=" + this.city;
  }

  getStateLink(): string {
    return this.state == "" || this.state == undefined ? "" : "&stateCode=" + this.state;
  }

  getCountryCodeLink(): string {
    return this.countryCode == "" || this.countryCode == undefined ? "" : "&countryCode=" + this.countryCode;
  }

  getPageLink(): string {
    return this.page == 0 ? "" + this.page : "&page=" + this.page;
  }
}