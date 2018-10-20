import { Component, OnInit } from '@angular/core';
import { HttpMethodService } from '../http-method.service';
import { FormControl } from '@angular/forms'
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
