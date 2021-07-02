import { Component, OnInit, ElementRef,HostListener, ViewChild,ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import * as $ from 'jquery' 
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { UserGlobalService } from './../../services/user.global';
import { NotificationService } from './../../services/notification.service';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { componentFactoryName } from '@angular/compiler';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-edit-personal-details',
  templateUrl: './edit-personal-details.component.html',
  styleUrls: ['./edit-personal-details.component.css']
})
export class EditPersonalDetailsComponent implements OnInit {

	YesorNo : any = [];
	MaritalStatus : any = [];
	SelectedMaritalStatus : any = [];
	status: boolean = false;
	Divorce:any;
	Marriage_not_Consumated:any;
	Widow_Widower:any;
	HaveChildren:any;
	Stay_With_Me:any;
	HaveChildrenSelected:any;
	StayWithMeSelected:any;
	doshamselected:any;

	isDivorceCopyno: boolean   = false;
    isDivorceeDate: boolean    = false;
    isNoofMaleChild: boolean   = false;
    isNoofFemaleChild: boolean = false;


	isUnmarried:boolean =false;
	isDivorce:boolean =false;
	isMarriage_not_Consumated:boolean = false;
	isWidow_Widower:boolean = false;
	isStayWithMe:boolean =false;
	isHaveChildren:boolean =false;

	isEdit : any = [];
	myDateValue :string ="";

	communities = [];
  	selectedcommunitiesItems = [];
  	communitiesSettings: IDropdownSettings = {};
  	isCommunity:boolean = false;

  	MotherTongue = [];
  	selectedMotherTongueItems = [];
  	MotherTongueSettings: IDropdownSettings = {};
  	isMotherTongue:boolean = false;

  	religions = [];
  	selectedreligionsItems = [];
  	religionsSettings: IDropdownSettings = {};
  	isReligion:boolean = false;

  	castes = [];
  	selectedcastesItems = [];
  	castesSettings: IDropdownSettings = {};
  	isCastes:boolean = false;

  	subcastes = [];
  	selectedsubcastesItems = [];
  	subcastesSettings: IDropdownSettings = {};
  	isSubCastes:boolean = false;

  	stars = [];
  	selectedstarsItems = [];
  	starsSettings: IDropdownSettings = {};
  	isStar:boolean = false;

  	Padam = [];
  	selectedPadamItems = [];
  	PadamSettings: IDropdownSettings = {};
  	isPadam:boolean = false;
  	
	gowthram = [];
  	selectedgowthramItems = [];
  	gowthramSettings: IDropdownSettings = {};
  	isGowthram:boolean = false;

  	doshams = [];
  	selecteddoshamItems = [];
  	doshamSettings: IDropdownSettings = {};
  	isDosham:boolean = false;

  	isName:boolean = false;
  	isDOB:boolean = false;
  	isMail:boolean = false;
  	isDivorceCopyNo:boolean = false;
  	

	@ViewChild(BsDatepickerDirective, { static: false }) datepicker: BsDatepickerDirective;
	@HostListener('window:scroll')
  	onScrollEvent() {
		this.datepicker.hide();
  	}

  	minDate: Date;
  	maxDate: Date;

	isLoading:boolean = false;
	isDobFocused:boolean = false;
	isDivorceFocused:boolean = false;
	isSubmitTrigger:boolean = false;
	editPersonaldetailsForm: FormGroup;

	dobObject:string = '';
	divorceObject:string = '';

	submitted = false;
	disableBtn = false;
	SubmitbuttonName: string;

	pageSetUp  	:any;
    regno 		:any;


