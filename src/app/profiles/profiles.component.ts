import { Component, OnInit,  TemplateRef} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from './../services/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

	pageSetUp    :any;
  	regno     :any;
	getEmail:string = '';
	getMobile:string = '';
	getPhone:string = '';
	modalRef: BsModalRef;
	config = {
    	keyboard: false,
    	ignoreBackdropClick: true,
    	animated: true
  	};
	isLoading:boolean = false;
	isExpressRegno :string = '';
	expressInterestMsg = [];

  	constructor(private dbService: NgxIndexedDBService,private router: Router,private userservice: UserService, private modalService: BsModalService, private titleService: Title, 
  		private notifyService: NotificationService) { }
  	SentInterestMessage: number = null;
	
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
	        }
	        else
	        {
	            this.router.navigate(['/logout']);    
	        }
	    });   
	}

	activateClass(index: number){
		this.SentInterestMessage = index;
	}
  	openModal(template: TemplateRef<any>, regno ) 
  	{
  		this.dbService.getByKey('setup', 1).subscribe((userData) => 
	    { 
	        localStorage.setItem('pageSetUp',JSON.stringify(userData));
	        this.pageSetUp   = localStorage.getItem("pageSetUp");
	        this.regno     = this.pageSetUp["INkmSet_id"];
	    });

  		this.isExpressRegno = regno
	    this.modalRef = this.modalService.show(template, this.config);
	}
	openCommunication(communication: TemplateRef<any>, regno )
	{

	} 
	openContactModal(communication: TemplateRef<any>, regno ) 
  	{
  		if(regno)
		{
			console.log(regno);
			this.isLoading = true;
			this.userservice. getData({LoginRegNo:this.regno,UserRegNo:regno}, "WebViewMatchProfile/GetContactDetails", "POST").subscribe((response: any) => 
			{
				this.isLoading = false;
				if(response.status==1)
	  			{
	  				this.getEmail = response.email;
	  				this.getMobile = response.mobile;
	  				this.getPhone = response.phone;
	  				this.modalRef = this.modalService.show(communication, this.config);
			    }
			    else
			    {
			    	this.notifyService.showWarning(response.message, "Warning");
			    }
			})
		}
	}

	addBookmark(bookmarkregno)
	{
		this.dbService.getByKey('setup', 1).subscribe((userData) => 
	    { 
	        localStorage.setItem('pageSetUp',JSON.stringify(userData));
	        this.pageSetUp   = localStorage.getItem("pageSetUp");
	        this.regno     = this.pageSetUp["INkmSet_id"];
	        
	        if(bookmarkregno)
			{
				this.isLoading = true;
				this.userservice.getData({LoginRegNo:this.regno,UserRegNo:bookmarkregno}, "WebViewMatchProfile/AddBookMark", "POST").subscribe((response: any) => 
				{
					this.isLoading = false;
					if(response.status==1)
		  			{
		  				this.notifyService.showSuccess("Profile Added to Bookmark list", "Success");
				    }
				    else
				    {
				    	this.notifyService.showWarning("Getting error try again", "Warning");
				    }
				})
			}
	    });	
		
	}

	addBlock(blockregno)
	{
		this.dbService.getByKey('setup', 1).subscribe((userData) => 
	    { 
	        localStorage.setItem('pageSetUp',JSON.stringify(userData));
	        this.pageSetUp   = localStorage.getItem("pageSetUp");
	        this.regno     = this.pageSetUp["INkmSet_id"];
			if(blockregno)
			{
				this.isLoading = true;
				this.userservice.getData({LoginRegNo:this.regno,UserRegNo:blockregno}, "WebViewMatchProfile/AddBlock", "POST").subscribe((response: any) => 
				{
					this.isLoading = false;
					if(response.status==1)
		  			{
		  				this.notifyService.showSuccess("Profile Added to Block list", "Success");
				    }
				    else
				    {
				    	this.notifyService.showWarning("Getting error try again", "Warning");
				    }
				})
			}
		});
	}

	closeModal()
	{
		this.modalRef.hide();
		this.SentInterestMessage = null;
		this.getEmail = '';
		this.getMobile = '';
		this.getPhone = '';
	}

	addIgnore(bookmarkregno)
	{
		this.dbService.getByKey('setup', 1).subscribe((userData) => 
	    { 
	        localStorage.setItem('pageSetUp',JSON.stringify(userData));
	        this.pageSetUp   = localStorage.getItem("pageSetUp");
	        this.regno     = this.pageSetUp["INkmSet_id"];
			if(bookmarkregno)
			{
				this.isLoading = true;
				this.userservice.getData({LoginRegNo:this.regno,UserRegNo:bookmarkregno}, "WebViewMatchProfile/AddIgnore", "POST").subscribe((response: any) => 
				{
					this.isLoading = false;
					if(response.status==1)
		  			{
		  				this.notifyService.showSuccess("Profile Added to Ignore list", "Success");
				    }
				    else
				    {
				    	this.notifyService.showWarning("Getting error try again", "Warning");
				    }
				})
			}
		});
	}

}
