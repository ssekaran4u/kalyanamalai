import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserGlobalService } from '../services/user.global';
import { NotificationService } from '../services/notification.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery'
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit {
	resetPassword: FormGroup;
	disableBtn = false;
	SubmitbuttonName: string;
	isSubmitTrigger:boolean = true;
	isLoading:boolean = false;
	isOTP:boolean = false;
	isPassword:boolean = false;
  	constructor(private formBuilder: FormBuilder, private userservice: UserService,private userglobalservice: UserGlobalService, private notifyService: NotificationService, private router: Router, private titleService: Title) {
		this.resetPassword = this.formBuilder.group({
			username: '',
			otp: '',
			password : '',
			cpassword : ''
		});
		this.SubmitbuttonName = 'Continue';
	}
	formGroup;
	onSubmit() 
	{
		this.SubmitbuttonName = "Loading...";
		this.disableBtn = true;
		const result = Object.assign({}, this.resetPassword.value);

		if(result.username=='')
		{
			this.notifyService.showWarning("Enter your username to Continue", "Warning");
		}
		if(result.username && this.isOTP==false && this.isPassword==false)
		{
			this.isLoading = true;
			this.userservice.getData({userid:result.username}, "WebLogin/ForgotPassword", "POST").subscribe((response: any) => 
			{
				try 
				{
					if (response.code == 1) 
					{
						this.isOTP = true;
						this.SubmitbuttonName= 'Continue';
						this.isLoading = false;
						this.disableBtn = false;
					} 
					else 
					{
						this.SubmitbuttonName= 'Continue';
						this.isLoading = false;
						this.notifyService.showError(response.description, "Error")
						this.disableBtn = false;
					}
				} 
				catch (err) 
				{
					this.SubmitbuttonName= 'Continue';
					this.isLoading = false;
					this.disableBtn = false;
					this.notifyService.showError("Internal Server Error", "Error")
				}
			}, (err) => 
			{
				this.SubmitbuttonName= 'Continue';
				this.isLoading = false;
				this.disableBtn = false;
				this.notifyService.showError("Internal Server Error", "Error")
			});
		}
		if(result.username && this.isOTP && this.isPassword==false)
		{
			if(result.username=='' || result.otp=='')
			{
				this.notifyService.showWarning("Enter your OTP to Continue", "Warning");
				this.SubmitbuttonName= 'Continue';
				this.isLoading = false;
				this.disableBtn = false;
			}
			else
			{
				this.isLoading = true;
				this.userservice.getData({userid:result.username,userotp:result.otp}, "WebLogin/ForgotPassword/ValidateOTP", "POST").subscribe((response: any) => 
				{
					try 
					{
						if (response.code == 1) 
						{
							this.isOTP = false;
							this.isPassword=true;
							this.SubmitbuttonName= 'Continue';
							this.isLoading = false;
							this.disableBtn = false;
						} 
						else 
						{
							this.SubmitbuttonName= 'Continue';
							this.isLoading = false;
							this.notifyService.showError(response.description, "Error")
							this.disableBtn = false;
						}
					} 
					catch (err) 
					{
						this.SubmitbuttonName= 'Continue';
						this.isLoading = false;
						this.disableBtn = false;
						this.notifyService.showError("Internal Server Error", "Error")
					}
				}, (err) => 
				{
					this.SubmitbuttonName= 'Continue';
					this.isLoading = false;
					this.disableBtn = false;
					this.notifyService.showError("Internal Server Error", "Error")
				});
			}
		}
		if(result.username && this.isOTP==false && this.isPassword==true)
		{
			if(result.username=='' || result.otp=='' || result.password=='' || result.cpassword=='')
			{
				this.notifyService.showWarning("Enter your new password to Continue", "Warning");
				this.SubmitbuttonName= 'Continue';
				this.isLoading = false;
				this.disableBtn = false;
			}
			else if(result.password!=result.cpassword)
			{
				this.notifyService.showWarning("Mismatch password and confirm password to Continue", "Warning");
				this.SubmitbuttonName= 'Continue';
				this.isLoading = false;
				this.disableBtn = false;
			}
			else
			{
				this.isLoading = true;
				this.userservice.getData({userid:result.username,password:result.password}, "WebLogin/ForgotPassword/ResetPassword", "POST").subscribe((response: any) => 
				{
					try 
					{
						if (response.code == 1) 
						{
							this.notifyService.showSuccess(response.description, "Success");
							this.isLoading = false;
							this.isOTP = false;
							this.isPassword=false;
							this.router.navigate(['login']);
						} 
						else 
						{
							this.SubmitbuttonName= 'Continue';
							this.isLoading = false;
							this.notifyService.showError(response.message, "Error")
							this.disableBtn = false;
						}
					} 
					catch (err) 
					{
						this.SubmitbuttonName= 'Continue';
						this.isLoading = false;
						this.disableBtn = false;
						this.notifyService.showError("Internal Server Error", "Error")
					}
				}, (err) => 
				{
					this.SubmitbuttonName= 'Continue';
					this.isLoading = false;
					this.disableBtn = false;
					this.notifyService.showError("Internal Server Error", "Error")
				});
			}
		}
	}
  	ngOnInit(): void 
  	{
  		this.isOTP = false;
		this.isPassword = false;

	  	if(window.sessionStorage.getItem("INkmSet_id"))
		{
			this.router.navigate(['user/dashboard']);
		}
	  	this.titleService.setTitle('Reset Password - Kalyanamalai');

	  	$(document).on('focus blur change', 'form-control', function(e) {
  	//$('.form-control').on('focus blur change', function(e) {
		var $currEl = $(this);
		if ($currEl.is('select')) {
			if ($currEl.val() === $("option:first", $currEl).val()) 
			{
				$('.control-label', $currEl.parent()).animate({ opacity: 0 }, 240);
				$currEl.parent().removeClass('focused');
			} 
			else 
			{
				$('.control-label', $currEl.parent()).css({ opacity: 1 });
				$currEl.parents('.form-group').toggleClass('focused', ((e.type === 'focus' || this.value.length > 0) && ($currEl.val() !== $("option:first", $currEl).val())));
			}
		} 
		else 
		{
			$currEl.parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
		}
	}).trigger('blur');


	//$('input').on('focusin', function() {
	$(document).on('focusin', 'input', function() {
		$(this).parent().find('label').addClass('active');
	});

	//$('input').on('focusout', function() {
	$(document).on('focusout', 'input', function() {
		if (!this.value) {
			$(this).parent().find('label').removeClass('active');
		}
	});
  }

}