	constructor(private dbService: NgxIndexedDBService, private UserGlobalService:UserGlobalService, private cdr: ChangeDetectorRef, private formBuilder: FormBuilder, 
		private router: Router, private titleService: Title, private userservice: UserService,private notifyService : NotificationService,
		 private elRef: ElementRef) 
	{
		this.SubmitbuttonName = 'Update';
		this.minDate = new Date();
		this.maxDate = new Date();

		this.editPersonaldetailsForm = this.formBuilder.group({
			Name: '',
			Email:'',
			MaritalStatus: '',
			DivorceCopyNo : '',
			DivorceDate : '',
			HaveChildrenS : '',
			ChildrenStay : '',
			NoofMaleChild : '',
			NoofFemaleChild : '',
			dob : '',
			MotherTongue: '',
			selectCommunity : '',
			selectReligion: '',
			selectCaste: '',
			selectSubCaste : '',
			selectStar: '',
			selectGothram: '',
			Dosham : '',
			selectDoshams : '',
		});
	}

	//Mother Tongue
    onItemSelectMotherTongue(item: any) {
	    if(this.selectedMotherTongueItems)
	    {
	    	this.isMotherTongue = true;
	    }
	    else
	    {
	    	this.isMotherTongue = false;
	    }
	}
	OnItemDeSelectMotherTongue(item:any){
        this.isMotherTongue= false;
    }
    onSelectAllMotherTongue(item:any){}

	// Communities
	onItemSelectCommunities(item: any) {
	    if(this.selectedcommunitiesItems)
	    {
	    	if(item.id)
	    	{
	    		this.isCommunity = true;

		    	this.selectedreligionsItems = [];
		    	this.isReligion = false;

		    	this.selectedcastesItems = [];
		    	this.isCastes = false;

		    	this.selectedsubcastesItems = [];
		    	this.isSubCastes = false;

	    		this.userservice.getData({CommunityId:item.id}, "IdValues/GetReligionBasedonCommunity", "POST").subscribe((response: any) => 
				{
					this.isLoading = false;
					try {
						if (response.code == 1) 
						{
							this.religions = response.dropdownlist;
						} 
						else 
						{
							this.notifyService.showWarning("No data found", "Warning");
						}
					} 
					catch (err) 
					{
						this.notifyService.showWarning("Getting error", "Warning");
					}
				})
	    	}
	    }
	    else
	    {
	    	this.isCommunity = false;
	    }
	}

	OnItemDeSelectCommunities(item:any){
        this.isCommunity= false;
        
        this.selectedreligionsItems = [];
		this.isReligion = false;

		this.selectedcastesItems = [];
		this.isCastes = false;

    	this.selectedsubcastesItems = [];
    	this.isSubCastes = false;
    }

    onSelectAllCommunities(item:any){}

    // Religions
    onItemSelectReligions(item: any) {
	    if(this.selectedreligionsItems)
	    {
	    	const form_result = Object.assign({}, this.editPersonaldetailsForm.value);
	    	if(item.id)
	    	{
				this.isReligion = true;
				this.selectedcastesItems = [];
		    	this.isCastes = false;

		    	this.selectedsubcastesItems = [];
		    	this.isSubCastes = false;

	    		this.userservice.getData({ReligionId:item.id,CommunityId:form_result.selectCommunity[0].id}, "IdValues/GetCasteBasedonCommunityReligion", "POST").subscribe((response: any) => 
				{
					this.isLoading = false;
					try {
						if (response.code == 1) 
						{
							const res  = response.dropdownlist;
							this.castes = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
						} 
						else 
						{
							this.notifyService.showWarning("No data found", "Warning");
						}
					} 
					catch (err) 
					{
						this.notifyService.showWarning("Getting error", "Warning");
					}
				})
	    	}
	    }
	    else
	    {
	    	this.isReligion = false;
	    }
	}
	OnItemDeSelectReligions(item:any){
        this.isReligion= false;

        this.selectedcastesItems = [];
    	this.isCastes = false;

    	this.selectedsubcastesItems = [];
    	this.isSubCastes = false;
    }
    onSelectAllReligions(item:any){}

