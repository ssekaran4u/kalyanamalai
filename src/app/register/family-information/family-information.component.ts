import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { ToastrService } from 'ngx-toastr';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import * as $ from 'jquery' 
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-family-information',
  templateUrl: './family-information.component.html',
  styleUrls: ['./family-information.component.css']
})
export class FamilyInformationComponent implements OnInit 
{
	isLoading:boolean = false;
	form_message :boolean = true;
	family_info_Register: FormGroup;
	disableBtn:boolean = false;
	SubmitbuttonName: string;
	familyValues :any = [];
	familyStatus :any = [];
	pageSetUp :any;
  	regno     :any;

	constructor(private dbService: NgxIndexedDBService,private formBuilder: FormBuilder, private userservice: UserService, private notifyService : NotificationService, private router: Router, private titleService: Title)
  	{
	  this.family_info_Register = this.formBuilder.group({
		father_name: '',
		father_profession:'',
		mother_name: '',
		mother_profession:'',
		single_brother: '',
		married_brother:'',
		single_sister:'',
		married_sister:'',
		Family_ValueList:'',
		Family_StatusList :'',
	  });

	this.SubmitbuttonName = 'Continue';
  }

  numberOnly(event): boolean 
  {
	  const charCode = (event.which) ? event.which : event.keyCode;
	  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	  }
	  return true;
  }

  formGroup;
	onSubmit() 
	{
		this.dbService.getByKey('setup', 1).subscribe((userData) => 
    { 
        localStorage.setItem('pageSetUp',JSON.stringify(userData));
        this.pageSetUp   = localStorage.getItem("pageSetUp");
        if(this.pageSetUp!='undefined' && this.pageSetUp != null)
        {
            this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
            this.regno     = this.pageSetUp["INkmSet_id"];

            this.SubmitbuttonName = "Loading...";
			this.disableBtn = true;
			const form_result = Object.assign({}, this.family_info_Register.value);
			// console.log(form_result);
			if(form_result.father_name && form_result.father_profession && form_result.mother_name && form_result.mother_profession && form_result.Family_ValueList && form_result.Family_StatusList)
			{
				const user_save_info = {
					RegNo: this.regno,
					FatherName: form_result.father_name,
					MotherName: form_result.mother_name,
					FatherProfession: form_result.father_profession,
					MotherProfession: form_result.mother_profession,
					FamilyValue: form_result.Family_ValueList,
					FamilyStatus: form_result.Family_StatusList,
					SistersMarried: form_result.married_brother,
					SistersUnmarried: form_result.single_brother,
					BrothersMarried: form_result.married_sister,
					BrothersUnmarried: form_result.single_sister,
					RegistrationStages:3,
				};
				 // console.log(user_save_info);
				this.userservice.getData(user_save_info, "Registration/SaveUserInfo", "POST").subscribe((response: any) => {
					this.isLoading = true;
					try {
						if (response.status == 1) 
						{
							this.isLoading = false;
							this.notifyService.showSuccess(response.message, "Great...!");
							this.router.navigate(['/register/lifestyle-information']);
						} 
						else 
						{
							this.isLoading = false;
							this.notifyService.showError(response.message, "")
							this.disableBtn = false;
						}
					} 
					catch (err) 
					{
						this.isLoading = false;
						this.notifyService.showInfo("Something went wrong. Try again", "")
						// this.notifyService.showError("Internal Server Error", "Error")
					}
				}, (err) => 
				{
					this.isLoading = false;
					this.notifyService.showInfo("Something went wrong. Try again", "")
					// this.notifyService.showError("Internal Server Error", "Error")
				});
			}
			else
			{
				this.SubmitbuttonName= 'Continue';
				this.disableBtn = false;
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
  //       this.pageSetUp   = localStorage.getItem("pageSetUp");
  //       if(this.pageSetUp!='undefined' && this.pageSetUp != null)
  //       {
  //           this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
  //           this.regno     = this.pageSetUp["INkmSet_id"];
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

            this.titleService.setTitle('Provide Family Information - Kalyanamalai');

			this.userservice. getData('', "IdValues/GetEditProfile", "POST").subscribe((response: any) => {
				const res  = response.dropdownlist;
				this.familyValues = res.filter(data => data.type == 'Family Value').sort((a, b) => (a.name > b.name) ? 1 : -1);
				this.familyStatus = res.filter(data => data.type == 'Family Status').sort((a, b) => (a.name > b.name) ? 1 : -1);;
			})

			$(document).on('focus blur change', '.form-control', function(e) 
			//$('.form-control').on('focus blur change', function(e) 
			{
				var $currEl = $(this);
				if ($currEl.is('select')) 
				{
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
			$(document).on('click', '.input', function() {
				if (!this.value) {
					$(this).parent().find('label').removeClass('active');
				}
			});

			 // Family Value
			$(document).on('click', '._Ms_fv', function() {
				$('.Family_ValueList li label').removeClass('active');
				$(this).addClass('active');
			});

			// Family Status
			$(document).on('click', '._Ms_fst', function() {
				$('.Family_StatusList li label').removeClass('active');
				$(this).addClass('active');
			});
        }
        else
        {
            this.router.navigate(['/logout']);    
        }
    });
        

	
  }

}
