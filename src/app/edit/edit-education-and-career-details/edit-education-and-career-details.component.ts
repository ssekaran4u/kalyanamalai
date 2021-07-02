import { Component, OnInit, ElementRef,HostListener, ViewChild,ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery'
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-edit-education-and-career-details',
  templateUrl: './edit-education-and-career-details.component.html',
  styleUrls: ['./edit-education-and-career-details.component.css']
})
export class EditEducationAndCareerDetailsComponent implements OnInit {
	isEdit 			   : any = [];
	isEduDetail 	   : boolean = false;
	isProDetail 	   : boolean = false;
	isEmpDetail 	   : boolean = false;
	isInIncome 	       : boolean = false;
	isAdiInIncome 	   : boolean = false;
	isAdditionalIncome : boolean = false;
	isUnEmployed 	   : boolean = false;

	IncomeTypeSelected:any ;
	Additional_Income_YesorNo:any;
	AdditionalIncomeTypeSelected:any ; 
	YesorNo:any=[];

	Education = [];
  	selectedEducationItems = [];
  	EducationSettings: IDropdownSettings = {};
  	isEducation:boolean = false;

  	Profession = [];
  	selectedProfessionItems = [];
  	ProfessionSettings: IDropdownSettings = {};
  	isProfession:boolean = false;

  	Currency = [];
  	selectedCurrencyItems = [];
  	CurrencySettings: IDropdownSettings = {};
  	isCurrency:boolean = false;

  	AddCurrency = [];
  	selectedAddCurrencyItems = [];
  	AddCurrencySettings: IDropdownSettings = {};
  	isAddCurrency:boolean = false;

	form_message = true;
	editEducationAndCareerDetailsForm: FormGroup;
	submitted = false;
	disableBtn = false;
	SubmitbuttonName: string;
	// educationLists = [];
	// professionLists = [];
	// currencyLists = [];
	incomeTypes :any = [];
	isSubmitTrigger:boolean = false;
	isLoading:boolean = false;

	pageSetUp  	:any;
    regno 		:any;
	
	constructor(private formBuilder: FormBuilder, private userservice: UserService,
		private notifyService: NotificationService, private router: Router, private titleService: Title,private dbService: NgxIndexedDBService) {
		this.editEducationAndCareerDetailsForm = this.formBuilder.group({
			selectEducation: '',
			EducationDetail: '',
			selectProfession: '',
			ProfessionDetail: '',
			EmployedInDetail: '',
			selectCurrency: '',
			EmployedInIncome: '',
			Income_TypeList: '',
			AskAdditional_Income: '',
			selectAddCurrency: '',
			AddIncome: '',
			AddIncome_TypeList: '',
		});

		this.SubmitbuttonName = 'Upadte';
	}

	//Education
    onItemSelectEducation(item: any) 
        {
            if(this.selectedEducationItems)
            {
                if(item.id)
                {
                    this.isEducation = true;
                }
            }
            else
            {
                this.isEducation = false;
            }
        }

    OnItemDeSelectEducation(item:any)
        {
            this.isEducation= false;
        }

    onSelectAllEducation(item:any){}

    //Profession
    onItemSelectProfession(item: any) 
        {
            if(this.selectedProfessionItems)
            {
                if(item.id)
                {
                    this.isProfession = true;

                    if(item.id==25)
	            	{
	            		this.isUnEmployed = true;
	            	}
	            	else
	            	{
	            		this.isUnEmployed = false;
	            	}
                }
            }
            else
            {
                this.isProfession = false;
            }
        }


    OnItemDeSelectProfession(item:any)
        {
            this.isProfession= false;
        }

    onSelectAllProfession(item:any){}

    //Currency
    onItemSelectCurrency(item: any) 
        {
            if(this.selectedCurrencyItems)
            {
                if(item.id)
                {
                    this.isCurrency = true;
                }
            }
            else
            {
                this.isCurrency = false;
            }
        }

    OnItemDeSelectCurrency(item:any)
        {
            this.isCurrency= false;
        }

    onSelectAllCurrency(item:any){}