    // Caste
    onItemSelectCastes(item: any) {
	    if(this.selectedcastesItems)
	    {
	    	const form_result = Object.assign({}, this.editPersonaldetailsForm.value);
	    	if(item.id)
	    	{
	    		this.selectedsubcastesItems = [];
    			this.isSubCastes = false;

				this.isCastes = true;
		    	this.userservice.getData({CasteId:item.id, ReligionId:form_result.selectReligion[0].id,CommunityId:form_result.selectCommunity[0].id}, "IdValues/GetSubsectByCasteCommunityReligion", "POST").subscribe((response: any) => 
				{
					this.isLoading = false;
					try {
						if (response.code == 1) 
						{
							const res  = response.dropdownlist;
							this.subcastes = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
						} 
						else 
						{
							this.notifyService.showWarning("No data found", "Warning");
						}
					} 
					catch (err) 
					{
						this.notifyService.showWarning("Getting error", "Warning");
					}
				})
		    }
	    }
	    else
	    {
	    	this.isCastes = false;
	    }
	}
	OnItemDeSelectCastes(item:any){
        this.isCastes= false;

        this.selectedsubcastesItems = [];
    	this.isSubCastes = false;
    }
    onSelectAllCastes(item:any){}

    // Sub Caste
    onItemSelectSubCastes(item: any) {
	    if(this.selectedsubcastesItems)
	    {
	    	this.isSubCastes = true;
	    }
	    else
	    {
	    	this.isSubCastes = false;
	    }
	}
	OnItemDeSelectSubCastes(item:any){
        this.isSubCastes= false;
    }
    onSelectAllSubCastes(item:any){}


    // Star
    onItemSelectStar(item: any) {
	    if(this.selectedstarsItems)
	    {
	    	this.isStar = true;
	    }
	    else
	    {
	    	this.isStar = false;
	    }
	}
	OnItemDeSelectStar(item:any){
        this.isStar= false;
    }

    // Padam
    onItemSelectPadam(item: any) {
	    if(this.selectedPadamItems)
	    {
	    	this.isPadam = true;
	    }
	    else
	    {
	    	this.isPadam = false;
	    }
	}
	OnItemDeSelectPadam(item:any){
        this.isPadam= false;
    }

    // Gowthram
    onItemSelectGowthram(item: any) {
	    if(this.selectedgowthramItems)
	    {
	    	this.isGowthram = true;
	    }
	    else
	    {
	    	this.isGowthram = false;
	    }
	}
	OnItemDeSelectGowthram(item:any){
        this.isGowthram= false;
    }

    // Dosham
    onItemSelectDosham(item: any) {
	    if(this.selectedgowthramItems)
	    {
	    	this.isDosham = true;
	    }
	    else
	    {
	    	this.isDosham = false;
	    }
	}
	OnItemDeSelectDosham(item:any){
        this.isDosham= false;
    }

    clearDosham(item:any){
        this.isDosham= false;
        this.selecteddoshamItems = [];
    }

