import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-layout2',
  templateUrl: './site-layout2.component.html',
  styleUrls: ['./site-layout2.component.css']
})
export class SiteLayout2Component implements OnInit {

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