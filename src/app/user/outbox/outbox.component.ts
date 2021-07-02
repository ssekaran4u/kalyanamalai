import { Component, OnInit, TemplateRef,ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from './../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styleUrls: ['./outbox.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OutboxComponent implements OnInit 
{
	closeResult: string;
	modalRef: BsModalRef;
	config = {
    	keyboard: false,
    	ignoreBackdropClick: true,
    	animated: true
  	};

  	pageSetUp :any;
  	regno     :any;
	// regno = localStorage.getItem("INkmSet_id");
	// regno = '7pKUwREKKIE=';
	defaultImage:string = '';
	outboxNew = [];
	outboxReplied = [];
	outboxDeleted = [];

	outboxNewNotFound:boolean = false;
	outboxRepliedNotFound:boolean = false;
	outboxDeletedNotFound:boolean = false;


	outboxNewPage: number;
	outboxRepliedPage: number;
	outboxDeletedPage: number;

	outboxNewTotalItems:any;
	outboxRepliedTotalItems:any;
	outboxDeletedTotalItems:any;

	outboxNewData:boolean = false;
	outboxRepliedData:boolean = false;
	outboxDeletedData:boolean = false;

	_offset=0;
	outboxNewLoading:boolean = false;
	outboxRepliedLoading:boolean = false;
	outboxDeletedLoading:boolean = false;
	itemsPerPage = 10;

	isLoading:boolean = false;
	MsgdisableBtn = false;
	replyMessageForm: FormGroup;
	isReplyRegNo : string = '';
	MsgSubmitbuttonName: string;
	userrequestid: any;

	// acceptPhotoRequest
	urls = [];
  	myFiles:string [] = [];
	UplodSubmitbuttonName: string;
  	UploaddisableBtn = false;
  	profileImageUpload: FormGroup;
  	activeProcess:string = ''; //  outboxnew / outboxreplied
  	activeType:string = ''; // message / photo

  	activeRegNumber:string = '';
	isBecome:number = null;
	isTotalNofOfContact:string = '';
	isViewedContact:string = '';
	activeprofiledata:any = [];

  	personalizedMessageForm: FormGroup;
	FwdMessageForm: FormGroup;
	expressInterestMsg:any = [];
	disableBtn = false;
	SubmitbuttonName: string;

	getEmail:string = '';
	getMobile:string = '';
	getPhone:string = '';

	SentInterestMessage: number = null;
	activeMessage:string = '';
	thisContent:string = '';
	textContent:string= '';
	actionButtonTrue:string = '';
	actionButtonFalse:string = '';
	FwdSubmitbuttonName:string;
	MsgFwddisableBtn:boolean = false;

  	constructor(private dbService: NgxIndexedDBService, private formBuilder: FormBuilder, private modalService: BsModalService,
  	 private notifyService : NotificationService, private userservice: UserService, private titleService: Title, private router: Router) 
  	{
  		this.replyMessageForm = this.formBuilder.group({
            replymessage: ''
        });
        this.MsgSubmitbuttonName = 'Reply Message';

        this.profileImageUpload = this.formBuilder.group({
			fileSource : ''
		});
		this.UplodSubmitbuttonName = 'Upload';

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

  	globalFun()
  	{
  		this.dbService.getByKey('setup', 1).subscribe((userData) => 
	    { 
	        localStorage.setItem('pageSetUp',JSON.stringify(userData));
	        this.pageSetUp   = localStorage.getItem("pageSetUp");
	        if(this.pageSetUp!='undefined' && this.pageSetUp != null)
	        {
	        	this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
	            this.regno     = this.pageSetUp["INkmSet_id"];


		  		this.outboxNewData=false;
		  		this.outboxRepliedData=false;
		  		this.outboxDeletedData=false;

		  		this.outboxNewLoading = true;
		  		this.outboxRepliedLoading = true;
		  		this.outboxDeletedLoading = true;
		  		this.userservice.getData({RegNo:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebOutbox/GetOutboxRequests", "POST").subscribe((response: any) => 
		  		{
		  			//console.log(response);
		  			this.outboxNewLoading = false;
		  			this.outboxRepliedLoading = false;
		  			this.outboxDeletedLoading = false;
		  			if(response.code==1)
		  			{
						// window.scroll(1,1);
			  			let _newData = response.newrequestlist;
			  			if(_newData.length)
			  			{
		  					this.outboxNewData=true;
							this.outboxNew =  _newData;
							this.outboxNewTotalItems = response.newrequestcount;	
			  			}
			  			else
			  			{
			  				this.outboxNewNotFound = true;
			  			}
				      	
			  			let _repliedData = response.repliedrequestlist;
			  			if(_repliedData.length)
			  			{
		  					this.outboxRepliedData=true;
							this.outboxReplied =  _repliedData;
							this.outboxRepliedTotalItems = response.repliedrequestcount;	
			  			}
			  			else
			  			{
			  				this.outboxRepliedNotFound = true;
			  			}

			  			let _deletedData = response.deletedrequestlist;
			  			if(_deletedData.length)
			  			{
		  					this.outboxDeletedData=true;
							this.outboxDeleted =  _deletedData;
							this.outboxDeletedTotalItems = response.deletedrequestcount;	
			  			}
			  			else
			  			{
			  				this.outboxDeletedNotFound = true;
			  			}

			  			this.activeprofiledata = response.contactdetails[0];
				      	this.activeRegNumber =this.regno;

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
		  				this.outboxNewNotFound = true;
		  				this.outboxRepliedNotFound = true;
		  				this.outboxDeletedNotFound = true;
		  			}
			  	})
	        }
	        else
	        {
	            this.router.navigate(['/logout']);    
	        }
	    });

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

	            this.globalFun();
		  		this.titleService.setTitle('Outbox - Kalyanamalai');
		  		this.defaultImage = 'https://cdn.dribbble.com/users/154550/screenshots/3014408/untitled-9.gif';
	        }
	        else
	        {
	            this.router.navigate(['/logout']);    
	        }
	    });
       

  		
  	}

  	replyMessage(personalized: TemplateRef<any>, regno )
	{
		this.isReplyRegNo = regno
		this.modalRef = this.modalService.show(personalized, this.config);
	} 

	uploadProfile(profile: TemplateRef<any>, regno, userrequestid,process )
	{
		this.isReplyRegNo = regno
		this.userrequestid = userrequestid;
		let uploadedData = this.outboxReplied;
		var uImage = [];
		uploadedData.forEach(function (value) 
		{
			if(value.userrequestid==userrequestid)
			{
				// uImage = value.uploadimages;
				uImage = value.images;
			}
		});
		this.urls = uImage;
		this.modalRef = this.modalService.show(profile, this.config);
	}
	acceptPhotoRequest()
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

		this.isLoading = true;
		this.userservice. getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo,UserRequestId:this.userrequestid}, "Weboutbox/AcceptPhotoRequest", "POST").subscribe((response: any) => 
  		{
			this.isLoading = false;
			if (response.status == 1) 
			{
				this.notifyService.showSuccess(response.message, "")
			} 
			else 
			{
				this.notifyService.showWarning(response.message, "")
			}
	  	}, 
	  	(err) => 
		{
			this.isLoading = false;
			this.notifyService.showInfo("Something went wrong. Try again", "")
			// this.notifyService.showError("Internal Server Error", "")
		})
	}

	onReplyMessageSubmit() 
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


		const result = Object.assign({}, this.replyMessageForm.value);
		if(result.replymessage)
		{
			this.MsgdisableBtn = true;
			this.MsgSubmitbuttonName = 'Loading';
			this.isLoading = true;
			this.userservice. getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo,Message:result.replymessage}, "Weboutbox/ReplyMessage", "POST").subscribe((response: any) => 
	  		{
				this.isLoading = false;
				if (response.status == 1) 
				{
					this.globalFun();
					this.closeModal();
					this.notifyService.showSuccess(response.message, "");

					this.activeprofiledata = response.contactdetails[0];
			      	this.activeRegNumber =this.regno;

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
					this.MsgdisableBtn = false;
					this.MsgSubmitbuttonName = 'Sent Message';
					this.notifyService.showWarning(response.message, "")
				}
		  	}, 
		  	(err) => 
			{
				this.isLoading = false;
				this.MsgdisableBtn = false;
				this.MsgSubmitbuttonName = 'Sent Message';
				this.notifyService.showInfo("Something went wrong. Try again", "")
				// this.notifyService.showError("Internal Server Error", "Error")
			})
		}
		else
		{
			this.isLoading = false;
			this.MsgdisableBtn = false;
			this.MsgSubmitbuttonName = 'Sent Message';
			this.notifyService.showError("Enter your message to Continue", "Warning");
		}
	}
	// closeModal()
	// {
	// 	this.modalRef.hide();
	// 	this.isReplyRegNo = '';
	// 	this.userrequestid = '';

	// 	this.urls = [];
 //  		this.myFiles= [];
	// }


	deleteMessage()
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

		this.isLoading = true;
		if(this.activeProcess=='outboxnew' && this.activeType=='message')
		{
			this.userservice. getData({outboxIds:this.userrequestid}, "Weboutbox/DeleteMessages", "POST").subscribe((response: any) => 
	  		{
				this.isLoading = false;
	  			if (response.status == 1) 
				{
					this.globalFun();
					this.notifyService.showSuccess(response.message, "");
					this.closeModal();
				} 
				else 
				{
					this.notifyService.showWarning(response.message, "")
				}
		  	}, 
		  	(err) => 
			{
				this.isLoading = false;
				this.notifyService.showInfo("Something went wrong. Try again", "")
				// this.notifyService.showError("Internal Server Error", "")
			})
		}
		if(this.activeProcess=='outboxnew' && this.activeType=='photo')
		{
			this.userservice. getData({UserRequestId:this.userrequestid,LoginRegNo:this.regno,FromRegNo:this.isReplyRegNo,Command:'Upload',Type:'Photo'}, "Weboutbox/DeclineRequest", "POST").subscribe((response: any) => 
	  		{
				this.isLoading = false;
	  			if (response.status == 1) 
				{
					this.globalFun();
					this.notifyService.showSuccess(response.message, "");
					this.closeModal();
				} 
				else 
				{
					this.notifyService.showWarning(response.message, "")
				}
		  	}, 
		  	(err) => 
			{
				this.isLoading = false;
				this.notifyService.showInfo("Something went wrong. Try again", "")
				// this.notifyService.showError("Internal Server Error", "Error")
			})	
		}
		if(this.activeProcess=='outboxreplied' && this.activeType=='message')
		{
			this.userservice. getData({outboxIds:this.userrequestid}, "Weboutbox/DeleteRepliedMessages", "POST").subscribe((response: any) => 
	  		{
				this.isLoading = false;
	  			if (response.status == 1) 
				{
					this.globalFun();
					this.notifyService.showSuccess(response.message, "");
					this.closeModal();
				} 
				else 
				{
					this.notifyService.showWarning(response.message, "")
				}
		  	}, 
		  	(err) => 
			{
				this.isLoading = false;
				this.notifyService.showInfo("Something went wrong. Try again", "")
				// this.notifyService.showError("Internal Server Error", "")
			})	
		}
		if( (this.activeProcess=='outboxreplied' && this.activeType=='photo') || (this.activeProcess=='outboxreplied' && this.activeType=='horoscope') )
		{
			this.userservice. getData({outboxIds:this.userrequestid}, "Weboutbox/DeleteRequests", "POST").subscribe((response: any) => 
	  		{
				this.isLoading = false;
	  			if (response.status == 1) 
				{
					this.globalFun();
					this.notifyService.showSuccess(response.message, "");
					this.closeModal();
				} 
				else 
				{
					this.notifyService.showWarning(response.message, "")
				}
		  	}, 
		  	(err) => 
			{
				this.isLoading = false;
				this.notifyService.showInfo("Something went wrong. Try again", "")
				// this.notifyService.showError("Internal Server Error", "Error")
			})	
		}
	}

	openVerticallyCentered(content, regnumber, userrequestid, prosess, type) 
	{
		// openVerticallyCentered(content,outboxN.regnumber, outboxN.userrequestid,'outboxnew', 'message')
		this.activeProcess = prosess; //  outboxnew / outboxreplied
  		this.activeType = type; // message / photo
		this.userrequestid = userrequestid;
		this.isReplyRegNo = regnumber
		this.modalRef = this.modalService.show(content, this.config);
	} 

  	getoutboxReplied(page) 
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


  		this.outboxRepliedData=false;
		this.outboxRepliedLoading = true;
		if(page==1)
		{
			this._offset = 0	
		}
		else
		{
			this._offset = (page - 1) * this.itemsPerPage + 1
		}

		this.userservice. getData({RegNo:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebOutbox/GetRepliedRequests", "POST").subscribe((response: any) => 
		{
			this.outboxRepliedLoading = false;
			if(response.status==1)
  			{
  				this.outboxRepliedData=true;
				this.outboxReplied =  response.data;
		    }
		    else
		    {
		    	this.outboxRepliedNotFound = true;
		    }
		})
  	}

  	getoutboxNew(page) 
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


  		this.outboxNewData=false;
		this.outboxNewLoading = true;
		if(page==1)
		{
			this._offset = 0	
		}
		else
		{
			this._offset = (page - 1) * this.itemsPerPage + 1
		}

		this.userservice. getData({RegNo:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebOutbox/GetNewRequests", "POST").subscribe((response: any) => 
		{
			this.outboxNewLoading = false;
			if(response.status==1)
  			{
  				this.outboxNewData=true;
				this.outboxNew =  response.data;
		    }
		    else
		    {
		    	this.outboxNewNotFound = true;
		    }
		})
  	}
  	getoutboxDeleted(page) 
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


  		this.outboxDeletedData=false;
		this.outboxDeletedLoading = true;
		if(page==1)
		{
			this._offset = 0	
		}
		else
		{
			this._offset = (page - 1) * this.itemsPerPage + 1
		}

		this.userservice. getData({RegNo:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebOutbox/GetDeletedRequests", "POST").subscribe((response: any) => 
		{
			this.outboxDeletedLoading = false;
			if(response.status==1)
  			{
  				this.outboxDeletedData=true;
				this.outboxDeleted =  response.data;
		    }
		    else
		    {
		    	this.outboxDeletedNotFound = true;
		    }
		})
  	}

  	activateClass(index: number)
  	{
		this.SentInterestMessage = index;
	}

  	closeModal()
	{
		this.modalRef.hide();
		this.SentInterestMessage = null;
		this.personalizedMessageForm.reset();
		this.FwdMessageForm.reset();
		this.getEmail = '';
		this.getMobile = '';
		this.getPhone = '';
		this.isReplyRegNo = '';

		this.modalRef.hide();
		this.isReplyRegNo = '';
		this.userrequestid = '';

		this.urls = [];
  		this.myFiles= [];
	}
	
  	openCommonModal(content, personalized, prosess, regnumber) 
	{
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
	} 
}