   	numberOnly(event): boolean {
		const charCode = (event.which) ? event.which : event.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		  return false;
		}
		return true;
	}
	changeDivorceDate(event: any)
	{
		if(event)
		{
			this.divorceObject = this.userservice.convertDate(new Date(event));
			this.isDivorceFocused = true;
		}
	} 

	changeDobDate(event: any) 
	{
	  	if(event)
	  	{
			this.dobObject = this.userservice.convertDate(new Date(event));
			this.isDobFocused = true;
	  	}
	}

	MaritalStatusclick(el: any)
	{
	    let value = el.getAttribute('data-message-id');
	    this.status = !this.status;       
	    
	    $('.MaritalStatus li label').removeClass('active');
	    $('#MaritalID'+value).addClass('active');
	    $('#DivorceCopyNo').val("");
        $('#DivorceDate').val("");
        $('#csla').val("");
        $('#cslfm').val("");
        $('#ChildrenStayData').removeClass('show');
        $('#ChildrenStayData').addClass('hide');
        $("input[name='HaveChildrenS']").removeAttr("checked");
        $("input[name='ChildrenStay']").removeAttr("checked");
        
        $('#DivorceCopy_1').removeClass('focused');
        $('#DivorceCopy_1').parent().find('label').removeClass('active');
        $('#DivorceCopy_2').removeClass('focused');
        $('#DivorceCopy_2').parent().find('label').removeClass('active');

        $('#ChildrenStayData_1').removeClass('focused');
        $('#ChildrenStayData_1').parent().find('label').removeClass('active');
        $('#ChildrenStayData_2').removeClass('focused');
        $('#ChildrenStayData_2').parent().find('label').removeClass('active');

        $('.HaveChildrenS li label').removeClass('active');
        $('.ChildrenStay li label').removeClass('active');

	    if (value == 21) 
	    {	
			$('#DivorceCopy').removeClass('hide');
			$('#DivorceCopy').addClass('show');
			$('#DivorcedData').removeClass('hide');
			$('#DivorcedData').addClass('show');
			$('#HaveChildrenList').addClass('show');
			$('#HaveChildrenList').addClass('hide');
		} 
		else if (value == 22) 
		{
			// Widow / Widower
			$('#DivorcedData').removeClass('hide');
			$('#DivorcedData').addClass('show');
			$('#DivorceCopy').removeClass('show');
			$('#DivorceCopy').addClass('hide');
			$('#HaveChildrenList').addClass('show');
			$('#HaveChildrenData').removeClass('hide');
			$('#ChildrenStayData').removeClass('hide');

		} 
		else if (value == 23) 
		{
			// Marriage not Consumated
			$('#DivorceCopy').removeClass('hide');
			$('#DivorceCopy').addClass('show');
			$('#DivorcedData').removeClass('hide');
			$('#DivorcedData').addClass('show');
			$('#HaveChildrenData').removeClass('show');
			$('#HaveChildrenData').addClass('hide');
			$('#HaveChildrenList').removeClass('show');
			$('#HaveChildrenList').addClass('hide');
		} 
		else 
		{
			$('#DivorceCopy').removeClass('show');
			$('#DivorcedData').removeClass('show');
			$('#HaveChildrenData').removeClass('show');
			$('#ChildrenStayData').removeClass('show');
			$('#HaveChildrenList').removeClass('show');

			$('#DivorceCopy').addClass('hide');
			$('#DivorcedData').addClass('hide');
			$('#HaveChildrenData').addClass('hide');
			$('#ChildrenStayData').addClass('hide');
			$('#HaveChildrenList').addClass('hide');
		}

	}

	HaveChildrenSclick(hc: any)
	{
		
		let hcYesorNoid = hc.getAttribute('data-hcYesorNo-id');
		// alert(hcYesorNoid);
		$('.HaveChildrenS li label').removeClass('active');
		$('#HaveChildrenSID'+hcYesorNoid).addClass('active');
		
		if (hcYesorNoid == 226) 
		{
			$('#HaveChildrenData').removeClass('hide');
			$('#HaveChildrenData').addClass('show');

			$('#ChildrenStayData').removeClass('show');
			$('#ChildrenStayData').addClass('hide');
		} 
		else 
		{
			$('#HaveChildrenData').removeClass('show');
			$('#HaveChildrenData').addClass('hide');
			$('#ChildrenStayData').removeClass('show');
			$('#ChildrenStayData').addClass('hide');
		}
	}

	ChildrenStayclick(cs: any)
	{

		let csYesorNoid = cs.getAttribute('data-csYesorNo-id');

		$('.ChildrenStay li label').removeClass('active');
		$('#ChildrenStayID'+csYesorNoid).addClass('active');
		
		if (csYesorNoid == 226) 
		{
			//alert(csYesorNoid);
			$('#ChildrenStayData').removeClass('hide');
			$('#ChildrenStayData').addClass('show');
		} 
		else 
		{
			$('#ChildrenStayData').removeClass('show');
			$('#ChildrenStayData').addClass('hide');
		}
	}

	DoshamListclick(dl: any)
	{

		let dlYesorNoid = dl.getAttribute('data-dlYesorNo-id');
		// alert(csYesorNoid);

		$('.Dosham_List li label').removeClass('active');
		$('#DoshamListID'+dlYesorNoid).addClass('active');
		
		if (dlYesorNoid == 226) 
		{
			//alert(dlYesorNoid);
			$('#DoshamList').removeClass('hide');
			$('#DoshamList').addClass('show');
		} 
		else 
		{
			$('#DoshamList').removeClass('show');
			$('#DoshamList').addClass('hide');
		}
	}

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

	            const form_result = Object.assign({}, this.editPersonaldetailsForm.value);
				this.SubmitbuttonName = "Loading...";
			    this.disableBtn = true;
			    if(form_result.DivorceDate)
			    {
			   		form_result.DivorceDate = this.divorceObject;
			    }
			    else
			    {
			   		form_result.DivorceDate = '';
			    }
			   // console.log(form_result);//&& form_result.dob
			    if(form_result.MaritalStatus  && form_result.selectCommunity.length!=0 && form_result.selectReligion.length!=0 &&  form_result.selectCaste.length!=0 && form_result.selectSubCaste.length!=0 && form_result.selectStar.length!=0 && form_result.selectGothram.length!=0 && form_result.Dosham.length!=0)
			    {
					if(form_result.MaritalStatus==21)
					{
						if(form_result.DivorceCopyNo=='' || form_result.DivorceDate=='' || form_result.HaveChildrenS=='')
						{
							this.notifyService.showWarning("Please enter required fields", "Warning");
							this.isSubmitTrigger = false;
						}
						else if(form_result.HaveChildrenS)
						{
							if(form_result.HaveChildrenS==226)
							{
								if(form_result.ChildrenStay)
								{
									if(form_result.ChildrenStay==226)
									{
										if(form_result.NoofMaleChild=='' || form_result.NoofFemaleChild=='')
										{
											this.notifyService.showWarning("Please enter required fields", "Warning");
											this.isSubmitTrigger = false;
											this.SubmitbuttonName = 'Update';
											this.disableBtn = false;
										}
										else
										{
											this.isSubmitTrigger = true;
										}
									}
									else
									{
										this.isSubmitTrigger = true;
									}
								}
								else
								{
									this.notifyService.showWarning("Please enter required fields", "Warning");	
									this.isSubmitTrigger = false;
									this.SubmitbuttonName = 'Update';
									this.disableBtn = false;
								}
							}
							else
							{
								this.isSubmitTrigger = true;
							}
						}
						else
						{
							this.isSubmitTrigger = true;
						}
					}
					else if(form_result.MaritalStatus==22)
					{
						if(form_result.HaveChildrenS==226)
						{
							if(form_result.ChildrenStay)
							{
								if(form_result.ChildrenStay==226)
								{
									if(form_result.NoofMaleChild=='' || form_result.NoofFemaleChild=='')
									{
										this.notifyService.showWarning("Please enter required fields", "Warning");
										this.isSubmitTrigger = false;
										this.SubmitbuttonName = 'Update';
										this.disableBtn = false;
									}
									else
									{
										this.isSubmitTrigger = true;
									}
								}
								if(form_result.ChildrenStay==225)
								{
									this.isSubmitTrigger = true;
								}
							}
							else
							{
								this.notifyService.showWarning("Please enter required fields", "Warning");	
								this.isSubmitTrigger = false;
								this.SubmitbuttonName = 'Update';
								this.disableBtn = false;
							}
						}
						else if(form_result.HaveChildrenS==225)
						{
							this.isSubmitTrigger = true;
						}
						else
						{
							this.notifyService.showWarning("Please enter required fields", "Warning");	
							this.isSubmitTrigger = false;
							this.SubmitbuttonName = 'Update';
							this.disableBtn = false;
						}
					}
					else if(form_result.MaritalStatus==23)
					{
						if(form_result.DivorceCopyNo=='' || form_result.DivorceDate=='')
						{
							this.notifyService.showWarning("Please enter required fields", "Warning");
							this.isSubmitTrigger = false;
							this.SubmitbuttonName = 'Update';
							this.disableBtn = false;
						}
						else
						{
							this.isSubmitTrigger = true;
						}
					}
					else
					{
						this.isSubmitTrigger = true;
					}
				}
				else
				{
					this.SubmitbuttonName = 'Update';
					this.notifyService.showWarning("Please enter required fields", "Warning");
					this.disableBtn = false;
					this.isSubmitTrigger = false;
				}

				if(this.isSubmitTrigger)
				{
					const user_save_info = {
						//RegNo: localStorage.getItem('INkmSet_us'),
						RegNo: this.regno,
						//regno = localStorage.getItem("INkmSet_id");
						FirstName : form_result.Name,
						EmailId : form_result.Email,
						MaritalStatus: form_result.MaritalStatus,
						DivorceCopyno: form_result.DivorceCopyNo,
						DivorceeDate: form_result.DivorceDate,
						HaveChildren: form_result.HaveChildrenS,
						StayWithMe:form_result.ChildrenStay,
						NoofMaleChild:form_result.NoofMaleChild,
						NoofFemaleChild:form_result.NoofFemaleChild,
						DateOfBirth: this.dobObject,
						Community:form_result.selectCommunity[0].id,
						Religion:form_result.selectReligion[0].id,
						Caste:form_result.selectCaste[0].id, 
						Subsect:form_result.selectSubCaste[0].id,  
						Star:form_result.selectStar[0].id,  
						Gothram:form_result.selectGothram[0].id,
					};
					
					if(form_result.Dosham==226)
					{
						user_save_info['Dosham'] = this.UserGlobalService.joinMultiSelect(form_result.selectDoshams);
					}
					
					this.userservice.getData(user_save_info, "WebProfileUpdate/PersonalDetail", "POST").subscribe((response: any) => {
						this.isLoading = true;
						console.log(response);
				        try {
				        	if (response.status == 1) 
				        	{
				        		this.isLoading = false;
				        		// this.notifyService.showSuccess(response.message, "Great...!");
				        		this.notifyService.showSuccess(response.message, "Updated");
				        		this.router.navigate(['user/profile']);
				            } 
				            else 
				            {
				            	this.isLoading = false;
				            	this.isSubmitTrigger = false;
								this.SubmitbuttonName = 'Update';
								this.disableBtn = false;
				            	this.notifyService.showError(response.message, "Warning")
				                
				            }
				        } 
				        catch (err) 
				        {
				        	this.isLoading = false;
				        	this.disableBtn = false;
				            this.SubmitbuttonName = 'Update';
				            this.notifyService.showError("Internal Server Error", "Error")
				        }
				    }, (err) => 
				    {
				    	this.isLoading = false;
				    	this.disableBtn = false;
				        this.SubmitbuttonName = 'Update';
				        this.notifyService.showError("Internal Server Error", "Error")
				    });
				}

	        }
	        else
	        {
	            this.router.navigate(['/logout']);    
	        }
  		});

	}

	
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

	            this.selectedcommunitiesItems = [];
			    this.communitiesSettings ={
			      	singleSelection: true,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 5,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    this.selectedreligionsItems = [];
			    this.religionsSettings ={
			      	singleSelection: true,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 5,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    this.selectedcastesItems = [];
			    this.castesSettings ={
			      	singleSelection: true,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 5,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    this.selectedsubcastesItems = [];
			    this.subcastesSettings ={
			      	singleSelection: true,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 5,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    this.selectedstarsItems = [];
			    this.starsSettings ={
			      	singleSelection: true,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 5,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    this.selectedPadamItems = [];
			    this.PadamSettings ={
			      	singleSelection: true,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 5,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };


			    this.selectedgowthramItems = [];
			    this.gowthramSettings ={
			      	singleSelection: true,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 5,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    this.selecteddoshamItems = [];
			    this.doshamSettings ={
			      	singleSelection: false,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 5,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    this.selectedMotherTongueItems = [];
			    this.MotherTongueSettings ={
			      	singleSelection: true,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 5,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };


				this.titleService.setTitle('Edit Personal Details - Kalyanamalai');
				this.isLoading = true;

				this.userservice. getData({RegNo: this.regno}, "WebMyProfile/GetPersonalDetails", "POST").subscribe((response: any) => {
				 	const res  = response.data[0];
				 	this.isEdit = res;
				 	this.isLoading = false;

					if(this.isEdit['Name'].length)
			        {
			            this.isName = true;
			        }
			        if(this.isEdit['dob'].length)
			        {
			            this.isDOB = true;
			        }
			        if(this.isEdit['EmailId'].length)
			        {
			            this.isMail = true;
			        }

			 		if(this.isEdit.MaritalStatusSelected)
			        {
			            this.SelectedMaritalStatus   = this.isEdit['MaritalStatusSelected'];
			        	
			        	this.Divorce 				 = this.isEdit['Divorce'];
						this.Marriage_not_Consumated = this.isEdit['Marriage_not_Consumated'];
						this.Widow_Widower 			 = this.isEdit['Widow_Widower'];
						this.HaveChildren			 = this.isEdit['Have_Children'];
						this.Stay_With_Me			 = this.isEdit['Stay_With_Me'];


							if(this.Divorce==2)
							{
								this.isDivorce = true;
							}
							else if(this.Marriage_not_Consumated==2)
							{
								this.isMarriage_not_Consumated = true;
							}
							else if(this.Widow_Widower==2)
							{
								this.isWidow_Widower = true;
							}
							else
							{
								this.isUnmarried = true;
								this.isDivorce = false;
								this.isMarriage_not_Consumated = false;
								this.isWidow_Widower = false;
							}

							if(this.HaveChildren=="2")
							{
								this.isHaveChildren = true;
							}
							else
							{		
								this.isHaveChildren = false;
							}

							if(this.Stay_With_Me=="2")
							{
								this.isStayWithMe = true;
							}
							else
							{		
								this.isStayWithMe = false;
							}
											
			        }
					else
					{
						this.isUnmarried = true;
						this.isDivorce = false;
						this.isMarriage_not_Consumated = false;
						this.isWidow_Widower = false;
						this.isStayWithMe = false;
						this.isHaveChildren = false;
					}

					if(this.isEdit['DivorceCopyno'].length)
			        {
			            this.isDivorceCopyno = true;
			        }
			        if(this.isEdit['DivorceeDate'].length)
			        {
			            this.isDivorceeDate = true;
			        }
			        if(this.isEdit['NoofMaleChild'].length)
			        {
			            this.isNoofMaleChild = true;
			        }
			         if(this.isEdit['NoofFemaleChild'].length)
			        {
			            this.isNoofFemaleChild = true;
			        }
					
					this.editPersonaldetailsForm.setValue(
			 		{
					  	Name  			: this.isEdit.Name,
						Email 			: this.isEdit.EmailId,
						DivorceCopyNo   : this.isEdit.DivorceCopyno,
						DivorceDate     : this.isEdit.DivorceeDate,
						NoofMaleChild   : this.isEdit.NoofMaleChild,
						NoofFemaleChild : this.isEdit.NoofFemaleChild,
						dob 			: this.isEdit.dob,
						MaritalStatus   : this.isEdit.MaritalStatusSelected,
						HaveChildrenS   : this.isEdit.HaveChildrenSelected,
						ChildrenStay    : this.isEdit.StayWithMeSelected,
						MotherTongue 	: '',
						selectCommunity : '',
						selectReligion 	: '',
						selectCaste  	: '',
						selectSubCaste  : '',
						selectStar 		: '',
						selectGothram 	: '',
						Dosham 			: this.isEdit.DoshamYesorNo,
						selectDoshams 	: '',
					});	
					
					// this.isEdit.DoshamYseorNoSelected

			        this.HaveChildrenSelected	   = this.isEdit['HaveChildrenSelected'];
			        this.StayWithMeSelected	       = this.isEdit['StayWithMeSelected'];
					this.selectedMotherTongueItems = res.MotherTongueSelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
				 	this.selectedcommunitiesItems  = res.CommunitySelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
				    this.selectedreligionsItems    = res.ReligionSelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
				    this.selectedcastesItems       = res.CasteSelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
				    this.selectedsubcastesItems    = res.SubsectSelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
				    this.selectedstarsItems        = res.StarSelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
				    this.selectedPadamItems        = res.PadamSelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
				    this.selectedgowthramItems 	   = res.GothramSelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
				    this.selecteddoshamItems 	   = res.DoshamSelected.sort((a, b) => (a.name > b.name) ? 1 : -1);

			        if (this.selectedcommunitiesItems.length) {
			            this.isCommunity = true;
			            if (this.selectedreligionsItems.length) {
			                this.isReligion = true;
			                if (this.selectedcastesItems.length) {
			                    this.isCastes = true;
			                    if (this.selectedsubcastesItems.length) {
			                        this.isSubCastes = true;
			                    }
			                }
			            }
			        }

			        if (this.selectedMotherTongueItems.length) 
			        {
		                this.isMotherTongue = true;
		            }
		            if (this.selectedstarsItems.length) 
			        {
		                this.isStar = true;
		            }
		            if (this.selectedgowthramItems.length) 
			        {
		                this.isGowthram = true;
		            }
		            if (this.selecteddoshamItems.length) 
			        {
		                this.isDosham = true;
		                this.doshamselected	= 226;
		            }
		            else
		            {
		            	this.doshamselected	= 225;
		            }

		            // this.editPersonaldetailsForm.setValue({Dosham : this.doshamselected});
			      	this.YesorNo  		= res.YesOrNo.sort((a, b) => (a.name > b.name) ? 1 : -1);
			        this.MaritalStatus  = res.MaritalStatus.sort((a, b) => (a.name > b.name) ? 1 : -1);
				 	this.MotherTongue   = res.MotherTongue;
				 	this.communities 	= res.Community.sort((a, b) => (a.name > b.name) ? 1 : -1);
				 	this.religions   	= res.Religion.sort((a, b) => (a.name > b.name) ? 1 : -1);
				 	this.castes   	 	= res.Caste.sort((a, b) => (a.name > b.name) ? 1 : -1);
				 	this.subcastes   	= res.Subsect.sort((a, b) => (a.name > b.name) ? 1 : -1);
				 	this.stars      	= res.Star.sort((a, b) => (a.name > b.name) ? 1 : -1);
				 	this.Padam       	= res.Padam.sort((a, b) => (a.name > b.name) ? 1 : -1);
				 	this.gowthram    	= res.Gothram.sort((a, b) => (a.name > b.name) ? 1 : -1);
				 	this.doshams    	= res.Dosham.sort((a, b) => (a.name > b.name) ? 1 : -1);

				 	//console.log

				 	
			  	})

				$(document).on('change', '#selectCommunity', function(e) {
					$("#selectReligion").val($("#selectReligion option:first").val());
					$('#selectReligion').trigger("blur");

					$("#selectCaste").val($("#selectCaste option:first").val());
					$('#selectCaste').trigger("blur");

					$("#selectSubCaste").val($("#selectSubCaste option:first").val());
					$('#selectSubCaste').trigger("blur");
				});

				$(document).on('change', '#selectReligion', function(e) {
					$("#selectCaste").val($("#selectCaste option:first").val());
					$('#selectCaste').trigger("blur");
					$("#selectSubCaste").val($("#selectSubCaste option:first").val());
					$('#selectSubCaste').trigger("blur");
				});

				$(document).on('change', '#selectCaste', function(e) {
					$("#selectSubCaste").val($("#selectSubCaste option:first").val());
					$('#selectSubCaste').trigger("blur");
				});

				$(document).on('focus blur change', '.form-control', function(e) {
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


				$(document).on('focusin', 'input', function() {
					$(this).parent().find('label').addClass('active');
				});


				$(document).on('focusout', 'input', function() {
					if (!this.value) {
						$(this).parent().find('label').removeClass('active');
					}
				});
	        }
	        else
	        {
	            this.router.navigate(['/logout']);    
	        }
  		});
  }

}
