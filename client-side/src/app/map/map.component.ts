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
          console.log("ABCD");
          var infoWindows = []
          self.events.getEventsList(criteria).then(data => {
            for (var e of data) {
              if (e._embedded != undefined && e._embedded.venues != undefined) {
                var location = {
                  "lat": parseFloat(e._embedded.venues[0].location.latitude),
                  "lng": parseFloat(e._embedded.venues[0].location.longitude)
                }
                // infoWindows.push(new google.maps.InfoWindow({
                //   content: self.infoWindow()
                // }));
                var marker = new google.maps.Marker({position: location, map: self.map, title: "Hello"});
                marker.info = new google.maps.InfoWindow({
                  content: '<b>Speed:</b>'
                });
                google.maps.event.addListener(marker, 'click', function() {  
                  // this = marker
                  var marker_map = this.getMap();
                  this.info.open(marker_map);
                  console.log(this);
                  // this.info.open(marker_map, this);
                  // Note: If you call open() without passing a marker, the InfoWindow will use the position specified upon construction through the InfoWindowOptions object literal.
                });

                // google.maps.event.addListener(marker, 'click', function() {
                //   marker.info.open(self.map, marker);
                // })
                // marker.addListener('mouseover', function() {
                //   infowindow.open(self.map, marker);
                // });
                // marker.addListener('mouseout', function() {
                //   infowindow.close();
                // });
                // google.maps.event.addListener(marker, 'click', function() {
                //   infoWindows[infoWindows.length - 1].open(self.map, marker);
                // })
              }
            }
          });
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    })
  }

  infoWindow(): string {
    // var str = '<div id="content">'+
    // '<div id="siteNotice">'+
    // '</div>'+
    // '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
    // '<div id="bodyContent">'+
    // '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    // 'sandstone rock formation in the southern part of the '+
    // 'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
    // 'south west of the nearest large town, Alice Springs; 450&#160;km '+
    // '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
    // 'features of the Uluru - Kata Tjuta National Park. Uluru is '+
    // 'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
    // 'Aboriginal people of the area. It has many springs, waterholes, '+
    // 'rock caves and ancient paintings. Uluru is listed as a World '+
    // 'Heritage Site.</p>'+
    // '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
    // 'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
    // '(last visited June 22, 2009).</p>'+
    // '</div>'+
    // '</div>';
    var str = '<div>'+
    'Tuan'+
    '</div>';
    return str;
  }
}
