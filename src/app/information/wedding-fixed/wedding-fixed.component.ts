import { Component, OnInit, TemplateRef } from '@angular/core';
import {Location} from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { NotificationService } from './../../services/notification.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserGlobalService } from './../../services/user.global';

@Component({
  selector: 'app-wedding-fixed',
  templateUrl: './wedding-fixed.component.html',
  styleUrls: ['./wedding-fixed.component.css']
})
export class WeddingFixedComponent implements OnInit 
{
	weddingfixtodayInfo:any = [];
	_offset=0;
	itemsPerPage = 2;
	weddingspage: number;
	totalweddingItems:any;
	isLoading: boolean=false;
  	//ThiruthanagalMenu:any = [];

  	constructor(private _location: Location, private UserGlobalService:UserGlobalService,private formBuilder: FormBuilder, private dbService: NgxIndexedDBService, private route: ActivatedRoute, private userservice: UserService,private notifyService: NotificationService, private router: Router, private titleService: Title) 
  	{ }

  	ngOnInit(): void 
  	{
  		
      	this.isLoading =true;
     	this.userservice.getData({limit:this.itemsPerPage,offset:this._offset}, "WebHomePage/GetWeddingFixedList", "POST").subscribe((response: any) => 
      	{
      		this.isLoading =false;
	        if (response.status == 1) 
	        {
	        	this.totalweddingItems = response.total;
	          	this.weddingfixtodayInfo = response.data;
	        } 
	        else 
	        {
	          	this.notifyService.showError(response.message, "Error")
	        }
      	}, (err) => 
      	{
        	this.notifyService.showError("Internal Server Error", "Error")
      	});

      	this.titleService.setTitle('Wedding Fixed Today - Kalyanamalai');

  	}

  	getPage(page) 
	{
		
		window.scroll(1,1);
		//this.isStoriesLoadingData = false;
  		//this.isMatchingLoading = true;
		if(page==1)
		{
			this._offset = 0	
		}
		else
		{
			this._offset = (page - 1) * this.itemsPerPage + 1
		}
		this.isLoading =true;
		this.userservice. getData({limit:this.itemsPerPage,offset:this._offset}, "WebHomePage/GetWeddingFixedList", "POST").subscribe((response: any) => 
		{
			this.isLoading =false;
			//console.log(response);
			if(response.status==1)
  			{
  				this.weddingfixtodayInfo = response.data;
		    }
		})
	}

}


