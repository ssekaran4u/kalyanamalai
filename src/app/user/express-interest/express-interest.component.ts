import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from './../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-express-interest',
  templateUrl: './express-interest.component.html',
  styleUrls: ['./express-interest.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ExpressInterestComponent implements OnInit {
	// regno = localStorage.getItem("INkmSet_id");
	// regno = 'JT1OrRr99ac=';
	modalRef: BsModalRef;
	config = {
    	keyboard: false,
    	ignoreBackdropClick: true,
    	animated: true
  	};
	defaultImage:string = '';
	newExpressInterest     :any = [];
	recivedExpressInterest :any = [];
	declineExpressInterest :any = [];

	newExpressInterestNotFound:boolean = false;
	recivedExpressInterestNotFound:boolean = false;
	declineExpressInterestNotFound:boolean = false;

	newExpressInterestPage: number;
	recivedExpressInterestPage: number;
	declineExpressInterestPage: number;

	newExpressInterestTotalItems:any;
	recivedExpressInterestTotalItems:any;
	declineExpressInterestTotalItems:any;

	newExpressInterestData:boolean = false;
	recivedExpressInterestData:boolean = false;
	declineExpressInterestData:boolean = false;

	_offset=0;
	newLoading:boolean = false;
	recivedLoading:boolean = false;
	declineLoading:boolean = false;
	itemsPerPage = 10;

	isLoading:boolean = false;
	MsgdisableBtn :boolean = false;
	replyMessageForm: FormGroup;
	isReplyRegNo : string = '';
	MsgSubmitbuttonName: string;
	userrequestid: any;
	activeProcess:string = ''; //  new / replied 
	expressInterestMsg:any = [];

	pageSetUp :any;
  	regno     :any;

	SentInterestMessage: number = null;

	activeRegNumber:string = '';
	isBecome:number = null;
	isTotalNofOfContact:string = '';
	isViewedContact:string = '';
	activeprofiledata:any = [];

  	personalizedMessageForm: FormGroup;
	FwdMessageForm: FormGroup;
	//expressInterestMsg:any = [];
	disableBtn = false;
	SubmitbuttonName: string;

	getEmail:string = '';
	getMobile:string = '';
	getPhone:string = '';

	//SentInterestMessage: number = null;
	activeMessage:string = '';
	thisContent:string = '';
	textContent:string= '';
	actionButtonTrue:string = '';
	actionButtonFalse:string = '';
	FwdSubmitbuttonName:string;
	MsgFwddisableBtn:boolean = false;

  	constructor(private formBuilder: FormBuilder, private modalService: BsModalService, 
  		private notifyService : NotificationService, private userservice: UserService, private titleService: Title,
  		private dbService: NgxIndexedDBService, private router: Router) 
  	{
  		this.replyMessageForm = this.formBuilder.group({
            replymessage: ''
        });
        this.MsgSubmitbuttonName = 'Reply Interest';
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

		  		this.newLoading = true;
		  		this.recivedLoading = true;
		  		this.declineLoading = true;

		  		this.newExpressInterestData=false;
		  		this.recivedExpressInterestData=false;
		  		this.declineExpressInterestData=false;

		  		this.userservice.getData({RegNo:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebExpressInterest/GetExpressInterests", "POST").subscribe((response: any) => 
		  		{
		  			this.newLoading = false;
		  			this.recivedLoading = false;
		  			this.declineLoading = false;
		  			if(response.code==1)
		  			{
		  				this.expressInterestMsg= response.expressinterestlist;
		  				
			  			let _newData = response.sendrequestlist;
			  			if(_newData.length)
			  			{
		  					this.newExpressInterestData=true;
							this.newExpressInterest =  _newData;
							this.newExpressInterestTotalItems = response.sendinterestcount;	
			  			}
			  			else
			  			{
			  				this.newExpressInterestNotFound = true;
			  			}
				      	
				      	let _recivedData = response.receiverequestlist;
			  			if(_recivedData.length)
			  			{
		  					this.recivedExpressInterestData=true;
							this.recivedExpressInterest =  _recivedData;
							this.recivedExpressInterestTotalItems = response.receiveinterestcount;	
			  			}
			  			else
			  			{
			  				this.recivedExpressInterestNotFound = true;
			  			}
			  			let _declineData = response.declinerequestlist;
			  			if(_declineData.length)
			  			{
		  					this.declineExpressInterestData=true;
							this.declineExpressInterest =  _declineData;
							this.declineExpressInterestTotalItems = response.declineinterestcount;	
			  			}
			  			else
			  			{
			  				this.declineExpressInterestNotFound = true;
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
				      	else
				      	{
				      		this.isBecome = 0;
				      	}

		  			}
		  			else
		  			{
		  				this.newExpressInterestNotFound = true;
		  				this.recivedExpressInterestNotFound = true;
		  				this.declineExpressInterestNotFound = true;
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
		  		this.titleService.setTitle('Express Interest - Kalyanamalai');
		  		this.defaultImage = 'https://cdn.dribbble.com/users/154550/screenshots/3014408/untitled-9.gif';

	        }
	        else
	        {
	            this.router.navigate(['/logout']);    
	        }
	    });
        
  		
  	}

  	getnewExpressInterest(page) 
  	{
  		this.dbService.getByKey('setup', 1).subscribe((userData) => 
	    { 
	        localStorage.setItem('pageSetUp',JSON.stringify(userData));
	        this.pageSetUp   = localStorage.getItem("pageSetUp");
	        if(this.pageSetUp!='undefined' && this.pageSetUp != null)
	        {
	        	this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
	            this.regno     = this.pageSetUp["INkmSet_id"];

	            this.newExpressInterestData=false;
				this.newLoading = true;
				if(page==1)
				{
					this._offset = 0	
				}
				else
				{
					this._offset = (page - 1) * this.itemsPerPage + 1
				}

				this.userservice. getData({regno:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebExpressInterest/SendInterests", "POST").subscribe((response: any) => 
				{
		  			this.newLoading = false;
					if(response.status==1)
		  			{
		  				this.newExpressInterestData=true;
						this.newExpressInterest =  response.data;
				    }
				    else
				    {
				    	this.newExpressInterestNotFound = true;
				    }
				})

	        }
	        else
	        {
	            this.router.navigate(['/logout']);    
	        }
	    });

  		
  	}

  	getrecivedExpressInterest(page) 
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

  		this.recivedExpressInterestData=false;
		this.recivedLoading = true;
		if(page==1)
		{
			this._offset = 0	
		}
		else
		{
			this._offset = (page - 1) * this.itemsPerPage + 1
		}

		this.userservice. getData({regno:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebExpressInterest/ReceiveInterests", "POST").subscribe((response: any) => 
		{
  			this.recivedLoading = false;
			if(response.status==1)
  			{
  				this.recivedExpressInterestData=true;
				this.recivedExpressInterest =  response.data;
		    }
		    else
		    {
		    	this.recivedExpressInterestNotFound = true;
		    }
		})
  	}
  	getdeclineExpressInterest(page) 
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

  		this.declineExpressInterestData=false;
		this.declineLoading = true;
		if(page==1)
		{
			this._offset = 0	
		}
		else
		{
			this._offset = (page - 1) * this.itemsPerPage + 1
		}

		this.userservice. getData({regno:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebExpressInterest/DeclinedInterests", "POST").subscribe((response: any) => 
		{
  			this.declineLoading = false;
			if(response.status==1)
  			{
  				this.declineExpressInterestData=true;
				this.declineExpressInterest =  response.data;
		    }
		    else
		    {
		    	this.declineExpressInterestNotFound = true;
		    }
		})
  	}
  	
	declineExpressInterestModal(decline, regnumber, userrequestid, prosess)
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
	    // declineExpressInterestModal(decline,newExpressInt.id, newExpressInt.userrequestid,'newExpressInt')
		this.activeProcess = prosess; //  new / replied 
		this.userrequestid = userrequestid;
		this.isReplyRegNo = regnumber
		this.modalRef = this.modalService.show(decline, this.config);
	}
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
		if(this.activeProcess=='newExpressInt')
		{
			this.isLoading = true;
			this.userservice.getData({InboxIds:this.userrequestid}, "WebExpressInterest/DeleteSendInterests", "POST").subscribe((response: any) => 
  		{
			this.isLoading = false;
			if (response.status == 1) 
			{
				this.globalFun();
				this.closeModal();
				this.notifyService.showSuccess(response.message, "");
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
				// this.notifyService.showError("Internal Server Error", "")
			})
		}
		if(this.activeProcess=='recivedExpressInt')
		{
			this.isLoading = true;
			this.userservice.getData({InboxIds:this.userrequestid}, "WebExpressInterest/DeleteReceivedInterests", "POST").subscribe((response: any) => 
	  		{
				this.isLoading = false;
				if (response.status == 1) 
				{
					this.globalFun();
					this.closeModal();
					this.notifyService.showSuccess(response.message, "");
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
	}

	replyExpressInterest(personalized: TemplateRef<any>, pRocess, newExpressIntId)
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
		// replyExpressInterest(personalized,'recivedExpressInt',recivedExpressInt.id)
		this.isReplyRegNo = newExpressIntId
		this.modalRef = this.modalService.show(personalized, this.config);
	}

	SentExpressInterest() 
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

		if(this.SentInterestMessage!=null)
		{
			let vs = this.expressInterestMsg[this.SentInterestMessage].name;
			this.MsgdisableBtn = true;
			this.MsgSubmitbuttonName = 'Loading';
			this.isLoading = true;
			this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo,Message:vs}, "WebExpressInterest/ReplyExpressInterest", "POST").subscribe((res: any) => 
			{
				try 
				{
					if (res.status == 1) 
					{
						this.globalFun();
						this.closeModal();
						this.MsgdisableBtn = false;
						this.notifyService.showSuccess(res.message, "");
						this.isLoading = false;
						this.MsgSubmitbuttonName= 'Reply Interest';
					} 
					else 
					{
						this.MsgSubmitbuttonName= 'Reply Interest';
						this.isLoading = false;
						this.notifyService.showError(res.message, "");
						this.MsgdisableBtn = false;
					}
				} 
				catch (err) 
				{
					this.MsgSubmitbuttonName= 'Reply Interest';
					this.isLoading = false;
					this.MsgdisableBtn = false;
					this.notifyService.showInfo("Something went wrong. Try again", "")
					// this.notifyService.showError("Internal Server Error", "Error");
				}
			}, 
			(err) => 
			{
				this.MsgSubmitbuttonName= 'Reply Interest';
				this.isLoading = false;
				this.MsgdisableBtn = false;
				this.notifyService.showInfo("Something went wrong. Try again", "")
				// this.notifyService.showError("Internal Server Error", "Error");
			});
		}
		else
		{
			this.notifyService.showWarning("Select Reply Express Interest Message", "");
		}
	}

	requestForUploadPhoto(item:any) 
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

		if(item)
		{
			this.isLoading = true;
			this.userservice. getData({FromRegNo:this.regno,ToRegNo:item}, "WebViewMatchProfile/PhotoRequest", "POST").subscribe((response: any) => 
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

	activateClass(index: number)
  	{
		this.SentInterestMessage = index;
	}

  	closeModal()
	{
		this.modalRef.hide();
		// this.SentInterestMessage = null;
		// this.personalizedMessageForm.reset();
		// this.FwdMessageForm.reset();
		// this.getEmail = '';
		// this.getMobile = '';
		// this.getPhone = '';
		// this.isReplyRegNo = '';

		// this.SentInterestMessage = null;
		// this.modalRef.hide();
		// this.isReplyRegNo = '';
		// this.userrequestid = '';
		// this.activeProcess = '';

		
	}
	
  	openCommonModal(content, personalized, prosess, regnumber) 
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
	    
		this.actionButtonTrue = '';
		this.actionButtonFalse = '';
		// if(this.activeProcess=='contact')
		// {
		// 	this.modalRef.hide();
		// 	if(this.isBecome==0)
		// 	{
		// 		this.router.navigate(['schemes']);
		// 	}
		// 	else if(this.isBecome==2)
		// 	{
		// 		this.router.navigate(['schemes']);
		// 	}
		// 	else
		// 	{
		// 		this.isLoading = true;
		// 		this.userservice. getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/GetContactDetails", "POST").subscribe((response: any) => 
		// 		{
		// 			this.isLoading = false;
		// 			if(response.status==1)
		//   			{
		//   				this.getEmail = response.email;
		//   				this.getMobile = response.mobile;
		//   				this.getPhone = response.phone;
		//   				this.modalRef = this.modalService.show(this.thisContent, this.config);
		// 		    }
		// 		    else
		// 		    {
		// 		    	this.activeMessage = response.message;
		// 				this.actionButtonTrue = 'Ok';
		// 				this.actionButtonFalse = 'Cancel';
		// 		    	this.modalRef = this.modalService.show(this.textContent, this.config);
		// 		    }
		// 		})
		// 	}
		// }
		// else if(this.activeProcess=='expressinterest')
		// {
		// 	if(this.isBecome==2)
		// 	{
		// 		this.modalRef.hide();
		// 		this.router.navigate(['schemes']);
		// 	}	
		// }
		// else if(this.activeProcess=='message')
		// {
		// 	this.modalRef.hide();
		// 	if(this.isBecome==0 || this.isBecome==2)
		// 	{
		// 		this.router.navigate(['schemes']);
		// 	}
		// }
		// else if(this.activeProcess=='bookmark')
		// {
		// 	if(this.isReplyRegNo)
		// 	{
		// 		this.modalRef.hide();
		// 		this.isLoading = true;
		// 		this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/AddBookMark", "POST").subscribe((response: any) => 
		// 		{
		// 			this.isLoading = false;
		// 			if(response.status==1)
		//   			{
		//   				this.notifyService.showSuccess("Profile Added to Bookmark list", "Success");
		// 		    }
		// 		    else
		// 		    {
		// 		    	this.notifyService.showWarning("Getting error try again", "Warning");
		// 		    }
		// 		})
		// 	}
		// }
		// else if(this.activeProcess=='horoscope')
		// {
		// 	if(this.isBecome==2)
		// 	{
		// 		this.modalRef.hide();
		// 		this.router.navigate(['schemes']);
		// 	}
			
		// 	if(this.isReplyRegNo)
		// 	{
		// 		this.modalRef.hide();
		// 		this.isLoading = true;
		// 		this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/AddBookMark", "POST").subscribe((response: any) => 
		// 		{
		// 			this.isLoading = false;
		// 			if(response.status==1)
		//   			{
		//   				this.notifyService.showSuccess("Profile Added to Bookmark list", "Success");
		// 		    }
		// 		    else
		// 		    {
		// 		    	this.notifyService.showWarning("Getting error try again", "Warning");
		// 		    }
		// 		})
		// 	}
		// }
		// else if(this.activeProcess=='block')
		// {
		// 	if(this.isReplyRegNo)
		// 	{
		// 		this.modalRef.hide();
		// 		this.isLoading = true;
		// 		this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/AddBlock", "POST").subscribe((response: any) => 
		// 		{
		// 			this.isLoading = false;
		// 			if(response.status==1)
		//   			{
		//   				this.notifyService.showSuccess("Profile Added to Block list", "Success");
		// 		    }
		// 		    else
		// 		    {
		// 		    	this.notifyService.showWarning("Getting error try again", "Warning");
		// 		    }
		// 		})
		// 	}
		// }
		// else if(this.activeProcess=='ignore')
		// {
		// 	if(this.isReplyRegNo)
		// 	{
		// 		this.modalRef.hide();
		// 		this.isLoading = true;
		// 		this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/AddIgnore", "POST").subscribe((response: any) => 
		// 		{
		// 			this.isLoading = false;
		// 			if(response.status==1)
		//   			{
		//   				this.notifyService.showSuccess("Profile Added to Ignore list", "Success");
		// 		    }
		// 		    else
		// 		    {
		// 		    	this.notifyService.showWarning("Getting error try again", "Warning");
		// 		    }
		// 		})
		// 	}
		// }
		if(this.activeProcess=='photo')
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
	}

}
