import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserGlobalService } from '../../services/user.global';
import { NotificationService } from '../../services/notification.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery'
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-edit-describe-yourself',
  templateUrl: './edit-describe-yourself.component.html',
  styleUrls: ['./edit-describe-yourself.component.css']
})
export class EditDescribeYourselfComponent implements OnInit {
	dropdownList: any = [];
	isEdit: any = [];
    selectedItems: any = [];
    isAboutMyself: any = [];
    isExpAbtLifePartner: any = [];
    dropdownSettings: any = [];

	editDescribeYourselfForm: FormGroup;
	disableBtn = false;
	SubmitbuttonName: string;
	isSubmitTrigger:boolean = true;
	isLoading:boolean = false;
	value: any = [];

	isDescribeCount:number = 0;;
	isMyExpectationCount:number = 0;

	pageSetUp  	:any;
    regno 		:any;
	
  	constructor(private formBuilder: FormBuilder, private userservice: UserService,private userglobalservice: UserGlobalService, 
  		private notifyService: NotificationService, private router: Router, private titleService: Title, private dbService: NgxIndexedDBService) {
		this.editDescribeYourselfForm = this.formBuilder.group({
			DescribeyourselfText: '',
			MyExpectationText: '',
			JSHSHS : ''
		});
		this.SubmitbuttonName = 'Update';
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
        	this.pageSetUp   = localStorage.getItem("pageSetUp");
        	if(this.pageSetUp!='undefined' && this.pageSetUp != null)
	        {
	        	this.SubmitbuttonName = "Loading...";
				this.disableBtn = true;
				const result = Object.assign({}, this.editDescribeYourselfForm.value);
				//console.table($('#DescribeyourselfText').val());
				//console.table($('#MyExpectationText').val());
				if ($('#MyExpectationText').val() && $('#DescribeyourselfText').val()) 
				{
					if(this.isSubmitTrigger)
					{
						const user_save_info = {
							RegNo: this.regno,
							AboutMyself: $('#DescribeyourselfText').val(),
							ExpectationAboutLifePartner: $('#MyExpectationText').val()
						};

						this.userservice.getData(user_save_info, "WebProfileUpdate/AboutMySelf", "POST").subscribe((response: any) => {
						this.isLoading = true;
							try 
							{
								if (response.status == 1) 
								{
									this.isLoading = false;
									this.notifyService.showSuccess(response.message, "Updated");
									this.router.navigate(['user/profile']);
								} 
								else 
								{
									this.SubmitbuttonName= 'Update';
									this.isLoading = false;
									this.notifyService.showError(response.message, "Error")
									this.disableBtn = false;
								}
							} 
							catch (err) 
							{
								this.SubmitbuttonName= 'Update';
								this.isLoading = false;
								this.disableBtn = false;
								this.notifyService.showError("Internal Server Error", "Error")
							}
						}, (err) => 
						{
							this.SubmitbuttonName= 'Update';
							this.isLoading = false;
							this.disableBtn = false;
							this.notifyService.showError("Internal Server Error", "Error")
						});
					}
				} 
				else 
				{
					this.SubmitbuttonName = 'Update';
					this.disableBtn = false;
					this.isLoading = false;
					this.notifyService.showWarning("Please enter required fields", "Warning");
				}
			}
			else
			{
				this.router.navigate(['/logout']);    
			}
  		});
	};


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

	            this.isLoading = true;
			  	this.userservice. getData({RegNo: this.regno}, "WebMyProfile/GetAboutMySelf", "POST").subscribe((response: any) => 
			  	{
					const res = response.data[0];
					this.isEdit = res;
					this.isLoading = false;

					if(this.isEdit['AboutMyself'].length)
			        {
			            this.isAboutMyself = true;
			            $('.form-control').trigger("blur");
			        }
			        if(this.isEdit['ExpectationAboutLifePartner'].length)
			        {
			            this.isExpAbtLifePartner = true;
			            $('.form-control').trigger("blur");
			        }
			  	})

			  	this.userservice. getData('', "IdValues/GetEditProfile", "POST").subscribe((response: any) => {
					const res  = response.dropdownlist;
					this.dropdownList = res.filter(data => data.type == 'Star').sort((a, b) => (a.name > b.name) ? 1 : -1);
					this.dropdownList = this.userglobalservice.selectBox(this.dropdownList);
				})

				this.selectedItems = [];
				this.dropdownSettings = { 
				          singleSelection: true, 
				          text:"Select Countries",
				          selectAllText:'Select All',
				          unSelectAllText:'UnSelect All',
				          enableSearchFilter: true,
				          classes:"myclass custom-class",
				        };  

				this.titleService.setTitle('Edit Describe yourself - Kalyanamalai');

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

				// $(document).on('focus blur change', '.form-control', function(e) 
				// {
				// 	var $currEl = $(this);
				// 	if ($currEl.is('select')) {
				// 		if ($currEl.val() === $("option:first", $currEl).val()) {
				// 			$('.control-label', $currEl.parent()).animate({ opacity: 0 }, 240);
				// 			$currEl.parent().removeClass('focused');
				// 		} else {
				// 			$('.control-label', $currEl.parent()).css({ opacity: 1 });
				// 			$currEl.parents('.form-group').toggleClass('focused', 
				// 				((e.type === 'focus' || this.value.length > 0) && ($currEl.val() !== $("option:first", $currEl).val())));
				// 		}
				// 	} else {
				// 		$currEl.parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
				// 	}
				// }).trigger('blur');

				// $(document).on('focusin', 'input', function() {
				// 	$(this).parent().find('label').addClass('active');
				// });

				// $(document).on('focusout', 'input', function() {
				// 	if (!this.value) {
				// 		$(this).parent().find('label').removeClass('active');
				// 	}
				// });

				// // Describe yourself in a few words
				// $(document).on('click', '.YourselfContent', function() {
				// 	if ($(this).hasClass('present') == true) {
				// 		$(this).removeClass('present');
				// 		$('#YourselfContent').hide();
				// 	} else {
				// 		$(this).addClass('present');
				// 		$('#YourselfContent').show();
				// 	}
				// });

				// //  Choose yourself content
				// $(document).change('input[name="Describeyourself"]:radio', function() {
				// 	$('.YourselfContent').removeClass('present');
				// 	$('#YourselfContent').hide();
				// 	$('#DescribeyourselfText').val($('.Describeyourself' + this.value).html());
				// 	$('.your_1').addClass('focused');
				// 	$("#DescribeyourselfText").focus();
				// });

			

				// // My Expectation about life partner
				// $(document).on('click', '.MyExpectationContent', function() {
				// 	if ($(this).hasClass('present') == true) {
				// 		$(this).removeClass('present');
				// 		$('#MyExpectationContent').hide();
				// 	} else {
				// 		$(this).addClass('present');
				// 		$('#MyExpectationContent').show();
				// 	}
				// });

				// $('input[name="MyExpectation"]:radio').change(function() {
				// 	$('.MyExpectationContent').removeClass('present');
				// 	$('#MyExpectationContent').hide();
				// 	$('#MyExpectationText').val($('.MyExpectation' + this.value).html());
				// 	$('.your_2').addClass('focused');
				// 	$("#MyExpectationText").focus();
				// });
	        }
	        else
	        {
	            this.router.navigate(['/logout']);    
	        }
  		});  	
    }
}
