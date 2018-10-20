import { Component, OnInit, ViewChild } from '@angular/core';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { EventCriteriaToMapService } from '../services/event-criteria-to-map.service';
import { EventsService } from '../logics/events.service';

declare var google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  latitude: number;
  longitude: number;

  constructor(private events: EventsService,
    private eventCriteriaTransfer: EventCriteriaToMapService) { }

  ngOnInit() {
    var geocoder = new google.maps.Geocoder();
    var self = this;
    this.eventCriteriaTransfer.getCriteria$.subscribe(criteria => {
      geocoder.geocode({'address': criteria.city}, function(results, status) {
        if (status.toString() == 'OK') {
          var location = {
            "lat": results[0].geometry.location.lat(),
            "lng": results[0].geometry.location.lng(),
          }
          var mapProp = {
            center: location,
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          self.map = new google.maps.Map(self.gmapElement.nativeElement, mapProp);
          self.events.getEventsList(criteria).then(data => {
            for (var e of data) {
              if (e._embedded != undefined && e._embedded.venues != undefined) {
                var location = {
                  "lat": parseFloat(e._embedded.venues[0].location.latitude),
                  "lng": parseFloat(e._embedded.venues[0].location.longitude)
                }
                new google.maps.Marker({position: location, map: self.map});
              }
            }
          });
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    })
  }

  setCenter(e:any){
    e.preventDefault();
    this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));
  }
}
