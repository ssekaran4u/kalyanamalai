import { Component, OnInit, TemplateRef,ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from './../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class InboxComponent implements OnInit 
{
	closeResult: string;
	modalRef: BsModalRef;
	config = {
    	keyboard: false,
    	ignoreBackdropClick: true,
    	animated: true
  	};

	// regno = localStorage.getItem("INkmSet_id");
	// regno = '7pKUwREKKIE=';
	pageSetUp :any;
  	regno     :any;

	defaultImage:string = '';
	inboxNew = [];
	inboxReplied = [];
	inboxDeleted = [];

	inboxNewNotFound:boolean = false;
	inboxRepliedNotFound:boolean = false;
	inboxDeletedNotFound:boolean = false;


	inboxNewPage: number;
	inboxRepliedPage: number;
	inboxDeletedPage: number;

	inboxNewTotalItems:any;
	inboxRepliedTotalItems:any;
	inboxDeletedTotalItems:any;

	inboxNewData:boolean = false;
	inboxRepliedData:boolean = false;
	inboxDeletedData:boolean = false;

	_offset=0;
	inboxNewLoading:boolean = false;
	inboxRepliedLoading:boolean = false;
	inboxDeletedLoading:boolean = false;
	itemsPerPage:any = '10';

	isLoading:boolean = false;
	MsgdisableBtn = false;
	replyMessageForm: FormGroup;
	isReplyRegNo : string = '';
	MsgSubmitbuttonName: string;
	// Photo
	urls = [];
  	myFiles:string [] = [];
  	UplodSubmitbuttonName: string;
  	UploaddisableBtn = false;
  	profileImageUpload: FormGroup;
  	activeProcess:string = ''; //  inboxnew / inboxreplied
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

	statusresponse:any = [];

  	constructor(private dbService: NgxIndexedDBService, private formBuilder: FormBuilder, private modalService: BsModalService,
  	 private notifyService : NotificationService, private userservice: UserService, private titleService: Title,private router: Router) 
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
  		this.inboxNewData=false;
  		this.inboxRepliedData=false;
  		this.inboxDeletedData=false;

  		this.inboxNewLoading = true;
  		this.inboxRepliedLoading = true;
  		this.inboxDeletedLoading = true;

  		this.userservice.getData({RegNo:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebInbox/GetInboxRequests", "POST").subscribe((response: any) => 
  		{
  			this.inboxNewLoading = false;
  			this.inboxRepliedLoading = false;
  			this.inboxDeletedLoading = false;
  			if(response.code==1)
  			{
				// window.scroll(1,1);
	  			let _newData = response.newrequestlist;
	  			if(_newData.length)
	  			{
  					this.inboxNewData=true;
					this.inboxNew =  _newData;
					this.inboxNewTotalItems = response.newrequestcount;	
	  			}
	  			else
	  			{
	  				this.inboxNewNotFound = true;
	  			}
		      	
	  			let _repliedData = response.repliedrequestlist;
	  			if(_repliedData.length)
	  			{
  					this.inboxRepliedData=true;
					this.inboxReplied =  _repliedData;
					this.inboxRepliedTotalItems = response.repliedrequestcount;	
	  			}
	  			else
	  			{
	  				this.inboxRepliedNotFound = true;
	  			}

	  			let _deletedData = response.deletedrequestlist;
	  			if(_deletedData.length)
	  			{
  					this.inboxDeletedData=true;
					this.inboxDeleted =  _deletedData;
					this.inboxDeletedTotalItems = response.deletedrequestcount;	
	  			}
	  			else
	  			{
	  				this.inboxDeletedNotFound = true;
	  			}

	  			this.statusresponse = response.statusresponse[0];
	  			

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
  				this.inboxNewNotFound = true;
  				this.inboxRepliedNotFound = true;
  				this.inboxDeletedNotFound = true;
  			}
	  	})
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
		  		this.titleService.setTitle('Inbox - Kalyanamalai');
		  		this.defaultImage = 'https://cdn.dribbble.com/users/154550/screenshots/3014408/untitled-9.gif';
	        }
	        else
	        {
	            this.router.navigate(['/logout']);    
	        }
	    });
  	}

  	_ModalResponseLoading:boolean = false;
  	_ModalResponseData:boolean = false;

  	// content,inboxN.regno, inboxN.userrequestid,'inboxnew', 'message','delete'
  	replyMessage(personalized: TemplateRef<any>, regno )
	{
		this.isReplyRegNo = regno
		this.modalRef = this.modalService.show(personalized, this.config);
	} 

	onSelectFile(event) 
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

	    if (event.target.files && event.target.files[0]) 
	    {
	        var filesAmount = event.target.files.length;
	        for (let i = 0; i < filesAmount; i++) 
	        {
	        	this.myFiles.push(event.target.files[i]);

                var reader = new FileReader();
                reader.onload = (event:any) => 
                {
                   	this.urls.push(event.target.result); 
                 	//this.profileImageUpload.patchValue({
		          		//fileSource: reader.result
		        	//});
                }
                reader.readAsDataURL(event.target.files[i]);
	        }
	    }
	}
	uploadProfile(profile: TemplateRef<any>, regno, userrequestid,process )
	{

		this.isReplyRegNo = regno
		this.userrequestid = userrequestid;
		if(process=='upload')
		{
			this.modalRef = this.modalService.show(profile, this.config);
		}
		else if(process=='accept')
		{
			this.acceptPhotoRequest();
		}
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
		this.userservice. getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo,UserRequestId:this.userrequestid}, "WebInbox/AcceptPhotoRequest", "POST").subscribe((response: any) => 
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
			// this.notifyService.showError("Internal Server Error", "Error")
		})
	}

	onProfileUploadSubmit() 
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


		if(this.myFiles.length)
		{
			this.modalRef.hide();
			this.UploaddisableBtn = true;
			this.UplodSubmitbuttonName = "Loading...";

			this.inboxRepliedLoading = true;
			this.inboxRepliedData=false;
			
			this.inboxNewData=false;
			this.inboxNewLoading = true;

			var myFormData = new FormData();
		   	for (var i = 0; i < this.myFiles.length; i++) 
		   	{ 
		    	myFormData.append("file[]", this.myFiles[i]);
		   	}

			myFormData.append('UserRequestId', this.userrequestid);
			myFormData.append('LoginRegNo', this.regno);
			myFormData.append('FromRegNo', this.isReplyRegNo);
			myFormData.append('limit', this.itemsPerPage);
			myFormData.append('offset', '0');

			if(this.functionality=='photo' && this.activeProcess=='upload')
			{
				var toUrl = "WebInbox/UploadPhotoRequest";
			}
			else if(this.functionality=='album' && this.activeProcess=='upload')
			{
				var toUrl = "WebInbox/UploadAlbumRequest";
			}
	  		this.userservice.getData(myFormData, toUrl, "MultiUpload").subscribe((response: any) => 
	  		{
	  			this.inboxRepliedLoading = false;
				this.inboxNewLoading = false;
				// this.isLoading = false;
				if (response.status == 1) 
				{
					this.closeModal();
					this.inboxRepliedTotalItems = response.repliedrequestcount;	
					if(this.inboxRepliedTotalItems>0)
					{
						this.inboxRepliedData=true;
						this.inboxReplied =  response.repliedrequestlist;
					}
					else
					{
						this.inboxRepliedNotFound = true;
					}

					this.inboxNewTotalItems = response.newrequestcount;	
					if(this.inboxNewTotalItems>0)
					{
						this.inboxNewData=true;
			  			this.inboxNew =  response.newrequestlist;
					}
					else
					{
						this.inboxNewNotFound = true;
					}

					this.notifyService.showSuccess(response.message, "");
					this.UploaddisableBtn = false;
	                this.UplodSubmitbuttonName = 'Upload';
				} 
				else 
				{
					if(this.inboxRepliedTotalItems>0)
					{
						this.inboxRepliedData=true;
					}
					if(this.inboxNewTotalItems>0)
					{
						this.inboxNewData=true;
					}
					this.UploaddisableBtn = false;
	                this.UplodSubmitbuttonName = 'Upload';
					this.notifyService.showWarning(response.message, "");
					this.modalRef = this.modalService.show(this.textContent, this.config);
				}
		    }, (err) => 
		    {
		    	this.inboxRepliedLoading = false;
				this.inboxNewLoading = false;

				if(this.inboxRepliedTotalItems>0)
				{
					this.inboxRepliedData=true;
				}
				if(this.inboxNewTotalItems>0)
				{
					this.inboxNewData=true;
				}
				this.UploaddisableBtn = false;
			    this.UplodSubmitbuttonName = 'Upload';
				this.notifyService.showInfo("Something went wrong. Try again", "")
				this.modalRef = this.modalService.show(this.textContent, this.config);
		    });
	  	}
	  	else
	  	{
	  		this.isLoading = false;
	  		this.UploaddisableBtn = false;
	  		this.notifyService.showWarning("Choose image to Continue", "");
		    this.UplodSubmitbuttonName = 'Upload';
	  	}
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
			this.modalRef.hide();
			this.MsgdisableBtn = true;
			this.MsgSubmitbuttonName = 'Loading';
			// this.isLoading = true;
			this.inboxRepliedLoading = true;
			this.inboxRepliedData=false;
			
			this.inboxNewData=false;
			this.inboxNewLoading = true;

			this.userservice. getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo,Message:result.replymessage,offset:0,limit:this.itemsPerPage}, "WebInbox/ReplyMessage", "POST").subscribe((response: any) => 
	  		{
	  			this.inboxRepliedLoading = false;
	  			this.inboxNewLoading = false;
				// this.isLoading = false;
				if (response.status == 1) 
				{
					this.replyMessageForm.reset();
					this.inboxRepliedTotalItems = response.repliedrequestcount;	
					if(this.inboxRepliedTotalItems>0)
					{
						this.inboxRepliedData=true;
						this.inboxReplied =  response.repliedrequestlist;
					}
					else
					{
						this.inboxRepliedNotFound = true;
					}

					this.inboxNewTotalItems = response.newrequestcount;	
					if(this.inboxNewTotalItems>0)
					{
						this.inboxNewData=true;
			  			this.inboxNew =  response.newrequestlist;
					}
					else
					{
						this.inboxNewNotFound = true;
					}

					this.notifyService.showSuccess(response.message, "");
					this.MsgdisableBtn = false;
					this.MsgSubmitbuttonName = 'Sent Message';
				} 
				else 
				{
					if(this.inboxRepliedTotalItems>0)
					{
						this.inboxRepliedData=true;
					}
					if(this.inboxNewTotalItems>0)
					{
						this.inboxNewData=true;
					}
					this.MsgdisableBtn = false;
					this.MsgSubmitbuttonName = 'Sent Message';
					this.notifyService.showWarning(response.message, "");
					this.modalRef = this.modalService.show(this.textContent, this.config);
				}
		  	}, 
		  	(err) => 
			{
				this.inboxRepliedLoading = false;
				this.inboxNewLoading = false;

				if(this.inboxRepliedTotalItems>0)
				{
					this.inboxRepliedData=true;
				}
				if(this.inboxNewTotalItems>0)
				{
					this.inboxNewData=true;
				}
				this.MsgdisableBtn = false;
				this.MsgSubmitbuttonName = 'Sent Message';
				this.notifyService.showInfo("Something went wrong. Try again", "")
				this.modalRef = this.modalService.show(this.textContent, this.config);
			})
		}
		else
		{
			this.MsgdisableBtn = false;
			this.MsgSubmitbuttonName = 'Sent Message';
			this.notifyService.showWarning("Enter your message to Continue", "");
		}
	}
	

	// isSetDefault()
	// {
	// 	this.dbService.getByKey('setup', 1).subscribe((userData) => { 
 //        	localStorage.setItem('pageSetUp',JSON.stringify(userData));
 //  		});
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
		if(this.activeProcess=='inboxnew' && this.activeType=='message')
		{
			this.userservice. getData({InboxIds:this.userrequestid}, "WebInbox/DeleteMessages", "POST").subscribe((response: any) => 
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

		if(this.activeProcess=='inboxnew' && this.activeType=='photo')
		{
			this.userservice. getData({UserRequestId:this.userrequestid,LoginRegNo:this.regno,FromRegNo:this.isReplyRegNo,Command:'Upload',Type:'Photo'}, "WebInbox/DeclineRequest", "POST").subscribe((response: any) => 
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

		

		if(this.activeProcess=='inboxreplied' && this.activeType=='message')
		{
			this.userservice. getData({InboxIds:this.userrequestid}, "WebInbox/DeleteRepliedMessages", "POST").subscribe((response: any) => 
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
		if( (this.activeProcess=='inboxreplied' && this.activeType=='photo') || (this.activeProcess=='inboxreplied' && this.activeType=='horoscope') )
		{
			this.userservice. getData({InboxIds:this.userrequestid}, "WebInbox/DeleteRequests", "POST").subscribe((response: any) => 
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
		// openVerticallyCentered(content,inboxN.regnumber, inboxN.userrequestid,'inboxnew', 'message')
		this.activeProcess = prosess; //  inboxnew / inboxreplied
  		this.activeType = type; // message / photo
		this.userrequestid = userrequestid;
		this.isReplyRegNo = regnumber
		this.modalRef = this.modalService.show(content, this.config);
	} 

  	getinboxReplied(page) 
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

  		this.inboxRepliedData=false;
		this.inboxRepliedLoading = true;
		if(page==1)
		{
			this._offset = 0	
		}
		else
		{
			this._offset = (page - 1) * this.itemsPerPage + 1
		}

		this.userservice. getData({RegNo:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebInbox/GetRepliedRequests", "POST").subscribe((response: any) => 
		{
			this.inboxRepliedLoading = false;
			if(response.status==1)
  			{
  				this.inboxRepliedData=true;
				this.inboxReplied =  response.data;
		    }
		    else
		    {
		    	this.inboxNewNotFound = true;
		    }
		})
  	}

  	getinboxNew(page) 
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

  		this.inboxNewData=false;
		this.inboxNewLoading = true;
		if(page==1)
		{
			this._offset = 0	
		}
		else
		{
			this._offset = (page - 1) * this.itemsPerPage + 1
		}

		this.userservice. getData({RegNo:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebInbox/GetNewRequests", "POST").subscribe((response: any) => 
		{
			this.inboxNewLoading = false;
			if(response.status==1)
  			{
  				this.inboxNewData=true;
				this.inboxNew =  response.data;
		    }
		    else
		    {
		    	this.inboxRepliedNotFound = true;
		    }
		})
  	}
  	getinboxDeleted(page) 
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

  		this.inboxDeletedData=false;
		this.inboxDeletedLoading = true;
		if(page==1)
		{
			this._offset = 0	
		}
		else
		{
			this._offset = (page - 1) * this.itemsPerPage + 1
		}

		this.userservice. getData({RegNo:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebInbox/GetDeletedRequests", "POST").subscribe((response: any) => 
		{
			this.inboxDeletedLoading = false;
			if(response.status==1)
  			{
  				this.inboxDeletedData=true;
				this.inboxDeleted =  response.data;
		    }
		    else
		    {
		    	this.inboxDeletedNotFound = true;
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
		this.personalizedMessageForm.reset();
		this.SentInterestMessage = null;
		this.FwdMessageForm.reset();
		this.getEmail = '';
		this.getMobile = '';
		this.getPhone = '';

		this.isReplyRegNo = '';
		this.userrequestid = '';

		this.urls = [];
  		this.myFiles= [];
	}
	AlbumPhotoRequestDecline(reqcommand,reqaccess)
	{
		this.modalRef.hide();
		this.inboxNewLoading = true;
		this.inboxNewData=false;
		
		this.inboxDeletedLoading = true;
		this.inboxDeletedData=false;

		// UserRequestId:105686
		// LoginRegNo:e9uxm2
		// FromRegNo:e9uxo1
		// Command:("Upload" or "Request")
		// Type:Album

		this.userservice. getData({UserRequestId:this.userrequestid, LoginRegNo:this.regno,FromRegNo:this.isReplyRegNo,Command:reqcommand,Type:reqaccess, offset:0,limit:this.itemsPerPage}, "WebInbox/DeclineRequest", "POST").subscribe((response: any) => 
  		{
  			this.inboxDeletedLoading = false;
  			this.inboxNewLoading = false;
			if (response.status == 1) 
			{
				this.closeModal();
				
				this.inboxNewTotalItems = response.newrequestcount;
				if(this.inboxNewTotalItems>0)
				{
					this.inboxNewData=true;
					this.inboxNew =  response.newrequestlist;
				}
				else
				{
					this.inboxNewNotFound = true;
				}

				this.inboxDeletedTotalItems = response.deletedrequestcount;	
				if(this.inboxDeletedTotalItems>0)
				{
					this.inboxDeletedData=true;
		  			this.inboxDeleted =  response.deletedrequestlist;
				}
				else
				{
					this.inboxDeletedNotFound = true;
				}

				this.notifyService.showSuccess(response.message, "");
			} 
			else 
			{
				if(this.inboxNewTotalItems>0)
				{
					this.inboxNewData=true;
				}
				if(this.inboxDeletedTotalItems>0)
				{
					this.inboxDeletedData=true;
				}
				this.inboxDeletedLoading = false;
				this.inboxNewLoading = false;
				this.notifyService.showWarning(response.message, "");
			}
	  	}, 
	  	(err) => 
		{
			if(this.inboxNewTotalItems>0)
			{
				this.inboxNewData=true;
			}
			if(this.inboxDeletedTotalItems>0)
			{
				this.inboxDeletedData=true;
			}
			this.inboxDeletedLoading = false;
			this.inboxNewLoading = false;
			this.notifyService.showInfo("Something went wrong. Try again", "")
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
	// content, 12356677,km7372878,'inboxnew', 'message','delete'
	// content, inboxN.userrequestid,inboxN.regno,'inboxnew', 'message','delete'

	userrequestid:string 	= '';
	regnumber:string 		= '';
	messagetype:string   	= '';
	functionality:string    = '';
	prosess:string      	= '';
	UploadImageText:string  = '';
	uploadCloseButton:string = '';
  	openCommonModal(content, userrequestid, regnumber, messagetype, functionality, prosess) 
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

		this.userrequestid=userrequestid;
		this.messagetype=messagetype;
		this.functionality=functionality;
		this.isReplyRegNo = regnumber;

		this.textContent = content;
		this.activeProcess = prosess; 
		// Photo Request
		if(this.messagetype=='inboxnew' && this.functionality=='photo' && this.activeProcess=='communication')
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
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==5)
			    {
			    	// Send Directly without confirmation
			    	this.SentPhotoRequest();
			    }
			})
		}
		// Message
		if(this.messagetype=='inboxnew' && this.functionality=='message' && this.activeProcess=='delete')
		{
			this.activeMessage = '<strong>Personalized Message</strong> Are you sure you want to view this delete?';
			this._ModalResponseData = true;
			this.actionButtonTrue = 'Yes';
			this.actionButtonFalse = 'No';
			this.modalRef = this.modalService.show(content, this.config);
		}
		else if(this.messagetype=='inboxnew' && this.functionality=='message' && this.activeProcess=='reply')
		{
			this.modalRef = this.modalService.show(content, this.config);
		}
		// Photo and Album
		else if(this.messagetype=='inboxnew' && this.functionality=='album' && this.activeProcess=='delete')
		{
			// console.log(this.statusresponse.ProtectedAlbum);
			this.activeMessage = '<strong>Album Request</strong> Are you sure you want to view this delete?';
			this._ModalResponseData = true;
			this.actionButtonTrue = 'Yes';
			this.actionButtonFalse = 'No';
			this.modalRef = this.modalService.show(content, this.config);
		}
		else if(this.messagetype=='inboxnew' && this.functionality=='album' && this.activeProcess=='upload')
		{
			this.UploadImageText='Add a album to your loved Person...';
			this.uploadCloseButton = 'Cancel';
			this.modalRef = this.modalService.show(content, this.config);
		}
		else if(this.messagetype=='inboxnew' && this.functionality=='album' && this.activeProcess=='accept')
		{
			this.inboxRepliedLoading = true;
			this.inboxRepliedData=false;

			this.inboxNewData=false;
			this.inboxNewLoading = true;

			this.userservice. getData({UserRequestId:this.userrequestid, LoginRegNo:this.regno,FromRegNo:this.isReplyRegNo,offset:0,limit:this.itemsPerPage}, "WebInbox/AcceptAlbumRequest", "POST").subscribe((response: any) => 
			{
				this.inboxRepliedLoading = false;
				this.inboxNewLoading = false;

				if (response.status == 1) 
				{
					this.inboxRepliedTotalItems = response.repliedrequestcount;	
					if(this.inboxRepliedTotalItems>0)
					{
						this.inboxRepliedData=true;
						this.inboxReplied =  response.repliedrequestlist;
					}
					else
					{
						this.inboxRepliedNotFound = true;
					}

					this.inboxNewTotalItems = response.newrequestcount;	
					if(this.inboxNewTotalItems>0)
					{
						this.inboxNewData=true;
			  			this.inboxNew =  response.newrequestlist;
					}
					else
					{
						this.inboxNewNotFound = true;
					}

					this.notifyService.showSuccess(response.message, "");
				} 
				else 
				{
					if(this.inboxRepliedTotalItems>0)
					{
						this.inboxRepliedData=true;
					}
					if(this.inboxNewTotalItems>0)
					{
						this.inboxNewData=true;
					}
					this.notifyService.showWarning(response.message, "");
				}
			}, 
			(err) => 
			{
				this.inboxRepliedLoading = false;
				this.inboxNewLoading = false;

				if(this.inboxRepliedTotalItems>0)
				{
					this.inboxRepliedData=true;
				}
				if(this.inboxNewTotalItems>0)
				{
					this.inboxNewData=true;
				}
				this.notifyService.showInfo("Something went wrong. Try again", "")
			})
		}
		else if(this.messagetype=='inboxnew' && this.functionality=='photo' && this.activeProcess=='delete')
		{
			this.activeMessage = '<strong>Photo Request</strong> Are you sure you want to view this?';
			this._ModalResponseData = true;
			this.actionButtonTrue = 'Yes';
			this.actionButtonFalse = 'No';
			this.modalRef = this.modalService.show(content, this.config);
		}
		// Photo Request Delete
		else if(this.messagetype=='inboxnew' && this.functionality=='photo' && this.activeProcess=='upload')
		{
			this.UploadImageText='Add image to your loved Person...';
			this.uploadCloseButton = 'Cancel';
			this.modalRef = this.modalService.show(content, this.config);
		}
		else if(this.messagetype=='inboxnew' && this.functionality=='photo' && this.activeProcess=='accept')
		{
			this.inboxRepliedLoading = true;
			this.inboxRepliedData=false;

			this.inboxNewData=false;
			this.inboxNewLoading = true;

			this.userservice. getData({UserRequestId:this.userrequestid, LoginRegNo:this.regno,FromRegNo:this.isReplyRegNo,offset:0,limit:this.itemsPerPage}, "WebInbox/AcceptPhotoRequest", "POST").subscribe((response: any) => 
			{
				this.inboxRepliedLoading = false;
				this.inboxNewLoading = false;

				if (response.status == 1) 
				{
					this.inboxRepliedTotalItems = response.repliedrequestcount;	
					if(this.inboxRepliedTotalItems>0)
					{
						this.inboxRepliedData=true;
						this.inboxReplied =  response.repliedrequestlist;
					}
					else
					{
						this.inboxRepliedNotFound = true;
					}

					this.inboxNewTotalItems = response.newrequestcount;	
					if(this.inboxNewTotalItems>0)
					{
						this.inboxNewData=true;
			  			this.inboxNew =  response.newrequestlist;
					}
					else
					{
						this.inboxNewNotFound = true;
					}

					this.notifyService.showSuccess(response.message, "");
				} 
				else 
				{
					if(this.inboxRepliedTotalItems>0)
					{
						this.inboxRepliedData=true;
					}
					if(this.inboxNewTotalItems>0)
					{
						this.inboxNewData=true;
					}
					this.notifyService.showWarning(response.message, "");
				}
			}, 
			(err) => 
			{
				this.inboxRepliedLoading = false;
				this.inboxNewLoading = false;

				if(this.inboxRepliedTotalItems>0)
				{
					this.inboxRepliedData=true;
				}
				if(this.inboxNewTotalItems>0)
				{
					this.inboxNewData=true;
				}
				this.notifyService.showInfo("Something went wrong. Try again", "")
			})
		}
	} 

	customPopUp()
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

		if(this.messagetype=='inboxnew' && this.functionality=='message' && this.activeProcess=='delete')
		{
			this.modalRef.hide();
			this.inboxNewLoading = true;
			this.inboxNewData=false;
			
			this.inboxDeletedLoading = true;
			this.inboxDeletedData=false;

			this.userservice. getData({InboxIds:this.userrequestid, LoginRegNo:this.regno,offset:0,limit:this.itemsPerPage}, "WebInbox/DeclineMessages", "POST").subscribe((response: any) => 
	  		{
	  			this.inboxDeletedLoading = false;
	  			this.inboxNewLoading = false;
				if (response.status == 1) 
				{
					this.closeModal();
					
					this.inboxNewTotalItems = response.newrequestcount;
					if(this.inboxNewTotalItems>0)
					{
						this.inboxNewData=true;
						this.inboxNew =  response.newrequestlist;
					}
					else
					{
						this.inboxNewNotFound = true;
					}

					this.inboxDeletedTotalItems = response.deletedrequestcount;	
					if(this.inboxDeletedTotalItems>0)
					{
						this.inboxDeletedData=true;
			  			this.inboxDeleted =  response.deletedrequestlist;
					}
					else
					{
						this.inboxDeletedNotFound = true;
					}

					this.notifyService.showSuccess(response.message, "");
				} 
				else 
				{
					if(this.inboxNewTotalItems>0)
					{
						this.inboxNewData=true;
					}
					if(this.inboxDeletedTotalItems>0)
					{
						this.inboxDeletedData=true;
					}
					this.inboxDeletedLoading = false;
					this.inboxNewLoading = false;
					this.notifyService.showWarning(response.message, "");
				}
		  	}, 
		  	(err) => 
			{
				if(this.inboxNewTotalItems>0)
				{
					this.inboxNewData=true;
				}
				if(this.inboxDeletedTotalItems>0)
				{
					this.inboxDeletedData=true;
				}
				this.inboxDeletedLoading = false;
				this.inboxNewLoading = false;
				this.notifyService.showInfo("Something went wrong. Try again", "")
			})
		}
		else if(this.messagetype=='inboxnew' && this.functionality=='photo' && this.activeProcess=='delete')
		{
			if(this.statusresponse)
  			{
  				if(this.statusresponse.ImageStatus == 0 && this.statusresponse.ProtectedImage==0)
  				{
  					// Upload
  					this.AlbumPhotoRequestDecline("Upload","Photo");
  				}
  				if(this.statusresponse.ImageStatus == 1 && (this.statusresponse.ProtectedImage==0 || this.statusresponse.ProtectedImage==1) )
  				{
  					// Accept
  					this.AlbumPhotoRequestDecline("Request","Photo");
  				}
  			}
		}
		else if(this.messagetype=='inboxnew' && this.functionality=='album' && this.activeProcess=='delete')
		{
			if(this.statusresponse)
  			{
  				if(this.statusresponse.AlbumStatus == 0 && this.statusresponse.ProtectedAlbum==0)
  				{
  					// Upload
  					this.AlbumPhotoRequestDecline("Upload","Album");
  				}
  				if(this.statusresponse.AlbumStatus == 1 && (this.statusresponse.ProtectedAlbum==0 || this.statusresponse.ProtectedAlbum==1) )
  				{
  					// Accept
  					this.AlbumPhotoRequestDecline("Request","Album");
  				}
  			}
		}
		else if(this.messagetype=='inboxnew' && this.functionality=='photo' && this.activeProcess=='communication')
		{
			this.SentPhotoRequest();
		}
	}
}