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
	selector: 'app-education-and-career-details',
	templateUrl: './education-and-career-details.component.html',
	styleUrls: ['./education-and-career-details.component.css']
})
export class EducationAndCareerDetailsComponent implements OnInit {
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
	EducationAndCareerDetails: FormGroup;
	submitted = false;
	disableBtn = false;
	SubmitbuttonName: string;
	educationLists  :any = [];
	professionLists :any = [];
	currencyLists   :any = [];
	incomeTypes     :any = [];
	isSubmitTrigger:boolean = false;
	isLoading:boolean = false;

	isUnEmployed:boolean = false;

	pageSetUp :any;
  	regno     :any;
	
	constructor(private dbService: NgxIndexedDBService,private formBuilder: FormBuilder, private userservice: UserService,
		private notifyService: NotificationService, private router: Router, private titleService: Title) {
		this.EducationAndCareerDetails = this.formBuilder.group({
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

		this.SubmitbuttonName = 'Continue';
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
		            this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
		            this.regno     = this.pageSetUp["INkmSet_id"];

		            this.SubmitbuttonName = "Loading...";
					this.disableBtn = true;
					const result = Object.assign({}, this.EducationAndCareerDetails.value);
					// console.log(result.selectProfession);
					if (result.selectEducation=='' || result.EducationDetail=='' || result.selectProfession.length==0 || result.ProfessionDetail=='') 
					{
						this.notifyService.showWarning("Please enter required fields", "");
						this.disableBtn = false;
						this.isSubmitTrigger = false;
						this.SubmitbuttonName = 'Continue';
						this.isSubmitTrigger= false;
					}
					else if(this.isUnEmployed==true)
					{
						this.isSubmitTrigger= true;
					}
					else if(this.isUnEmployed==false)
					{
						if (result.EmployedInDetail=='' || result.selectCurrency.length==0 || result.EmployedInIncome=='' || 
							result.Income_TypeList=='' || result.AskAdditional_Income=='') 
						{
							this.notifyService.showWarning("Please enter required fields", "");
							this.disableBtn = false;
							this.isSubmitTrigger = false;
							this.SubmitbuttonName = 'Continue';
						}
						else
						{
							if (result.AskAdditional_Income == 1) 
							{
								if(result.selectAddCurrency.length==0 || result.AddIncome=='' || result.AddIncome_TypeList=='')
								{
									this.notifyService.showWarning("Please enter required fields", "");
									this.disableBtn = false;
									this.isSubmitTrigger = false;
									this.SubmitbuttonName = 'Continue';
								}
								else
								{
									this.disableBtn = false;
									this.isSubmitTrigger = true;		
									this.SubmitbuttonName = 'Continue';
								}
							}
							else
							{
								this.disableBtn = false;
								this.isSubmitTrigger = true;
								this.SubmitbuttonName = 'Continue';
							}
						}
					}

					if(this.isSubmitTrigger==true)
					{
						const user_save_info = {
							RegNo: this.regno,
							RegistrationStages:5,
						};
						if(this.isUnEmployed==true)
						{
							user_save_info['Education']=result.selectEducation[0].id;
							user_save_info['EducationInDetails']=result.EducationDetail;
							user_save_info['Profession']=result.selectProfession[0].id;
							user_save_info['ProfessionInDetails'] = result.ProfessionDetail;
						}
						else
						{
							user_save_info['Education']=result.selectEducation[0].id;
							user_save_info['EducationInDetails']=result.EducationDetail;
							user_save_info['Profession']=result.selectProfession[0].id;
							user_save_info['ProfessionInDetails'] = result.ProfessionDetail;
							user_save_info['EmployedIn'] = result.EmployedInDetail;
							user_save_info['IncomeCurrency'] = result.selectCurrency[0].id;
							user_save_info['Income'] = result.EmployedInIncome;
							user_save_info['IncomeType']=  result.Income_TypeList;
							if (result.AskAdditional_Income == 1) 
							{
								user_save_info['AdditionalIncome']=result.AddIncome;
								user_save_info['AdditionalIncomeCurrency']=result.selectAddCurrency[0].id;
								user_save_info['AdditionalIncomeType']=result.AddIncome_TypeList;
							}
						}
						//console.log(user_save_info);
						this.SubmitbuttonName = "Loading...";
						this.disableBtn = true;
						this.isLoading = true;
						this.userservice.getData(user_save_info, "Registration/SaveUserInfo", "POST").subscribe((response: any) => 
						{
							try 
							{
								if (response.status == 1) 
								{
									this.notifyService.showSuccess(response.message, "Great...!");
									this.router.navigate(['/register/communication-address']);
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
								// this.notifyService.showError("Internal Server Error", "Error")
								this.notifyService.showInfo("Something went wrong. Try again", "")
							}
						}, (err) => 
						{
							this.SubmitbuttonName= 'Continue';
							this.isLoading = false;
							this.disableBtn = false;
							// this.notifyService.showError("Internal Server Error", "Error")
							this.notifyService.showInfo("Something went wrong. Try again", "")
						});
					}	
		        }
		        else
		        {
		            this.router.navigate(['/logout']);    
		        }
	    });

		
	};


	goToNextPage(): void {
		this.router.navigate(['/register/communication-address']);
	}

	// isSetDefault()
	//   {
	//     this.dbService.getByKey('setup', 1).subscribe((userData) => 
	//     { 
	//         localStorage.setItem('pageSetUp',JSON.stringify(userData));

	//         this.pageSetUp   = localStorage.getItem("pageSetUp");

	// 	        if(this.pageSetUp!='undefined' && this.pageSetUp != null)
	// 	        {
	// 	            this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
	// 	            this.regno     = this.pageSetUp["INkmSet_id"];
	// 	        }
	// 	        else
	// 	        {
	// 	            this.router.navigate(['/']);    
	// 	        }
	//     });
	//   }

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

	            this.isUnEmployed = false;

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

				this.titleService.setTitle('Provide Education & Career details - Kalyanamalai');

				this.userservice. getData('', "IdValues/GetEditProfile", "POST").subscribe((response: any) => {
			        const res  = response.dropdownlist;
			        this.Education = res.filter(data => data.type == 'Education').sort((a, b) => (a.name > b.name) ? 1 : -1);
			        this.Profession = res.filter(data => data.type == 'Profession').sort((a, b) => (a.name > b.name) ? 1 : -1);
			        this.Currency = res.filter(data => data.type == 'Currency');
			        this.AddCurrency = res.filter(data => data.type == 'Currency');
			        //console.log(this.Education);
			        //this.educationLists = res.filter(data => data.type == 'Education').sort((a, b) => (a.id > b.id) ? 1 : -1);
			        //this.professionLists = res.filter(data => data.type == 'Profession').sort((a, b) => (a.id > b.id) ? 1 : -1);
			       // this.currencyLists = res.filter(data => data.type == 'Currency').sort((a, b) => (a.id > b.id) ? 1 : -1);
			    })

			    this.userservice. getData('', "IdValues/GetProfessionValues", "POST").subscribe((response: any) => {
			        const res_  = response.dropdownlist;
			        this.incomeTypes = res_.filter(data => data.type == 'IncomeType').sort((a, b) => (a.id > b.id) ? 1 : -1);
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