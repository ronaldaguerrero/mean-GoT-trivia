import { HttpService } from "../http.service";
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
	
  @Input() info: any;
  @Input() avgR: any;


  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  }

}