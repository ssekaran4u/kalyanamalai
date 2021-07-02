import { Component, OnInit, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from './../../services/user.service';
import { UserGlobalService } from './../../services/user.global';
import { NotificationService } from '../../services/notification.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-matching-profiles',
  templateUrl: './matching-profiles.component.html',
  styleUrls: ['./matching-profiles.component.css']
})
export class MatchingProfilesComponent implements OnInit 
{
	// regno = localStorage.getItem("INkmSet_id");
	modalRef: BsModalRef;
	config = {
    	keyboard: false,
    	ignoreBackdropClick: true,
    	animated: true
  	};

	isLoading:boolean = false;
	isMatchingLoading:boolean = false;
	isMatchingLoadingData:boolean = true;
	isMatchingNotFoundLoading:boolean = false;
	totalMatchingItems: any;
	getEmail:string = '';
	getMobile:string = '';
	getPhone:string = '';

	_offset=0;
	p: number=1;
	itemsPerPage = 3;
	defaultImage:string = '';
	matchinglists :any = [];
	activeprofiledata :any = [];

	activeRegNumber:string = '';
	isBecome:number = null;
	isTotalNofOfContact:string = '';
	isViewedContact:string = '';

	personalizedMessageForm: FormGroup;
	FwdMessageForm: FormGroup;
	expressInterestMsg:any = [];
	MsgdisableBtn = false;
	disableBtn = false;
	SubmitbuttonName: string;
	MsgSubmitbuttonName: string;
	


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

	pageSetUp :any;
  	regno     :any;

  	activeSlide = 0;
    galleryItems = [];
    galleryItemsdata:any = [];
	
	getContactInfo:any = [];
    currentDiff:string = '';
	bookmarkStatus: boolean = false;
	FwrdProfileMessage:any = [];

    isRecentVisitorsLoading:boolean = false;
    isrecentvisitorslistNotFoundLoading :boolean = false;
    recentvisitorslist:any = [];


	constructor(private UserGlobalService:UserGlobalService, private dbService: NgxIndexedDBService, private formBuilder: FormBuilder, private router: Router,private modalService: BsModalService, private userservice: UserService, private titleService: Title,private notifyService : NotificationService) 
	{
		this.personalizedMessageForm = this.formBuilder.group({
            message: ''
        });
        this.FwdMessageForm = this.formBuilder.group({
            yourEmail: '',
            fwdEmail: ''
        });
        this.MsgSubmitbuttonName = 'Sent Message';
        this.FwdSubmitbuttonName = 'Forward';
        this.SubmitbuttonName = 'Sent Interest';
	}

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
		        
