import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery'
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UserGlobalService } from './../../services/user.global';
import { NgxIndexedDBService } from 'ngx-indexed-db';


@Component({
  selector: 'app-my-expectations',
  templateUrl: './my-expectations.component.html',
  styleUrls: ['./my-expectations.component.css']
})

export class MyExpectationsComponent implements OnInit 
{
	Agefrom = [];
  	selectedAgefrom = [];
  	AgefromSettings: IDropdownSettings = {};
  	isAgefrom:boolean = false;

	Ageto = [];
  	selectedAgeto = [];
  	AgetoSettings: IDropdownSettings = {};
  	isAgeto:boolean = false;

  	Maritalstatus = [];
  	selectedMaritalstatus = [];
  	MaritalstatusSettings: IDropdownSettings = {};
  	isMaritalstatus:boolean = false;

  	communities = [];
  	selectedcommunitiesItems = [];
  	communitiesSettings: IDropdownSettings = {};
  	isCommunity:boolean = false;

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

  	Education = [];
  	selectedEducationItems = [];
  	EducationSettings: IDropdownSettings = {};
  	isEducation:boolean = false;

  	Profession = [];
  	selectedProfessionItems = [];
  	ProfessionSettings: IDropdownSettings = {};
  	isProfession:boolean = false;

  	Diet = [];
  	selectedDietItems = [];
  	DietSettings: IDropdownSettings = {};
  	isDiet:boolean = false;

  	arrayCommunity:any=[];
  	arrayCommunity1:any=[];
  	arrayCommunity2:any=[];
  	arrayReligion:any=[];
  	arrayReligion1:any=[];
  	arrayCaste:any=[];
  	arraySubCaste:any=[];
  	//////////////////////////////////////
	isLoading:boolean = false;
	myExpectationsRegister: FormGroup;
	disableBtn = false;
	SubmitbuttonName: string;
	countryLists  :any = [];
	residingStatus :any = [];

	arrayval1: any = [];
    arrayval2: any = [];
    arrayval3: any = [];

	pageSetUp :any;
  	regno     :any;
  	Agedata : any=[];

  	Marital_ids : any = [];
  	Diet_ids : any = [];
	// castateLists = [];
	// cacityLists = [];
	// wastateLists = [];
	// wacityLists = [];
	// pastateLists = [];
	// pacityLists = [];

 constructor(private dbService: NgxIndexedDBService,private UserGlobalService:UserGlobalService, private formBuilder: FormBuilder, private userservice: UserService,
        private notifyService: NotificationService, private router: Router, private titleService: Title) 
  {
  		this.myExpectationsRegister = this.formBuilder.group({
			Agefrom:'',
			Ageto:'',
			selectMaritalstatus:'',
            selectCommunity: '',
            selectReligion: '',
            selectCaste: '',
            selectSubCaste: '',
            selectEducation: '',
            selectProfession: '',
            selectDiet: '',
		});
  	this.SubmitbuttonName = 'Continue';
  }

 	//Agefrom
	onItemSelectedAgefrom(item: any) 
	{
	    if(this.selectedAgefrom)
	    {
	    	if(item.id)
	    	{
	    		this.Ageto = [];
                this.Agedata = [];
                this.selectedAgeto = [];
                this.isAgeto = false;
           
                for (let j = item.id; j <= 55; j++) 
                {
                    this.Agedata.push({
                        id: j,
                        name: j
                    });
                }
               
                this.Ageto= this.Agedata;
                this.isAgefrom = true;
	    	}
	    }
	    else
	    {
	    	this.Ageto = [];
            this.isAgefrom = false;
            this.isAgeto = false;
            this.selectedAgeto = [];
	    }
	}

	onItemDeSelectedAgefrom(item:any)
	{
        this.Ageto = [];
        this.isAgefrom = false;
        this.isAgeto = false;
        this.selectedAgeto = [];
    }

    onSelectAllAgefrom(item:any){}

    //Ageto
	onItemSelectedAgeto(item: any) 
	{
	    if(this.selectedAgeto)
	    {
	    	if(item.id)
	    	{
	    		this.isAgeto = true;
	    	}
	    }
	    else
	    {
	    	this.isAgeto = false;
	    }
	}

	onItemDeSelectedAgeto(item:any)
	{
        this.isAgeto= false;
    }

