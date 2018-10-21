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
    this.eventCriteriaTransfer.getCriteria1$.subscribe(info => {
      var init = info.pos;
      var mapProp = {
        center: init,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      self.map = new google.maps.Map(self.gmapElement.nativeElement, mapProp);
      var listSave = {}
      for (var e of info.data) {
        console.log(e);
        if (e._embedded != undefined && e._embedded.venues != undefined) {
          var location = {
            "lat": parseFloat(e._embedded.venues[0].location.latitude),
            "lng": parseFloat(e._embedded.venues[0].location.longitude)
          }
          var threaterName = e._embedded.venues[0].name;
          var eventGeneral = {
            "name": e.name
          }
          if (Object.keys(listSave).includes(threaterName)) {
            listSave[threaterName][3].push(eventGeneral);
          } else {
            listSave[threaterName] = [
              location, 
              e._embedded.venues[0].name,
              e._embedded.venues[0].address.line1+", "+e._embedded.venues[0].city.name+", "+e._embedded.venues[0].state.name, 
              [eventGeneral]];
          }
        }
      }
      for (var element of Object.keys(listSave)) {
        var marker = new google.maps.Marker({position: listSave[element][0], map: self.map, title: listSave[element][1]});
        marker.info = new google.maps.InfoWindow({
          content: self.infoWindow(listSave[element][1], listSave[element][2], listSave[element][3])
        });
        google.maps.event.addListener(marker, 'mouseover', function() {
          var marker_map = this.getMap();
          this.info.open(marker_map);
          this.info.open(marker_map, this);
        });
        google.maps.event.addListener(marker, 'mouseout', function() {
          this.info.close();
        });
      }
    });
  }

  infoWindow(name, address, listOfShows): string {
    var str = '<div class="content">'+
    '<div class="siteNotice">'+
    '</div>'+
    `<h3 class="firstHeading" class="firstHeading">${name}</h3>`+
    '<div class="bodyContent">'+
    `<p><b>Address</b>: ${address}</p>`+
    '<p><b>List of shows:</b></p>'+
    '<ul>'
    for (var s of listOfShows) {
      str += `<li>${s.name}</li>`
    }

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
    str += '</ul>'+
    '</div>'+
    '</div>';
    return str;
  }
}
