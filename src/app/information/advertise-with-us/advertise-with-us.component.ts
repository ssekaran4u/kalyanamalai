import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-advertise-with-us',
  templateUrl: './advertise-with-us.component.html',
  styleUrls: ['./advertise-with-us.component.css']
})
export class AdvertiseWithUsComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void 
  {
  	this.titleService.setTitle('Advertise With Us - Kalyanamalai');
  }

}
