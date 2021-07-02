import { Component, OnInit } from '@angular/core';
import { Observable, fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {
	isUserMen:boolean = false;
	isLoggedIn:any = [];
	online$: Observable<boolean>;
  	isNetwork:boolean = false;

  	pageSetUp  	:any;
    regno 		:any;
    username 	:any;
    userprofile :any;

  	constructor(private dbService: NgxIndexedDBService) { }
  	
	ngOnInit() 
	{ 
		this.dbService.getByKey('setup', 1).subscribe((userData) => 
		{ 
        	localStorage.setItem('pageSetUp',JSON.stringify(userData));
        	this.pageSetUp   = localStorage.getItem("pageSetUp");
	  		if(this.pageSetUp!='undefined' && this.pageSetUp != null)
	  		{
	  			this.pageSetUp   = JSON.parse(localStorage.getItem("pageSetUp"));
		        this.regno 		 = this.pageSetUp["INkmSet_id"];
		        this.username 	 = this.pageSetUp["INkmSet_nm"];
		        this.userprofile = this.pageSetUp["INkmSet_pl"];
		    }

			if(this.regno != null && this.regno != 'undefined')
			{
				this.isUserMen = true;
				this.isLoggedIn = {
					name:this.username, 
					profile:this.userprofile, 
				};
			}
  		});

  		this.isNetwork = true;
  		this.online$ = merge(
	      of(navigator.onLine),
	      fromEvent(window, 'online').pipe(mapTo(true)),
	      fromEvent(window, 'offline').pipe(mapTo(false))
	    )
	    this.networkStatus();
	}

	public networkStatus() 
	{
	    this.online$.subscribe(value => 
	    {
	    	this.isNetwork = value;
	    })
	}
}