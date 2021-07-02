// https://stackblitz.com/edit/angular-ivy-dgqfgd?file=src%2Fapp%2Fapp.component.ts
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  	collection = [];
	p: number;
	itemsPerPage = 5;
	totalItems: any;
	constructor(private router: Router, private titleService: Title) {}


    ngOnInit() {
    	this.titleService.setTitle('About - Kalyanamalai');
		// this.getAllData();
	}

 //    getAllData() {
 //    	this.userservice.getData("", "https://api.instantwebtools.net/v1/passenger?page="+0+"&size="+this.itemsPerPage, "GETT").subscribe((response: any) => 
	// 	{
	// 		this.collection =  response.data;
	//       	this.totalItems = response.totalPassengers;	
	//       	console.log(this.collection);
	// 	})

	// }
	// getPage(page) {
	// 	this.userservice.getData("", "https://api.instantwebtools.net/v1/passenger?page="+page+"&size="+this.itemsPerPage, "GETT").subscribe((response: any) => 
	// 	{
	// 		this.collection =  response.data;
	//       	this.totalItems = response.totalPassengers;	
	//       	console.log(this.collection);
	// 	})
	// }
}