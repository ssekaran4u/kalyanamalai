import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from './../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UserGlobalService } from './../../services/user.global';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit 
{
	// regno = localStorage.getItem("INkmSet_id");
	defaultImage:string = '';
	myBookmark      :any = [];
	ignoredBookmark :any = [];
	blockedBookmark :any = [];

	modalRef: BsModalRef;
	config = {
    	keyboard: false,
    	ignoreBackdropClick: true,
    	animated: true
  	};

	myBookmarkNotFound:boolean = false;
	ignoredBookmarkNotFound:boolean = false;
	blockedBookmarkNotFound:boolean = false;

	myBookmarkPage: number;
	ignoredBookmarkPage: number;
	blockedBookmarkPage: number;

	myBookmarkTotalItems:any;
	ignoredBookmarkTotalItems:any;
	blockedBookmarkTotalItems:any;

	myBookmarkData:boolean = false;
	recivedBookmarkData:boolean = false;
	ignoredBookmarkData:boolean = false;
	blockedBookmarkData:boolean = false;

	_offset=0;
	myBookmarkLoading:boolean = false;
	ignoredBookmarkLoading:boolean = false;
	blockedBookmarkLoading:boolean = false;
	itemsPerPage = 5;

	personalizedMessageForm: FormGroup;
	FwdMessageForm: FormGroup;
	expressInterestMsg:any = [];
	MsgdisableBtn = false;
	disableBtn = false;
	SubmitbuttonName: string;
	MsgSubmitbuttonName: string;
	isLoading:boolean = false;

	getEmail:string = '';
	getMobile:string = '';
	getPhone:string = '';

	SentInterestMessage: number = null;
	isReplyRegNo:string = '';
	activeProcess:string = '';
	activeMessage:string = '';
	thisContent:string = '';
	textContent:string= '';
	actionButtonTrue:string = '';
	actionButtonFalse:string = '';
	FwdSubmitbuttonName:string;
	MsgFwddisableBtn:boolean = false;

	activeprofiledata:any = [];
	activeRegNumber:string = '';
	isBecome:number = null;
	isTotalNofOfContact:string = '';
	isViewedContact:string = '';
	isMatchingNotFoundLoading:boolean = false;
	totalMatchingItems: any;
    activeSlide = 0;
    galleryItems = [];
    matchinglists:any = [];


	pageSetUp :any;
  	regno     :any;

  	constructor( private UserGlobalService:UserGlobalService, private modalService: BsModalService,private formBuilder: FormBuilder, private dbService: NgxIndexedDBService, private router: Router, private notifyService : NotificationService, private userservice: UserService, private titleService: Title) {
  	
  		this.personalizedMessageForm = this.formBuilder.group({
            message: ''
        });
        this.FwdMessageForm = this.formBuilder.group({
            yourEmail: '',
            fwdEmail: ''
        });
        this.MsgSubmitbuttonName = 'Sent Message';
        this.FwdSubmitbuttonName = 'Forward';
  	}

  	// isSetDefault()
  	// 	{
   //  		this.dbService.getByKey('setup', 1).subscribe((userData) => 
   //  		{ 
   //        		localStorage.setItem('pageSetUp',JSON.stringify(userData));
   //    		});
 		// }

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

	            this.myBookmarkLoading = true;
		  		this.ignoredBookmarkLoading = true;
		  		this.blockedBookmarkLoading = true;
		  		this.userservice.getData({regno:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebMyList/GetMyLists", "POST").subscribe((response: any) => 
		  		{
		  			this.myBookmarkLoading = false;
		  			this.ignoredBookmarkLoading = false;
		  			this.blockedBookmarkLoading = false;
		  			if(response.status==1)
		  			{
			  			let _newData = response.bookmarklist;
			  			if(_newData.length)
			  			{
			  				this.myBookmarkData=true;
								this.myBookmark =  _newData;
								this.myBookmarkTotalItems = response.totalbookmark;	
			  			}
			  			else
			  			{
			  				this.myBookmarkNotFound = true;
			  			}
				      	
			  			let _deletedData = response.ignorelist;
			  			if(_deletedData.length)
			  			{
		  					this.ignoredBookmarkData=true;
							this.ignoredBookmark =  _deletedData;
							this.ignoredBookmarkTotalItems = response.totalignore;	
			  			}
			  			else
			  			{
			  				this.ignoredBookmarkNotFound = true;
			  			}

			  			let _blockedData = response.blocklist;
			  			if(_blockedData.length)
			  			{
		  					this.blockedBookmarkData=true;
							this.blockedBookmark =  _blockedData;
							this.blockedBookmarkTotalItems = response.totalblocked;	
							//console.log(response.blocklist);
			  			}
			  			else
			  			{

			  				this.blockedBookmarkNotFound = true;
			  			}

			  			this.activeprofiledata = response.contactdetails[0];
			  			this.activeRegNumber =this.activeprofiledata.RegNumber;

				      	this.isTotalNofOfContact= this.activeprofiledata.NoOfContacts;
								this.isViewedContact= this.activeprofiledata.ViewedContacts;
				      	if(this.activeprofiledata.PaymentStatus=="Free")
				      	{
				      		this.isBecome = 0;
				      	}
				      	else if(this.activeprofiledata.PaymentStatus=="Paid")
				      	{
				      		this.isBecome = 1;	
				      	}
				      	else if(this.activeprofiledata.PaymentStatus=="Complementry")
				      	{
				      		this.isBecome = 1;	
				      	}
				      	else if(this.activeprofiledata.PaymentStatus=="Renewal")
				      	{
				      		this.isBecome = 2;	
				      	}

		  			}
		  			else
		  			{
		  				this.myBookmarkNotFound = true;
		  				this.ignoredBookmarkNotFound = true;
		  				this.blockedBookmarkNotFound = true;
		  				this.notifyService.showWarning("Something went wrong. Try again", "")
		  			}
			  	})
		  		this.titleService.setTitle('Bookmarks - Kalyanamalai');
  				this.defaultImage = 'https://cdn.dribbble.com/users/154550/screenshots/3014408/untitled-9.gif';

	        }
	        else
	        {
	            this.router.navigate(['/logout']);    
	        }
	    });
        
  		
  	}

  	getmyBookmark(page) 
  	{
  		this.dbService.getByKey('setup', 1).subscribe((userData) => 
	    { 
	        localStorage.setItem('pageSetUp',JSON.stringify(userData));
	        this.pageSetUp   = localStorage.getItem("pageSetUp");
	        if(this.pageSetUp!='undefined' && this.pageSetUp != null)
	        {
	        	this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
	            this.regno     = this.pageSetUp["INkmSet_id"];

	            this.myBookmarkData=false;
				this.myBookmarkLoading = true;
				if(page==1)
				{
					this._offset = 0	
				}
				else
				{
					this._offset = (page - 1) * this.itemsPerPage
				}

				this.userservice.getData({regno:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebMyList/GetBookMarkList", "POST").subscribe((response: any) => 
				{
		  			this.myBookmarkLoading = false;
					if(response.status==1)
		  			{
		  				this.myBookmarkData=true;
						this.myBookmark =  response.data;
				    }
				})

	        }
	        else
	        {
	            this.router.navigate(['/logout']);    
	        }
	    });

  		
  	}

  	BookmarkActions(view,process,page,requestid)
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
  		if(view && process && requestid)
  		{
  			if(view=='list' && process=='ignore')
  			{
	  			this.myBookmarkData=false;
				this.myBookmarkLoading = true;

				this._offset = 0
				this.userservice. getData({LoginRegNo:this.regno,UserRegNo:requestid}, "WebViewMatchProfile/BookMarktoIgnore", "POST").subscribe((response: any) => 
				{
					if(response.status==1)
		  			{
		  				this.userservice. getData({regno:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebMyList/GetBookMarkList", "POST").subscribe((response: any) => 
						{
							try 
							{
								if(response.status==1)
					  			{
					  				this.myBookmarkData=true;
					  				this.myBookmarkLoading = false;
										this.myBookmark =  response.data;
			  						this.notifyService.showSuccess("Ignored Successfully...!", "")
							    }
							    else
							    {
									  this.myBookmarkData=true;
					  				this.myBookmarkLoading = false;
					  				this.notifyService.showWarning("Something went wrong. Try again", "")   	
							    }
							}
							catch (err) 
							{
								  this.myBookmarkData=true;
					  			this.myBookmarkLoading = false;
					  			this.notifyService.showWarning("Something went wrong. Try again", "")
								  //this.notifyService.showError("Internal Server Error", "Error")
							}
						}, (err) => 
						{
							  this.myBookmarkData=true;
					  		this.myBookmarkLoading = false;
					  		this.notifyService.showWarning("Something went wrong. Try again", "")
							  //this.notifyService.showError("Internal Server Error", "Error")
						});
				    }
				    else
				    {
		  				this.myBookmarkData=true;
		  				this.myBookmarkLoading = false;
		  				this.notifyService.showWarning("Getting error try again...!", "");
				    }

				})
			}
			if(view=='list' && process=='delete')
			{
				this.myBookmarkData=false;
				this.myBookmarkLoading = true;
				if(page)
				{
					this._offset = (page - 1) * this.itemsPerPage
				}
				else
				{
					this._offset = 0
				}

				this.userservice. getData({LoginRegNo:this.regno,UserRegNo:requestid}, "WebViewMatchProfile/RemoveBookMark", "POST").subscribe((response: any) => 
				{
					if(response.status==1)
		  			{
		  				this.userservice. getData({regno:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebMyList/GetBookMarkList", "POST").subscribe((response: any) => 
						{
							try 
							{
								if(response.status==1)
					  			{
					  				this.myBookmarkData=true;
					  				this.myBookmarkLoading = false;
										this.myBookmark =  response.data;
			  						this.notifyService.showSuccess("Removed Successfully...!", "")
							    }
							    else
							    {
									this.myBookmarkData=true;
					  				this.myBookmarkLoading = false;
					  				this.notifyService.showWarning("Something went wrong. Try again", "")
					  				//this.notifyService.showWarning("Getting error try again...!", "");	    	
							    }
						    }
							catch (err) 
							{
								this.myBookmarkData=true;
					  		this.myBookmarkLoading = false;
					  		this.notifyService.showWarning("Something went wrong. Try again", "")
								//this.notifyService.showError("Internal Server Error", "Error")
							}
						}, (err) => 
						{
							this.myBookmarkData=true;
					  		this.myBookmarkLoading = false;
					  		this.notifyService.showWarning("Something went wrong. Try again", "")
							//this.notifyService.showError("Internal Server Error", "Error")
						})
				    }
				    else
				    {
		  				this.myBookmarkData=true;
		  				this.myBookmarkLoading = false;
		  				this.notifyService.showWarning("Something went wrong. Try again", "")
		  				//this.notifyService.showWarning("Getting error try again...!", "Warning");
				    }

				})
			}
  		}
  	}

  	getignoredBookmark(page) 
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

  		this.ignoredBookmarkData=false;
		this.ignoredBookmarkLoading = true;
		if(page==1)
		{
			this._offset = 0	
		}
		else
		{
			this._offset = (page - 1) * this.itemsPerPage
		}

		this.userservice.getData({regno:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebMyList/GetIgnoreList", "POST").subscribe((response: any) => 
		{
  			this.ignoredBookmarkLoading = false;
			if(response.status==1)
  			{
  				this.ignoredBookmarkData=true;
				this.ignoredBookmark =  response.data;
		    }
		})
  	}

  	IgnoreActions(view,process,page,requestid)
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

  		if(view && process && requestid)
  		{
  			if(view=='list' && process=='bookmark')
  			{
	  			this.ignoredBookmarkData=false;
				this.ignoredBookmarkLoading = true;
				this._offset = 0

				this.userservice. getData({LoginRegNo:this.regno,UserRegNo:requestid}, "WebViewMatchProfile/IgnoretoBookmark", "POST").subscribe((response: any) => 
				{
					if(response.status==1)
		  			{
		  				this.userservice. getData({regno:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebMyList/GetIgnoreList", "POST").subscribe((response: any) => 
						{
							try 
							{
								if(response.status==1)
					  			{
					  				this.ignoredBookmarkData=true;
					  				this.ignoredBookmarkLoading = false;
									this.ignoredBookmark =  response.data;
			  						this.notifyService.showSuccess("Added to bookmark Successfully...!", "Success")
							    }
							    else
							    {
									this.ignoredBookmarkData=true;
					  				this.ignoredBookmarkLoading = false;
					  				this.notifyService.showInfo("Something went wrong. Try again", "")
					  				//this.notifyService.showWarning("Getting error try again...!", "Warning");	    	
							    }
							}
							catch (err) 
							{
								this.ignoredBookmarkData=true;
					  			this.ignoredBookmarkLoading = false;
					  			this.notifyService.showInfo("Something went wrong. Try again", "")
								//this.notifyService.showError("Internal Server Error", "Error")
							}
						}, (err) => 
						{
							this.ignoredBookmarkData=true;
					  		this.ignoredBookmarkLoading = false;
					  		this.notifyService.showInfo("Something went wrong. Try again", "")
							//this.notifyService.showError("Internal Server Error", "Error")
						})
				    }
				    else
				    {
		  				this.ignoredBookmarkData=true;
		  				this.ignoredBookmarkLoading = false;
		  				this.notifyService.showWarning("Getting error try again...!", "");
				    }

				})
			}
			if(view=='list' && process=='delete')
			{
				this.ignoredBookmarkData=false;
				this.ignoredBookmarkLoading = true;

				this._offset = 0
				this.userservice. getData({LoginRegNo:this.regno,UserRegNo:requestid}, "WebViewMatchProfile/RemoveIgnore", "POST").subscribe((response: any) => 
				{
					if(response.status==1)
		  			{
		  				this.userservice. getData({regno:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebMyList/GetIgnoreList", "POST").subscribe((response: any) => 
						{
							try 
							{
								if(response.status==1)
					  			{
					  				this.ignoredBookmarkData=true;
					  				this.ignoredBookmarkLoading = false;
									this.ignoredBookmark =  response.data;
			  						this.notifyService.showSuccess("Removed Successfully...!", "")
							    }
							    else
							    {
									this.ignoredBookmarkData=true;
					  				this.ignoredBookmarkLoading = false;
					  				this.notifyService.showWarning("Getting error try again...!", "");	    	
							    }
							}
							catch (err) 
							{
								this.blockedBookmarkData=true;
					  			this.blockedBookmarkLoading = false;
					  			this.notifyService.showInfo("Something went wrong. Try again", "")
								//this.notifyService.showError("Internal Server Error", "Error")
							}
						}, (err) => 
						{
							this.ignoredBookmarkData=true;
				  			this.ignoredBookmarkLoading = false;
				  			this.notifyService.showInfo("Something went wrong. Try again", "")
							//this.notifyService.showError("Internal Server Error", "Error")
						})
				    }
				    else
				    {
		  				this.ignoredBookmarkData=true;
		  				this.ignoredBookmarkLoading = false;
		  				this.notifyService.showWarning("Getting error try again...!", "");
				    }
				})
			}
  		}
  	}

  	getblockedBookmark(page) 
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

  		this.blockedBookmarkData=false;
		this.blockedBookmarkLoading = true;
		if(page==1)
		{
			this._offset = 0	
		}
		else
		{
			this._offset = (page - 1) * this.itemsPerPage
		}

		this.userservice.getData({regno:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebMyList/GetBlockedList", "POST").subscribe((response: any) => 
		{
  			this.blockedBookmarkLoading = false;
			if(response.status==1)
  			{
  				this.blockedBookmarkData=true;
				this.blockedBookmark =  response.data;
		    }
		})
  	}

  	UnblockActions(view,process,page,requestid)
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
	    
  		if(view && process && requestid)
  		{
  			if(view=='list' && process=='bookmark')
  			{
	  			this.blockedBookmarkData=false;
				this.blockedBookmarkLoading = true;
				this._offset = 0

				this.userservice. getData({LoginRegNo:this.regno,UserRegNo:requestid}, "WebViewMatchProfile/RemoveBlock", "POST").subscribe((response: any) => 
				{
					if(response.status==1)
		  			{
		  				this.userservice. getData({regno:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebMyList/GetBlockedList", "POST").subscribe((response: any) => 
						{
							try 
							{
								if(response.status==1)
					  			{
					  				this.blockedBookmarkData=true;
					  				this.blockedBookmarkLoading = false;
									this.blockedBookmark =  response.data;
			  						this.notifyService.showSuccess("Unblock Successfully...!", "")
							    }
							    else
							    {
									this.blockedBookmarkData=true;
					  				this.blockedBookmarkLoading = false;
					  				this.notifyService.showWarning("Getting error try again...!", "");	    	
							    }
							}
							catch (err) 
							{
								this.blockedBookmarkData=true;
					  			this.blockedBookmarkLoading = false;
								//this.notifyService.showError("Internal Server Error", "")
								this.notifyService.showInfo("Something went wrong. Try again", "")
							}
						}, (err) => 
						{
							this.blockedBookmarkData=true;
					  		this.blockedBookmarkLoading = false;
							//this.notifyService.showError("Internal Server Error", "")
							this.notifyService.showInfo("Something went wrong. Try again", "")
						});
				    }
				    else
				    {
		  				this.blockedBookmarkData=true;
		  				this.blockedBookmarkLoading = false;
		  				this.notifyService.showWarning("Getting error try again...!", "");
				    }

				})
			}
  		}
  	}

  	activateClass(index: number)
  	{
		this.SentInterestMessage = index;
	}


	closeModal()
	{
		this.modalRef.hide();
	}

	
	
	switchSlide(item:any)
    {
        this.activeSlide = item;
    }

	openCommonModal(content, personalized, prosess, regnumber) 
	{
		this.dbService.getByKey('setup', 1).subscribe((userData) => 
		{ 
        	localStorage.setItem('pageSetUp',JSON.stringify(userData));
  		});

		this.textContent = content;
		this.activeProcess = prosess; 
		this.isReplyRegNo = regnumber;
		
		if(prosess=='photo')
		{
			this.activeMessage = '<strong>Request Photo</strong> Confirm your request for their photograph';	
			this.actionButtonTrue = 'Yes';
			this.actionButtonFalse = 'No';
			this.modalRef = this.modalService.show(content, this.config);
		}
		else if(prosess=='gallery')
		{
			this.galleryItems = this.UserGlobalService.getGalleryItem(this.matchinglists, this.isReplyRegNo);
			this.modalRef = this.modalService.show(personalized, Object.assign({}, { class: 'top2Per',keyboard: false,ignoreBackdropClick: true,animated: true, }));
		}
	} 
	customPopUp()
	{
		this.dbService.getByKey('setup', 1).subscribe((userData) => 
        { 
            localStorage.setItem('pageSetUp',JSON.stringify(userData));

            this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
            this.regno = this.pageSetUp["INkmSet_id"];

            this.actionButtonTrue = '';
			this.actionButtonFalse = '';
			if(this.activeProcess=='contact')
			{
				this.modalRef.hide();
				if(this.isBecome==0)
				{
					this.router.navigate(['schemes']);
				}
				else if(this.isBecome==2)
				{
					this.router.navigate(['schemes']);
				}
				else
				{
					this.isLoading = true;
					this.userservice. getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/GetContactDetails", "POST").subscribe((response: any) => 
					{
						this.isLoading = false;
						if(response.status==1)
			  			{
			  				this.getEmail = response.email;
			  				this.getMobile = response.mobile;
			  				this.getPhone = response.phone;
			  				this.modalRef = this.modalService.show(this.thisContent, this.config);
					    }
					    else
					    {
					    	this.activeMessage = response.message;
							this.actionButtonTrue = 'Ok';
							this.actionButtonFalse = 'Cancel';
					    	this.modalRef = this.modalService.show(this.textContent, this.config);
					    }
					})
				}
			}
			else if(this.activeProcess=='expressinterest')
			{
				if(this.isBecome==2)
				{
					this.modalRef.hide();
					this.router.navigate(['schemes']);
				}	
			}
			else if(this.activeProcess=='message')
			{
				this.modalRef.hide();
				if(this.isBecome==0 || this.isBecome==2)
				{
					this.router.navigate(['schemes']);
				}
			}
			else if(this.activeProcess=='bookmark')
			{
				if(this.isReplyRegNo)
				{
					this.modalRef.hide();
					this.isLoading = true;
					this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/AddBookMark", "POST").subscribe((response: any) => 
					{
						this.isLoading = false;
						if(response.status==1)
			  			{
			  				this.notifyService.showSuccess("Profile Added to Bookmark list", "");
					    }
					    else
					    {
					    	this.notifyService.showWarning("Getting error try again", "");
					    }
					})
				}
			}
			else if(this.activeProcess=='horoscope')
			{
				if(this.isBecome==2)
				{
					this.modalRef.hide();
					this.router.navigate(['schemes']);
				}
				
				if(this.isReplyRegNo)
				{
					this.modalRef.hide();
					this.isLoading = true;
					this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/AddBookMark", "POST").subscribe((response: any) => 
					{
						this.isLoading = false;
						if(response.status==1)
			  			{
			  				this.notifyService.showSuccess("Profile Added to Bookmark list", "");
					    }
					    else
					    {
					    	this.notifyService.showWarning("Getting error try again", "");
					    }
					})
				}
			}
			else if(this.activeProcess=='block')
			{
				if(this.isReplyRegNo)
				{
					this.modalRef.hide();
					this.isLoading = true;
					this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/AddBlock", "POST").subscribe((response: any) => 
					{
						this.isLoading = false;
						if(response.status==1)
			  			{
			  				this.notifyService.showSuccess("Profile Added to Block list", "");
					    }
					    else
					    {
					    	this.notifyService.showWarning("Getting error try again", "");
					    }
					})
				}
			}
			else if(this.activeProcess=='ignore')
			{
				if(this.isReplyRegNo)
				{
					this.modalRef.hide();
					this.isLoading = true;
					this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/AddIgnore", "POST").subscribe((response: any) => 
					{
						this.isLoading = false;
						if(response.status==1)
			  			{
			  				this.notifyService.showSuccess("Profile Added to Ignore list", "");
					    }
					    else
					    {
					    	this.notifyService.showWarning("Getting error try again", "");
					    }
					})
				}
			}
			else if(this.activeProcess=='photo')
			{
				if(this.isReplyRegNo)
				{
					this.modalRef.hide();
					this.isLoading = true;
					this.userservice. getData({FromRegNo:this.regno,ToRegNo:this.isReplyRegNo}, "WebViewMatchProfile/PhotoRequest", "POST").subscribe((response: any) => 
					{
						this.isLoading = false;
						if(response.status==1)
			  			{
			  				this.notifyService.showSuccess(response.message, "");
					    }
					    else
					    {
					    	this.notifyService.showWarning(response.message, "");
					    }
					})
				}
			}
  		});		
	}
}