    onSelectAllAgeto(item:any){}

    //Maritalstatus
	onItemSelectedMaritalstatus(item: any) 
	{
	    if(this.selectedMaritalstatus)
	    {
	    	if(item.id)
	    	{
	    		this.isMaritalstatus = true;
	    	}
	    }
	    else
	    {
	    	this.isMaritalstatus = false;
	    }
	}

	onItemDeSelectedMaritalstatus(item:any)
	{
        this.isMaritalstatus= false;
    }

    onSelectAllMaritalstatus(item:any){}
    
    // Communities
	onItemSelectCommunities(item: any) 
	{
	    if(this.selectedcommunitiesItems)
	    {
	    	if(item.id)
	    	{
	    		// console.log(this.selectedcommunitiesItems);
	    		this.isCommunity = true;

		    	this.selectedreligionsItems = [];
		    	this.isReligion = false;

		    	this.selectedcastesItems = [];
		    	this.isCastes = false;

		    	this.selectedsubcastesItems = [];
		    	this.isSubCastes = false;
		    	// const result = Object.assign({}, this.myExpectationsRegister.value);
		    	let _ca = this.selectedcommunitiesItems;
				this.arrayCommunity = this.UserGlobalService.joinMultiSelect(_ca);
				// arrayCommunity
	    		this.userservice.getData({CommunityId:this.arrayCommunity}, "IdValues/GetReligionBasedonCommunity", "POST").subscribe((response: any) => 
				{
					this.isLoading = false;
					try {
						if (response.code == 1) 
						{
							this.religions = response.dropdownlist;
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

    	if(item.id)
	    	{
	    		// console.log(this.selectedcommunitiesItems);
	    		this.isCommunity = true;

		    	this.selectedreligionsItems = [];
		    	this.isReligion = false;

		    	this.selectedcastesItems = [];
		    	this.isCastes = false;

		    	this.selectedsubcastesItems = [];
		    	this.isSubCastes = false;
		    	// const result = Object.assign({}, this.myExpectationsRegister.value);
		    	let _ca = this.selectedcommunitiesItems;
				this.arrayCommunity = this.UserGlobalService.joinMultiSelect(_ca);
				// arrayCommunity
	    		this.userservice.getData({CommunityId:this.arrayCommunity}, "IdValues/GetReligionBasedonCommunity", "POST").subscribe((response: any) => 
				{
					this.isLoading = false;
					try {
						if (response.code == 1) 
						{
							this.religions = response.dropdownlist;
						} 
						else 
						{
							this.notifyService.showWarning("No data found", "");
						}
					} 
					catch (err) 
					{
						this.notifyService.showInfo("Something went wrong. Try again", "")
						// this.notifyService.showWarning("Getting error", "");
					}
				})
	    	}
    }

    onSelectAllCommunities(item:any){}

    //OnItemDeSelectallCommunities(item:any){}

    // Religions
    onItemSelectReligions(item: any) {
	    if(this.selectedreligionsItems)
	    {
	    	if(item.id)
	    	{
				this.isReligion = true;
				this.selectedcastesItems = [];
		    	this.isCastes = false;

		    	this.selectedsubcastesItems = [];
		    	this.isSubCastes = false;

		    	let _ca = this.selectedcommunitiesItems;
				this.arrayCommunity1 = this.UserGlobalService.joinMultiSelect(_ca);

				let _ca1 = this.selectedreligionsItems;
				this.arrayReligion = this.UserGlobalService.joinMultiSelect(_ca1);

	    		this.userservice.getData({ReligionId:this.arrayReligion,CommunityId:this.arrayCommunity1}, "IdValues/GetCasteBasedonCommunityReligion", "POST").subscribe((response: any) => 
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
	    	this.isReligion = false;
	    }
	}
	OnItemDeSelectReligions(item:any){
        this.isReligion= false;

        this.selectedcastesItems = [];
    	this.isCastes = false;

    	this.selectedsubcastesItems = [];
    	this.isSubCastes = false;

    	if(item.id)
	    	{
				this.isReligion = true;
				this.selectedcastesItems = [];
		    	this.isCastes = false;

		    	this.selectedsubcastesItems = [];
		    	this.isSubCastes = false;

		    	let _ca = this.selectedcommunitiesItems;
				this.arrayCommunity1 = this.UserGlobalService.joinMultiSelect(_ca);

				let _ca1 = this.selectedreligionsItems;
				this.arrayReligion = this.UserGlobalService.joinMultiSelect(_ca1);

	    		this.userservice.getData({ReligionId:this.arrayReligion,CommunityId:this.arrayCommunity1}, "IdValues/GetCasteBasedonCommunityReligion", "POST").subscribe((response: any) => 
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
    onSelectAllReligions(item:any){}

    // Caste
    onItemSelectCastes(item: any) {
	    if(this.selectedcastesItems)
	    {
	    	if(item.id)
	    	{
	    		this.selectedsubcastesItems = [];
    			this.isSubCastes = false;

    			this.isCastes = true;

    			let _ca = this.selectedcommunitiesItems;
				this.arrayCommunity2 = this.UserGlobalService.joinMultiSelect(_ca);

				let _ca1 = this.selectedreligionsItems;
				this.arrayReligion1 = this.UserGlobalService.joinMultiSelect(_ca1);

				let _ca2 = this.selectedcastesItems;
				this.arrayCaste = this.UserGlobalService.joinMultiSelect(_ca2);

		    	this.userservice.getData({CasteId:this.arrayCaste, ReligionId:this.arrayReligion1,CommunityId:this.arrayCommunity2}, "IdValues/GetSubsectByCasteCommunityReligion", "POST").subscribe((response: any) => 
				{
					this.isLoading = false;
					try 
					{
						if (response.code == 1) 
						{
							const res  = response.dropdownlist;
							this.subcastes = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
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
	    	this.isCastes = false;
	    }
	}
	OnItemDeSelectCastes(item:any){
        this.isCastes= false;

        this.selectedsubcastesItems = [];
    	this.isSubCastes = false;

    	if(item.id)
	    	{
	    		this.selectedsubcastesItems = [];
    			this.isSubCastes = false;

    			this.isCastes = true;

    			let _ca = this.selectedcommunitiesItems;
				this.arrayCommunity2 = this.UserGlobalService.joinMultiSelect(_ca);

				let _ca1 = this.selectedreligionsItems;
				this.arrayReligion1 = this.UserGlobalService.joinMultiSelect(_ca1);

				let _ca2 = this.selectedcastesItems;
				this.arrayCaste = this.UserGlobalService.joinMultiSelect(_ca2);

		    	this.userservice.getData({CasteId:this.arrayCaste, ReligionId:this.arrayReligion1,CommunityId:this.arrayCommunity2}, "IdValues/GetSubsectByCasteCommunityReligion", "POST").subscribe((response: any) => 
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
    onSelectAllCastes(item:any){}

    // Sub Caste
    onItemSelectSubCastes(item: any) {
	    if(this.selectedcastesItems)
	    {
	    	this.isSubCastes = true;
	    }
	    else
	    {
	    	this.isSubCastes = false;
	    }
	}
	OnItemDeSelectSubCastes(item:any)
		{
		    this.isSubCastes= false;
		}
    onSelectAllSubCastes(item:any){}

    //Education
	onItemSelectedEducation(item: any) 
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

	onItemDeSelectedEducation(item:any)
		{
	        this.isEducation= false;
	    }

    onSelectAllEducation(item:any){}

    //Profession
	onItemSelectedProfession(item: any) 
		{
		    if(this.selectedProfessionItems)
		    {
		    	if(item.id)
		    	{
		    		this.isProfession = true;
		    	}
		    }
		    else
		    {
		    	this.isProfession = false;
		    }
		}

	onItemDeSelectedProfession(item:any)
		{
	        this.isProfession= false;
	    }

    onSelectAllProfession(item:any){}

    //Diet
	onItemSelectedDiet(item: any) 
		{
		    if(this.selectedDietItems)
		    {
		    	if(item.id)
		    	{
		    		this.isDiet = true;
		    	}
		    }
		    else
		    {
		    	this.isDiet = false;
		    }
		}

	onItemDeSelectedDiet(item:any)
		{
	        this.isDiet= false;
	    }

    onSelectAllDiet(item:any){}

//////////////////////////////////////////////
  	
  	numberOnly(event): boolean {
		const charCode = (event.which) ? event.which : event.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		  return false;
		}
		return true;
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

	            this.SubmitbuttonName = "Loading...";
		        // this.submitted = true;
		        this.disableBtn = true;

		        const result = Object.assign({}, this.myExpectationsRegister.value);
		        //console.log(result);
		        if (result.Agefrom.length && result.Ageto.length && result.selectMaritalstatus.length && result.selectCommunity.length && result.selectReligion.length && result.selectCaste.length && result.selectSubCaste.length && result.selectEducation.length && result.selectProfession.length && result.selectDiet.length) 
		        {
		        	const user_save_info = 
		        	{
		                RegNo: this.regno,
		                AgeMin: result.Agefrom[0].id,
		                AgeMax: result.Ageto[0].id,
		                RegistrationStages:8,
		            };
		            if(result.selectMaritalstatus)
					{
						user_save_info['ExpectMaritalStatus'] = this.UserGlobalService.joinMultiSelect(result.selectMaritalstatus);
					}
					if(result.selectCommunity)
					{
						user_save_info['ExpectCommunity'] = this.UserGlobalService.joinMultiSelect(result.selectCommunity);
					}
					if(result.selectReligion)
					{
						user_save_info['ExpectReligion'] = this.UserGlobalService.joinMultiSelect(result.selectReligion);
					}
					if(result.selectCaste)
					{
						user_save_info['ExpectCaste'] = this.UserGlobalService.joinMultiSelect(result.selectCaste);
					}
					if(result.selectSubCaste)
					{
						user_save_info['ExpectSubsect'] = this.UserGlobalService.joinMultiSelect(result.selectSubCaste);
					}
					if(result.selectEducation)
					{
						user_save_info['ExpectEducation'] = this.UserGlobalService.joinMultiSelect(result.selectEducation);
					}
					if(result.selectProfession)
					{
						user_save_info['ExpectProfession'] = this.UserGlobalService.joinMultiSelect(result.selectProfession);
					}
					if(result.selectDiet)
					{
						user_save_info['ExpectDiet'] = this.UserGlobalService.joinMultiSelect(result.selectDiet);
					}
					// console.log(user_save_info);
		            this.userservice.getData(user_save_info, "Registration/SaveUserInfo", "POST").subscribe((response: any) => 
		            {
						this.isLoading = true;
						try 
						{
							if (response.status == 1) 
							{
								this.userservice.getData({mobile:localStorage.getItem('INkmSet_mb')}, "Registration/SendOTPWeb", "POST").subscribe((response: any) => 
								{
									this.isLoading = false;
									try 
									{
										if (response.status == 1) 
										{
											this.notifyService.showSuccess(response.message, "Great...!");
											this.router.navigate(['register/verify']);
										} 
										else 
										{
											this.notifyService.showError(response.message, "")
											this.SubmitbuttonName= 'Continue';
											this.isLoading = false;
											this.disableBtn = false;
										}
									} 
									catch (err) 
									{
										// this.notifyService.showError("Internal Server Error", "Error")
										this.notifyService.showInfo("Something went wrong. Try again", "")
										this.SubmitbuttonName= 'Continue';
										this.isLoading = false;
										this.disableBtn = false;
									}
								}, (err) => 
								{
									// this.notifyService.showError("Internal Server Error", "Error")
									this.notifyService.showInfo("Something went wrong. Try again", "")
									this.SubmitbuttonName= 'Continue';
									this.isLoading = false;
									this.disableBtn = false;
								});
							} 
							else 
							{
								this.SubmitbuttonName= 'Continue';
								this.isLoading = false;
								this.disableBtn = false;
								this.notifyService.showError(response.message, "")
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
						this.notifyService.showError("Internal Server Error", "Error")
					});
		        } 
		        else 
		        {
		            this.SubmitbuttonName = 'Continue';
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
	  
	goToNextPage() :void {
	  	this.router.navigate(['/register/describe-yourself']);
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


	MaritalStatusSearch(name: string, isChecked: boolean)
    {
        if (isChecked) 
        {
            this.Marital_ids.push(name);
        } 
        else 
        {
              let i: number = 0;
              this.Marital_ids.forEach((item) => 
              {
                if (item == name) 
                {
                    this.Marital_ids.splice(i, 1);
                }
                i++;
              });
              
        }
       
        if ($('#MaritalID'+name).hasClass('active') == true) 
        {
            $('#MaritalID'+name).removeClass('active');
            return false;
        } 
        else 
        {
            $('#MaritalID'+name).addClass('active');
            return false;
        }
    }

 	DietChange(name: string, isChecked: boolean)
    {
        if (isChecked) 
        {
            this.Diet_ids.push(name);
        } 
        else 
        {
              let i: number = 0;
              this.Diet_ids.forEach((item) => 
              {
                if (item == name) 
                {
                    this.Diet_ids.splice(i, 1);
                }
                i++;
              });
              
        }
         //console.log(this.Diet_ids);

        if ($('#DietID'+name).hasClass('active') == true) 
        {
            $('#DietID'+name).removeClass('active');
            return false;
        } 
        else 
        {
            $('#DietID'+name).addClass('active');
            return false;
        }
    }
    
    totalage = [];
    ngOnInit(): void {
	  	for(let i=18;i<=55;i++)
	  	{
	  		this.totalage.push({id:i,name:i});
	  	}

	  	this.dbService.getByKey('setup', 1).subscribe((userData) => 
	    { 
	        localStorage.setItem('pageSetUp',JSON.stringify(userData));

	        this.pageSetUp   = localStorage.getItem("pageSetUp");
	        if(this.pageSetUp!='undefined' && this.pageSetUp != null)
	        {
	            this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
	            this.regno     = this.pageSetUp["INkmSet_id"];


				 //Age From 
			  	this.selectedAgefrom = [];
			    this.AgefromSettings ={
			      	singleSelection: true,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 5,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };
			    this.Agefrom = this.totalage
			    //////////////////////////////

			    //Age to 
			  	this.selectedAgeto = [];
			    this.AgetoSettings ={
			      	singleSelection: true,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 5,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };
			    this.Ageto = this.totalage
			    ////////////////////////////////

			     //Maritalstatus
			  	this.selectedMaritalstatus = [];
			    this.MaritalstatusSettings ={
			      	singleSelection: false,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 2,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };
			    //this.Maritalstatus = this.totalage
			    //////////////////////////////

			    //communities
			    this.selectedcommunitiesItems = [];
			    this.communitiesSettings ={
			      	singleSelection: false,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 2,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };
				////////////////////////////////

			    //religions
			    this.selectedreligionsItems = [];
			    this.religionsSettings ={
			      	singleSelection: false,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 2,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };
			    ////////////////////////////////

			    //castesItems
			    this.selectedcastesItems = [];
			    this.castesSettings ={
			      	singleSelection: false,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 2,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };
			    ////////////////////////////////

			    //subcastesItems
			    this.selectedsubcastesItems = [];
			    this.subcastesSettings ={
			      	singleSelection: false,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 2,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };
			    ///////////////////////////////////////

			    //Education
			    this.selectedEducationItems = [];
			    this.EducationSettings ={
			      	singleSelection: false,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 2,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    //Profession
			    this.selectedProfessionItems = [];
			    this.ProfessionSettings ={
			      	singleSelection: false,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 2,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    //Diet
			    this.selectedDietItems = [];
			    this.DietSettings ={
			      	singleSelection: false,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 2,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };
			    ///////////////////////////////////////
			    // this.userservice. getData('', "IdValues/GetEditProfile", "POST").subscribe((response: any) => {

			    this.userservice. getData({RegNo: this.regno}, "WebMyDashboard/GetDefaultExpectations", "POST").subscribe((response: any) => {
				 	const res  = response.data[0];
				 	const isEdit= response.IdList[0];

				 	this.selectedAgefrom          = [{"id":res.AgeMin,"name":res.AgeMin}];
                    this.selectedAgeto            = [{"id":res.AgeMax,"name":res.AgeMax}];
                   
                    this.selectedcommunitiesItems = res.CommunitySelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.selectedreligionsItems   = res.ReligionSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.selectedcastesItems      = res.CasteSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.selectedsubcastesItems   = res.SubsectSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.selectedEducationItems   = res.EducationSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.selectedProfessionItems  = res.ProfessionSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);

                    if (this.selectedEducationItems.length) 
                    {
                        this.isAgefrom = true;

                         if (this.selectedEducationItems.length) 
                        {
                            this.isAgeto = true;
                        }
                    }

                    if (this.selectedcommunitiesItems.length) {
                        this.isCommunity = true;
                        this.arrayval1 = this.UserGlobalService.joinMultiSelect(this.selectedcommunitiesItems);
                        if (this.selectedreligionsItems.length) {
                            this.isReligion = true;
                            this.arrayval2 = this.UserGlobalService.joinMultiSelect(this.selectedreligionsItems);
                            if (this.selectedcastesItems.length) {
                                this.isCastes = true;
                                this.arrayval3 = this.UserGlobalService.joinMultiSelect(this.selectedcastesItems);
                                if (this.selectedsubcastesItems.length) {
                                    this.isSubCastes = true;
                                }
                            }
                        }
                    }


                    if (this.selectedEducationItems.length) 
                    {
                        this.isEducation = true;
                    }

                    if (this.selectedProfessionItems.length) 
                    {
                        this.isProfession = true;
                    }

				 	this.Maritalstatus   = isEdit.MaritalList.sort((a, b) => (a.name > b.name) ? 1 : -1);
				 	this.communities 	 = isEdit.CommunityList; 
				  	this.Education 		 = isEdit.EducationList.sort((a, b) => (a.name > b.name) ? 1 : -1);
				    this.Profession 	 = isEdit.ProfessionList.sort((a, b) => (a.name > b.name) ? 1 : -1);
				  	this.Diet 			 = isEdit.DietList.sort((a, b) => (a.name > b.name) ? 1 : -1);

				  	this.Maritalstatus.forEach((item) => 
                    {
                        if (item.selected == 1) 
                        {
                            this.Marital_ids.push(item.id);
                        }
                    });
                    //console.log(this.Marital_ids);

                    this.Diet.forEach((item) => 
                    {
                        if (item.selected == 1) 
                        {
                            this.Diet_ids.push(item.id);
                        }
                    });
				  	// this.stars = res.filter(data => data.type == 'Star').sort((a, b) => (a.name > b.name) ? 1 : -1);;
				  	// this.doshams = res.filter(data => data.type == 'Dhosam').sort((a, b) => (a.name > b.name) ? 1 : -1);

				 	// this.Maritalstatus = res.filter(data => data.type == 'Marital_Status').sort((a, b) => (a.name > b.name) ? 1 : -1);
				  	// this.communities = res.filter(data => data.type == 'Community').sort((a, b) => (a.name > b.name) ? 1 : -1);
				  	// this.Education = res.filter(data => data.type == 'Education').sort((a, b) => (a.name > b.name) ? 1 : -1);
				    // this.Profession = res.filter(data => data.type == 'Profession').sort((a, b) => (a.name > b.name) ? 1 : -1);	        
				  	// this.Diet = res.filter(data => data.type == 'Diet').sort((a, b) => (a.name > b.name) ? 1 : -1);
				  	// this.stars = res.filter(data => data.type == 'Star').sort((a, b) => (a.name > b.name) ? 1 : -1);;
				  	// this.doshams = res.filter(data => data.type == 'Dhosam').sort((a, b) => (a.name > b.name) ? 1 : -1);
			  	})

			  	this.titleService.setTitle('Provide Your Expectations details - Kalyanamalai');

			  	this.userservice. getData('', "IdValues/GetCountryList", "POST").subscribe((response: any) => {
			        const res  = response.dropdownlist;
			        this.countryLists = res.filter(data => data.type == 'Country');
			    })

			    this.userservice. getData('', "IdValues/GetEditProfile", "POST").subscribe((response: any) => {
					const res  = response.dropdownlist;
					this.residingStatus = res.filter(data => data.type == 'Residing_Status');
				})

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
			    
			    // Working Address ask
			    $(document).on('click', '._Ms_aswrkadd', function() {
			        if ($(this).data("item") == 2) 
			        {
			            $('#AskWorkingAdd').show();
			        } 
			        else 
			        {
			            $('#AskWorkingAdd').hide();

			            $("#wCountry").val($("#wCountry option:first").val());
			            $('.wCountry').removeClass('focused');

			            $("#wState").val($("#wState option:first").val());
			            $('.wState').removeClass('focused');

			            $("#wCity").val($("#wCity option:first").val());
			            $('.wCity').removeClass('focused');

			            $("#Residing_Status").val($("#Residing_Status option:first").val());
			            $('.Residing_Status').removeClass('focused');
			        }

			            $('.AskWorkingAdd li label').removeClass('active');
			            $(this).addClass('active');
			    });

			    // Working Permanent ask
			    $(document).on('click', '._Ms_asperadd', function() {
			        if ($(this).data("item") == 2) 
			        {
			            $('#AskPermanentAdd').show();
			        } 
			        else 
			        {
			            $('#AskPermanentAdd').hide();

			            $("#pAddress").val("");
			            $('.pAddress').removeClass('focused');

			            $("#pCountry").val($("#pCountry option:first").val());
			            $('.pCountry').removeClass('focused');

			            $("#pState").val($("#pState option:first").val());
			            $('.pState').removeClass('focused');

			            $("#pCity").val($("#pCity option:first").val());
			            $('.pCity').removeClass('focused');
			           
			            $("#pPincode").val("");
			            $('.pPincode').removeClass('focused');
			            $('.pPincode label').removeClass('active');
			        }

			        $('.AskPermanentAdd li label').removeClass('active');
			        $(this).addClass('active');
			    });

			    //communication Address
			    $(document).on('change', '#selectCountry', function(e) {
			        $("#selectCState").val($("#selectCState option:first").val());
			        $('.selectCState').removeClass('focused');

			        $("#selectCCity").val($("#selectCCity option:first").val());
			        $('.selectCCity').removeClass('focused');

			        //$('#cslfm').val("");
			        $("#selectCPincode").val("");
			        $('.selectCPincode').removeClass('focused');
			        $('.selectCPincode label').removeClass('active');
			    });

			    $(document).on('change', '#selectCState', function(e) {
			        $("#selectCCity").val($("#selectCCity option:first").val());
			        $('.selectCCity').removeClass('focused');

			        //$('#cslfm').val("");
			        $("#selectCPincode").val("");
			        $('.selectCPincode').removeClass('focused');
			        $('.selectCPincode label').removeClass('active');
			    });

			     $(document).on('change', '#selectCCity', function(e) {
			        $("#selectCPincode").val("");
			        $('.selectCPincode').removeClass('focused');
			        $('.selectCPincode label').removeClass('active');
			    });

			     //Work place communication Address
			    $(document).on('change', '#wCountry', function(e) {
			        $("#wState").val($("#wState option:first").val());
			        $('.wState').removeClass('focused');

			        $("#wCity").val($("#wCity option:first").val());
			        $('.wCity').removeClass('focused');

			        $("#Residing_Status").val($("#Residing_Status option:first").val());
			        $('.Residing_Status').removeClass('focused');
			    });

			    $(document).on('change', '#wState', function(e) {
			        $("#wCity").val($("#wCity option:first").val());
			        $('.wCity').removeClass('focused');

			        $("#Residing_Status").val($("#Residing_Status option:first").val());
			        $('.Residing_Status').removeClass('focused');
			    });
			     $(document).on('change', '#wCity', function(e) {
			        $("#Residing_Status").val($("#Residing_Status option:first").val());
			        $('.Residing_Status').removeClass('focused');

			    });

			     //permenent communication Address
			    $(document).on('change', '#pCountry', function(e) {
			        $("#pState").val($("#pState option:first").val());
			        $('.pState').removeClass('focused');

			        $("#pCity").val($("#pCity option:first").val());
			        $('.pCity').removeClass('focused');

			        //$('#cslfm').val("");
			        $("#pPincode").val("");
			        $('.pPincode').removeClass('focused');
			        $('.pPincode label').removeClass('active');
			    });

			    $(document).on('change', '#pState', function(e) {
			        $("#pCity").val($("#pCity option:first").val());
			        $('.pCity').removeClass('focused');

			        //$('#cslfm').val("");
			        $("#pPincode").val("");
			        $('.pPincode').removeClass('focused');
			        $('.pPincode label').removeClass('active');
			    });

			     $(document).on('change', '#pCity', function(e) {
			        $("#pPincode").val("");
			        $('.pPincode').removeClass('focused');
			        $('.pPincode label').removeClass('active');
			    });
	        }
	        else
	        {
	            this.router.navigate(['/logout']);    
	        }
	    });
	 
        



  }

}

