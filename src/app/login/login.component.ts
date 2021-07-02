import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery' 
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../services/user.service';
import { NotificationService } from './../services/notification.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class LoginComponent implements OnInit {
	auth2: any;
  	@ViewChild('loginRef', {static: true }) loginElement: ElementRef;

	initialLogin: FormGroup;
	isMobile:boolean = false;
	isEmail:boolean = false;
	isPasswordOn:boolean = true;
	accounts = [];
	isMultipleAccount:boolean = false;
	isActiveAccount:boolean = false;
	isOTP:boolean = false;
	disableBtn = false;
	isLoading:boolean = false;
	SubmitbuttonName: string;
	Url : any;
	registrationstages:any;

	constructor(private dbService: NgxIndexedDBService, private formBuilder: FormBuilder, private userservice: UserService,private notifyService: NotificationService, private router: Router, private titleService: Title) {
		this.initialLogin = this.formBuilder.group({
            username: '',
            password: '',
            otp: '',
            currentAccount: ''
        });
        this.SubmitbuttonName = 'Continue';
	}

	onSubmit() {
		const result = Object.assign({}, this.initialLogin.value);
		if(result.username && this.isMultipleAccount==false)
		{
			this.isLoading = true;
			this.disableBtn = true;
			if(this.isPasswordOn == true && this.isOTP==false )
			{
				// Send OTP
				this.userservice.getData({ mobile:result.username }, "WebLogin/SendOTP", "POST").subscribe((response: any) => 
				{
					if (response.status == 1) 
					{
						$.fn.timedDisable = function(time) 
					    {
					      	if (time == null) 
						    {
						        time = 5;
						    }

					        var seconds = Math.ceil(time); // Calculate the number of seconds
					        return $(this).each(function() {
					        $(this).attr('disabled', 'disabled');
					        var disabledElem = $(this);
					        var originalText = this.innerHTML; // Remember the original text content

					        // append the number of seconds to the text
					        disabledElem.text(originalText + ' (' + seconds + ')');
					        var interval = setInterval(function() {
					        seconds = seconds - 1;
					        // decrement the seconds and update the text
					        disabledElem.text(originalText + ' (' + seconds + ')');
				          	if (seconds === 0) 
				          	{ 
				          		// once seconds is 0...
				            	disabledElem.removeAttr('disabled').text(originalText); 
				            	clearInterval(interval); // clear interval
				          	}
					        }, 1000);
					      });
					    };

					    $(function() {
					      $('#btnContinue').timedDisable(60);
					    });

						this.isOTP = true;
						this.isLoading = false;
						this.disableBtn = false;
						this.notifyService.showSuccess(response.message, "")
					} 
					else 
					{
						this.isLoading = false;
						this.disableBtn = false;
						this.notifyService.showWarning(response.message, "")
					}
				}, (err) => 
				{
					this.isLoading = false;
					this.disableBtn = false;
					this.notifyService.showInfo("Something went wrong. Try again", "")
				});	
			}
			else if(this.isPasswordOn && this.isOTP)
			{
				if(result.username && result.otp)
				{
					this.userservice.getData({ mobile:result.username,otp:result.otp }, "WebLogin/VerifyOTP", "POST").subscribe((response: any) => 
					{
						this.isLoading = true;
						if (response.status == 1) 
						{
							// this.isLoading = false;
							// this.router.navigate(['register/schemes']);
							// this.notifyService.showSuccess(response.message, "Success")
							this.userservice.getData({ username:result.username}, "WebLogin/UserLogin", "POST").subscribe((response: any) => 
							{
								if (response.status == 1) 
								{
									this.isOTP = false;
									this.accounts = response.data
									if(this.accounts.length==1)
									{	
										localStorage.removeItem('INkmSet_us');
										this.registrationstages = this.accounts[0].registrationstages;
										this.dbService.add('setup', {id: 1,INkmSet_id:this.accounts[0].id, INkmSet_nm:this.accounts[0].name, INkmSet_pl: this.accounts[0].profile}).subscribe((storeData) => {});
										//localStorage.setItem("INkmSet_id",  this.accounts[0].id); 
										// sessionStorage.setItem("INkmSet_id",  this.accounts[0].id); 
										// sessionStorage.setItem("INkmSet_nm",  this.accounts[0].name); 
										// sessionStorage.setItem("INkmSet_pl",  this.accounts[0].profile);
										localStorage.setItem('INkmSet_mb', this.accounts[0].umobile);
										
										this.dbService.getByKey('setup', 1).subscribe((userData) => 
									    { 
									        localStorage.setItem('pageSetUp',JSON.stringify(userData));
									    }); 
										this.isMultipleAccount=false;
										this.notifyService.showSuccess(response.message, "");
										this.Url = localStorage.getItem("INkmSet_redirURL");
											//localStorage.setItem("INkmSet_redirURL",  'schemes'); 

										if(this.registrationstages==9)
										{
											this.router.navigate(['register/personal-details']);
										}
										else if(this.registrationstages==2)
										{
											this.router.navigate(['register/family-information']);
										}
										else if(this.registrationstages==3)
										{
											this.router.navigate(['register/lifestyle-information']);
										}
										else if(this.registrationstages==4)
										{
											this.router.navigate(['register/education-and-career-details']);
										}
										else if(this.registrationstages==5)
										{
											this.router.navigate(['register/communication-address']);
										}
										else if(this.registrationstages==6)
										{
											this.router.navigate(['register/describe-yourself']);
										}
										else if(this.registrationstages==7)
										{
											this.router.navigate(['register/my-expectations']);
										}
										else if(this.registrationstages==1)
										{
											this.router.navigate(['register/verify']);
										}
										else
										{
											if(this.Url!='' && this.Url!=0 && this.Url!=null)
											{
												this.router.navigate([this.Url]);
											}
											else
											{
												this.router.navigate(['user/dashboard']);
											}
										}
										
									}
									else
									{
										this.isLoading = false;
										this.disableBtn = false;
										this.isMultipleAccount=true;
									}
								} 
								else 
								{
									this.isLoading = false;
									this.disableBtn = false;
									this.notifyService.showWarning(response.message, "")
								}
							}, (err) => 
							{
								this.isLoading = false;
								this.disableBtn = false;
								this.notifyService.showInfo("Something went wrong. Try again", "")
								// this.notifyService.showError("Internal Server Error", "Error")
							});
						} 
						else 
						{
							this.isLoading = false;
							this.disableBtn = false;
							this.notifyService.showWarning(response.message, "")
						}
					}, (err) => 
					{
						this.isLoading = false;
						this.disableBtn = false;
						this.notifyService.showInfo("Something went wrong. Try again", "")
						// this.notifyService.showError("Internal Server Error", "Error")
					});
				}
				else
				{
					this.isLoading = false;
					this.disableBtn = false;
					this.notifyService.showWarning("Please enter OTP", "")
				}
			}
			if(this.isPasswordOn == false)
			{
				if(result.username && result.password)		
				{
					this.userservice.getData({ username:result.username, password:result.password}, "WebLogin/UserLogin", "POST").subscribe((response: any) => 
					{
						if (response.status == 1) 
						{
							this.disableBtn = false;
							this.isLoading = false;

							localStorage.removeItem('INkmSet_us');
							// localStorage.setItem("INkmSet_id",  response.data[0].id); 
							// sessionStorage.setItem("INkmSet_id",  response.data[0].id); 
							// sessionStorage.setItem("INkmSet_nm",  response.data[0].name); 
							// sessionStorage.setItem("INkmSet_pl",  response.data[0].profile);
							this.registrationstages = response.data[0].registrationstages;
							this.dbService.add('setup', {id: 1,INkmSet_id:response.data[0].id, INkmSet_nm:response.data[0].name, INkmSet_pl: response.data[0].profile}).subscribe((storeData) => {});
							this.notifyService.showSuccess(response.message, "")

							//localStorage.setItem('INkmSet_mb', result.umobile);
							localStorage.setItem('INkmSet_mb', response.data[0].mobile);

							this.Url = localStorage.getItem("INkmSet_redirURL");
							//console.log(this.Url);
							//localStorage.setItem("INkmSet_redirURL",  'schemes'); 
							if(this.registrationstages==9)
							{
								this.router.navigate(['register/personal-details']);
							}
							else if(this.registrationstages==2)
							{
								this.router.navigate(['register/family-information']);
							}
							else if(this.registrationstages==3)
							{
								this.router.navigate(['register/lifestyle-information']);
							}
							else if(this.registrationstages==4)
							{
								this.router.navigate(['register/education-and-career-details']);
							}
							else if(this.registrationstages==5)
							{
								this.router.navigate(['register/communication-address']);
							}
							else if(this.registrationstages==6)
							{
								this.router.navigate(['register/describe-yourself']);
							}
							else if(this.registrationstages==7)
							{
								this.router.navigate(['register/my-expectations']);
							}
							else if(this.registrationstages==1)
							{
								this.router.navigate(['register/verify']);
							}
							else
							{
								//console.log(this.Url);
								if(this.Url!='' && this.Url!=0 && this.Url!=null)
								{
									this.router.navigate([this.Url]);
								}
								else
								{
									this.router.navigate(['user/dashboard']);
								}
							}
							
						} 
						else 
						{
							this.isLoading = false;
							this.disableBtn = false;
							this.notifyService.showWarning(response.message, "")
						}
					}, (err) => 
					{
						this.isLoading = false;
						this.disableBtn = false;
						this.notifyService.showInfo("Something went wrong. Try again", "")
						// this.notifyService.showError("Internal Server Error", "Error")
					});
				}
				else
				{
					this.isLoading = false;
					this.disableBtn = false;
					this.notifyService.showWarning("Please enter username and password", "")
				}
			}

		}
		else if(this.isMultipleAccount==true && result.username)
		{
			if(result.currentAccount=='' || result.currentAccount==null)
			{
				this.isLoading = false;
				this.disableBtn = false;
				this.notifyService.showWarning("Which Profile Do you want to Choose", "")
			}
			else
			{
				localStorage.removeItem('INkmSet_us');
				this.registrationstages = this.accounts[0].registrationstages;
				this.dbService.add('setup', {id: 1,INkmSet_id:this.accounts[0].id, INkmSet_nm:this.accounts[0].name, INkmSet_pl: this.accounts[0].profile}).subscribe((storeData) => {});
				// localStorage.setItem("INkmSet_id",  this.accounts[0].id); 
				// sessionStorage.setItem("INkmSet_id",  this.accounts[0].id); 
				// sessionStorage.setItem("INkmSet_nm",  this.accounts[0].name); 
				// sessionStorage.setItem("INkmSet_pl",  this.accounts[0].profile); 
				localStorage.setItem('INkmSet_mb', this.accounts[0].mobile);

				this.notifyService.showSuccess("Logged Successfully", "");
				this.Url = localStorage.getItem("INkmSet_redirURL");
				//localStorage.setItem("INkmSet_redirURL",  'schemes'); 
				if(this.registrationstages==9)
				{
					this.router.navigate(['register/personal-details']);
				}
				else if(this.registrationstages==2)
				{
					this.router.navigate(['register/family-information']);
				}
				else if(this.registrationstages==3)
				{
					this.router.navigate(['register/lifestyle-information']);
				}
				else if(this.registrationstages==4)
				{
					this.router.navigate(['register/education-and-career-details']);
				}
				else if(this.registrationstages==5)
				{
					this.router.navigate(['register/communication-address']);
				}
				else if(this.registrationstages==6)
				{
					this.router.navigate(['register/describe-yourself']);
				}
				else if(this.registrationstages==7)
				{
					this.router.navigate(['register/my-expectations']);
				}
				else if(this.registrationstages==1)
				{
					this.router.navigate(['register/verify']);
				}
				else
				{
					if(this.Url!='' && this.Url!=0 && this.Url!=null)
					{
						this.router.navigate([this.Url]);
					}
					else
					{
						this.router.navigate(['user/dashboard']);
					}
				}
			}
		}
		else
		{
			this.isLoading = false;
			this.disableBtn = false;
			this.notifyService.showWarning("Please enter required fields ", "")
		}
	}

	onResendOtP()
	{
		const result = Object.assign({}, this.initialLogin.value);
		this.userservice.getData({ mobile:result.username }, "WebLogin/SendOTP", "POST").subscribe((response: any) => 
		{
			if (response.status == 1) 
			{
				$.fn.timedDisable = function(time) 
			    {
			      	if (time == null) 
				    {
				        time = 5;
				    }

			        var seconds = Math.ceil(time); // Calculate the number of seconds
			        return $(this).each(function() {
			        $(this).attr('disabled', 'disabled');
			        var disabledElem = $(this);
			        var originalText = this.innerHTML; // Remember the original text content

			        // append the number of seconds to the text
			        disabledElem.text(originalText + ' (' + seconds + ')');
			        var interval = setInterval(function() {
			        seconds = seconds - 1;
			        // decrement the seconds and update the text
			        disabledElem.text(originalText + ' (' + seconds + ')');
		          	if (seconds === 0) 
		          	{ 
		          		// once seconds is 0...
		            	disabledElem.removeAttr('disabled').text(originalText); 
		            	clearInterval(interval); // clear interval
		          	}
			        }, 1000);
			      });
			    };

			    $(function() {
			      $('#btnContinue').timedDisable(60);
			    });

				this.isOTP = true;
				this.isLoading = false;
				this.disableBtn = false;
				this.notifyService.showSuccess(response.message, "")
			} 
			else 
			{
				this.isLoading = false;
				this.disableBtn = false;
				this.notifyService.showWarning(response.message, "")
			}
		}, (err) => 
		{
			this.isLoading = false;
			this.disableBtn = false;
			this.notifyService.showInfo("Something went wrong. Try again", "")
			// this.notifyService.showError("Internal Server Error", "Error")
		});	
	}

  	ngOnInit(): void 
  	{
  		if(window.sessionStorage.getItem("INkmSet_id"))
  		{
  			this.router.navigate(['user/dashboard']);
  		}
  		//this.googleSDK();
  		this.titleService.setTitle('Login - Kalyanamalai');

  		$(document).on('click', '._Ms_s', function() {
			$('.MaritalStatus li label').removeClass('active');
			$(this).addClass('active');
		});


  	}

  	prepareLoginButton() {
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => {
 
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.table('Gender: ' + profile);
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }
  googleSDK() {
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '886376238725-a91vq14ulifld71ln4cha16v7scjjou7.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLoginButton();
      });
    }
 
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }

  	values = '';

	detectUserId(event: any) 
	{
	    this.values = event.target.value;
	    let emtybox = '';

	    if(this.values=='')
	    {
	    	this.isMobile = false;
	    	this.isEmail = false;
	    	this.isOTP = false;
	    	this.isPasswordOn = true;
	    }
	    // is multiple account

	    let regnodata = /^([a-zA-Z]){2}([0-9]){6}|([0-9]){7}?$/;
	    //console.log(regnodata);
  		if(this.values.match(regnodata))
        {
      		this.isPasswordOn =  false;
        }
      	else
        {
	        this.isPasswordOn =  true;
        }

	    let phoneno = /^\d{10}$/;
  		if(this.values.match(phoneno))
        {
      		this.isMobile =  true;
        }
      	else
        {
	        this.isMobile =  false;
        }

        let emailpattern =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(this.values.match(emailpattern))
	    {
	    	this.isEmail = true;
	  	}
	  	else
	  	{
	  		this.isEmail = false;
	  	}

	  	if(this.values)
	  	{
	  		// this.isMultipleAccount = true;
		  	if(this.isMobile==true)
		  	{
		  		this.isPasswordOn = true;
		  	}
		  	else if(this.isEmail==true)
		  	{
		  		this.isPasswordOn = true;
		  	}
		  	// else if(this.isEmail==false)
		  	// {
		  	// 	this.isPasswordOn = false;
		  	// }
	  	}
	  	else
	  	{
	  		this.isPasswordOn = true;
	  	}
	    // console.log(this.values);
	}
}

// 1234567890