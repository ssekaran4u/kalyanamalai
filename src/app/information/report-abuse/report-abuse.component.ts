import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-report-abuse',
  templateUrl: './report-abuse.component.html',
  styleUrls: ['./report-abuse.component.css']
})
export class ReportAbuseComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit(): void 
  {
  	this.titleService.setTitle('Report Abuse - Kalyanamalai');
  }

}
