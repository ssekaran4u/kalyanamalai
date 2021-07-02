import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
	// regno = localStorage.getItem("INkmSet_id");
	_offset=0;
	paymentpage: number;
	contactpage: number;

	itemsPerPage = 5;
	accountdetailsLoading:boolean = false;
	accountdetails:any = [];

	paymentLoding:boolean = false;
	paymentNotFound:boolean = false;
	paymentItems:any = [];
	paymentTotalItems: any;
	paymentData:boolean = false;
	
	totalmaximumcontacts:any;
	totalcontactsviewed:any;

	contactLoding:boolean = false;
	contactNotFound:boolean = false;
	contactItems :any = [];
	contactData:boolean= false;
	contactTotalItems: any;

	isProfileCompleteness:boolean = false;
	
	advertisementLoding:boolean = false;
	advertisementNotFound:boolean = false;
	advertisementItems :any = [];
	advertisementData :boolean = false;
	advertisementTotalItems: any;
	viewedPercentage:any;
	remainingPercentage:any;
	remainViews:any;

	pageSetUp :any;
  	regno     :any;

	constructor(private dbService: NgxIndexedDBService,private router: Router, private userservice: UserService, private titleService: Title) {}

  	 isSetDefault()
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
	        else
	        {
	            this.router.navigate(['/logout']);    
	        }
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

	            this.accountdetailsLoading = true;
				  		this.paymentLoding = true;
				  		this.contactLoding = true;
				  		// this.totalmaximumcontacts=
				  		// this.totalcontactsviewed=
				  		this.paymentData = false;
				  		this.contactData = false;

				  		this.userservice. getData({regno:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebMyAccount/GetAccountDetails", "POST").subscribe((response: any) => 
				  		{
				  			if(response.status==1)
				  			{
				  				this.paymentTotalItems = response.totalpayments
				  				this.contactTotalItems = response.totalcontacts;


				  				if(response.totalmaximumcontacts>0)
				  				{
				  					this.totalmaximumcontacts = response.totalmaximumcontacts;
				  					this.totalcontactsviewed = response.totalcontactsviewed;
				  					this.remainViews =  parseInt(this.totalmaximumcontacts)-parseInt(this.totalcontactsviewed);
				  					let perOne = parseInt(this.totalmaximumcontacts)-parseInt(this.totalcontactsviewed);
				  					let perTwo = perOne / parseInt(this.totalmaximumcontacts);
				  					let viewedPercentage = perTwo * 100;

				  					this.viewedPercentage = viewedPercentage;
				  					this.remainingPercentage = 100-viewedPercentage;
				  				}
				  				else
				  				{
				  					this.totalmaximumcontacts = 0;
				  					this.totalcontactsviewed = 0;
				  					this.remainingPercentage = 0;
				  					this.viewedPercentage = 0;
				  				}

				  				this.paymentLoding = false;
				  				this.accountdetailsLoading = false;
				  				this.contactLoding = false;

				  				this.accountdetails = response.accountdetails[0];
				  				
				  				if(this.accountdetails.ProfileCompleteness===100)
			                    {
			                        this.isProfileCompleteness = true;
			                    }

					  			let _matchPaymentdata = response.paymentdetails;
					  			if(_matchPaymentdata.length)
					  			{
									this.paymentItems =  _matchPaymentdata;
									this.paymentData = true;
					  			}
					  			else
					  			{
					  				this.paymentNotFound = true;
					  			}

					  			let _matchContactdata = response.contactdetails;
					  			if(_matchContactdata.length)
					  			{
									this.contactItems =  _matchContactdata;
									this.contactData = true;
					  			}
					  			else
					  			{
					  				this.contactNotFound = true;
					  			}


					  			let _advertisementdata = response.advertisementdetails;
					  			if(_advertisementdata.length)
					  			{
									this.advertisementItems =  _advertisementdata;
									this.advertisementData = true;
									this.advertisementTotalItems = 15;
					  			}
					  			else
					  			{
					  				this.advertisementNotFound = true;
					  			}
				  			}
				  			else
				  			{
				  				// this.isMatchingNotFoundLoading = true;
				  			}
					  	})
				  		this.titleService.setTitle('My Account - Kalyanamalai');
	        }
	        else
	        {
	            this.router.navigate(['/logout']);    
	        }
	    });
        
  		
  	}


  getPaymentPage(page) 
	{
		this.dbService.getByKey('setup', 1).subscribe((userData) => 
	    { 
	        localStorage.setItem('pageSetUp',JSON.stringify(userData));
	        this.pageSetUp   = localStorage.getItem("pageSetUp");
	        if(this.pageSetUp!='undefined' && this.pageSetUp != null)
	        {
	        	this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
	            this.regno     = this.pageSetUp["INkmSet_id"];

	            this.paymentData=false;
				this.paymentLoding = true;
				if(page==1)
				{
					this._offset = 0	
				}
				else
				{
					this._offset = (page - 1) * this.itemsPerPage + 1
				}

				this.userservice. getData({regno:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebMyAccount/GetPaymentDetails", "POST").subscribe((response: any) => 
				{
					if(response.status==1)
		  			{
		  				this.paymentData=true;
		  				this.paymentLoding= false;
							this.paymentItems =  response.data;
				    }
				})
	        }
	        else
	        {
	            this.router.navigate(['/logout']);    
	        }
	    });	
	}

  getContactPage(page) 
	{
		this.dbService.getByKey('setup', 1).subscribe((userData) => 
	    { 
	        localStorage.setItem('pageSetUp',JSON.stringify(userData));
	        this.pageSetUp   = localStorage.getItem("pageSetUp");
	        if(this.pageSetUp!='undefined' && this.pageSetUp != null)
	        {
	        	this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
	            this.regno     = this.pageSetUp["INkmSet_id"];

	        	this.contactLoding = true;
				this.contactData=false;
				
				if(page==1)
				{
					this._offset = 0	
				}
				else
				{
					this._offset = (page - 1) * this.itemsPerPage + 1
				}

				this.userservice. getData({regno:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebMyAccount/GetContactDetails", "POST").subscribe((response: any) => 
				{
					if(response.status==1)
		  			{
						this.contactItems =  response.data;
		  				this.contactData=true;
		  				this.contactLoding= false;
				    }
				    //console.log(this.contactItems );
				})
	        }
	        else
	        {
	            this.router.navigate(['/logout']);    
	        }
	    });
		
	}

}
