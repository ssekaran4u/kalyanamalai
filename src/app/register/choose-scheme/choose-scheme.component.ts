import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { WindowRefService } from './../../services/window-ref.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-choose-scheme',
  templateUrl: './choose-scheme.component.html',
  styleUrls: ['./choose-scheme.component.css'],
  providers: [WindowRefService]
})
export class ChooseSchemeComponent implements OnInit 
{
	//regno = localStorage.getItem("INkmSet_id");
	
	// regno = '869725';
	isPackages:any = [];
  	isLoading:boolean = false;
  	isPageLoading:boolean = false;
  	isHide:boolean = false;
  	disableBtn = false;
  	isData:boolean = false;

  	pageSetUp    :any;
  	regno     :any;


  	constructor(private dbService: NgxIndexedDBService,private winRef: WindowRefService, private formBuilder: FormBuilder, private userservice: UserService, private notifyService : NotificationService, private router: Router, private titleService: Title){}
  	goToNextPage() :void 
  	{
  		this.dbService.getByKey('setup', 1).subscribe((userData) => 
    	{ 
        	localStorage.setItem('pageSetUp',JSON.stringify(userData));
        	this.pageSetUp   = localStorage.getItem("pageSetUp");
	        if(this.pageSetUp!='undefined' && this.pageSetUp != null)
	        {
	            this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
	            this.regno     = this.pageSetUp["INkmSet_id"];
				this.router.navigate(['user/dashboard']);
			}
			else
			{
				this.router.navigate(['/login']);
			}
		});
  	}

	goPaymentPage(item:any, packagename:any)
	{
		this.dbService.getByKey('setup', 1).subscribe((userData) => 
    	{ 
        	localStorage.setItem('pageSetUp',JSON.stringify(userData));
        	this.pageSetUp   = localStorage.getItem("pageSetUp");
	        if(this.pageSetUp!='undefined' && this.pageSetUp != null)
	        {
	            this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
	            this.regno     = this.pageSetUp["INkmSet_id"];

	            if(item && packagename)
				{
					this.isLoading = true;
					this.userservice.getData({packageid:item, regno:this.regno}, "WebPayment/GetPackageOrderId", "POST").subscribe((response: any) => 
					{
						this.isLoading = false;
						if (response.status == 1) 
						{
							this.payWithRazor(response.data[0].id, response.data[0].amount, packagename);
						} 
						else 
						{
							this.notifyService.showError(response.message, "")
						}
					}, (err) => 
					{
						this.isLoading = false;
						this.notifyService.showInfo("Something went wrong. Try again", "")
						// this.notifyService.showError("Internal Server Error 2", "")
					});
				}
				else
				{
					this.notifyService.showInfo("Please Choose Any Package to Continue", "");
				}
	        }
	        else
	        {
	            this.router.navigate(['/logout']);    
	        }
      	});
		
	}
	payWithRazor(orderId, amount, packagename) 
	{
	    const options: any = 
	    {
	      	key: 'rzp_test_3AHyYuodTQNvh6',
	      	amount: amount, // amount should be in paise format to display Rs 1255 without decimal point
	      	currency: 'INR',
	      	name: packagename, // company name or product name
	      	description: 'Kalyanamalai Private Limited',  // product description
	      	image: './assets/images/Logo.png', // company logo or product image
	      	order_id: orderId, // order_id created by you in backend
	      	modal: {
	        	// We should prevent closing of the form when esc key is pressed.
	        	escape: false,
	      	},
	      	notes: {
	        	// include notes if any
	      	},
	      	theme: {
	        	color: '#ff9400'
	      	},
	      	// prefill: {
	      	// 	email : 'ssekaran4u@gmail.com',
	      	// 	contact : '9865340224'
	      	// }
	    };
	    options.handler = ((response, error) => {
	      options.response = response;
	      // console.log(response);
	      // console.log(options);
	      	this.notifyService.showSuccess("Payment made successfully", "");
			this.router.navigate(['/login']);
	      // call your backend api to verify payment signature & capture transaction
	    });
	    options.modal.ondismiss = (() => {
	      	// handle the case when user closes the form while transaction is in progress
	      	console.log('Transaction cancelled.');
	    });
	    const rzp = new this.winRef.nativeWindow.Razorpay(options);
	    rzp.open();
	}

  	// isSetDefault()
  	// {
   //  	this.dbService.getByKey('setup', 1).subscribe((userData) => 
   //  	{ 
   //      	localStorage.setItem('pageSetUp',JSON.stringify(userData));
   //      	this.pageSetUp   = localStorage.getItem("pageSetUp");
	  //       if(this.pageSetUp!='undefined' && this.pageSetUp != null)
	  //       {
	  //           this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
	  //           this.regno     = this.pageSetUp["INkmSet_id"];
	  //       }
	  //       else
	  //       {
	  //           this.router.navigate(['/']);    
	  //       }
   //    	});
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

	            this.isData = false;
				this.isPageLoading = true;
				this.userservice.getData({}, "Package/GetPackageList", "POST").subscribe((response: any) => 
				{
					try 
					{
						if (response.status == 1) 
						{
							this.isData = true;
							this.isPackages = response.data;
							this.isPageLoading = false;
						} 
						else 
						{
							this.notifyService.showError(response.message, "")
						}
					} 
					catch (err) 
					{
						this.notifyService.showInfo("Something went wrong. Try again", "")
						// this.notifyService.showError("Internal Server Error", "")
					}
				}, (err) => 
				{
					// this.notifyService.showError("Internal Server Error", "")
					this.notifyService.showInfo("Something went wrong. Try again", "")
				});
				this.titleService.setTitle('Choose Scheme - Kalyanamalai');
	        }
	        else
	        {
	            this.router.navigate(['/logout']);    
	        }
      	});
  	}
}
