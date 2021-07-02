import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserGlobalService } from '../../services/user.global';
import { NotificationService } from '../../services/notification.service';
import * as $ from 'jquery'
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-describe-yourself',
  templateUrl: './describe-yourself.component.html',
  styleUrls: ['./describe-yourself.component.css']
})
export class DescribeYourselfComponent implements OnInit {
	dropdownList  :any = [];
    selectedItems :any = [];

	describeYourself: FormGroup;
	disableBtn = false;
	SubmitbuttonName: string;
	isSubmitTrigger:boolean = true;
	isLoading:boolean = false;
	isDescribeCount:number = 0;;
	isMyExpectationCount:number = 0;

	pageSetUp    :any;
    regno     :any;
  	constructor(private dbService: NgxIndexedDBService,private formBuilder: FormBuilder, private userservice: UserService,private userglobalservice: UserGlobalService, private notifyService: NotificationService, private router: Router, private titleService: Title) {
		this.describeYourself = this.formBuilder.group({
			DescribeyourselfText: '',
			MyExpectationText: '',
		});
		this.SubmitbuttonName = 'Continue';
	}

	formGroup;
	searchDescribe(term:string) {
		this.isDescribeCount = term.length;
	}
	searchMyExpectation(expectation:string) {
		this.isMyExpectationCount = expectation.length;
	}
	onSubmit() 
	{
		this.dbService.getByKey('setup', 1).subscribe((userData) => 
	    { 
	        localStorage.setItem('pageSetUp',JSON.stringify(userData));

	        if(this.pageSetUp!='undefined' && this.pageSetUp != null)
	        {
	        	this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
	            this.regno     = this.pageSetUp["INkmSet_id"];

	            this.SubmitbuttonName = "Loading...";
				this.disableBtn = true;
				const result = Object.assign({}, this.describeYourself.value);
				// console.table($('#MyExpectationText').val());
				if ($('#MyExpectationText').val() && $('#DescribeyourselfText').val()) 
				{

					if(this.isSubmitTrigger)
					{
						const user_save_info = {
							RegNo:this.regno,
							AboutMyself: $('#DescribeyourselfText').val(),
							ExpectationAboutLifePartner: $('#MyExpectationText').val(),
							RegistrationStages:7,
						};
						// console.log(user_save_info);
						this.userservice.getData(user_save_info, "Registration/SaveUserInfo", "POST").subscribe((response: any) => {
							this.isLoading = true;
							try {
								if (response.status == 1) 
								{
									this.isLoading = false;
									this.notifyService.showSuccess(response.message, "Great...!");
									this.router.navigate(['register/my-expectations']);
								} 
								else 
								{
									this.SubmitbuttonName= 'Continue';
									this.isLoading = false;
									this.notifyService.showError(response.message, "")
									this.disableBtn = false;
								}
							} 
							catch (err) 
							{
								this.SubmitbuttonName= 'Continue';
								this.isLoading = false;
								this.disableBtn = false;
								this.notifyService.showInfo("Something went wrong. Try again", "")
								// this.notifyService.showError("Internal Server Error", "Error")
							}
						}, (err) => 
						{
							this.SubmitbuttonName= 'Continue';
							this.isLoading = false;
							this.disableBtn = false;
							this.notifyService.showInfo("Something went wrong. Try again", "")
							// this.notifyService.showError("Internal Server Error", "Error")
						});
					}
				} 
				else 
				{
					this.SubmitbuttonName = 'Continue';
					this.disableBtn = false;
					this.isLoading = false;
					this.notifyService.showWarning("Please enter required fields", "");
				}
	        }
	        else
	        {
	            this.router.navigate(['/logout']);    
	        }
	    });

		
	};


   // isSetDefault()
	  // {
	  //   this.dbService.getByKey('setup', 1).subscribe((userData) => 
	  //   { 
	  //       localStorage.setItem('pageSetUp',JSON.stringify(userData));

	  //       if(this.pageSetUp!='undefined' && this.pageSetUp != null)
	  //       {

	  //       }
	  //       else
	  //       {
	  //           this.router.navigate(['/logout']);    
	  //       }
	  //   });
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

	       		this.userservice. getData('', "IdValues/GetEditProfile", "POST").subscribe((response: any) => {
					 const res  = response.dropdownlist;
					 this.dropdownList = res.filter(data => data.type == 'Star').sort((a, b) => (a.name > b.name) ? 1 : -1);
					 this.dropdownList = this.userglobalservice.selectBox(this.dropdownList);
				  })


				this.titleService.setTitle('Provide Describe yourself - Kalyanamalai');

				$("#DescribeyourselfText").on("keyup change", function(e) {
				    $('#typeDescribeCount').html($('#DescribeyourselfText').val().length);
				    
				})
				$("#MyExpectationText").on("keyup change", function(e) {
				    $('#typeExpectationCount').html($('#MyExpectationText').val().length);
				    
				})
				$('.form-control').on('focus blur change', function(e) {
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


				$('input').on('focusin', function() {
					$(this).parent().find('label').addClass('active');
				});

				$('input').on('focusout', function() {
					if (!this.value) {
						$(this).parent().find('label').removeClass('active');
					}
				});

				// Describe yourself in a few words
				$('.YourselfContent').on('click', function() {
					if ($(this).hasClass('present') == true) {
						$(this).removeClass('present');
						$('#YourselfContent').hide();
					} else {
						$(this).addClass('present');
						$('#YourselfContent').show();
					}
				});

				//  Choose yourself content
				$('input[name="Describeyourself"]:radio').change(function() {
					$('.YourselfContent').removeClass('present');
					$('#YourselfContent').hide();
					$('#DescribeyourselfText').val($('.Describeyourself' + this.value).html());
					$('#typeDescribeCount').html($('.Describeyourself' + this.value).html().length);
					$('.your_1').addClass('focused');
					$("#DescribeyourselfText").focus();
				});

				

				// My Expectation about life partner
				$('.MyExpectationContent').on('click', function() {
					if ($(this).hasClass('present') == true) {
						$(this).removeClass('present');
						$('#MyExpectationContent').hide();
					} else {
						$(this).addClass('present');
						$('#MyExpectationContent').show();
					}
				});

				//  Choose My Expectation content
				$('input[name="MyExpectation"]:radio').change(function() {
					$('.MyExpectationContent').removeClass('present');
					$('#MyExpectationContent').hide();
					$('#MyExpectationText').val($('.MyExpectation' + this.value).html());
					$('#typeExpectationCount').html($('.MyExpectation' + this.value).html().length);
					$('.your_2').addClass('focused');
					$("#MyExpectationText").focus();
				});     
	        }
	        else
	        {
	            this.router.navigate(['/logout']);    
	        }
	    });
        
  	

  }

}