    //AddCurrency
    onItemSelectAddCurrency(item: any) 
        {
            if(this.selectedAddCurrencyItems)
            {
                if(item.id)
                {
                    this.isAddCurrency = true;
                }
            }
            else
            {
                this.isAddCurrency = false;
            }
        }

    OnItemDeSelectAddCurrency(item:any)
        {
            this.isAddCurrency= false;
        }

    onSelectAllAddCurrency(item:any){}

	numberOnly(event): boolean {
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
	        	this.SubmitbuttonName = "Loading...";
				this.disableBtn = true;
				const result = Object.assign({}, this.editEducationAndCareerDetailsForm.value);
			    //console.table(result);

				if (result.selectEducation && result.EducationDetail && result.selectProfession.length!=0 && result.ProfessionDetail) 
				{
					if (result.EmployedInDetail=='' || result.selectCurrency.length==0 || result.EmployedInIncome=='' || result.Income_TypeList=='' || result.AskAdditional_Income=='' ) 
					{
						this.notifyService.showWarning("Please enter required fields", "Warning");
						this.disableBtn = false;
						this.isSubmitTrigger = false;
						this.SubmitbuttonName = 'Continue';
						this.isSubmitTrigger= false;
					}
					else if(this.isUnEmployed==true)
					{
						this.isSubmitTrigger= true;
					}
					// if(this.isUnEmployed==true)
					// 	{
					// 		user_update_info['Education']=result.selectEducation[0].id;
					// 		user_update_info['EducationInDetails']=result.EducationDetail;
					// 		user_update_info['Profession']=result.selectProfession[0].id;
					// 		user_update_info['ProfessionInDetails'] = result.ProfessionDetail;
					// 	}
					if (result.AskAdditional_Income == 226) 
					{
						if(result.selectAddCurrency=='' || result.AddIncome=='' || result.AddIncome_TypeList=='')
						{
							this.notifyService.showWarning("Please enter required fields", "Warning");
							this.disableBtn = false;
							this.isSubmitTrigger = false;
							this.SubmitbuttonName = 'Upadte';
						}
						else
						{
							this.disableBtn = true;
							this.isSubmitTrigger = true;		
						}
					}
					else
					{
						this.disableBtn = true;
						this.isSubmitTrigger = true;
						this.SubmitbuttonName = 'Upadte';
					}

					if(this.isSubmitTrigger)
					{
						const user_update_info = 
						{
							RegNo: this.regno
						};
						if(this.isUnEmployed==true)
						{
							user_update_info['Education']=result.selectEducation[0].id;
							user_update_info['EducationInDetails']=result.EducationDetail;
							user_update_info['Profession']=result.selectProfession[0].id;
							user_update_info['ProfessionInDetails'] = result.ProfessionDetail;
						}
						else
						{
							user_update_info['Education']=result.selectEducation[0].id;
							user_update_info['EducationInDetails']=result.EducationDetail;
							user_update_info['Profession']=result.selectProfession[0].id;
							user_update_info['ProfessionInDetails'] = result.ProfessionDetail;
							user_update_info['EmployedIn'] = result.EmployedInDetail;
							user_update_info['IncomeCurrency'] = result.selectCurrency[0].id;
							user_update_info['Income'] = result.EmployedInIncome;
							user_update_info['IncomeType']=  result.Income_TypeList;

							if (result.AskAdditional_Income == 226) 
							{
								user_update_info['AdditionalIncome']=result.AddIncome;
								user_update_info['AdditionalIncomeCurrency']=result.selectAddCurrency[0].id;
								user_update_info['AdditionalIncomeType']=result.AddIncome_TypeList;
							}
						}
						// const user_update_info = {
						// 	RegNo: localStorage.getItem('INkmSet_us'),
						// 	Education:result.selectEducation[0].id,
						// 	EducationInDetails: result.EducationDetail,
						// 	Profession:result.selectProfession[0].id,
						// 	ProfessionInDetails: result.ProfessionDetail,
						// 	EmployedIn: result.EmployedInDetail,
						// 	IncomeCurrency:result.selectCurrency[0].id,
						// 	IncomeType: result.Income_TypeList,
						// 	Income: result.EmployedInIncome,
						// };

						// if (result.AskAdditional_Income == 1) 
						// {
						// 	user_update_info['AdditionalIncome']=result.AddIncome;
						// 	user_update_info['AdditionalIncomeCurrency']=result.selectAddCurrency[0].id;
						// 	user_update_info['AdditionalIncomeType']=result.AddIncome_TypeList;
						// }
						// else
						// {
						// 	user_update_info['AdditionalIncome']='';
						// 	user_update_info['AdditionalIncomeCurrency']='';
						// 	user_update_info['AdditionalIncomeType']='';
						// }
						this.userservice.getData(user_update_info, "WebProfileUpdate/EducationProfess", "POST").subscribe((response: any) => {
							this.isLoading = true;
							try {
								if (response.status == 1) 
								{
									// this.disableBtn = false;
									this.isLoading = false;
									this.notifyService.showSuccess(response.message, "Updated");
									this.router.navigate(['user/profile']);
								} 
								else 
								{
									this.SubmitbuttonName= 'Upadte';
									this.isLoading = false;
									this.notifyService.showError(response.message, "Error")
									this.disableBtn = false;
								}
							} 
							catch (err) 
							{
								this.SubmitbuttonName= 'Upadte';
								this.isLoading = false;
								this.disableBtn = false;
								this.notifyService.showError("Internal Server Error", "Error")
							}
						}, (err) => 
						{
							this.SubmitbuttonName= 'Upadte';
							this.isLoading = false;
							this.disableBtn = false;
							this.notifyService.showError("Internal Server Error", "Error")
						});
					}
				} 
				else 
				{
					this.SubmitbuttonName = 'Upadte';
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

	AdditiIncomeclick(ai: any)
	{

		let aiYesorNoid = ai.getAttribute('data-aiYesorNo-id');
		// alert(csYesorNoid);

		$('.AskAdditional_Income li label').removeClass('active');
		$('#AddiIncomID'+aiYesorNoid).addClass('active');

		$('._Ms_inty_add').removeClass('active');
		$("#selectAddCurrency").val($("#selectAddCurrency option:first").val());
		$('#AddIncome').val("");
		$('.selectAddCurrency').removeClass('focused');
		$('.AdditionalIncomeAmount').removeClass('focused');
		$('#AdditionalIncomeAmount').removeClass('active');

			if (aiYesorNoid == 226) 
			{
				$('#AdditionalIncome').removeClass('hide');
				$('#AdditionalIncome').addClass('show');
			} 
			else 
			{
				$('#AdditionalIncome').removeClass('show');
				$('#AdditionalIncome').addClass('hide');
			}
			
	}


	goToNextPage(): void {
		this.router.navigate(['/edit/edit-communication-address']);
	}

	// isSetDefault()
	// {
	// 	this.dbService.getByKey('setup', 1).subscribe((userData) => 
	// 	{ 
 //        	localStorage.setItem('pageSetUp',JSON.stringify(userData));
 //  		});
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

	            this.selectedEducationItems = [];
			    this.EducationSettings ={
			      	singleSelection: true,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 5,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    this.selectedProfessionItems = [];
			    this.ProfessionSettings ={
			      	singleSelection: true,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 5,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    this.selectedCurrencyItems = [];
			    this.CurrencySettings ={
			      	singleSelection: true,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 5,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    this.selectedAddCurrencyItems = [];
			    this.AddCurrencySettings ={
			      	singleSelection: true,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 5,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

				this.titleService.setTitle('Edit Education & Career details - Kalyanamalai');

				this.isLoading = true;
				this.userservice. getData({RegNo: this.regno}, "WebMyProfile/GetEducationProfession", "POST").subscribe((response: any) => {
			        const res = response.data[0];
		      		this.isEdit = res;
		      		this.isLoading = false;

		      		this.editEducationAndCareerDetailsForm.setValue(
			 		{
						selectEducation 		: '',
						EducationDetail 		: this.isEdit.EducationInDetails,
						selectProfession 		: '',
						ProfessionDetail 		: this.isEdit.ProfessionInDetails,
						EmployedInDetail 		: this.isEdit.EmployedIn,
						selectCurrency 			: '',
						EmployedInIncome 		: this.isEdit.Income,
						Income_TypeList 		: this.isEdit.IncomeTypeSelected,
						AskAdditional_Income 	: this.isEdit.AdditionalIncomeTypeSelected,
						selectAddCurrency 		: '',
						AddIncome 				: this.isEdit.AdditionalIncome,
						AddIncome_TypeList 		: this.isEdit.AdditionalIncomeTypeSelected,
					});

			        this.selectedEducationItems   		= res.EducationSelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
			        this.selectedProfessionItems  		= res.ProfessionSelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
			        this.selectedCurrencyItems    		= res.IncomeCurrencySelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
			        this.selectedAddCurrencyItems 		= res.AdditionalIncomeCurrencySelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
			        this.Additional_Income_YesorNo    	= this.isEdit.AdditionalIncomeYesorNo;
			        this.IncomeTypeSelected           	= this.isEdit.IncomeTypeSelected;
			        this.AdditionalIncomeTypeSelected 	= this.isEdit.AdditionalIncomeTypeSelected;

					if(this.isEdit['EducationInDetails'].length)
			        {
			            this.isEduDetail = true;
			        }
			        if(this.isEdit['ProfessionInDetails'].length)
			        {
			            this.isProDetail = true;
			        }
			        if(this.isEdit['EmployedIn'].length)
			        {
			            this.isEmpDetail = true;
			        }
			        if(this.isEdit['Income'].length)
			        {
			            this.isInIncome = true;
			        }
			        if(this.isEdit['AdditionalIncome'].length)
			        {
			            this.isAdiInIncome = true;
			        }
			        if (this.selectedEducationItems.length) 
		            {
		                this.isEducation = true;
		            }
		             if (this.selectedProfessionItems.length) 
		            {
		                this.isProfession = true;
		            }
		             if (this.selectedCurrencyItems.length) 
		            {
		                this.isCurrency = true;
		            }
		            if (this.selectedAddCurrencyItems.length) 
		            {
		                this.isAddCurrency = true;
		            }
		            if(this.Additional_Income_YesorNo==226)
		            {
		            	this.isAdditionalIncome = true;
		            }

			        this.Education   = res.Education.sort((a, b) => (a.name > b.name) ? 1 : -1);
			        this.Profession  = res.Profession.sort((a, b) => (a.name > b.name) ? 1 : -1);
			        this.Currency 	 = res.IncomeCurrency.sort((a, b) => (a.name > b.name) ? 1 : -1);
			        this.AddCurrency = res.IncomeCurrency.sort((a, b) => (a.name > b.name) ? 1 : -1);
			        this.incomeTypes = res.IncomeType.sort((a, b) => (a.name > b.name) ? 1 : -1);
			        this.YesorNo  	 = res.YesorNo.sort((a, b) => (a.name > b.name) ? 1 : -1);

			    })


				$(document).on('focus blur change', '.form-control', function(e) {
					var $currEl = $(this);
					if ($currEl.is('select')) {
						if ($currEl.val() === $("option:first", $currEl).val()) {
							$('.control-label', $currEl.parent()).animate({
								opacity: 0
							}, 240);
							$currEl.parent().removeClass('focused');
						} else {
							$('.control-label', $currEl.parent()).css({
								opacity: 1
							});
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

				// Income Type
				$(document).on('click', '._Ms_inty', function() {
					$('.Income_TypeList li label').removeClass('active');
					$(this).addClass('active');
				});

				// Ask Additional Income
				$(document).on('click', '._Ms_asaddin', function() {
					$('._Ms_asaddin').removeClass('active');
					
					$('._Ms_inty_add').removeClass('active');
					$("#selectAddCurrency").val($("#selectAddCurrency option:first").val());
					$('#AddIncome').val("");
					$('.selectAddCurrency').removeClass('focused');
					$('.AdditionalIncomeAmount').removeClass('focused');
					$('#AdditionalIncomeAmount').removeClass('active');


					if ($(this).data("item") == 1) {
						$('#AdditionalIncome').show();
					} else {
						$('#AdditionalIncome').hide();
					}

					$('.AskAdditional_Income li label').removeClass('active');
					$(this).addClass('active');
				});

				// Additional Income Type
				$(document).on('click', '._Ms_inty_add', function() {
					$('.AddIncome_TypeList li label').removeClass('active');
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