import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery' 
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
	selector: 'app-verify',
	templateUrl: './verify.component.html',
	styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

    validateOTP: FormGroup;
    disableBtn = false;
    isLoading:boolean = false;
	ismobile:string = '';
    mobile_no:string = '';
    SubmitbuttonName: string;

    pageSetUp :any;
    regno     :any;

	constructor(private dbService: NgxIndexedDBService, private formBuilder: FormBuilder, private userservice: UserService, private notifyService : NotificationService, private router: Router, private titleService: Title){
        this.validateOTP = this.formBuilder.group({
            otp: ''
          });
        this.SubmitbuttonName = 'Verify';
    }

    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
        }
        return true;
    }
    onSubmit() {
        this.isLoading = true;
        this.SubmitbuttonName = "Loading...";
        this.disableBtn = true;
        const form_result = Object.assign({}, this.validateOTP.value);
        console.log(form_result);
        if(form_result.otp)
        {
            // this.userservice.getData({regno:localStorage.getItem('INkmSet_us'),mobile:localStorage.getItem('INkmSet_mb'),otp:form_result.otp,RegistrationStages:9 }, "Registration/VerifyOTPWeb", "POST").subscribe((response: any) => {
            this.userservice.getData({regno:this.regno,mobile:this.mobile_no,otp:form_result.otp}, "Registration/VerifyOTPWeb", "POST").subscribe((response: any) => {
                try {
                    if (response.status == 1) 
                    {
                        this.dbService.getByKey('setup', 1).subscribe((userData) => 
                        { 
                            localStorage.setItem('pageSetUp',JSON.stringify(userData));

                            this.pageSetUp   = localStorage.getItem("pageSetUp");
                            if(this.pageSetUp!='undefined' && this.pageSetUp != null)
                            {
                                this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
                                this.regno     = this.pageSetUp["INkmSet_id"];

                                const user_save_info = 
                                {
                                    RegNo: this.regno,
                                    RegistrationStages:9,
                                };
                                this.userservice.getData(user_save_info, "Registration/SaveUserInfo", "POST").subscribe((response: any) => 
                                {
                                });
                            }
                            else
                            {
                                this.router.navigate(['/logout']);    
                            }
                        });
                       
                        this.isLoading = false;
                        this.notifyService.showSuccess("Account Created Successfully...!", "Great")
                        // this.router.navigate(['/register/upload-profile']);
                        this.router.navigate(['/register/personal-details']);

                    } 
                    else 
                    {
                        this.isLoading = false;
                        this.notifyService.showError(response.message, "Error")
                        this.disableBtn = false;
                        this.SubmitbuttonName = 'Verify';
                    }
                } 
                catch (err) 
                {
                    this.isLoading = false;
                    this.notifyService.showError("Internal Server Error", "Error");
                    this.disableBtn = false;
                    this.SubmitbuttonName = 'Verify';
                }
            }, (err) => 
            {
                this.isLoading = false;
                this.disableBtn = false;
                this.notifyService.showError("Internal Server Error", "Error")
                this.SubmitbuttonName = 'Verify';
            });
        }
        else
        {
            this.notifyService.showWarning("Please enter OTP", "Warning");
            this.SubmitbuttonName = 'Verify';
            this.disableBtn = false;
            this.isLoading = false;
        }
   }
	goToNextPage() :void {
		// this.router.navigate(['/register/family-information']);
	}
	sendOtp():void {
    	this.isLoading = true;
		if(localStorage.getItem('INkmSet_mb'))
		{
    		this.userservice.getData({mobile:localStorage.getItem('INkmSet_mb')}, "Registration/SendOTPWeb", "POST").subscribe((response: any) => {
    			try 
                 {
    				if (response.status == 1) 
    				{
                        this.isLoading = false;
                        this.notifyService.showSuccess("OTP Sent to "+localStorage.getItem('INkmSet_mb'), "Success ")
    				} 
    				else 
    				{
                        this.isLoading = false;
    					this.notifyService.showError(response.message, "Error")
    				}
    			} 
    			catch (err) 
    			{
                    this.isLoading = false;
    				this.notifyService.showError("Internal Server Error", "Error")
    			}
    		}, (err) => 
    		{
                this.isLoading = false;
    			this.notifyService.showError("Internal Server Error", "Error")
    		});
    	}
    	else
    	{
            this.isLoading = false;
    		this.notifyService.showError("Internal Server Error", "Error")
    	}
	}

	ngOnInit(): void {
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

		this.mobile_no = localStorage.getItem('INkmSet_mb');
        this.ismobile = localStorage.getItem('INkmSet_mb');
        // console.log(this.mobile_no);
		this.ismobile = this.ismobile.substring(0,2)+'*****'+this.ismobile.substring(7,10);
        this.sendOtp();
		this.titleService.setTitle('Verify OTP - Kalyanamalai');
	}

}
