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
  selector: 'app-edit-family-information',
  templateUrl: './edit-family-information.component.html',
  styleUrls: ['./edit-family-information.component.css']
})
export class EditFamilyInformationComponent implements OnInit {
	isLoading:boolean = false;
	form_message = true;
	editFamilyInformationForm: FormGroup;
	disableBtn = false;
	SubmitbuttonName: string;
	familyValues: any = [];
	familyStatus: any = [];

	isEdit : any = [];
	SelectedfamilyValue:any;
	SelectedfamilyStatus:any;
	
	isfathername:  boolean = false;
	ismotherrname: boolean = false;
	isfatherProf:  boolean = false;
	ismotherrProf: boolean = false;
	isSisMarried:  boolean = false;
	isSisUnmarried:boolean = false;
	isBroMarried:  boolean = false;
	isBroUnmarried:boolean = false;

	pageSetUp  	:any;
    regno 		:any;

	constructor(private dbService: NgxIndexedDBService, private formBuilder: FormBuilder, private userservice: UserService, 
		private notifyService : NotificationService, private router: Router, private titleService: Title)
  	{
	  this.editFamilyInformationForm = this.formBuilder.group({
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

	this.SubmitbuttonName = 'Upadte';
  }

	numberOnly(event): boolean 
	{
		const charCode = (event.which) ? event.which : event.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57)) 
		{
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
				const form_result = Object.assign({}, this.editFamilyInformationForm.value);
				 // console.log(form_result);
				if(form_result.father_name && form_result.father_profession && form_result.mother_name && form_result.mother_profession && form_result.Family_ValueList && form_result.Family_StatusList)
				{
					const user_save_info = {
						RegNo 				: this.regno,
						FatherName 			: form_result.father_name,
						MotherName 			: form_result.mother_name,
						FatherProfession 	: form_result.father_profession,
						MotherProfession 	: form_result.mother_profession,
						FamilyValue 		: form_result.Family_ValueList,
						FamilyStatus 		: form_result.Family_StatusList,
						SistersMarried 		: form_result.married_brother,
						SistersUnmarried	: form_result.single_brother,
						BrothersMarried 	: form_result.married_sister,
						BrothersUnmarried	: form_result.single_sister,
					};
					// console.log(form_result);
					this.userservice.getData(user_save_info, "WebProfileUpdate/FamilyDetails", "POST").subscribe((response: any) => {
						this.isLoading = true;
						try {
							if (response.status == 1) 
							{
								this.isLoading = false;
								this.notifyService.showSuccess(response.message, "Updated");
								this.router.navigate(['user/profile']);
								
							} 
							else 
							{
								this.isLoading = false;
								this.notifyService.showError(response.message, "Error")
								this.disableBtn = false;
								this.SubmitbuttonName = 'Update';
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
					this.SubmitbuttonName= 'Upadte';
					this.disableBtn = false;
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

				this.titleService.setTitle('Edit Family Information - Kalyanamalai');
				this.isLoading = true;
				this.userservice. getData({RegNo: this.regno}, "WebMyProfile/GetFamilyDetails", "POST").subscribe((response: any) => {
					const res = response.data[0];
			      	this.isEdit = res;
			      	this.isLoading = false;
			      	this.editFamilyInformationForm.setValue(
				 		{
							father_name			: this.isEdit.FatherName,
							father_profession	: this.isEdit.MotherName,
							mother_name			: this.isEdit.FatherProfession,
							mother_profession	: this.isEdit.MotherProfession,
							single_brother		: this.isEdit.BrothersUnmarried,
							married_brother		: this.isEdit.BrothersMarried,
							single_sister		: this.isEdit.SistersUnmarried,
							married_sister		: this.isEdit.SistersMarried,
							Family_ValueList	: this.isEdit.FamilyValueSelected,
							Family_StatusList   : this.isEdit.FamilyStatusSelected,
						});
					

			      	if(this.isEdit['FatherName'].length)
			        {
			            this.isfathername = true;
			        }
			        if(this.isEdit['MotherName'].length)
			        {
			            this.ismotherrname = true;
			        }
			        if(this.isEdit['FatherProfession'].length)
			        {
			            this.isfatherProf = true;
			        }
			        if(this.isEdit['MotherProfession'].length)
			        {
			            this.ismotherrProf = true;
			        }
			        if(this.isEdit['SistersMarried'].length)
			        {
			            this.isSisMarried = true;
			        }
			        if(this.isEdit['SistersUnmarried'].length)
			        {
			            this.isSisUnmarried = true;
			        }
			        if(this.isEdit['BrothersMarried'].length)
			        {
			            this.isBroMarried = true;
			        }
			        if(this.isEdit['BrothersUnmarried'].length)
			        {
			            this.isBroUnmarried = true;
			        }

			        this.SelectedfamilyValue  = this.isEdit.FamilyValueSelected;
			        this.SelectedfamilyStatus = this.isEdit.FamilyStatusSelected;

			        this.familyValues = res.FamilyValue.sort((a, b) => (a.name > b.name) ? 1 : -1);
					this.familyStatus = res.FamilyStatus.sort((a, b) => (a.name > b.name) ? 1 : -1);
				})

				//$('.form-control').on('focus blur change', function(e) {
				$(document).on('focus blur change', '.form-control', function(e) {
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


				$(document).on('focusin', 'input', function() {
					$(this).parent().find('label').addClass('active');
				});

				$(document).on('focusout', 'input', function() {
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
