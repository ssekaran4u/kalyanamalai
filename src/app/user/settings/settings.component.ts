import { Component, OnInit, ElementRef,HostListener, ViewChild,ChangeDetectionStrategy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { UserGlobalService } from './../../services/user.global';
import { NotificationService } from './../../services/notification.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import * as $ from 'jquery' 
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit 
{
	// regno = localStorage.getItem("INkmSet_id");
	mails :any = [];
	mobiles:any  = [];
	mailp: number;
	mobilep: number;
	_offset = 0;
	isLoading:boolean = false;
	itemsPerPage = 10;
	totalMailItems: any;
	totalMobileItems: any;
	
	isMailData:boolean = false;
	ismailLoading:boolean = true;
	ismailNotFoundLoading:boolean = false;


	isSmsData:boolean = false;
	isSmsLoading:boolean = true;
	isSmsNotFoundLoading:boolean = false;

	minDate: Date;
  	maxDate: Date;
	isDobFocused:boolean = false;
	isDivorceFocused:boolean = false;
	isSubmitTrigger:boolean = false;
	updatePasswordForm: FormGroup;

	dobObject:string = '';
	divorceObject:string = '';

	submitted :boolean = false;
	disableBtn :boolean = false;
	SubmitbuttonName: string;
	SubmitbuttonName1: string;

	pageSetUp :any;
  	regno     :any;

	deleteAccount: FormGroup;
    deleteSettings: IDropdownSettings = {};
    deleteReasonItems = [];
    selectedDeleteReason = [];
    isDeleteReason:boolean = false;

	constructor(private dbService: NgxIndexedDBService, private UserGlobalService:UserGlobalService, private formBuilder: FormBuilder, private router: Router, private titleService: Title, private userservice: UserService,private notifyService : NotificationService, private elRef: ElementRef) 
	{
		this.SubmitbuttonName = 'Update Password';
		this.minDate = new Date();
		this.maxDate = new Date();

		this.updatePasswordForm = this.formBuilder.group({
			CurrentPassword: '',
			NewPassword : '',
			ConfirmNewPassword : '',
		});

		this.deleteAccount = this.formBuilder.group({
            deleteReason: '',
            comments:'',
        });
        this.SubmitbuttonName1 = 'Submit';
	}

	onItemSelectDeleteReason(item:any)
	{
		if(this.selectedDeleteReason)
        {
            if(item.id)
            {
                this.isDeleteReason = true;
            }
        }
        else
        {
            this.isDeleteReason = false;
        }
	}

	onSubmit() {
		this.dbService.getByKey('setup', 1).subscribe((userData) => 
	    { 
	        localStorage.setItem('pageSetUp',JSON.stringify(userData));
	        this.pageSetUp   = localStorage.getItem("pageSetUp");
	        if(this.pageSetUp!='undefined' && this.pageSetUp != null)
	        {
	        	this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
	            this.regno     = this.pageSetUp["INkmSet_id"];

	            const form_result = Object.assign({}, this.updatePasswordForm.value);
				this.SubmitbuttonName = "Loading...";
			    this.disableBtn = true;
			   
			   
			    if(form_result.CurrentPassword && form_result.NewPassword && form_result.ConfirmNewPassword)
			    {
			   		if(form_result.NewPassword != form_result.ConfirmNewPassword)
						{
							this.notifyService.showWarning("Please enter Same Password", "Warning");
							this.isSubmitTrigger = false;
							this.SubmitbuttonName = 'Update Password';
							this.disableBtn = false;
						}
						else
						{
							this.isSubmitTrigger = true;
						}
				}
				else
				{
					this.SubmitbuttonName = 'Update Password';
					this.notifyService.showWarning("Please enter required fields", "Warning");
					this.disableBtn = false;
					this.isSubmitTrigger = false;
				}

				if(this.isSubmitTrigger)
				{
					const user_save_info = {
						RegNo 		 : this.regno,
						oldpassword  : form_result.CurrentPassword,
						password 	 : form_result.NewPassword,
					};
					console.log(user_save_info);
					this.userservice.getData(user_save_info, "WebMyDashboard/ChangePassword", "POST").subscribe((response: any) => {
						this.isLoading = true;
			      
			        	if (response.code == 1) 
			        	{
			        		this.isLoading = false;
			        		// localStorage.setItem('INkmSet_us',"");
			        		this.notifyService.showSuccess(response.description, "Success")
			        		//localStorage.clear();
							localStorage.removeItem("INkmSet_id"); 
							sessionStorage.removeItem("INkmSet_id");
							sessionStorage.removeItem("INkmSet_nm");
							sessionStorage.removeItem("INkmSet_pl");
			        		this.router.navigate(['/login']);
			            } 
			            else 
			            {
			            	this.isLoading = false;
			            	this.notifyService.showError(response.description, "Warning")
			                this.disableBtn = false;
			            }
				        
				       
				    }, (err) => 
				    {
				    	this.isLoading = false;
				        this.notifyService.showError("Internal Server Error", "Error")
				    });
				}

	        }
	        else
	        {
	            this.router.navigate(['/logout']);    
	        }
	    });
	}

	onSubmit1() 
	{
		this.dbService.getByKey('setup', 1).subscribe((userData) => 
	    { 
	        localStorage.setItem('pageSetUp',JSON.stringify(userData));
	        this.pageSetUp   = localStorage.getItem("pageSetUp");
	        if(this.pageSetUp!='undefined' && this.pageSetUp != null)
	        {
	        	this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
	            this.regno     = this.pageSetUp["INkmSet_id"];

	            this.SubmitbuttonName1 = "Loading...";
		        this.disableBtn = true;
		        const result = Object.assign({}, this.deleteAccount.value);
		        if (result.comments && result.deleteReason.length ) 
		        {
		        	this.isLoading = true;
		        	this.userservice.getData({RegNo:this.regno, Comments:result.comments, DeleteReasonId: result.deleteReason[0].id}, "WebMyDashboard/DeleteAccount", "POST").subscribe((response: any) => 
		        	{
						this.isLoading = true;
						try 
						{
							if (response.status == 1) 
							{
								this.notifyService.showSuccess(response.message, "Great");
								this.router.navigate(['logout']);	
							} 
							else 
							{
								this.SubmitbuttonName1= 'Submit';
								this.isLoading = false;
								this.disableBtn = false;
								this.notifyService.showWarning(response.message, "Error")
							}
						} 
						catch (err) 
						{
							this.SubmitbuttonName1= 'Submit';
							this.isLoading = false;
							this.disableBtn = false;
							this.notifyService.showError("Internal Server Error", "Error")
						}
					}, (err) => 
					{
						this.SubmitbuttonName1= 'Submit';
						this.isLoading = false;
						this.disableBtn = false;
						this.notifyService.showError("Internal Server Error", "Error")
					});
		        }
		        else
		        {
		        	this.SubmitbuttonName1 = 'Submit';
		            this.disableBtn = false;
		            this.notifyService.showWarning("Please enter required fields", "Warning");
		        }
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
  		this.selectedDeleteReason = [];
	    this.deleteSettings ={
	          singleSelection: true,
	          idField: 'id',
	          textField: 'name',
	          selectAllText: 'Select All',
	          unSelectAllText: 'UnSelect All',
	          itemsShowLimit: 5,
	          allowSearchFilter: false,
	          closeDropDownOnSelection: true
	    };
	    this.deleteReasonItems= [
	    	{id:96,name:'Marriage fixed through KMMatrimony'},
	    	{id:97,name:'Marriage fixed through another Matrimony portal'},
	    	{id:98,name:'Not getting response as expected'},
	    	{id:99,name:'Personal reasons'},
	    	{id:100,name:'Other reasons'}
	    ];

  		// this.createRzpayOrder('order_GcFoT4Q5e22Nir', '540000');
  		this.dbService.getByKey('setup', 1).subscribe((userData) => 
	    { 
	        localStorage.setItem('pageSetUp',JSON.stringify(userData));
	        this.pageSetUp   = localStorage.getItem("pageSetUp");
	        if(this.pageSetUp!='undefined' && this.pageSetUp != null)
	        {
	        	this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
	            this.regno     = this.pageSetUp["INkmSet_id"];

	            this.isMailData = false;
		  		this.isSmsData = false;
		  		this.userservice. getData({regno:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebMyDashboard/GetSMSMailAlerts", "POST").subscribe((response: any) => 
		  		{
		  			if(response.status==1)
		  			{
		  				this.ismailLoading = false;
		  				this.isSmsLoading = false;

			  			let _mailData = response.mailalerts;
			  			if(_mailData.length)
			  			{
		  					this.isMailData=true;
							this.mails =  _mailData;
			  			}
			  			else
			  			{
			  				this.ismailNotFoundLoading = true;	
			  			}
				      	this.totalMailItems = response.totalmailcount;	
				      	let _smsData = response.smsalerts;
			  			if(_smsData.length)
			  			{
		  					this.isSmsData=true;
							this.mobiles =  _smsData;
			  			}
			  			else
			  			{
			  				this.isSmsNotFoundLoading = true;	
			  			}
				      	this.totalMobileItems = response.totalsmscount;	
		  			}
		  			else
		  			{
		  				this.ismailLoading = false;
		  				this.isSmsLoading = false;
		  				
		  				this.ismailNotFoundLoading = true;
		  				this.isSmsNotFoundLoading = true;
		  			}
			  	})

		  		this.titleService.setTitle('Settings - Kalyanamalai');

	        }
	        else
	        {
	            this.router.navigate(['/logout']);    
	        }
	    });

	    $(document).on('focus blur change', '.form-control', function(e){
	        var $currEl = $(this);
	        if ($currEl.is('select')) {
	            if ($currEl.val() === $("option:first", $currEl).val()) {
	                $('.control-label', $currEl.parent()).animate({ opacity: 0 }, 240);
	                $currEl.parent().removeClass('focused');
	            } else {
	                $('.control-label', $currEl.parent()).css({ opacity: 1 });
	                $currEl.parents('.form-group').toggleClass('focused', ((e.type === 'focus' || this.value.length > 0) && ($currEl.val() !== $("option:first", $currEl).val())));
	            }
	        } else {
	            $currEl.parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
	        }
	    }).trigger('blur');

  		
  	}

	getMailPage(page) 
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

		this.isMailData=false;
		this.ismailLoading = true;
		if(page==1)
		{
			this._offset = 0	
		}
		else
		{
			this._offset = (page - 1) * this.itemsPerPage + 1
		}
		this.isLoading = true;
		this.userservice. getData({regno:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebMyDashboard/GetMailAlerts", "POST").subscribe((response: any) => 
		{
			if(response.status==1)
  			{
  				this.isMailData=true;
  				this.ismailLoading = false;

				this.mails =  response.data;
		      	window.scroll(1,1);
		    }
		})
	}

	getMobilePage(page) 
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
	    
		this.isSmsData=false;
		this.isSmsLoading = true;

		if(page==1)
		{
			this._offset = 0	
		}
		else
		{
			this._offset = (page - 1) * this.itemsPerPage + 1
		}

		this.userservice. getData({regno:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebMyDashboard/GetSMSAlerts", "POST").subscribe((response: any) => 
		{
			if(response.status==1)
  			{
  				this.isSmsData=true;
				this.isSmsLoading = false;

				this.mobiles =  response.data;
		      	window.scroll(1,1);
		    }
		})
	}
}





