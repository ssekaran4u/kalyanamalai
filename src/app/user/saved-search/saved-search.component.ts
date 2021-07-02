import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from './../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { UserGlobalService } from './../../services/user.global';

@Component({
  selector: 'app-saved-search',
  templateUrl: './saved-search.component.html',
  styleUrls: ['./saved-search.component.css']
})
export class SavedSearchComponent implements OnInit {
	// regno = localStorage.getItem("INkmSet_id");
	saveSearch = [];
	saveSearchNotFound:boolean = false;
	saveSearchPage: number;
	saveSearchTotalItems:any;
	saveSearchData:boolean = false;
	newLoading:boolean = false;

	pageSetUp :any;
  	regno     :any;

	_offset=0;
	itemsPerPage = 10;
	user_save_info:any = [];

	constructor(private UserGlobalService:UserGlobalService, private userservice: UserService, private titleService: Title, private notifyService: NotificationService,private dbService: NgxIndexedDBService, private router: Router) {}

	 isSetDefault()
	  {
	    this.dbService.getByKey('setup', 1).subscribe((userData) => 
	    { 
	          localStorage.setItem('pageSetUp',JSON.stringify(userData));
	      });
	  }

	ngOnInit(): void 
	{
		this.dbService.getByKey('setup', 1).subscribe((userData) => 
	    { 
	        localStorage.setItem('pageSetUp',JSON.stringify(userData));
	        this.pageSetUp   = localStorage.getItem("pageSetUp");
	        if(this.pageSetUp!='undefined' && this.pageSetUp != null)
	        {
	        	this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
	            this.regno     = this.pageSetUp["INkmSet_id"];

	            this.newLoading = true;
				this.saveSearchData=false;

				this.userservice.getData({regno:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebUserSearch/GetSaveSearchList", "POST").subscribe((response: any) => 
				{
					//console.log(this.regno);
					this.newLoading = false;
					if(response.status==1)
					{
						this.saveSearchTotalItems = response.total;	
						this.saveSearchData=true;
						this.saveSearch =  response.data;
					}
					else
					{
						this.saveSearchNotFound = true;
					}
				})
				this.titleService.setTitle('Saved Search - Kalyanamalai');	

	        }
	        else
	        {
	            this.router.navigate(['/logout']);    
	        }
	    });

		
	}
	theV = [];
	ResultSearch(getItem)
	{
		// this.theV = value;
		//this.theV = this.UserGlobalService.getuserSearchId(this.saveSearch ,getItem);

		// this.saveSearch.forEach(function (value) 
		// {
		// 	if(value.UsersSavedSearchId==getItem)
		// 	{
		// 		this.theV = value.UsersSavedSearchId;
		// 	}
		// });

		//console.log(getItem);

		this.userservice.getData( {UsersSavedSearchId : getItem}, "WebUserSearch/SearchInputs", "POST").subscribe((response: any) => 
        {
            if (response.status == 1) 
            {
                this.router.navigate(['search-profiles']);
            } 
            else 
            {
            	this.notifyService.showInfo(response.message, "")
            }
        
        });
	} 

	getsaveSearch(page) 
	{
		this.dbService.getByKey('setup', 1).subscribe((userData) => 
	    { 
	        localStorage.setItem('pageSetUp',JSON.stringify(userData));
	        this.pageSetUp   = localStorage.getItem("pageSetUp");
	        if(this.pageSetUp!='undefined' && this.pageSetUp != null)
	        {
	        	this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
	            this.regno     = this.pageSetUp["INkmSet_id"];

	        }
	    });
		window.scroll(2,1);
		this.saveSearchData=false;
		this.newLoading = true;
		if(page==1)
		{
			this._offset = 0	
		}
		else
		{
			this._offset = (page - 1) * this.itemsPerPage
		}

		this.userservice.getData({regno:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebUserSearch/GetSaveSearchDetails", "POST").subscribe((response: any) => 
		{
			this.newLoading = false;
			if(response.status==1)
			{
				this.saveSearchTotalItems = response.total;	
				this.saveSearchData=true;
				this.saveSearch =  response.data;
			}
			else
			{
				this.saveSearchNotFound = true;
			}
		})
	}

	DeleteSearch(deleteItem) 
	{
		this.dbService.getByKey('setup', 1).subscribe((userData) => 
	    { 
	        localStorage.setItem('pageSetUp',JSON.stringify(userData));
	        this.pageSetUp   = localStorage.getItem("pageSetUp");
	        if(this.pageSetUp!='undefined' && this.pageSetUp != null)
	        {
	        	this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
	            this.regno     = this.pageSetUp["INkmSet_id"];

	        }
	    });
	    
		if(deleteItem)
		{
			this.userservice.getData({SearchId:deleteItem}, "WebUserSearch/DeleteSaveSearch", "POST").subscribe((response: any) => 
			{
				this.newLoading = true;
				if(response.status==1)
				{
					this.userservice.getData({regno:this.regno,limit:this.itemsPerPage,offset:0}, "WebUserSearch/GetSaveSearchDetails", "POST").subscribe((response: any) => 
					{
						console.log(response);
						this.newLoading = false;
						if(response.status==1)
						{
							this.saveSearchData=false;
							this.saveSearchData=true;
							this.saveSearchTotalItems = response.total;    
							this.saveSearch =  response.data;
							this.notifyService.showSuccess("Deleted Successfully", "");
						}
						else
						{
							this.saveSearchData=false;
							this.saveSearchNotFound = true;
						}
					})
				}
				else
				{
					this.notifyService.showWarning("Getting error try again", "");
				}
			})
		}
	}
}
