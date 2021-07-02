import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {
	isUserMen:boolean = false;
	Page:boolean = false;
	isLoggedIn:any = [];
  	constructor() { }
  	ngOnInit() {
  		if(window.sessionStorage.getItem("INkmSet_id"))
		{
			this.isUserMen = true;
			this.isLoggedIn = {
				name:sessionStorage.getItem("INkmSet_nm"), 
				profile:sessionStorage.getItem("INkmSet_pl"), 
			};
			if(this.isLoggedIn.name && this.isLoggedIn.profile)
			{
				this.Page = true;
			}
			else
			{
				this.Page = false;	
			}
		}
  	}

}