		  		this.isMatchingLoadingData = false;
		  		this.isMatchingLoading = true;
		  		this.isRecentVisitorsLoading = true;
		  		// this.getAllData();
		  		this.userservice. getData({regno:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebMyDashboard/MatchingList", "POST").subscribe((response: any) => 
		  		{
		  			this.isRecentVisitorsLoading = false;
		  			this.isMatchingLoading = false;
		  			if(response.status==1)
		  			{
		  				this.isMatchingLoadingData=true;
		  				this.isMatchingLoading = false;
				      	this.totalMatchingItems = response.total;
				      	this._offset = response.offset;

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

			  			this.activeprofiledata = response.contactdetails[0];
              
				      	this.activeRegNumber =this.activeprofiledata.RegNumber;

				      	this.expressInterestMsg = this.activeprofiledata.expressinterestlist;
				      	this.isTotalNofOfContact= this.activeprofiledata.NoOfContacts;
						this.isViewedContact= this.activeprofiledata.ViewedContacts;

						let _recentvisitorsData = response.recentvisitorslist;
			  			if(_recentvisitorsData.length)
			  			{
							this.recentvisitorslist =  _recentvisitorsData;
							window.scroll(1,1);
			  			}
			  			else
			  			{
			  				this.isrecentvisitorslistNotFoundLoading = true;
			  			}
			  			
				      	// if(this.activeprofiledata.PaymentStatus=="Free")
				      	// {
				      	// 	this.isBecome = 0;
				      	// }
				      	// else if(this.activeprofiledata.PaymentStatus=="Paid")
				      	// {
				      	// 	this.isBecome = 1;	
				      	// }
				      	// else if(this.activeprofiledata.PaymentStatus=="Complementry")
				      	// {
				      	// 	this.isBecome = 1;	
				      	// }
				      	// else if(this.activeprofiledata.PaymentStatus=="Renewal")
				      	// {
				      	// 	this.isBecome = 2;	
				      	// }
		  			}
		  			else
		  			{
		  				this.isMatchingNotFoundLoading = true;
		  			}
			  	}) 
		  		
	        }
	        else
	        {
	            this.router.navigate(['/logout']);    
	        }
	    });

  		this.titleService.setTitle('Matching Profiles - Kalyanamalai');
		this.defaultImage = 'https://cdn.dribbble.com/users/154550/screenshots/3014408/untitled-9.gif';
  	}


	getPage(page) 
	{
		this.p=page;
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

		window.scroll(1,1);
		this.isMatchingLoadingData = false;
  		this.isMatchingLoading = true;
  		let _offsetpage;
		if(page==1)
		{
			_offsetpage = 0	
		}
		else
		{
			// _offsetpage = (page - 1) * this.itemsPerPage + 1
			_offsetpage = (page - 1) * this.itemsPerPage
		}
		this.userservice. getData({regno:this.regno,limit:this.itemsPerPage,offset:_offsetpage}, "WebMyDashboard/MatchingList", "POST").subscribe((response: any) => 
		{
			if(response.status==1)
  			{
  				this._offset = response.offset;
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

	activateClass(index: number)
  	{
		this.SentInterestMessage = index;
	}

	onMessageSubmit() 
	{
		this.dbService.getByKey('setup', 1).subscribe((userData) => 
		{ 
        	localStorage.setItem('pageSetUp',JSON.stringify(userData));
            this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
            this.regno = this.pageSetUp["INkmSet_id"];

            const result = Object.assign({}, this.personalizedMessageForm.value);
			if(result.message)
			{
				this.MsgdisableBtn = true;
				this.MsgSubmitbuttonName = 'Loading';
				this.isLoading = true;
				this.userservice. getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo,Message:result.message}, "WebViewMatchProfile/SendMessage", "POST").subscribe((response: any) => 
		  		{
					this.isLoading = false;
					this.closeModal();
					if (response.status == 1) 
					{
						this.notifyService.showSuccess(response.message, "")
						this.MsgdisableBtn = false;
						this.MsgSubmitbuttonName = 'Sent Message';
					} 
					else 
					{
						this.MsgdisableBtn = false;
						this.MsgSubmitbuttonName = 'Sent Message';
						this.activeMessage = response.message;
						this.actionButtonTrue = 'Ok';
						this.actionButtonFalse = 'Cancel';
				    	this.modalRef = this.modalService.show(this.textContent, this.config);
					}
			  	}, 
			  	(err) => 
				{
					this.MsgdisableBtn = false;
					this.MsgSubmitbuttonName = 'Sent Message';
					this.notifyService.showInfo("Something went wrong. Try again", "")
				})
			}
			else
			{
				this.notifyService.showWarning("Enter your message to Continue", "");
			}
  		});
	}

	onFwdMessageSubmit() 
	{
		this.dbService.getByKey('setup', 1).subscribe((userData) => 
		{ 
        	localStorage.setItem('pageSetUp',JSON.stringify(userData));
        	this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
            this.regno = this.pageSetUp["INkmSet_id"];

            const fwdresult = Object.assign({}, this.FwdMessageForm.value);
			if(fwdresult.fwdEmail)
			{
				let emailpattern =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		        if(fwdresult.fwdEmail.match(emailpattern))
			    {
			    	this.MsgFwddisableBtn = true;
					this.MsgSubmitbuttonName = 'Loading';
					this.isLoading = true;
					this.userservice. getData({LoginRegNo:this.regno,ForwardProfileRegNo:this.isReplyRegNo,ToEmail:fwdresult.fwdEmail}, "WebMyDashboard/ProfileForward", "POST").subscribe((response: any) => 
			  		{
						this.isLoading = false;
						if (response.code == 1) 
						{
							this.closeModal();
							this.MsgFwddisableBtn = false;
							this.FwdSubmitbuttonName = 'Forward';
							this.notifyService.showSuccess(response.message, "")
						} 
						else 
						{
							this.MsgFwddisableBtn = false;
							this.FwdSubmitbuttonName = 'Forward';
							this.notifyService.showWarning(response.message, "")
						}
				  	}, 
				  	(err) => 
					{
						this.MsgFwddisableBtn = false;
						this.MsgSubmitbuttonName = 'Forward';
						this.notifyService.showInfo("Something went wrong. Try again", "")
					})
			  	}
			  	else
			  	{
			  		this.notifyService.showWarning("Enter valid email Id", "");
			  	}
			}
			else
			{
				this.notifyService.showWarning("Enter email Id to Continue", "");
			}
  		});
	}

	closeModal()
	{
		this.modalRef.hide();
		this.SentInterestMessage = null;
		this.personalizedMessageForm.reset();
		this.FwdMessageForm.reset();
		this.isReplyRegNo = '';
		this.getContactInfo = [];
	}

	SentExpressInterest() 
	{
		if(this.SentInterestMessage!=null && this.isReplyRegNo)
		{
			let vs = this.expressInterestMsg[this.SentInterestMessage].name;
			this.isLoading = true;
			this.disableBtn = true;
			this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo,Message:vs}, "WebViewMatchProfile/SendExpressInterest", "POST").subscribe((res: any) => 
			{
				this.isLoading = false;
				try 
				{
					if (res.status == 1) 
					{
						this.closeModal();
						this.SentInterestMessage = null;
						this.disableBtn = false;
						this.notifyService.showSuccess(res.message, "")
					} 
					else 
					{
						this.SubmitbuttonName= 'Sent Interest';
						this.notifyService.showWarning(res.message, "")
						this.disableBtn = false;
					}
				} 
				catch (err) 
				{
					this.SubmitbuttonName= 'Sent Interest';
					this.disableBtn = false;
					this.notifyService.showError(res.message, "")
				}
			}, 
			(err) => 
			{
				this.SubmitbuttonName= 'Sent Interest';
				this.isLoading = false;
				this.disableBtn = false;
				this.notifyService.showInfo("Something went wrong. Try again", "")
			});
		}
		else
		{
			this.notifyService.showWarning("Select any Message and send Interest ", "");
		}
	}
	
	switchSlide(item:any)
    {
        this.activeSlide = item;
    }
    SentHoroscopeRequest()
    {
    	this.isLoading = true;
		this.userservice. getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/HoroscopeRequest", "POST").subscribe((response: any) => 
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
    SentAlbumRequest()
    {
    	this.isLoading = true;
		this.userservice. getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/AlbumRequest", "POST").subscribe((response: any) => 
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
    SentPhotoRequest()
    {
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

	_ModalResponseLoading:boolean = false;
    _ModalResponseData:boolean = false;

    _ModalContactLoading:boolean = false;
    _ModalContacteData:boolean = false;
	openCommonModal(content, personalized, prosess, regnumber, diff) 
	{
		this.dbService.getByKey('setup', 1).subscribe((userData) => 
		{ 
        	localStorage.setItem('pageSetUp',JSON.stringify(userData));
  		});

		this.textContent = content;
		this.activeProcess = prosess; 
		this.isReplyRegNo = regnumber;
		console.log(regnumber);
		if(prosess=='contact')
		{
			this.isLoading = true;
			this._ModalResponseLoading = true;
			this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/GetContactStatusMsg", "POST").subscribe((response: any) => 
			{
				this.isLoading = false;
				this._ModalResponseLoading = false;
				if(response.status==0)
				{
					this.isBecome=0;
					this._ModalResponseData = false;
					this.activeMessage = '<i class="las la-exclamation-circle"></i> '+response.message;
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Close';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if (response.status==1)
				{
					// Need to Confirmation
					this._ModalResponseData = true;
					this.isBecome=1;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = 'Yes';
					this.actionButtonFalse = 'No';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
				}
				else if (response.status==2)
				{
					// Need to Upgrade Membership
					this._ModalResponseData = true;
			    	this.isBecome=2;
			    	this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = 'Upgrade';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
				}
				else if (response.status==3)
				{
					// Display message for QC Verification
			    	this.isBecome=0;
			    	this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
				}
				else if (response.status==4)
				{
					// Display message for Exclusive Member
			    	this.isBecome=0;
			    	this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
				}
			})
		}
		else if(prosess=='expressinterest')
		{
			this.modalRef.hide();
			this.isLoading = true;
			this._ModalResponseLoading = true;
			this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/CheckAlreadyExpress", "POST").subscribe((response: any) => 
			{
				this.isLoading = false;
				this._ModalResponseLoading = false;
				if(response.status==0)
				{
					// 0 Error
					this.activeMessage = '<i class="las la-exclamation-circle"></i> '+response.message;
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Close';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
				else if(response.status==1)
	  			{
	  				// 1-Need to Confirmation
			    	this._ModalResponseData = true;
	  				this.isBecome=1;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = 'Yes';
					this.actionButtonFalse = 'No';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==2)
			    {
			    	// 2-Need to Upgrade Membership
			    	this._ModalResponseData = true;
			    	this.isBecome=2;
			    	this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = 'Upgrade Membership';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==3)
			    {
			    	// 3-Display message for QC Verification
			    	this._ModalResponseData = true;
			    	this.isBecome=0;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==5)
			    {
			    	// Send Directly without confirmation
			    	this.thisContent = personalized;
			    	this.modalRef = this.modalService.show(this.thisContent, this.config);
			    }
			    else if(response.status==6)
			    {
			    	// Display Message for Already send and Reply Message Received
			    	this.isBecome=0;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==7)
			    {
			    	// Already received interest from this profile. Need to reply
			    	this._ModalResponseData = true;
			    	this.isBecome=3;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = 'Reply';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			})
		}
		else if(prosess=='message')
		{
			this.modalRef.hide();
			this.isLoading = true;
			this._ModalResponseLoading = true;
			this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/CheckMessageStatusMsg", "POST").subscribe((response: any) => 
			{
				this.isLoading = false;
				this._ModalResponseLoading = false;
				if(response.status==0)
				{
					// 0 Error
					this.activeMessage = '<i class="las la-exclamation-circle"></i> '+response.message;
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Close';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
				else if(response.status==1)
	  			{
	  				// 1-Need to Confirmation
			    	this._ModalResponseData = true;
	  				this.isBecome=1;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = 'Yes';
					this.actionButtonFalse = 'No';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==2)
			    {
			    	// 2-Need to Upgrade Membership
			    	this._ModalResponseData = true;
			    	this.isBecome=2;
			    	this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = 'Upgrade Membership';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==3)
			    {
			    	// 3-Display message for QC Verification
			    	this._ModalResponseData = true;
			    	this.isBecome=0;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==5)
			    {
			    	// Send Directly without confirmation
			    	this.thisContent = personalized;
			    	this.modalRef = this.modalService.show(this.thisContent, this.config);
			    }
			})
		}
		else if(prosess=='photo')
		{
			this.isLoading = true;
			this._ModalResponseLoading = true;
			this.userservice.getData({FromRegNo:this.regno,ToRegNo:this.isReplyRegNo}, "WebViewMatchProfile/GetPhotoStatusMsg", "POST").subscribe((response: any) => 
			{
				this.isLoading = false;
				this._ModalResponseLoading = false;
				if(response.status==0)
				{
					// 0 Error
					this.activeMessage = '<i class="las la-exclamation-circle"></i> '+response.message;
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Close';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
				else if(response.status==1)
	  			{
	  				// 1-Need to Confirmation
			    	this._ModalResponseData = true;
	  				this.isBecome=1;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+ (response.confirmation ? response.confirmation : '');
					this.actionButtonTrue = 'Yes';
					this.actionButtonFalse = 'No';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==2)
			    {
			    	// 2-Need to Upgrade Membership
			    	this._ModalResponseData = true;
			    	this.isBecome=2;
			    	this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');
					this.actionButtonTrue = 'Upgrade Membership';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==3)
			    {
			    	// 3-Display message for QC Verification
			    	this._ModalResponseData = true;
			    	this.isBecome=0;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==5)
			    {
			    	// Send Directly without confirmation
			    	this.SentPhotoRequest();
			    }
			})
		}
		else if(prosess=='album')
		{
			this.isLoading = true;
			this._ModalResponseLoading = true;
			this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/GetAlbumStatusMsg", "POST").subscribe((response: any) => 
			{
				this.isLoading = false;
				this._ModalResponseLoading = false;
				if(response.status==0)
				{
					// 0 Error
					this.activeMessage = '<i class="las la-exclamation-circle"></i> '+response.message;
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Close';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
				else if(response.status==1)
	  			{
	  				// 1-Need to Confirmation
			    	this._ModalResponseData = true;
	  				this.isBecome=1;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+ (response.confirmation ? response.confirmation : '');
					this.actionButtonTrue = 'Yes';
					this.actionButtonFalse = 'No';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==2)
			    {
			    	// 2-Need to Upgrade Membership
			    	this._ModalResponseData = true;
			    	this.isBecome=2;
			    	this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');
					this.actionButtonTrue = 'Upgrade Membership';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==3)
			    {
			    	// 3-Display message for QC Verification
			    	this._ModalResponseData = true;
			    	this.isBecome=0;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==5)
			    {
			    	// Send Directly without confirmation
			    	this.SentAlbumRequest();
			    }
			})
		}
		else if(prosess=='horoscope')
		{
			this.isLoading = true;
			this._ModalResponseLoading = true;
			this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/GetHoroscopeStatusMsg", "POST").subscribe((response: any) => 
			{
				this.isLoading = false;
				this._ModalResponseLoading = false;
				if(response.status==0)
				{
					// 0 Error
					this.activeMessage = '<i class="las la-exclamation-circle"></i> '+response.message;
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Close';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
				else if(response.status==1)
	  			{
	  				// 1-Need to Confirmation
			    	this._ModalResponseData = true;
	  				this.isBecome=1;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = 'Yes';
					this.actionButtonFalse = 'No';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==2)
			    {
			    	// 2-Need to Upgrade Membership
			    	this._ModalResponseData = true;
			    	this.isBecome=2;
			    	this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = 'Upgrade Membership';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==3)
			    {
			    	// 3-Display message for QC Verification
			    	this._ModalResponseData = true;
			    	this.isBecome=0;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==5)
			    {
			    	// Send Directly without confirmation
			    	this.thisContent = personalized;
			    	this.SentHoroscopeRequest();
			    }
			})
		}
		else if(prosess=='block')
		{
			this._ModalResponseData = false;
			this.currentDiff = diff;
			this.isLoading = true;
			this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/GetConfirmationtoBlock", "POST").subscribe((response: any) => 
			{
				this.isLoading = false;
				this._ModalResponseLoading = false;
				if(response.status==0)
				{
					this.isLoading = false;
					// 0 Error
					this.activeMessage = '<i class="las la-exclamation-circle"></i> '+response.message;
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Close';
					this.modalRef = this.modalService.show(content, this.config);
			    }
				else if(response.status==1)
	  			{
	  				// 1-Need to Confirmation
			    	this._ModalResponseData = true;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = 'Block';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			})
		}
		else if(prosess=='bookmark')
		{
			this._ModalResponseData = false;
			this.currentDiff = diff;
			this.isLoading = true;
			this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/GetConfirmationtoBookmark", "POST").subscribe((response: any) => 
			{
				this.isLoading = false;
				this._ModalResponseLoading = false;
				if(response.status==0)
				{
					this.isLoading = false;
					// 0 Error
					this.activeMessage = '<i class="las la-exclamation-circle"></i> '+response.message;
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Close';
					this.modalRef = this.modalService.show(content, this.config);
			    }
				else if(response.status==1)
	  			{
	  				// 1-Need to Confirmation
			    	this._ModalResponseData = true;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = 'Bookmark';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			})
		}
		else if(prosess=='ignore')
		{
			this._ModalResponseData = false;
			this.currentDiff = diff;
			this.isLoading = true;
			this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/GetConfirmationtoIgnore", "POST").subscribe((response: any) => 
			{
				this.isLoading = false;
				this._ModalResponseLoading = false;
				if(response.status==0)
				{
					this.isLoading = false;
					// 0 Error
					this.activeMessage = '<i class="las la-exclamation-circle"></i> '+response.message;
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Close';
					this.modalRef = this.modalService.show(content, this.config);
			    }
				else if(response.status==1)
	  			{
	  				// 1-Need to Confirmation
			    	this._ModalResponseData = true;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = 'Ignore';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			})
		}
		else if(prosess=='forward')
		{
			// this.modalRef = this.modalService.show(personalized, this.config);
			this.currentDiff = diff;
			this.isLoading = true;
			this.userservice.getData({LoginRegNo:this.regno,ForwardProfileRegNo:this.isReplyRegNo}, "WebMyDashboard/ProfileForwardContent", "POST").subscribe((response: any) => 
			{
				this.isLoading = false;
				if(response.status==0)
				{
					this.activeMessage = '<i class="las la-exclamation-circle"></i> '+ (response.message ? response.message : 'Something went wrong. Try again in a few minutes');
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Close';
					this.modalRef = this.modalService.show(content, this.config);
			    }
				else if(response.status==1)
	  			{
	  				this.FwrdProfileMessage = response.confirmation;
					this.modalRef = this.modalService.show(personalized, this.config);
			    }
			})
		} 
		else if(prosess=='gallery')
	    {
	        this.galleryItemsdata = this.UserGlobalService.getGalleryItem(this.matchinglists, this.isReplyRegNo);
	        this.galleryItems = this.galleryItemsdata.images;
	         console.log(this.galleryItemsdata);
	        this.modalRef = this.modalService.show(personalized, Object.assign({}, { class: 'top2Per',keyboard: false,ignoreBackdropClick: true,animated: true, })); 
	    }
	} 

	getMatchingProfiles()
	{
		this.userservice. getData({regno:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebMyDashboard/MatchingList", "POST").subscribe((response: any) => 
  		{
  			this.isMatchingLoading = false;
  			if(response.status==1)
  			{
		      	this.totalMatchingItems = response.total;
	  			let _matchData = response.data;
	  			if(_matchData.length)
	  			{
					this.matchinglists =  _matchData;
	  			}
	  			else
	  			{
	  				this.isMatchingNotFoundLoading = true;
	  			}
  			}
  			else
  			{
  				this.isMatchingNotFoundLoading = true;
  				this.totalMatchingItems = 0;
  			}
	  	})
	}

	BookmarkDynamic(RegNo)
  	{
		for (var i in this.matchinglists) 
		{
	    	if (this.matchinglists[i].RegNo==RegNo) 
	    	{
	        	this.matchinglists[i].Bookmarkstatus = 1;
	        	break;
	     	}
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
				if(this.isBecome==1)
				{
					this._ModalContacteData = false;
					this._ModalContactLoading = true;
					this.userservice. getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/GetContactDetails", "POST").subscribe((response: any) => 
					{
						this._ModalContactLoading = false;
						if(response.status==1)
			  			{
			  				this.getContactInfo= response;
			  				this._ModalContacteData = true;
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
				else if(this.isBecome==2)
				{
					this.router.navigate(['schemes']);
				}
			}
			else if(this.activeProcess=='expressinterest')
			{
				this.modalRef.hide();
				if(this.isBecome==1 || this.isBecome==3)
				{
					this.modalRef = this.modalService.show(this.thisContent, this.config);
				}
				else if(this.isBecome==2)
				{
					this.router.navigate(['schemes']);
				}
			}
			else if(this.activeProcess=='message')
			{
				this.modalRef.hide();
				if(this.isBecome==1)
				{
					this.modalRef = this.modalService.show(this.thisContent, this.config);
				}
				else if(this.isBecome==2)
				{
					this.router.navigate(['schemes']);
				}
			}
			else if(this.activeProcess=='album')
			{
				this.modalRef.hide();
				if(this.isBecome==1)
				{
					this.SentAlbumRequest();
				}
				else if(this.isBecome==2)
				{
					this.router.navigate(['schemes']);
				}
			}
			else if(this.activeProcess=='horoscope')
			{
				this.modalRef.hide();
				if(this.isBecome==1)
				{
					this.SentHoroscopeRequest();
				}
				else if(this.isBecome==2)
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
			  				this.BookmarkDynamic(this.isReplyRegNo);
			  				this.bookmarkStatus = !this.bookmarkStatus;
			  				this.notifyService.showSuccess(response.message, "");
					    }
					    else
					    {
					    	this.notifyService.showWarning(response.message, "");
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
					this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo,offset:this._offset}, "WebViewMatchProfile/HoroscopeRequest", "POST").subscribe((response: any) => 
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
			  				this.DRN_Paginate(this.isReplyRegNo, response.data);
			  				this.notifyService.showSuccess(response.message, "");
			  				// if(this.currentDiff=='matching')
			  				// {
  							// 	this.isMatchingLoading = true;
			  				// 	this.getMatchingProfiles();
			  				// }
					    }
					    else
					    {
					    	this.notifyService.showWarning(response.message, "");
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
					this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo,Type:'matchinglist',offset:this._offset,limit:1}, "WebViewMatchProfile/AddIgnore", "POST").subscribe((response: any) => 
					{
						this.isLoading = false;
						if(response.status==1)
			  			{
			  				this.DRN_Paginate(this.isReplyRegNo, response.data);
			  				this.notifyService.showSuccess(response.message, "");
				  			// if(this.currentDiff=='matching')
			  				// {
  							// 	this.isMatchingLoading = true;
			  				// 	//this.getMatchingProfiles();
			  				// }
					    }
					    else
					    {
					    	this.notifyService.showWarning(response.message, "");
					    }
					})
				}
			}
			else if(this.activeProcess=='photo')
			{
				this.modalRef.hide();
				if(this.isBecome==1)
				{
					this.SentPhotoRequest();
				}
				else if(this.isBecome==2)
				{
					this.router.navigate(['schemes']);
				}
			}
  		});		
	}

	DRN_Paginate(BlockRegNumber, pushdata)
  	{
		//afterdelete
		let offset;
		var calCAfter = this.totalMatchingItems /this.itemsPerPage;
		var super_After = calCAfter.toString().split(".");
		var newpage = super_After[0];
		// var newpage = super_After[1] ? (parseInt(super_After[0])+1) : super_After[0]
		if(super_After[1])
		{
			newpage+1;	
		}

		if(this._offset < this.totalMatchingItems)
		{
			console.log(1);
			let tmp = [];
			this.matchinglists.forEach(function (value, index) 
			{
				if(value.RegNo==BlockRegNumber)
				{
					tmp.splice(index, 1);
				}
				else
				{
					tmp.push(value);
				}
			});
			if(pushdata.length)
			{
				pushdata.forEach(function (valuepush) 
				{
					tmp.push(valuepush);
				});
			}

			this.matchinglists = tmp;
			// this.totalMatchingItems = this.totalMatchingItems-1;
		}
		else if(this.matchinglists.length!=1)
		{
			console.log(2);
			let tmp = [];
			this.matchinglists.forEach(function (value, index) 
			{
				if(value.RegNo==BlockRegNumber)
				{
					tmp.splice(index, 1);
				}
				else
				{
					tmp.push(value);
				}
			});
			this.matchinglists = tmp;
			// this.totalMatchingItems = this.totalMatchingItems-1;
			var a = this._offset-this.itemsPerPage;
			if(a >= (this.totalMatchingItems+1))
			{
				this.p = Number(newpage); 
			}

			
		}
		else if(this.matchinglists.length==1)
		{
			console.log(3);
			offset=((this.p-2)*this.itemsPerPage)
			window.scroll(1,1);
			this.isMatchingLoadingData = false;
	  		this.isMatchingLoading = true;

			this.userservice. getData({regno:this.regno,limit:this.itemsPerPage,offset:offset}, "WebMyDashboard/MatchingList", "POST").subscribe((response: any) => 
			{
				if(response.status==1)
	  			{
	  				this.isMatchingLoading = false;
	  				let _matchData = response.data;
		  			if(_matchData.length)
		  			{
		  				this.isMatchingLoadingData=true;
						window.scroll(1,5);
						this.matchinglists =  _matchData;
						this.totalMatchingItems = response.total;
						this.p = Number(newpage);
						this._offset = response.offset;
		  			}
		  			else
		  			{
		  				this.isMatchingNotFoundLoading = true;
		  			}
			    }
			    else if(response.status==0)
			    {
			    	this.isMatchingNotFoundLoading = true;
			    	this.isMatchingLoading = false;
			    	this.isMatchingLoadingData=false;
			    	this.notifyService.showWarning("No Data Found...", "");
			    }
			    else
			    {
			    	this.isMatchingNotFoundLoading = true;
			    	this.isMatchingLoading = false;
			    	this.isMatchingLoadingData=false;
			    	this.notifyService.showInfo("Something went wrong. Try again", "");
			    }
			})
		}
  	}
}

