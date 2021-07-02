import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from './../../services/user.service';
import { UserGlobalService } from './../../services/user.global';
import { NotificationService } from '../../services/notification.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suntvprofile',
  templateUrl: './suntvprofile.component.html',
  styleUrls: ['./suntvprofile.component.css']
})
export class SuntvprofileComponent implements OnInit 
{
	isLoading:boolean = false;
	isMatchingLoading:boolean = false;
	isMatchingLoadingData:boolean = true;
	isMatchingNotFoundLoading:boolean = false;
	totalMatchingItems: any;

	regno     :any;

	_offset=0;
	p: number;
	itemsPerPage = 10;
	defaultImage:string = '';
	matchinglists :any = [];

    constructor(private UserGlobalService:UserGlobalService, private userservice: UserService, private titleService: Title,private notifyService : NotificationService) { }

    ngOnInit(): void 
    {
  		this.regno     = "nHtS1X3Ez4o=";
		        
  		this.isMatchingLoadingData = false;
  		this.isMatchingLoading = true;

  		this.userservice. getData({regno:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebMyDashboard/MatchingList", "POST").subscribe((response: any) => 
  		{
  			this.isMatchingLoading = false;
  			if(response.status==1)
  			{
  				this.isMatchingLoadingData=true;
  				this.isMatchingLoading = false;
		      	this.totalMatchingItems = response.total;

	  			let _matchData = response.data;
	  			if(_matchData.length)
	  			{
					this.matchinglists =  _matchData;
					window.scroll(1,1);
	  			}
	  			else
	  			{
	  				this.isMatchingNotFoundLoading = true;
	  			}
  			}
  			else
  			{
  				this.isMatchingNotFoundLoading = true;
  			}
	  	}) 

	  	this.titleService.setTitle('Suntv Profile - Kalyanamalai');
	  	this.defaultImage = 'https://cdn.dribbble.com/users/154550/screenshots/3014408/untitled-9.gif';
  	}

  	getPage(page) 
	{
		window.scroll(1,1);
		this.isMatchingLoadingData = false;
  		this.isMatchingLoading = true;
		if(page==1)
		{
			this._offset = 0	
		}
		else
		{
			this._offset = (page - 1) * this.itemsPerPage + 1
		}
		this.userservice. getData({regno:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebMyDashboard/MatchingList", "POST").subscribe((response: any) => 
		{
			if(response.status==1)
  			{
  				this.isMatchingLoadingData=true;
  				this.isMatchingLoading = false;
  				let _matchData = response.data;
	  			if(_matchData.length)
	  			{
					this.matchinglists =  _matchData;
					window.scroll(1,5);
	  			}
	  			else
	  			{
	  				this.isMatchingNotFoundLoading = true;
	  			}
		    }
		})
	}

}
