import { Component, OnInit, ElementRef,HostListener, ViewChild,ChangeDetectionStrategy } from '@angular/core';
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
  	selector: 'app-personal-details',
  	templateUrl: './personal-details.component.html',
  	styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
	communities = [];
  	selectedcommunitiesItems = [];
  	communitiesSettings: IDropdownSettings = {};
  	isCommunity:boolean = false;


  	religions = [];
  	selectedreligionsItems = [];
  	religionsSettings: IDropdownSettings = {};
  	isReligion:boolean = false;

  	Freligions = [];
  	selectedFreligionsItems = [];
  	FreligionsSettings: IDropdownSettings = {};
  	isFReligion:boolean = false;

  	Mreligions = [];
  	selectedMreligionsItems = [];
  	MreligionsSettings: IDropdownSettings = {};
  	isMReligion:boolean = false;

  	castes = [];
  	selectedcastesItems = [];
  	castesSettings: IDropdownSettings = {};
  	isCastes:boolean = false;

  	Fcastes = [];
  	selectedFcastesItems = [];
  	FcastesSettings: IDropdownSettings = {};
  	isFCastes:boolean = false;

  	Mcastes = [];
  	selectedMcastesItems = [];
  	McastesSettings: IDropdownSettings = {};
  	isMCastes:boolean = false;

  	FFcastes = [];
  	selectedFFcastesItems = [];
  	FFcastesSettings: IDropdownSettings = {};
  	isFFCastes:boolean = false;

  	MMcastes = [];
  	selectedMMcastesItems = [];
  	MMcastesSettings: IDropdownSettings = {};
  	isMMCastes:boolean = false;

  	subcastes = [];
  	selectedsubcastesItems = [];
  	subcastesSettings: IDropdownSettings = {};
  	isSubCastes:boolean = false;

  	Fsubcastes = [];
  	selectedFsubcastesItems = [];
  	FsubcastesSettings: IDropdownSettings = {};
  	isFSubCastes:boolean = false;

  	Msubcastes = [];
  	selectedMsubcastesItems = [];
  	MsubcastesSettings: IDropdownSettings = {};
  	isMSubCastes:boolean = false;

  	FFsubcastes = [];
  	selectedFFsubcastesItems = [];
  	FFsubcastesSettings: IDropdownSettings = {};
  	isFFSubCastes:boolean = false;

  	MMsubcastes = [];
  	selectedMMsubcastesItems = [];
  	MMsubcastesSettings: IDropdownSettings = {};
  	isMMSubCastes:boolean = false;

  	stars = [];
  	selectedstarsItems = [];
  	starsSettings: IDropdownSettings = {};
  	isStar:boolean = false;

  	Padam = [];
  	selectedPadamsItems = [];
  	PadamsSettings: IDropdownSettings = {};
  	isPadam:boolean = false;

  	Raasi = [];
  	selectedRaasiItems = [];
  	RaasiSettings: IDropdownSettings = {};
  	isRaasi:boolean = false;

  	MotherTongue = [];
  	selectedMotherTonguesItems = [];
  	MotherTonguesSettings: IDropdownSettings = {};
  	isMotherTongue:boolean = false;
  	
	gowthram = [];
  	selectedgowthramItems = [];
  	gowthramSettings: IDropdownSettings = {};
  	isGowthram:boolean = false;

  	doshams = [];
  	selecteddoshamItems = [];
  	doshamSettings: IDropdownSettings = {};
  	isDosham:boolean = false;

  	myDateValue:string = "";
  	

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
	createAccountForm: FormGroup;

	dobObject:string = '';
	divorceObject:string = '';

	submitted = false;
	disableBtn = false;
	SubmitbuttonName: string;

	Dosham_ids 	: any = [];

	pageSetUp :any;
  	regno     :any;

	constructor(private dbService: NgxIndexedDBService,private UserGlobalService:UserGlobalService, private formBuilder: FormBuilder, private router: Router, private titleService: Title, private userservice: UserService,private notifyService : NotificationService, private elRef: ElementRef) 
	{
		this.SubmitbuttonName = 'Continue';
		this.minDate = new Date();
		this.maxDate = new Date();

		this.createAccountForm = this.formBuilder.group({
			MaritalStatus: '',
			DivorceCopyNo : '',
			DivorceDate : '',
			HaveChildrenS : '',
			ChildrenStay : '',
			NoofMaleChild : '',
			NoofFemaleChild : '',
			dob : '',
			Email : '',
			selectMotherTongue : '',
			dobs : '',
			selectCommunity : '',
			selectReligion: '',
			selectFReligion: '',
			selectMReligion: '',
			selectCaste: '',
			selectFCaste: '',
			selectMCaste: '',
			selectFFCaste: '',
			selectMMCaste: '',
			selectSubCaste : '',
			selectFSubCaste : '',
			selectMSubCaste : '',
			selectFFSubCaste : '',
			selectMMSubCaste : '',
			selectStar: '',
			selectPadam : '',
			selectRaasi : '',
			selectGothram: '',
			Dosham : '',
			selectDoshams : '',
		});
	}

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

	    		this.userservice.getData({CommunityId:item.id}, "IdValues/GetReligionBasedonCommunityWeb", "POST").subscribe((response: any) => 
				{
					this.isLoading = false;
					try {
						if (response.code == 1) 
						{
							this.religions = response.dropdownlist;
							this.Freligions = response.dropdownlist;
							this.Mreligions = response.dropdownlist;
						} 
						else 
						{
							this.notifyService.showWarning("No data found", "");
						}
					} 
					catch (err) 
					{
						this.notifyService.showInfo("Something went wrong. Try again", "")
						// this.notifyService.showWarning("Getting error", "Warning");
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

	    	const form_result = Object.assign({}, this.createAccountForm.value);

	    	if(item.id)
	    	{
				this.isReligion = true;
				this.selectedcastesItems = [];
		    	this.isCastes = false;

		    	this.selectedsubcastesItems = [];
		    	this.isSubCastes = false;

	    		this.userservice.getData({ReligionId:item.id,CommunityId:form_result.selectCommunity[0].id}, "IdValues/GetCasteBasedonCommunityReligionWeb", "POST").subscribe((response: any) => 
				{
					this.isLoading = false;
					try {
						if (response.code == 1) 
						{
							const res   = response.dropdownlist;
							this.castes = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
							this.Fcastes = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
							this.Mcastes = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
							this.FFcastes = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
							this.MMcastes = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
						} 
						else 
						{
							this.notifyService.showWarning("No data found", "");
						}
					} 
					catch (err) 
					{
						this.notifyService.showInfo("Something went wrong. Try again", "")
						// this.notifyService.showWarning("Getting error", "Warning");
					}
				})

				if(item.name=='Inter-Religion')
				{
					$('#interreligionbox').removeClass('hide');
					$('#withoutinter_religion').addClass('hide');
					$('#withoutinter_caste').addClass('hide');
					$('#intercastebox').addClass('hide');
				}
				else
				{
					$('#interreligionbox').addClass('hide');
					$('#withoutinter_religion').removeClass('hide');
					$('#withoutinter_caste').removeClass('hide');
					$('#intercastebox').addClass('hide');
				}
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

    	if(item.name=='Inter-Religion')
		{
			$('#interreligionbox').removeClass('hide');
			$('#withoutinter_religion').addClass('hide');
			$('#withoutinter_caste').addClass('hide');
			$('#intercastebox').addClass('hide');
		}
		else
		{
			$('#interreligionbox').addClass('hide');
			$('#withoutinter_religion').removeClass('hide');
			$('#withoutinter_caste').removeClass('hide');
			$('#intercastebox').addClass('hide');
		}
    }
    onSelectAllReligions(item:any){}

    // Father Religions
    onItemSelectFReligions(item: any) 
    {
	    if(this.selectedFreligionsItems)
	    {
	    	const form_result = Object.assign({}, this.createAccountForm.value);
	    	if(item.id)
	    	{
				this.isFReligion = true;
				this.selectedFcastesItems = [];
		    	this.isFCastes = false;

		    	this.selectedFsubcastesItems = [];
		    	this.isFSubCastes = false;

	    		this.userservice.getData({ReligionId:item.id,CommunityId:form_result.selectCommunity[0].id}, "IdValues/GetCasteBasedonCommunityReligionWeb", "POST").subscribe((response: any) => 
				{
					this.isLoading = false;
					try {
						if (response.code == 1) 
						{
							const res   = response.dropdownlist;
							this.Fcastes = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
						} 
						else 
						{
							this.notifyService.showWarning("No data found", "");
						}
					} 
					catch (err) 
					{
						// this.notifyService.showWarning("Getting error", "Warning");
						this.notifyService.showInfo("Something went wrong. Try again", "")
					}
				})
	    	}
	    }
	    else
	    {
	    	this.isReligion = false;
	    }
	}
	OnItemDeSelectFReligions(item:any){
        this.isFReligion= false;

        this.selectedFcastesItems = [];
    	this.isFCastes = false;

    	this.selectedFsubcastesItems = [];
    	this.isFSubCastes = false;
    }
    onSelectAllFReligions(item:any){}

    // Mothers Religions
    onItemSelectMReligions(item: any) {
	    if(this.selectedMreligionsItems)
	    {
	    	const form_result = Object.assign({}, this.createAccountForm.value);
	    	if(item.id)
	    	{
				this.isMReligion = true;
				this.selectedMcastesItems = [];
		    	this.isMCastes = false;

		    	this.selectedMsubcastesItems = [];
		    	this.isMSubCastes = false;

	    		this.userservice.getData({ReligionId:item.id,CommunityId:form_result.selectCommunity[0].id}, "IdValues/GetCasteBasedonCommunityReligionWeb", "POST").subscribe((response: any) => 
				{
					this.isLoading = false;
					try {
						if (response.code == 1) 
						{
							const res   = response.dropdownlist;
							this.Mcastes = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
						} 
						else 
						{
							this.notifyService.showWarning("No data found", "");
						}
					} 
					catch (err) 
					{
						// this.notifyService.showWarning("Getting error", "Warning");
						this.notifyService.showInfo("Something went wrong. Try again", "")
					}
				})
	    	}
	    }
	    else
	    {
	    	this.isMReligion = false;
	    }
	}
	OnItemDeSelectMReligions(item:any){
        this.isMReligion= false;

        this.selectedMcastesItems = [];
    	this.isMCastes = false;

    	this.selectedMsubcastesItems = [];
    	this.isMSubCastes = false;
    }
    onSelectAllMReligions(item:any){}

    // Caste
    onItemSelectCastes(item: any) {
	    if(this.selectedcastesItems)
	    {
	    	const form_result = Object.assign({}, this.createAccountForm.value);
	    	if(item.id)
	    	{
	    		this.selectedsubcastesItems = [];
    			this.isSubCastes = false;

				this.isCastes = true;
		    	this.userservice.getData({CasteId:item.id, ReligionId:form_result.selectReligion[0].id,CommunityId:form_result.selectCommunity[0].id}, "IdValues/GetSubsectByCasteCommunityReligionWeb", "POST").subscribe((response: any) => 
				{
					this.isLoading = false;
					try {
						if (response.code == 1) 
						{
							const res  = response.dropdownlist;
							this.subcastes = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
							this.Fsubcastes = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
							this.Msubcastes = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
						} 
						else 
						{
							this.notifyService.showWarning("No data found", "");
						}
					} 
					catch (err) 
					{
						// this.notifyService.showWarning("Getting error", "Warning");
						this.notifyService.showInfo("Something went wrong. Try again", "")
					}
				})

				if(item.name=='Inter-Caste')
				{
					$('#interreligionbox').addClass('hide');
					$('#intercastebox').removeClass('hide');
					//$('#withoutinter_religion').addClass('hide');
					$('#withoutinter_caste').addClass('hide');
				}
				else
				{
					$('#interreligionbox').addClass('hide');
					$('#intercastebox').addClass('hide');
					//$('#withoutinter_religion').removeClass('hide');
					$('#withoutinter_caste').removeClass('hide');
				}
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

    	if(item.name=='Inter-Caste')
		{
			$('#intercastebox').removeClass('hide');
			//$('#withoutinter_religion').addClass('hide');
			$('#withoutinter_caste').addClass('hide');
		}
		else
		{
			$('#intercastebox').addClass('hide');
			//$('#withoutinter_religion').removeClass('hide');
			$('#withoutinter_caste').removeClass('hide');
		}
    }
    onSelectAllCastes(item:any){}

    // Father Caste
    onItemSelectFCastes(item: any) 
    {
    	console.log('1');
	    if(this.selectedFcastesItems)
	    {
	    	const form_result = Object.assign({}, this.createAccountForm.value);
	    	if(item.id)
	    	{
	    		console.log('1');
	    		this.selectedFsubcastesItems = [];
    			this.isFSubCastes = false;

				this.isFCastes = true;
		    	this.userservice.getData({CasteId:item.id, ReligionId:form_result.selectFReligion[0].id,CommunityId:form_result.selectCommunity[0].id}, "IdValues/GetSubsectByCasteCommunityReligionWeb", "POST").subscribe((response: any) => 
				{
					this.isLoading = false;
					try {
						if (response.code == 1) 
						{
							const res  = response.dropdownlist;
							this.Fsubcastes = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
						} 
						else 
						{
							this.notifyService.showWarning("No data found", "");
						}
					} 
					catch (err) 
					{
						// this.notifyService.showWarning("Getting error", "Warning");
						this.notifyService.showInfo("Something went wrong. Try again", "")
					}
				})
		    }
	    }
	    else
	    {
	    	this.isFCastes = false;
	    }
	}
	OnItemDeSelectFCastes(item:any){
        this.isFCastes= false;

        this.selectedFsubcastesItems = [];
    	this.isFSubCastes = false;
    }
    onSelectAllFCastes(item:any){}

    // Mother Caste
    onItemSelectMCastes(item: any) {
	    if(this.selectedMcastesItems)
	    {
	    	const form_result = Object.assign({}, this.createAccountForm.value);
	    	if(item.id)
	    	{
	    		this.selectedMsubcastesItems = [];
    			this.isMSubCastes = false;

				this.isMCastes = true;
		    	this.userservice.getData({CasteId:item.id, ReligionId:form_result.selectMReligion[0].id,CommunityId:form_result.selectCommunity[0].id}, "IdValues/GetSubsectByCasteCommunityReligionWeb", "POST").subscribe((response: any) => 
				{
					this.isLoading = false;
					try {
						if (response.code == 1) 
						{
							const res  = response.dropdownlist;
							this.Msubcastes = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
						} 
						else 
						{
							this.notifyService.showWarning("No data found", "");
						}
					} 
					catch (err) 
					{
						// this.notifyService.showWarning("Getting error", "Warning");
						this.notifyService.showInfo("Something went wrong. Try again", "")
					}
				})
		    }
	    }
	    else
	    {
	    	this.isMCastes = false;
	    }
	}
	OnItemDeSelectMCastes(item:any){
        this.isMCastes= false;

        this.selectedMsubcastesItems = [];
    	this.isMSubCastes = false;
    }
    onSelectAllMCastes(item:any){}

    // Father F Caste
    onItemSelectFFCastes(item: any) 
    {
    	console.log('1');
	    if(this.selectedFFcastesItems)
	    {
	    	const form_result = Object.assign({}, this.createAccountForm.value);
	    	if(item.id)
	    	{
	    		console.log('1');
	    		this.selectedFFsubcastesItems = [];
    			this.isFFSubCastes = false;

				this.isFFCastes = true;
		    	this.userservice.getData({CasteId:item.id, ReligionId:form_result.selectReligion[0].id,CommunityId:form_result.selectCommunity[0].id}, "IdValues/GetSubsectByCasteCommunityReligionWeb", "POST").subscribe((response: any) => 
				{
					this.isLoading = false;
					try {
						if (response.code == 1) 
						{
							const res  = response.dropdownlist;
							this.FFsubcastes = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
						} 
						else 
						{
							this.notifyService.showWarning("No data found", "");
						}
					} 
					catch (err) 
					{
						// this.notifyService.showWarning("Getting error", "Warning");
						this.notifyService.showInfo("Something went wrong. Try again", "")
					}
				})
		    }
	    }
	    else
	    {
	    	this.isFFCastes = false;
	    }
	}
	OnItemDeSelectFFCastes(item:any){
        this.isFFCastes= false;

        this.selectedFFsubcastesItems = [];
    	this.isFFSubCastes = false;
    }
    onSelectAllFFCastes(item:any){}

    // Mother M Caste
    onItemSelectMMCastes(item: any) {
	    if(this.selectedMMcastesItems)
	    {
	    	const form_result = Object.assign({}, this.createAccountForm.value);
	    	if(item.id)
	    	{
	    		this.selectedMMsubcastesItems = [];
    			this.isMMSubCastes = false;

				this.isMMCastes = true;
		    	this.userservice.getData({CasteId:item.id, ReligionId:form_result.selectReligion[0].id,CommunityId:form_result.selectCommunity[0].id}, "IdValues/GetSubsectByCasteCommunityReligionWeb", "POST").subscribe((response: any) => 
				{
					this.isLoading = false;
					try {
						if (response.code == 1) 
						{
							const res  = response.dropdownlist;
							this.MMsubcastes = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
						} 
						else 
						{
							this.notifyService.showWarning("No data found", "");
						}
					} 
					catch (err) 
					{
						// this.notifyService.showWarning("Getting error", "Warning");
						this.notifyService.showInfo("Something went wrong. Try again", "")
					}
				})
		    }
	    }
	    else
	    {
	    	this.isMMCastes = false;
	    }
	}
	OnItemDeSelectMMCastes(item:any){
        this.isMMCastes= false;

        this.selectedMMsubcastesItems = [];
    	this.isMMSubCastes = false;
    }
    onSelectAllMMCastes(item:any){}


    // Sub Caste
    onItemSelectSubCastes(item: any) 
    {
	    if(this.selectedcastesItems)
	    {
	    	this.isSubCastes = true;
	    }
	    else
	    {
	    	this.isSubCastes = false;
	    }

	    if(item.name=='Inter-Subst')
		{
			$('#intersubcastebox').removeClass('hide');
			//$('#withoutinter_religion').addClass('hide');
			//$('#withoutinter_caste').addClass('hide');
		}
		else
		{
			$('#intersubcastebox').addClass('hide');
			//$('#withoutinter_religion').removeClass('hide');
			//$('#withoutinter_caste').removeClass('hide');
		}
	}
	OnItemDeSelectSubCastes(item:any){
        this.isSubCastes= false;
    }
    onSelectAllSubCastes(item:any){}

    //Father Sub Caste
    onItemSelectFSubCastes(item: any) {
	    if(this.selectedFcastesItems)
	    {
	    	this.isFSubCastes = true;
	    }
	    else
	    {
	    	this.isFSubCastes = false;
	    }
	}
	OnItemDeSelectFSubCastes(item:any){
        this.isFSubCastes= false;
    }
    onSelectAllFSubCastes(item:any){}

    // Mother Sub Caste
    onItemSelectMSubCastes(item: any) {
	    if(this.selectedMcastesItems)
	    {
	    	this.isMSubCastes = true;
	    }
	    else
	    {
	    	this.isMSubCastes = false;
	    }
	}
	OnItemDeSelectMSubCastes(item:any){
        this.isMSubCastes= false;
    }
    onSelectAllMSubCastes(item:any){}

    //Father F Sub Caste
    onItemSelectFFSubCastes(item: any) {
	    if(this.selectedFcastesItems)
	    {
	    	this.isFFSubCastes = true;
	    }
	    else
	    {
	    	this.isFFSubCastes = false;
	    }
	}
	OnItemDeSelectFFSubCastes(item:any){
        this.isFFSubCastes= false;
    }
    onSelectAllFFSubCastes(item:any){}

    // Mother M Sub Caste
    onItemSelectMMSubCastes(item: any) {
	    if(this.selectedMcastesItems)
	    {
	    	this.isMMSubCastes = true;
	    }
	    else
	    {
	    	this.isMMSubCastes = false;
	    }
	}
	OnItemDeSelectMMSubCastes(item:any){
        this.isMMSubCastes= false;
    }
    onSelectAllMMSubCastes(item:any){}

    // Star
    onItemSelectStar(item: any) {
	    if(this.selectedstarsItems)
	    {
	    	this.isStar = true;
	    	this.isPadam = false;
	    	this.selectedPadamsItems = [];
	    	this.isRaasi = false;
	    	this.Raasi = [];
	    	this.selectedRaasiItems = [];
	    }
	    else
	    {
	    	this.isStar = false;
	    	this.isPadam = false;
	    	this.selectedPadamsItems = [];
	    	this.isRaasi = false;
	    	this.Raasi = [];
	    	this.selectedRaasiItems = [];
	    }
	}
	OnItemDeSelectStar(item:any)
	{
        this.isStar= false;
        this.isPadam = false;
        this.isRaasi = false;
    	this.selectedPadamsItems = [];
    	this.Raasi = [];
    	this.selectedRaasiItems = [];
    }
    onSelectAllStar(item:any){}

    // Padam
    onItemSelectPadam(item: any) {
	    if(this.selectedPadamsItems)
	    {
	    	this.Raasi = [];
	    	this.selectedRaasiItems = [];
	    	this.isPadam = true;
	    	this.isRaasi = false;
	    	const form_result = Object.assign({}, this.createAccountForm.value);
	    	this.userservice.getData({PadamId:item.id, StarId:form_result.selectStar[0].id}, "IdValues/GetRaasiBasedOnPadam", "POST").subscribe((response: any) => 
				{
					this.isLoading = false;
					try {
						if (response.code == 1) 
						{
							const res  = response.dropdownlist;
							this.Raasi = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
						} 
						else 
						{
							this.notifyService.showWarning("No data found", "");
						}
					} 
					catch (err) 
					{
						// this.notifyService.showWarning("Getting error", "Warning");
						this.notifyService.showInfo("Something went wrong. Try again", "")
					}
				})
	    }
	    else
	    {
	    	this.isPadam = false;
	    	this.isRaasi = false;
	    	this.Raasi = [];
    		this.selectedRaasiItems = [];
	    }
	}
	OnItemDeSelectPadam(item:any)
	{
		this.isRaasi = false;
    	this.Raasi = [];
		this.selectedRaasiItems = [];
        this.isPadam= false;
    }
    onSelectAllPadam(item:any){}

    //Raasi
    onItemSelectRaasi(item: any) {
	    if(this.selectedPadamsItems)
	    {
	    	this.isRaasi = true;
	    }
	    else
	    {
	    	this.isRaasi = false;
	    }
	}
	OnItemDeSelectRaasi(item:any)
	{
        this.isRaasi= false;
    }
    onSelectAllRassi(item:any){}


    // MotherTongue
    onItemSelectMotherTongue(item: any) {
	    if(this.selectedMotherTonguesItems)
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
			this.divorceObject = this.userservice.convertDate(event);
			this.isDivorceFocused = true;
		}
	} 

	changeDobDate(event: any) 
	{
	  	if(event)
	  	{
			this.dobObject = this.userservice.convertDate(event);
			this.isDobFocused = true;
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

	            const form_result = Object.assign({}, this.createAccountForm.value);
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
			   //console.log(form_result);
			 //   	if(form_result.MaritalStatus && form_result.dob && form_result.Email && form_result.selectPadam[0].id  && form_result.selectMotherTongue[0].id && form_result.selectCommunity[0].id && form_result.selectReligion[0].id && form_result.selectStar[0].id && form_result.selectGothram[0].id && form_result.Dosham)
			 //   	{
			 //   		if(form_result.selectReligion[0].name=='Inter-Religion')
			 //   		{
			 //   			if(form_result.selectFReligion[0].id || form_result.selectMReligion[0].id || form_result.selectFCaste[0].id || form_result.selectMCaste[0].id || form_result.selectFSubCaste[0].id || form_result.selectMSubCaste[0].id)
			 //   			{
				//    			this.notifyService.showWarning("Please enter required fields", "Warning");	
				// 			this.isSubmitTrigger = false;
				// 			this.SubmitbuttonName = 'Continue';
				// 			this.disableBtn = false;
				// 		}
			 //   		}
			 //   		else if(form_result.selectCaste[0].name=='Inter-Caste')
			 //   		{
			 //   			if(form_result.selectFCaste[0].id || form_result.selectMCaste[0].id || form_result.selectFSubCaste[0].id || form_result.selectMSubCaste[0].id)
				// 		{
				// 			this.notifyService.showWarning("Please enter required fields", "Warning");	
				// 			this.isSubmitTrigger = false;
				// 			this.SubmitbuttonName = 'Continue';
				// 			this.disableBtn = false;
				// 		}
			 //   		}
			 //   		else if(form_result.selectSubCaste[0].name=='Inter-Subst')
			 //   		{
			 //   			if(form_result.selectFSubCaste[0].id || form_result.selectMSubCaste[0].id)
				// 		{
				// 			this.notifyService.showWarning("Please enter required fields", "Warning");	
				// 			this.isSubmitTrigger = false;
				// 			this.SubmitbuttonName = 'Continue';
				// 			this.disableBtn = false;
				// 		}
			 //   		}
			 //   		else
			 //   		{
			 //   			if(form_result.selectCaste[0].id || form_result.selectSubCaste[0].id)
				// 		{
				// 			this.notifyService.showWarning("Please enter required fields", "Warning");	
				// 			this.isSubmitTrigger = false;
				// 			this.SubmitbuttonName = 'Continue';
				// 			this.disableBtn = false;
				// 		}
			 //   		}


				// 	if(form_result.MaritalStatus==21)
				// 	{
				// 		if(form_result.DivorceCopyNo=='' || form_result.DivorceDate=='' || form_result.HaveChildrenS=='')
				// 		{
				// 			this.notifyService.showWarning("Please enter required fields", "Warning");
				// 			this.isSubmitTrigger = false;
				// 		}
				// 		else if(form_result.HaveChildrenS)
				// 		{
				// 			if(form_result.HaveChildrenS==226)
				// 			{
				// 				if(form_result.ChildrenStay)
				// 				{
				// 					if(form_result.ChildrenStay==226)
				// 					{
				// 						if(form_result.NoofMaleChild=='' || form_result.NoofFemaleChild=='')
				// 						{
				// 							this.notifyService.showWarning("Please enter required fields", "Warning");
				// 							this.isSubmitTrigger = false;
				// 							this.SubmitbuttonName = 'Continue';
				// 							this.disableBtn = false;
				// 						}
				// 						else
				// 						{
				// 							this.isSubmitTrigger = true;
				// 						}
				// 					}
				// 					else
				// 					{
				// 						this.isSubmitTrigger = true;
				// 					}
				// 				}
				// 				else
				// 				{
				// 					this.notifyService.showWarning("Please enter required fields", "Warning");	
				// 					this.isSubmitTrigger = false;
				// 					this.SubmitbuttonName = 'Continue';
				// 					this.disableBtn = false;
				// 				}
				// 			}
				// 			else
				// 			{
				// 				this.isSubmitTrigger = true;
				// 			}
				// 		}
				// 		else
				// 		{
				// 			this.isSubmitTrigger = true;
				// 		}
				// 	}
				// 	else if(form_result.MaritalStatus==22)
				// 	{
				// 		if(form_result.HaveChildrenS==1)
				// 		{
				// 			if(form_result.ChildrenStay)
				// 			{
				// 				if(form_result.ChildrenStay==1)
				// 				{
				// 					if(form_result.NoofMaleChild=='' || form_result.NoofFemaleChild=='')
				// 					{
				// 						this.notifyService.showWarning("Please enter required fields", "Warning");
				// 						this.isSubmitTrigger = false;
				// 						this.SubmitbuttonName = 'Continue';
				// 						this.disableBtn = false;
				// 					}
				// 					else
				// 					{
				// 						this.isSubmitTrigger = true;
				// 					}
				// 				}
				// 				if(form_result.ChildrenStay==2)
				// 				{
				// 					this.isSubmitTrigger = true;
				// 				}
				// 			}
				// 			else
				// 			{
				// 				this.notifyService.showWarning("Please enter required fields", "Warning");	
				// 				this.isSubmitTrigger = false;
				// 				this.SubmitbuttonName = 'Continue';
				// 				this.disableBtn = false;
				// 			}
				// 		}
				// 		else if(form_result.HaveChildrenS==2)
				// 		{
				// 			this.isSubmitTrigger = true;
				// 		}
				// 		else
				// 		{
				// 			this.notifyService.showWarning("Please enter required fields", "Warning");	
				// 			this.isSubmitTrigger = false;
				// 			this.SubmitbuttonName = 'Continue';
				// 			this.disableBtn = false;
				// 		}
				// 	}
				// 	else if(form_result.MaritalStatus==23)
				// 	{
				// 		if(form_result.DivorceCopyNo=='' || form_result.DivorceDate=='')
				// 		{
				// 			this.notifyService.showWarning("Please enter required fields", "Warning");
				// 			this.isSubmitTrigger = false;
				// 			this.SubmitbuttonName = 'Continue';
				// 			this.disableBtn = false;
				// 		}
				// 		else
				// 		{
				// 			this.isSubmitTrigger = true;
				// 		}
				// 	}
				// 	else
				// 	{
				// 		this.isSubmitTrigger = true;
				// 	}
				// }
				// else
				// {
				// 	this.SubmitbuttonName = 'Continue';
				// 	this.notifyService.showWarning("Please enter required fields", "Warning");
				// 	this.disableBtn = false;
				// 	this.isSubmitTrigger = false;
				// }
				if(form_result.dob && form_result.Email && form_result.selectPadam[0].id  && form_result.selectMotherTongue[0].id && form_result.selectCommunity[0].id && form_result.selectReligion.length && form_result.selectStar[0].id && form_result.selectGothram[0].id && form_result.Dosham && form_result.selectRaasi[0].id)
				{
					if(form_result.selectReligion.length)
					{
						if(form_result.selectReligion[0].name=='Inter-Religion')
						{
							if(form_result.selectFReligion.length || form_result.selectMReligion.length || form_result.selectFCaste.length || form_result.selectMCaste.length || form_result.selectFSubCaste.length || form_result.selectMSubCaste.length)
							{
								this.notifyService.showWarning("Please enter required fields", "");	
								this.isSubmitTrigger = false;
								this.SubmitbuttonName = 'Continue';
								this.disableBtn = false;
							}
						}
						else
						{
							if(form_result.selectCaste.length)
							{
								if(form_result.selectCaste[0].name=='Inter-Caste')
								{
									if(form_result.selectFFCaste.length || form_result.selectMMCaste.length || form_result.selectFFSubCaste.length || form_result.selectMMSubCaste.length)
									{
										this.notifyService.showWarning("Please enter required fields", "");	
										this.isSubmitTrigger = false;
										this.SubmitbuttonName = 'Continue';
										this.disableBtn = false;
									}
								}

								if(form_result.selectSubCaste.length)
								{
									if(form_result.selectSubCaste[0].name=='Inter-Subst')
									{
										if(form_result.selectFSubCaste.length || form_result.selectMSubCaste.length)
										{
											this.notifyService.showWarning("Please enter required fields", "");	
											this.isSubmitTrigger = false;
											this.SubmitbuttonName = 'Continue';
											this.disableBtn = false;
										}
									}
								}
								else
								{
									this.SubmitbuttonName = 'Continue';
									this.notifyService.showWarning("Please enter required fields", "");
									this.disableBtn = false;
									this.isSubmitTrigger = false;
								}
							}
							else
							{
								this.SubmitbuttonName = 'Continue';
								this.notifyService.showWarning("Please enter required fields", "");
								this.disableBtn = false;
								this.isSubmitTrigger = false;
							}


							
							// else if(form_result.selectSubCaste[0].name!='Inter-Religion' || form_result.selectSubCaste[0].name!='Inter-Caste' || form_result.selectSubCaste[0].name!='Inter-Subst')
							// {
							// 	if(form_result.selectCaste.length || form_result.selectSubCaste.length)
							// 	{
							// 		this.notifyService.showWarning("Please enter required fields", "Warning");	
							// 		this.isSubmitTrigger = false;
							// 		this.SubmitbuttonName = 'Continue';
							// 		this.disableBtn = false;
							// 	}
							// }
							// else
							// {

							// }
						}
						
					}
					else
					{
						this.SubmitbuttonName = 'Continue';
						this.notifyService.showWarning("Please enter required fields", "");
						this.disableBtn = false;
						this.isSubmitTrigger = false;
					}
					
					//console.log(form_result);
					if((form_result.selectFReligion.length && form_result.selectMReligion.length && form_result.selectFCaste.length && form_result.selectMCaste.length && form_result.selectFSubCaste.length && form_result.selectMSubCaste.length && form_result.MaritalStatus.length) 
						|| (form_result.selectFCaste.length && form_result.selectMCaste.length && form_result.selectFSubCaste.length && form_result.selectMSubCaste.length && form_result.MaritalStatus.length) 
						|| (form_result.selectFSubCaste.length && form_result.selectMSubCaste.length && form_result.MaritalStatus.length)
						|| (form_result.selectCaste.length && form_result.selectSubCaste.length && form_result.MaritalStatus.length))
					{
						if(form_result.MaritalStatus==21)
						{
							if(form_result.DivorceCopyNo=='' || form_result.DivorceDate=='' || form_result.HaveChildrenS=='')
							{
								this.notifyService.showWarning("Please enter required fields", "");
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
												this.notifyService.showWarning("Please enter required fields", "");
												this.isSubmitTrigger = false;
												this.SubmitbuttonName = 'Continue';
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
										this.notifyService.showWarning("Please enter required fields", "");	
										this.isSubmitTrigger = false;
										this.SubmitbuttonName = 'Continue';
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
							if(form_result.HaveChildrenS==1)
							{
								if(form_result.ChildrenStay)
								{
									if(form_result.ChildrenStay==1)
									{
										if(form_result.NoofMaleChild=='' || form_result.NoofFemaleChild=='')
										{
											this.notifyService.showWarning("Please enter required fields", "");
											this.isSubmitTrigger = false;
											this.SubmitbuttonName = 'Continue';
											this.disableBtn = false;
										}
										else
										{
											this.isSubmitTrigger = true;
										}
									}
									if(form_result.ChildrenStay==2)
									{
										this.isSubmitTrigger = true;
									}
								}
								else
								{
									this.notifyService.showWarning("Please enter required fields", "");	
									this.isSubmitTrigger = false;
									this.SubmitbuttonName = 'Continue';
									this.disableBtn = false;
								}
							}
							else if(form_result.HaveChildrenS==2)
							{
								this.isSubmitTrigger = true;
							}
							else
							{
								this.notifyService.showWarning("Please enter required fields", "");	
								this.isSubmitTrigger = false;
								this.SubmitbuttonName = 'Continue';
								this.disableBtn = false;
							}
						}
						else if(form_result.MaritalStatus==23)
						{
							if(form_result.DivorceCopyNo=='' || form_result.DivorceDate=='')
							{
								this.notifyService.showWarning("Please enter required fields", "");
								this.isSubmitTrigger = false;
								this.SubmitbuttonName = 'Continue';
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
						this.SubmitbuttonName = 'Continue';
						this.notifyService.showWarning("Please enter required fields", "");
						this.disableBtn = false;
						this.isSubmitTrigger = false;
					}


				}
				else
				{
					this.SubmitbuttonName = 'Continue';
					this.notifyService.showWarning("Please enter required fields", "");
					this.disableBtn = false;
					this.isSubmitTrigger = false;
				}

				if(this.isSubmitTrigger)
				{
					const user_save_info = {
						RegNo: this.regno,
						MaritalStatus: form_result.MaritalStatus,
						DivorceCopyno: form_result.DivorceCopyNo,
						DivorceeDate: form_result.DivorceDate,
						HaveChildren: form_result.HaveChildrenS,
						StayWithMe:form_result.ChildrenStay,
						NoofMaleChild:form_result.NoofMaleChild,
						NoofFemaleChild:form_result.NoofFemaleChild,
						DateOfBirth: this.dobObject,
						Email:form_result.Email,
						MotherTongue:form_result.selectMotherTongue[0].id,
						Community:form_result.selectCommunity[0].id,
						Religion:form_result.selectReligion[0].id,
						// Caste:form_result.selectCaste[0].id, 
						// Subsect:form_result.selectSubCaste[0].id,  
						Star:form_result.selectStar[0].id,
						Padam:form_result.selectPadam[0].id,
						Raasi:form_result.selectRaasi[0].id,  
						Gothram:form_result.selectGothram[0].id,
						RegistrationStages:2,
					};
					if(form_result.Dosham==226)
					{
						user_save_info['Dosham'] = this.Dosham_ids.join();//this.UserGlobalService.joinMultiSelect(form_result.selectDoshams);
					}
					if(form_result.selectReligion[0].name=='Inter-Religion')
					{
						user_save_info['FatherReligion'] = form_result.selectFReligion[0].id, 
						user_save_info['FatherCaste']    = form_result.selectFCaste[0].id,
						user_save_info['FatherSubsect']  = form_result.selectFSubCaste[0].id, 
						user_save_info['MotherReligion'] = form_result.selectMReligion[0].id,
						user_save_info['MotherCaste']    = form_result.selectMCaste[0].id, 
						user_save_info['MotherSubsect']  = form_result.selectMSubCaste[0].id
					}
					else if(form_result.selectCaste[0].name=='Inter-Caste')
					{
						user_save_info['FatherCaste']   = form_result.selectFFCaste[0].id, 
						user_save_info['FatherSubsect'] = form_result.selectFFSubCaste[0].id,
						user_save_info['MotherCaste']   = form_result.selectMMCaste[0].id, 
						user_save_info['MotherSubsect'] = form_result.selectMMSubCaste[0].id
					}
					else if(form_result.selectSubCaste[0].name=='Inter-Subst')
					{
						user_save_info['FatherSubsect'] = form_result.selectFSubCaste[0].id, 
						user_save_info['MotherSubsect'] = form_result.selectMSubCaste[0].id
					}
					else
					{
						user_save_info['Caste'] = form_result.selectCaste[0].id, 
						user_save_info['Subsect'] = form_result.selectSubCaste[0].id
					}
					//console.log(user_save_info);
					this.userservice.getData(user_save_info, "Registration/SaveUserInfo", "POST").subscribe((response: any) => {
						this.isLoading = true;
				        try {
				        	if (response.status == 1) 
				        	{
				        		this.isLoading = false;
				        		this.notifyService.showSuccess(response.message, "Great...!");
				        		this.router.navigate(['/register/family-information']);
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
				            // this.notifyService.showError("Internal Server Error", "Error")
				            this.notifyService.showInfo("Something went wrong. Try again", "")
				        }
				    }, (err) => 
				    {
				    	this.isLoading = false;
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

	    

	}


	isSetDefault()
	  {
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
	  }

	Doshamselect(name: string, isChecked: boolean)
	{
		if (isChecked) 
	    {
	    	this.Dosham_ids.push(name);
	    } 
	    else 
	    {
	    	let i: number = 0;
	      	this.Dosham_ids.forEach((item) => 
	      	{
	        	if (item == name) 
	        	{
	        		this.Dosham_ids.splice(i, 1);
	        	}
	        	i++;
	      	});
	      	
	    }

	    //this.Dosham_ids.join();
	    console.log(this.Dosham_ids);

		if ($('#DoshamID'+name).hasClass('active') == true) 
		{
            $('#DoshamID'+name).removeClass('active');
            return false;
        } 
        else 
        {
            $('#DoshamID'+name).addClass('active');
            return false;
        }
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

			    this.selectedFreligionsItems = [];
			    this.FreligionsSettings ={
			      	singleSelection: true,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 5,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    this.selectedMreligionsItems = [];
			    this.MreligionsSettings ={
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

			    this.selectedFcastesItems = [];
			    this.FcastesSettings ={
			      	singleSelection: true,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 5,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    this.selectedMcastesItems = [];
			    this.McastesSettings ={
			      	singleSelection: true,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 5,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    this.selectedFFcastesItems = [];
			    this.FFcastesSettings ={
			      	singleSelection: true,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 5,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    this.selectedMMcastesItems = [];
			    this.MMcastesSettings ={
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

			    this.selectedFsubcastesItems = [];
			    this.FsubcastesSettings ={
			      	singleSelection: true,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 5,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    this.selectedMsubcastesItems = [];
			    this.MsubcastesSettings ={
			      	singleSelection: true,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 5,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    this.selectedFFsubcastesItems = [];
			    this.FFsubcastesSettings ={
			      	singleSelection: true,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 5,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    this.selectedMMsubcastesItems = [];
			    this.MMsubcastesSettings ={
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

			    this.selectedMotherTonguesItems = [];
			    this.MotherTonguesSettings ={
			      	singleSelection: true,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 5,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    this.selectedPadamsItems = [];
			    this.PadamsSettings ={
			      	singleSelection: true,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 5,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    this.selectedRaasiItems = [];
			    this.RaasiSettings ={
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
			      	enableCheckAll: false,
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 5,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

				this.titleService.setTitle('Provide Personal Details - Kalyanamalai');

				this.userservice. getData('', "IdValues/GetEditProfile", "POST").subscribe((response: any) => {
				 	const res  = response.dropdownlist;

				 	this.MotherTongue = res.filter(data => data.type == 'MotherToungue');
				  	this.communities = res.filter(data => data.type == 'Community');
				  	this.gowthram = res.filter(data => data.type == 'Gowthram').sort((a, b) => (a.name > b.name) ? 1 : -1);
				  	this.stars = res.filter(data => data.type == 'Star').sort((a, b) => (a.name > b.name) ? 1 : -1);
				  	this.Padam = res.filter(data => data.type == 'Padam').sort((a, b) => (a.name > b.name) ? 1 : -1);
				  	this.doshams = res.filter(data => data.type == 'Dhosam').sort((a, b) => (a.name > b.name) ? 1 : -1);
			  	})
			 
				//$('#selectCommunity').on('change', function(e) {
				$(document).on('change', '#selectCommunity', function(e){
					$("#selectReligion").val($("#selectReligion option:first").val());
					$('#selectReligion').trigger("blur");

					$("#selectCaste").val($("#selectCaste option:first").val());
					$('#selectCaste').trigger("blur");

					$("#selectSubCaste").val($("#selectSubCaste option:first").val());
					$('#selectSubCaste').trigger("blur");
				});

				//$('#selectReligion').on('change', function(e) {
				$(document).on('change', '#selectReligion', function(e){
					$("#selectCaste").val($("#selectCaste option:first").val());
					$('#selectCaste').trigger("blur");
					$("#selectSubCaste").val($("#selectSubCaste option:first").val());
					$('#selectSubCaste').trigger("blur");
				});

				$(document).on('change', '#selectCaste', function(e){
				//$('#selectCaste').on('change', function(e) {
					$("#selectSubCaste").val($("#selectSubCaste option:first").val());
					$('#selectSubCaste').trigger("blur");
				});

				$(document).on('focus blur change', '.form-control', function(e){
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
				$(document).on('focusin', 'input', function(){
					$(this).parent().find('label').addClass('active');
				});

				$(document).on('focusout', 'input', function(){
				//$('input').on('focusout', function() {
					if (!this.value) {
						$(this).parent().find('label').removeClass('active');
					}
				});

				//$('._Ms_s').on('click', function() {
				$(document).on('click', '._Ms_s', function(){
					$('#DivorceCopyNo').val("");
			        $('#DivorceDate').val("");
			        $('#csla').val("");
			        $('#cslfm').val("");
			        $('#ChildrenStayData').hide();
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


					$('.MaritalStatus li label').removeClass('active');
					$(this).addClass('active');
					var value = $(this).data("item");
					if (value == 21) {
						// Divorced
						$('#DivorceCopy').show();
						$('#DivorcedData').show();
						$('#HaveChildrenList').show();
					} else if (value == 22) {
						// Widow / Widower
						$('#DivorcedData').show();
						$('#DivorceCopy').hide();
						$('#HaveChildrenList').show();
						$('#HaveChildrenData').hide();
						$('#ChildrenStayData').hide();

					} else if (value == 23) {
						// Marriage not Consumated
						$('#DivorceCopy').show();
						$('#DivorcedData').show();
						$('#HaveChildrenData').hide();
						$('#HaveChildrenList').hide();
					} else {
						$('#DivorceCopy').hide();
						$('#DivorcedData').hide();
						$('#HaveChildrenData').hide();
						$('#ChildrenStayData').hide();
						$('#HaveChildrenList').hide();
					}
					// console.log();
				});

				// $('#MaritalStatus').change(function() 
				// {       
				//     $('input[name="HaveChildren"]').removeAttr("checked");
				//     $('input[name="ChildrenStay"]').removeAttr("checked");

				// });

				//$('._Ms_hc').on('click', function() {
				$(document).on('click', '._Ms_hc', function(){
					$('.HaveChildrenS li label').removeClass('active');
					$(this).addClass('active');
					var value = $(this).data("item");
					if (value == 1) {
						$('#HaveChildrenData').show();
					} else {
						$('#HaveChildrenData').hide();
					}
				});

				// ChildrenStay
				//$('._Ms_cs').on('click', function() {
				$(document).on('click', '._Ms_cs', function(){
					$('.ChildrenStay li label').removeClass('active');
					$(this).addClass('active');
					var value = $(this).data("item");
					if (value == 1) {
						$('#ChildrenStayData').show();
					} else {
						$('#ChildrenStayData').hide();
					}
				});

				// Dosham
				$(document).on('click', '._Ms_ds', function(){
				//$('._Ms_ds').on('click', function() {
					$('.Dosham_List li label').removeClass('active');
					$(this).addClass('active');
					var value = $(this).data("item");
					if (value == 2) {
						$('#DoshamList').show();
					} else {
						$('#DoshamList').hide();
						$('.Dosham_ListData li').removeClass('active');
					}
				});
				// Dosam Check
				$(document).on('click', '._Ms_dld', function() {
					$('.Dosham_ListData li label').removeClass('active');
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
