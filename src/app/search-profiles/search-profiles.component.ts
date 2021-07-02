import { Component, OnInit,  TemplateRef} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from './../services/user.service';
import * as $ from 'jquery'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationService } from '../services/notification.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UserGlobalService } from './../services/user.global';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';



@Component({
	selector: 'app-search-profiles',
  	templateUrl: './search-profiles.component.html',
  	styleUrls: ['./search-profiles.component.css']
})
export class SearchProfilesComponent implements OnInit 
{
	// regno = localStorage.getItem("INkmSet_id");
	searchProfiles:any=[];
	searchProfileP: number;
	_offset=0;
	itemsPerPage =10;
	totalsearchProfileItems:any=[];

	user_info:any = {};
	MaritalStatus:any=[];
	selectedMaritalstatus:any=[];

	getEmail:string = '';
	getMobile:string = '';
	getPhone:string = '';
	modalRef: BsModalRef;
	config = {
    	keyboard: false,
    	ignoreBackdropClick: true,
    	animated: true
  	};
	isLoading:boolean = false;
	isExpressRegno :string = '';
	expressInterestMsg = [];

	communities:any=[];
  	religions :any=[];
  	castes :any=[];
  	subcastes:any=[];

  	profilesetting : any [];
  	profilesettingSelected : any [];


 	// Communitychecked = false;
	Communityindeterminate = false;
	CommunitylabelPosition: 'before' | 'after' = 'after';
	Communitydisabled = false;

	// Religionchecked = false;
	Religionindeterminate = false;
	ReligionlabelPosition: 'before' | 'after' = 'after';
	Religiondisabled = false;

	// Castechecked = false;
	Casteindeterminate = false;
	CastelabelPosition: 'before' | 'after' = 'after';
	Castedisabled = false;

	// Subsectchecked = false;
	Subsectindeterminate = false;
	SubsectlabelPosition: 'before' | 'after' = 'after';
	Subsectdisabled = false;

	selectedcommunitiesItems:any=[];
	selectedreligionsItems:any=[];
	selectedcastesItems :any=[];
	selectedsubcastesItems :any=[];

	issearchProfileData:boolean = false;
	issearchProfileLoading:boolean = true;
	issearchProfileLoading1 :boolean = true;
	issearchProfileNotFoundLoading:boolean = false;
	defaultImage:string = '';

	arrayCommunity:any=[];
  	arrayCommunity1:any=[];
  	arrayCommunity2:any=[];
  	arrayReligion:any=[];
  	arrayReligion1:any=[];
  	arrayCaste:any=[];
  	arraySubCaste:any=[];

  	arrayval1: any = [];
    arrayval2: any = [];
    arrayval3: any = [];

    search_data:any = [];
    isEdit:any=[];

    casteslength:boolean = false;
    subcasteslength:boolean = false;

    SubmitbuttonSearch = 'Search';

	isDobFocused:boolean = false;
	isDivorceFocused:boolean = false;
	isSubmitTrigger:boolean = false;
	Serch_profileForm: FormGroup;

	submitted = false;
	disableBtn = false;
	SubmitbuttonName: string;
	checkboxChecked:number;

	Marital_ids 	: any = [];
	Religion_ids 	: any = [];
	Communities_ids : any = [];
	Caste_ids 		: any = [];
	SubCaste_ids 	: any = [];

	personalizedMessageForm: FormGroup;
	FwdMessageForm: FormGroup;
	//expressInterestMsg:any = [];
	MsgdisableBtn = false;
	//disableBtn = false;
	//SubmitbuttonName: string;
	MsgSubmitbuttonName: string;
	//isLoading:boolean = false;

	//getEmail:string = '';
	//getMobile:string = '';
	//getPhone:string = '';

	SentInterestMessage: number = null;
	isReplyRegNo:string = '';
	activeProcess:string = '';
	activeMessage:string = '';
	thisContent:string = '';
	textContent:string= '';
	actionButtonTrue:string = '';
	actionButtonFalse:string = '';
	FwdSubmitbuttonName:string;
	SubmitbuttonExpressInterestName:string;
	MsgFwddisableBtn:boolean = false;

	activeprofiledata:any = [];
	activeRegNumber:string = '';
	isBecome:number = null;
	isTotalNofOfContact:string = '';
	isViewedContact:string = '';
	isMatchingNotFoundLoading:boolean = false;
	totalMatchingItems: any;

	pageSetUp  	:any;
    regno 		:any;
    activeSlide = 0;
    galleryItems = [];
    galleryItemsdata:any = [];

    getContactInfo:any = [];
    currentDiff:string = '';
	bookmarkStatus: boolean = false;
	FwrdProfileMessage:any = [];
    matchinglists:any = [];

	constructor(private dbService: NgxIndexedDBService,private UserGlobalService:UserGlobalService, private userservice: UserService,
	 private modalService: BsModalService, private titleService: Title, private notifyService: NotificationService, 
	 private formBuilder: FormBuilder, private router: Router) 
	{
		this.personalizedMessageForm = this.formBuilder.group({
            message: ''
        });
        this.FwdMessageForm = this.formBuilder.group({
            yourEmail: '',
            fwdEmail: ''
        });
        this.MsgSubmitbuttonName = 'Sent Message';
        this.FwdSubmitbuttonName = 'Forward';
        this.SubmitbuttonExpressInterestName= 'Sent Interest';

		this.SubmitbuttonName = 'Search';
		

		this.Serch_profileForm = this.formBuilder.group({
			profilesetting:'',
			MaritalStatus:'',
			communities: '',
			selectCaste:'',
			selectSubCaste: '',
			selectReligion : '',
			// DivorceDate : '',
			// HaveChildrenS : '',
			// ChildrenStay : '',
			// NoofMaleChild : '',
			// NoofFemaleChild : '',
			// dob : '',
			// MotherTongue: '',
			// dobs : '',
			// selectCommunity : '',
			// selectReligion: '',
			// selectCaste: '',
			// selectSubCaste : '',
			// selectStar: '',
			// selectGothram: '',
			// Dosham : '',
			// selectDoshams : '',
		});
	}
  	
  	//SentInterestMessage: number = null;

  	isSetDefault()
	{
		this.dbService.getByKey('setup', 1).subscribe((userData) => { 
        	localStorage.setItem('pageSetUp',JSON.stringify(userData));
  		});
	}




  	getsearchProfile(page) 
	{
		window.scroll(1,1);
		this.issearchProfileData=false;
		this.issearchProfileLoading = true;
		if(page==1)
		{
			this._offset = 0	
		}
		else
		{
			this._offset = (page - 1) * this.itemsPerPage + 1
		}

		let user_search = {
  			limit:this.itemsPerPage,
			offset:this._offset,
			// sLookingFor:'',
			// sAgeFrom:'',
			// sAgeTo:'',
			// sMaritalStatus:'',
			// sCommunity:'',
			// sReligion:'',
			// sCaste:'',
			// sSubsect:'',
			// sStar:'',
			// sComplexion:'',
			// sDosham:'',
			// sEducation:'',
			// sProfession:'',
			// sCountryType:'',
			// sCountry:'',
			// sState:'',
			// sCity:'',
			// sDiet:'',
			// sHeightFrom:'',
			// sHeightTo:'',
			// sSpecialCatogory:'',
			// profilePosted:'',
			// resultPerPage:'',
			// photoStatus:'',
			// starCompatibility:'',
			// horoStatus:'',
			// sRegNo:'',
			// sUserId:'',
			// process:'2',
		    RegNo: this.regno
  		}
		this.userservice. getData(user_search, "WebUserSearch/SearchResults", "POST").subscribe((response: any) => 
		{
			if(response.status==1)
  			{
  				this.issearchProfileData=true;
				this.issearchProfileLoading =false;
				this.searchProfiles =  response.data;
		      	window.scroll(1,2);
		    }
		})
	}
	
    profilesSearch(pl: any)
	{
		let dlprofileid = pl.getAttribute('data-profSrh-id');
		$('.profilesetting li label').removeClass('active');
		$('#ProfileselectID'+dlprofileid).addClass('active');
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

	    this.user_info['sMaritalStatus']= this.Marital_ids.join();
	    this.isLoading = true;
	    this.issearchProfileLoading = true;
	    //console.log(this.user_info);
	    this.userservice. getData(this.user_info, "AdvancedSearch", "POST").subscribe((response: any) => 
  		{
  			this.isLoading = false;
  			this.issearchProfileLoading = false;

  			if(response.status==1)
  			{
  				
	  			let _searchProfiles = response.data;
	  			if(_searchProfiles.length)
	  			{
  					this.issearchProfileData=true;
					this.searchProfiles =  _searchProfiles;
	  			}
		      	this.totalsearchProfileItems = response.total;	
  			}
  			else
  			{
  				this.issearchProfileNotFoundLoading = true;
  			}
	  	})

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

	CommunitiesSearch(name: string, isChecked: boolean)
	{
		if (isChecked) 
	    {
	    	this.Communities_ids.push(name);
	    } 
	    else 
	    {
	    	let i: number = 0;
	      	this.Communities_ids.forEach((item) => 
	      	{
	        	if (item == name) 
	        	{
	        		this.Communities_ids.splice(i, 1);
	        	}
	        	i++;
	      	});
	      	
	    }
	   // console.log(this.Communities_ids);

	    this.user_info['sCommunity']= this.Communities_ids.join();
	    this.isLoading = true;
	    this.issearchProfileLoading = true;

	    this.userservice. getData(this.user_info, "AdvancedSearch", "POST").subscribe((response: any) => 
  		{
  			this.isLoading = false;
  			this.issearchProfileLoading = false;

  			if(response.status==1)
  			{
  				
	  			let _searchProfiles = response.data;
	  			if(_searchProfiles.length)
	  			{
  					this.issearchProfileData=true;
					this.searchProfiles =  _searchProfiles;
	  			}
		      	this.totalsearchProfileItems = response.total;	
  			}
  			else
  			{
  				this.issearchProfileNotFoundLoading = true;
  			}
	  	})

	
		if ($('#CommunityID'+name).hasClass('active') == true) 
		{
            $('#CommunityID'+name).removeClass('active');
            return false;
        } 
        else 
        {
            $('#CommunityID'+name).addClass('active');
            return false;
        }
	}
	
	ReligionSearch(name: string, isChecked: boolean) 
	{
		
	    if (isChecked) 
	    {
	    	this.Religion_ids.push(name);
	    } 
	    else 
	    {
	      	let i: number = 0;
	      	this.Religion_ids.forEach((item) => 
	      	{
	        	if (item == name) 
	        	{
	        		this.Religion_ids.splice(i, 1);
	        	}
	        	i++;
	      	});
	    }
	    //console.log(this.Religion_ids.join());
	    this.user_info['sReligion']= this.Religion_ids.join();
	    this.isLoading = true;
	    this.issearchProfileLoading = true;
	    //console.log(this.user_info);

	    this.userservice. getData(this.user_info, "AdvancedSearch", "POST").subscribe((response: any) => 
  		{
  			this.isLoading = false;
  			this.issearchProfileLoading = false;

  			if(response.status==1)
  			{
  				
	  			let _searchProfiles = response.data;
	  			if(_searchProfiles.length)
	  			{
  					this.issearchProfileData=true;
					this.searchProfiles =  _searchProfiles;
	  			}
		      	this.totalsearchProfileItems = response.total;	
  			}
  			else
  			{
  				this.issearchProfileNotFoundLoading = true;
  			}
	  	})
	}

	CasteSearch(name: string, isChecked: boolean)
	{
		if (isChecked) 
	    {
	    	this.Caste_ids.push(name);
	    } 
	    else 
	    {
	    	let i: number = 0;
	      	this.Caste_ids.forEach((item) => 
	      	{
	        	if (item == name) 
	        	{
	        		this.Caste_ids.splice(i, 1);
	        	}
	        	i++;
	      	});
	      	
	    }

	    this.user_info['sCaste']= this.Caste_ids.join();
	    this.isLoading = true;
	    this.issearchProfileLoading = true;

	    this.userservice. getData(this.user_info, "AdvancedSearch", "POST").subscribe((response: any) => 
  		{
  			this.isLoading = false;
  			this.issearchProfileLoading = false;

  			if(response.status==1)
  			{
  				
	  			let _searchProfiles = response.data;
	  			if(_searchProfiles.length)
	  			{
  					this.issearchProfileData=true;
					this.searchProfiles =  _searchProfiles;
	  			}
		      	this.totalsearchProfileItems = response.total;	
  			}
  			else
  			{
  				this.issearchProfileNotFoundLoading = true;
  			}
	  	})
	}

	SubCasteSearch(name: string, isChecked: boolean)
	{
		if (isChecked) 
	    {
	    	this.SubCaste_ids.push(name);
	    } 
	    else 
	    {
	    	let i: number = 0;
	      	this.SubCaste_ids.forEach((item) => 
	      	{
	        	if (item == name) 
	        	{
	        		this.SubCaste_ids.splice(i, 1);
	        	}
	        	i++;
	      	});
	      	
	    }

	    this.user_info['sSubsect']= this.SubCaste_ids.join();
	    this.isLoading = true;
	    this.issearchProfileLoading = true;

	    this.userservice. getData(this.user_info, "AdvancedSearch", "POST").subscribe((response: any) => 
  		{
  			this.isLoading = false;
  			this.issearchProfileLoading = false;

  			if(response.status==1)
  			{
  				
	  			let _searchProfiles = response.data;
	  			if(_searchProfiles.length)
	  			{
  					this.issearchProfileData=true;
					this.searchProfiles =  _searchProfiles;
	  			}
		      	this.totalsearchProfileItems = response.total;	
  			}
  			else
  			{
  				this.issearchProfileNotFoundLoading = true;
  			}
	  	})
	}

  	ngOnInit(): void 
  	{
  		this.dbService.getByKey('setup', 1).subscribe((userData) => { 
        	localStorage.setItem('pageSetUp',JSON.stringify(userData));
        	this.pageSetUp   = localStorage.getItem("pageSetUp");

	        if(this.pageSetUp!='undefined' && this.pageSetUp != null)
	        {
	            this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
	            this.regno     = this.pageSetUp["INkmSet_id"];
	  		
	            //console.log(localStorage.getItem('INkmSearch_data'));
		  		this.checkboxChecked = 1;
		  		this.search_data = JSON.parse(localStorage.getItem('INkmSearch_data'));
		  		this.user_info['sSaveRegNo']= this.regno;
				this.user_info['limit']= this.itemsPerPage;
				this.user_info['offset']= this._offset;
				// this.user_info['sLookingFor']= this.search_data[1][1];
				// this.user_info['sAgeFrom']= this.search_data[2][1];
				// this.user_info['sAgeTo']= this.search_data[3][1];
				// this.user_info['sMaritalStatus']= this.search_data[4][1];
				// this.user_info['sCommunity']= this.search_data[5][1];
				// this.user_info['sReligion']= this.search_data[6][1];
				// this.user_info['sCaste']= this.search_data[7][1];
				// this.user_info['sSubsect']= this.search_data[8][1];	

		  		// console.log(this.search_data);
		  		this.defaultImage = 'https://cdn.dribbble.com/users/154550/screenshots/3014408/untitled-9.gif';

		  		// let user_info = {
					// sStar:'',
					// sComplexion:'',
					// sDosham:'',
					// sEducation:'',
					// sProfession:'',
					// sCountryType:'',
					// sCountry:'',
					// sState:'',
					// sCity:'',
					// sDiet:'',
					// sHeightFrom:'',
					// sHeightTo:'',
					// sSpecialCatogory:'',
					// profilePosted:'',
					// resultPerPage:'',
					// photoStatus:'',
					// starCompatibility:'',
					// horoStatus:'',
					// sRegNo:'',
					// sUserId:'',
					// process:'',
					// sSaveRegNo:'',
		  		// }

		  		this.isLoading = true;
		  		this.issearchProfileLoading = true;
		  		this.issearchProfileLoading1 = true;
		  		
		  		//console.log(this.user_info);
		  		this.userservice. getData({ RegNo: this.regno,limit:this.itemsPerPage,offset:this._offset }, "WebUserSearch/SearchResults", "POST").subscribe((response: any) => 
		  		{
		  			//console.log(response);
		  			this.issearchProfileLoading = false;
		  			this.issearchProfileLoading1 = false;
		  			if(response.status==1)
		  			{
		  				
			  			let _searchProfiles = response.data;
			  			if(_searchProfiles.length)
			  			{
		  					this.issearchProfileData=true;
							this.searchProfiles =  _searchProfiles;
			  			}
				      	this.totalsearchProfileItems = response.total;

				      	//**************************************************************//

					    const res1 = response.IdValues[0];
			        	this.isEdit = res1;

			        	this.isLoading = false;

			            this.profilesetting = this.isEdit.PhotoSettings.sort((a, b) => (a.name > b.name) ? 1 : -1);
			            this.MaritalStatus  = this.isEdit.Marital.sort((a, b) => (a.name > b.name) ? 1 : -1);
				        this.communities    = this.isEdit.Community.sort((a, b) => (a.name > b.name) ? 1 : -1);
				        this.religions      = this.isEdit.Religion.sort((a, b) => (a.name > b.name) ? 1 : -1);  
				        this.castes      	= this.isEdit.Caste.sort((a, b) => (a.name > b.name) ? 1 : -1);  
				        this.subcastes      = this.isEdit.Subsect.sort((a, b) => (a.name > b.name) ? 1 : -1);  

				       
				        if(this.castes.length<=6)
				        {
				        	this.casteslength = true;
				        }

				        if(this.subcastes.length<=6)
				        {
				        	this.subcasteslength = true;
				        }
				       
			            this.MaritalStatus.forEach((item) => 
				      	{
				        	if (item.selected == 1) 
				        	{
				        		this.Marital_ids.push(item.id);
				        	}
				      	});

				      	this.communities.forEach((item) => 
				      	{
				        	if (item.selected == 1) 
				        	{
				        		this.Communities_ids.push(item.id);
				        	}
				      	});

			            this.religions.forEach((item) => 
				      	{
				        	if (item.selected == 1) 
				        	{
				        		this.Religion_ids.push(item.id);
				        	}
				      	});

				      	this.castes.forEach((item) => 
				      	{
				        	if (item.selected == 1) 
				        	{
				        		this.Caste_ids.push(item.id);
				        	}
				      	});

				      	this.subcastes.forEach((item) => 
				      	{
				        	if (item.selected == 1) 
				        	{
				        		this.Caste_ids.push(item.id);
				        	}
				      	});



				      	//**************************************************************//

				      	this.activeprofiledata = response.contactdetails[0];
				      	this.activeRegNumber =this.activeprofiledata.RegNumber;

				      	this.expressInterestMsg = this.activeprofiledata.expressinterestlist;

				      	this.isTotalNofOfContact= this.activeprofiledata.NoOfContacts;
						this.isViewedContact= this.activeprofiledata.ViewedContacts;
				      	if(this.activeprofiledata.PaymentStatus=="Free")
				      	{
				      		this.isBecome = 0;
				      	}
				      	else if(this.activeprofiledata.PaymentStatus=="Paid")
				      	{
				      		this.isBecome = 1;	
				      	}
				      	else if(this.activeprofiledata.PaymentStatus=="Complementry")
				      	{
				      		this.isBecome = 1;	
				      	}
				      	else if(this.activeprofiledata.PaymentStatus=="Renewal")
				      	{
				      		this.isBecome = 2;	
				      	}

				      	this.totalMatchingItems = response.totalmatchinglist;

			  			let _matchData = response.data;
			  			if(_matchData.length)
			  			{
							this.matchinglists =  _matchData;
							window.scroll(1,1);
			  			}
			  			else
			  			{
			  				this.isMatchingNotFoundLoading = true;
			  			}
		      		}
		  			else
		  			{
		  				this.issearchProfileNotFoundLoading = true;
		  				this.isLoading = false;
		  			}


			  	})

		  		this.titleService.setTitle('Search Profile - Kalyanamalai');


				$(document).on('click', '.moreCommunity', function() 
				{
			  		if( $(this).hasClass('less') )
			  		{    
					    $(this).text('More...').removeClass('less');
					    $('.Community').addClass('hide');
						$('.Community').removeClass('show');    
					}
					else
					{
					    $(this).text('Less...').addClass('less'); 
					    $('.Community').removeClass('hide');
						$('.Community').addClass('show'); 
					}  
				}); 

				$(document).on('click', '.moreReligion', function() 
				{
			  		if( $(this).hasClass('less') )
			  		{    
					    $(this).text('More...').removeClass('less');
					    $('.Religion').addClass('hide');
						$('.Religion').removeClass('show');    
					}
					else
					{
					    $(this).text('Less...').addClass('less'); 
					    $('.Religion').removeClass('hide');
						$('.Religion').addClass('show'); 
					}  
				}); 

				$(document).on('click', '.moreCaste', function() 
				{
			  		if( $(this).hasClass('less') )
			  		{    
					    $(this).text('More...').removeClass('less');
					    $('.Caste').addClass('hide');
						$('.Caste').removeClass('show');    
					}
					else
					{
					    $(this).text('Less...').addClass('less'); 
					    $('.Caste').removeClass('hide');
						$('.Caste').addClass('show'); 
					}  
				}); 

				$(document).on('click', '.moreSubCaste', function() 
				{
			  		if( $(this).hasClass('less') )
			  		{    
					    $(this).text('More...').removeClass('less');
					    $('.SubCaste').addClass('hide');
						$('.SubCaste').removeClass('show');    
					}
					else
					{
					    $(this).text('Less...').addClass('less'); 
					    $('.SubCaste').removeClass('hide');
						$('.SubCaste').addClass('show'); 
					}  
				}); 

			}
	        else
	        {
	            this.router.navigate(['/logout']);    
	        }
	    });
	}

	closeModal()
	{
		// this.modalRef.hide();
		// this.SentInterestMessage = null;
		// this.getEmail = '';
		// this.getMobile = '';
		// this.getPhone = '';
		// this.modalRef.hide();
		// this.SentInterestMessage = null;
		// this.personalizedMessageForm.reset();
		// this.FwdMessageForm.reset();
		// this.getEmail = '';
		// this.getMobile = '';
		// this.getPhone = '';
		// this.isReplyRegNo = '';
		this.modalRef.hide();
		this.SentInterestMessage = null;
		this.personalizedMessageForm.reset();
		this.FwdMessageForm.reset();
		this.isReplyRegNo = '';
		this.getContactInfo = [];
	}

	

	activateClass(index: number)
	{
		this.SentInterestMessage = index;
	}

	onMessageSubmit() 
	{
		this.dbService.getByKey('setup', 1).subscribe((userData) => 
		{ 
        	localStorage.setItem('pageSetUp',JSON.stringify(userData));
            this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
            this.regno = this.pageSetUp["INkmSet_id"];

            const result = Object.assign({}, this.personalizedMessageForm.value);
			if(result.message)
			{
				this.MsgdisableBtn = true;
				this.MsgSubmitbuttonName = 'Loading';
				this.isLoading = true;
				this.userservice. getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo,Message:result.message}, "WebViewMatchProfile/SendMessage", "POST").subscribe((response: any) => 
		  		{
					this.isLoading = false;
					this.closeModal();
					if (response.status == 1) 
					{
						this.notifyService.showSuccess(response.message, "")
						this.MsgdisableBtn = false;
						this.MsgSubmitbuttonName = 'Sent Message';
					} 
					else 
					{
						this.MsgdisableBtn = false;
						this.MsgSubmitbuttonName = 'Sent Message';
						this.activeMessage = response.message;
						this.actionButtonTrue = 'Ok';
						this.actionButtonFalse = 'Cancel';
				    	this.modalRef = this.modalService.show(this.textContent, this.config);
					}
			  	}, 
			  	(err) => 
				{
					this.MsgdisableBtn = false;
					this.MsgSubmitbuttonName = 'Sent Message';
					this.notifyService.showInfo("Something went wrong. Try again", "")
				})
			}
			else
			{
				this.notifyService.showWarning("Enter your message to Continue", "");
			}
  		});
	}

	onFwdMessageSubmit() 
	{
		this.dbService.getByKey('setup', 1).subscribe((userData) => 
		{ 
        	localStorage.setItem('pageSetUp',JSON.stringify(userData));
        	this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
            this.regno = this.pageSetUp["INkmSet_id"];

            const fwdresult = Object.assign({}, this.FwdMessageForm.value);
			if(fwdresult.fwdEmail)
			{
				let emailpattern =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		        if(fwdresult.fwdEmail.match(emailpattern))
			    {
			    	this.MsgFwddisableBtn = true;
					this.MsgSubmitbuttonName = 'Loading';
					this.isLoading = true;
					this.userservice. getData({LoginRegNo:this.regno,ForwardProfileRegNo:this.isReplyRegNo,ToEmail:fwdresult.fwdEmail}, "WebMyDashboard/ProfileForward", "POST").subscribe((response: any) => 
			  		{
						this.isLoading = false;
						if (response.code == 1) 
						{
							this.closeModal();
							this.MsgFwddisableBtn = false;
							this.FwdSubmitbuttonName = 'Forward';
							this.notifyService.showSuccess(response.message, "")
						} 
						else 
						{
							this.MsgFwddisableBtn = false;
							this.FwdSubmitbuttonName = 'Forward';
							this.notifyService.showWarning(response.message, "")
						}
				  	}, 
				  	(err) => 
					{
						this.MsgFwddisableBtn = false;
						this.MsgSubmitbuttonName = 'Forward';
						this.notifyService.showInfo("Something went wrong. Try again", "")
					})
			  	}
			  	else
			  	{
			  		this.notifyService.showWarning("Enter valid email Id", "");
			  	}
			}
			else
			{
				this.notifyService.showWarning("Enter email Id to Continue", "");
			}
  		});
	}

	SentExpressInterest() 
	{
		if(this.SentInterestMessage!=null && this.isReplyRegNo)
		{
			let vs = this.expressInterestMsg[this.SentInterestMessage].name;
			this.isLoading = true;
			this.disableBtn = true;
			this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo,Message:vs}, "WebViewMatchProfile/SendExpressInterest", "POST").subscribe((res: any) => 
			{
				this.isLoading = false;
				try 
				{
					if (res.status == 1) 
					{
						this.closeModal();
						this.SentInterestMessage = null;
						this.disableBtn = false;
						this.notifyService.showSuccess(res.message, "")
					} 
					else 
					{
						this.SubmitbuttonName= 'Sent Interest';
						this.notifyService.showWarning(res.message, "")
						this.disableBtn = false;
					}
				} 
				catch (err) 
				{
					this.SubmitbuttonName= 'Sent Interest';
					this.disableBtn = false;
					this.notifyService.showError(res.message, "")
				}
			}, 
			(err) => 
			{
				this.SubmitbuttonName= 'Sent Interest';
				this.isLoading = false;
				this.disableBtn = false;
				this.notifyService.showInfo("Something went wrong. Try again", "")
			});
		}
		else
		{
			this.notifyService.showWarning("Select any Message and send Interest ", "");
		}
	}
	
	switchSlide(item:any)
    {
        this.activeSlide = item;
    }
    SentHoroscopeRequest()
    {
    	this.isLoading = true;
		this.userservice. getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/HoroscopeRequest", "POST").subscribe((response: any) => 
		{
			this.isLoading = false;
			if(response.status==1)
  			{
  				this.notifyService.showSuccess(response.message, "");
		    }
		    else
		    {
		    	this.notifyService.showWarning(response.message, "");
		    }
		})
    }
    SentAlbumRequest()
    {
    	this.isLoading = true;
		this.userservice. getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/AlbumRequest", "POST").subscribe((response: any) => 
		{
			this.isLoading = false;
			if(response.status==1)
  			{
  				this.notifyService.showSuccess(response.message, "");
		    }
		    else
		    {
		    	this.notifyService.showWarning(response.message, "");
		    }
		})
    }
    SentPhotoRequest()
    {
    	this.isLoading = true;
		this.userservice. getData({FromRegNo:this.regno,ToRegNo:this.isReplyRegNo}, "WebViewMatchProfile/PhotoRequest", "POST").subscribe((response: any) => 
		{
			this.isLoading = false;
			if(response.status==1)
  			{
  				this.notifyService.showSuccess(response.message, "");
		    }
		    else
		    {
		    	this.notifyService.showWarning(response.message, "");
		    }
		})
    }

	_ModalResponseLoading:boolean = false;
    _ModalResponseData:boolean = false;

    _ModalContactLoading:boolean = false;
    _ModalContacteData:boolean = false;
	openCommonModal(content, personalized, prosess, regnumber, diff) 
	{
		this.dbService.getByKey('setup', 1).subscribe((userData) => 
		{ 
        	localStorage.setItem('pageSetUp',JSON.stringify(userData));
  		});

		this.textContent = content;
		this.activeProcess = prosess; 
		this.isReplyRegNo = regnumber;
		if(prosess=='contact')
		{
			this.isLoading = true;
			this._ModalResponseLoading = true;
			this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/GetContactStatusMsg", "POST").subscribe((response: any) => 
			{
				this.isLoading = false;
				this._ModalResponseLoading = false;
				if(response.status==0)
				{
					this.isBecome=0;
					this._ModalResponseData = false;
					this.activeMessage = '<i class="las la-exclamation-circle"></i> '+response.message;
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Close';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if (response.status==1)
				{
					// Need to Confirmation
					this._ModalResponseData = true;
					this.isBecome=1;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = 'Yes';
					this.actionButtonFalse = 'No';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
				}
				else if (response.status==2)
				{
					// Need to Upgrade Membership
					this._ModalResponseData = true;
			    	this.isBecome=2;
			    	this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = 'Upgrade';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
				}
				else if (response.status==3)
				{
					// Display message for QC Verification
			    	this.isBecome=0;
			    	this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
				}
				else if (response.status==4)
				{
					// Display message for Exclusive Member
			    	this.isBecome=0;
			    	this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
				}
			})
		}
		else if(prosess=='expressinterest')
		{
			this.modalRef.hide();
			this.isLoading = true;
			this._ModalResponseLoading = true;
			this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/CheckAlreadyExpress", "POST").subscribe((response: any) => 
			{
				this.isLoading = false;
				this._ModalResponseLoading = false;
				if(response.status==0)
				{
					// 0 Error
					this.activeMessage = '<i class="las la-exclamation-circle"></i> '+response.message;
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Close';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
				else if(response.status==1)
	  			{
	  				// 1-Need to Confirmation
			    	this._ModalResponseData = true;
	  				this.isBecome=1;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = 'Yes';
					this.actionButtonFalse = 'No';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==2)
			    {
			    	// 2-Need to Upgrade Membership
			    	this._ModalResponseData = true;
			    	this.isBecome=2;
			    	this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = 'Upgrade Membership';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==3)
			    {
			    	// 3-Display message for QC Verification
			    	this._ModalResponseData = true;
			    	this.isBecome=0;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==5)
			    {
			    	// Send Directly without confirmation
			    	this.thisContent = personalized;
			    	this.modalRef = this.modalService.show(this.thisContent, this.config);
			    }
			    else if(response.status==6)
			    {
			    	// Display Message for Already send and Reply Message Received
			    	this.isBecome=0;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==7)
			    {
			    	// Already received interest from this profile. Need to reply
			    	this._ModalResponseData = true;
			    	this.isBecome=3;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = 'Reply';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			})
		}
		else if(prosess=='message')
		{
			this.modalRef.hide();
			this.isLoading = true;
			this._ModalResponseLoading = true;
			this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/CheckMessageStatusMsg", "POST").subscribe((response: any) => 
			{
				this.isLoading = false;
				this._ModalResponseLoading = false;
				if(response.status==0)
				{
					// 0 Error
					this.activeMessage = '<i class="las la-exclamation-circle"></i> '+response.message;
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Close';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
				else if(response.status==1)
	  			{
	  				// 1-Need to Confirmation
			    	this._ModalResponseData = true;
	  				this.isBecome=1;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = 'Yes';
					this.actionButtonFalse = 'No';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==2)
			    {
			    	// 2-Need to Upgrade Membership
			    	this._ModalResponseData = true;
			    	this.isBecome=2;
			    	this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = 'Upgrade Membership';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==3)
			    {
			    	// 3-Display message for QC Verification
			    	this._ModalResponseData = true;
			    	this.isBecome=0;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==5)
			    {
			    	// Send Directly without confirmation
			    	this.thisContent = personalized;
			    	this.modalRef = this.modalService.show(this.thisContent, this.config);
			    }
			})
		}
		else if(prosess=='photo')
		{
			this.isLoading = true;
			this._ModalResponseLoading = true;
			this.userservice.getData({FromRegNo:this.regno,ToRegNo:this.isReplyRegNo}, "WebViewMatchProfile/GetPhotoStatusMsg", "POST").subscribe((response: any) => 
			{
				this.isLoading = false;
				this._ModalResponseLoading = false;
				if(response.status==0)
				{
					// 0 Error
					this.activeMessage = '<i class="las la-exclamation-circle"></i> '+response.message;
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Close';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
				else if(response.status==1)
	  			{
	  				// 1-Need to Confirmation
			    	this._ModalResponseData = true;
	  				this.isBecome=1;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+ (response.confirmation ? response.confirmation : '');
					this.actionButtonTrue = 'Yes';
					this.actionButtonFalse = 'No';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==2)
			    {
			    	// 2-Need to Upgrade Membership
			    	this._ModalResponseData = true;
			    	this.isBecome=2;
			    	this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');
					this.actionButtonTrue = 'Upgrade Membership';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==3)
			    {
			    	// 3-Display message for QC Verification
			    	this._ModalResponseData = true;
			    	this.isBecome=0;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==5)
			    {
			    	// Send Directly without confirmation
			    	this.SentPhotoRequest();
			    }
			})
		}
		else if(prosess=='album')
		{
			this.isLoading = true;
			this._ModalResponseLoading = true;
			this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/GetAlbumStatusMsg", "POST").subscribe((response: any) => 
			{
				this.isLoading = false;
				this._ModalResponseLoading = false;
				if(response.status==0)
				{
					// 0 Error
					this.activeMessage = '<i class="las la-exclamation-circle"></i> '+response.message;
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Close';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
				else if(response.status==1)
	  			{
	  				// 1-Need to Confirmation
			    	this._ModalResponseData = true;
	  				this.isBecome=1;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+ (response.confirmation ? response.confirmation : '');
					this.actionButtonTrue = 'Yes';
					this.actionButtonFalse = 'No';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==2)
			    {
			    	// 2-Need to Upgrade Membership
			    	this._ModalResponseData = true;
			    	this.isBecome=2;
			    	this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');
					this.actionButtonTrue = 'Upgrade Membership';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==3)
			    {
			    	// 3-Display message for QC Verification
			    	this._ModalResponseData = true;
			    	this.isBecome=0;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==5)
			    {
			    	// Send Directly without confirmation
			    	this.SentAlbumRequest();
			    }
			})
		}
		else if(prosess=='horoscope')
		{
			this.isLoading = true;
			this._ModalResponseLoading = true;
			this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/GetHoroscopeStatusMsg", "POST").subscribe((response: any) => 
			{
				this.isLoading = false;
				this._ModalResponseLoading = false;
				if(response.status==0)
				{
					// 0 Error
					this.activeMessage = '<i class="las la-exclamation-circle"></i> '+response.message;
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Close';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
				else if(response.status==1)
	  			{
	  				// 1-Need to Confirmation
			    	this._ModalResponseData = true;
	  				this.isBecome=1;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = 'Yes';
					this.actionButtonFalse = 'No';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==2)
			    {
			    	// 2-Need to Upgrade Membership
			    	this._ModalResponseData = true;
			    	this.isBecome=2;
			    	this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = 'Upgrade Membership';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==3)
			    {
			    	// 3-Display message for QC Verification
			    	this._ModalResponseData = true;
			    	this.isBecome=0;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			    else if(response.status==5)
			    {
			    	// Send Directly without confirmation
			    	this.thisContent = personalized;
			    	this.SentHoroscopeRequest();
			    }
			})
		}
		else if(prosess=='block')
		{
			this._ModalResponseData = false;
			this.currentDiff = diff;
			this.isLoading = true;
			this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/GetConfirmationtoBlock", "POST").subscribe((response: any) => 
			{
				this.isLoading = false;
				this._ModalResponseLoading = false;
				if(response.status==0)
				{
					this.isLoading = false;
					// 0 Error
					this.activeMessage = '<i class="las la-exclamation-circle"></i> '+response.message;
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Close';
					this.modalRef = this.modalService.show(content, this.config);
			    }
				else if(response.status==1)
	  			{
	  				// 1-Need to Confirmation
			    	this._ModalResponseData = true;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = 'Block';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			})
		}
		else if(prosess=='bookmark')
		{
			this._ModalResponseData = false;
			this.currentDiff = diff;
			this.isLoading = true;
			this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/GetConfirmationtoBookmark", "POST").subscribe((response: any) => 
			{
				this.isLoading = false;
				this._ModalResponseLoading = false;
				if(response.status==0)
				{
					this.isLoading = false;
					// 0 Error
					this.activeMessage = '<i class="las la-exclamation-circle"></i> '+response.message;
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Close';
					this.modalRef = this.modalService.show(content, this.config);
			    }
				else if(response.status==1)
	  			{
	  				// 1-Need to Confirmation
			    	this._ModalResponseData = true;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = 'Bookmark';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			})
		}
		else if(prosess=='ignore')
		{
			this._ModalResponseData = false;
			this.currentDiff = diff;
			this.isLoading = true;
			this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/GetConfirmationtoIgnore", "POST").subscribe((response: any) => 
			{
				this.isLoading = false;
				this._ModalResponseLoading = false;
				if(response.status==0)
				{
					this.isLoading = false;
					// 0 Error
					this.activeMessage = '<i class="las la-exclamation-circle"></i> '+response.message;
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Close';
					this.modalRef = this.modalService.show(content, this.config);
			    }
				else if(response.status==1)
	  			{
	  				// 1-Need to Confirmation
			    	this._ModalResponseData = true;
	  				this.activeMessage = '<strong> '+response.message+ '</strong>'+(response.confirmation ? response.confirmation : '');	
					this.actionButtonTrue = 'Ignore';
					this.actionButtonFalse = 'Cancel';
					this.thisContent = personalized;
					this.modalRef = this.modalService.show(content, this.config);
			    }
			})
		}
		else if(prosess=='forward')
		{
			// this.modalRef = this.modalService.show(personalized, this.config);
			this.currentDiff = diff;
			this.isLoading = true;
			this.userservice.getData({LoginRegNo:this.regno,ForwardProfileRegNo:this.isReplyRegNo}, "WebMyDashboard/ProfileForwardContent", "POST").subscribe((response: any) => 
			{
				this.isLoading = false;
				if(response.status==0)
				{
					this.activeMessage = '<i class="las la-exclamation-circle"></i> '+ (response.message ? response.message : 'Something went wrong. Try again in a few minutes');
					this.actionButtonTrue = '';
					this.actionButtonFalse = 'Close';
					this.modalRef = this.modalService.show(content, this.config);
			    }
				else if(response.status==1)
	  			{
	  				this.FwrdProfileMessage = response.confirmation;
					this.modalRef = this.modalService.show(personalized, this.config);
			    }
			})
		} 
		else if(prosess=='gallery')
	    {
	        this.galleryItemsdata = this.UserGlobalService.getGalleryItemforsearch(this.searchProfiles, this.isReplyRegNo);
	        this.galleryItems = this.galleryItemsdata.IMAGES;
	        this.modalRef = this.modalService.show(personalized, Object.assign({}, { class: 'top2Per',keyboard: false,ignoreBackdropClick: true,animated: true, })); 
	    }
	} 

	getsearchProfiles()
	{
		this.userservice. getData({regno:this.regno,limit:this.itemsPerPage,offset:this._offset}, "WebMyDashboard/RecentVisitors", "POST").subscribe((response: any) => 
  		{
  			this.issearchProfileData = false;
  			if(response.status==1)
  			{
		      	this.totalsearchProfileItems = response.total;
	  			let _matchData = response.data;
	  			if(_matchData.length)
	  			{
					this.searchProfiles =  _matchData;
	  			}
	  			else
	  			{
	  				this.issearchProfileData = true;
	  			}
  			}
  			else
  			{
  				this.issearchProfileData = true;
  				this.totalsearchProfileItems = 0;
  			}
	  	})
	}

	customPopUp()
	{
		this.dbService.getByKey('setup', 1).subscribe((userData) => 
        { 
            localStorage.setItem('pageSetUp',JSON.stringify(userData));

            this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
            this.regno = this.pageSetUp["INkmSet_id"];

            this.actionButtonTrue = '';
			this.actionButtonFalse = '';
			if(this.activeProcess=='contact')
			{
				this.modalRef.hide();
				if(this.isBecome==1)
				{
					this._ModalContacteData = false;
					this._ModalContactLoading = true;
					this.userservice. getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/GetContactDetails", "POST").subscribe((response: any) => 
					{
						this._ModalContactLoading = false;
						if(response.status==1)
			  			{
			  				this.getContactInfo= response;
			  				this._ModalContacteData = true;
			  				this.modalRef = this.modalService.show(this.thisContent, this.config);
					    }
					    else
					    {
					    	this.activeMessage = response.message;
							this.actionButtonTrue = 'Ok';
							this.actionButtonFalse = 'Cancel';
					    	this.modalRef = this.modalService.show(this.textContent, this.config);
					    }
					})
				}
				else if(this.isBecome==2)
				{
					this.router.navigate(['schemes']);
				}
			}
			else if(this.activeProcess=='expressinterest')
			{
				this.modalRef.hide();
				if(this.isBecome==1 || this.isBecome==3)
				{
					this.modalRef = this.modalService.show(this.thisContent, this.config);
				}
				else if(this.isBecome==2)
				{
					this.router.navigate(['schemes']);
				}
			}
			else if(this.activeProcess=='message')
			{
				this.modalRef.hide();
				if(this.isBecome==1)
				{
					this.modalRef = this.modalService.show(this.thisContent, this.config);
				}
				else if(this.isBecome==2)
				{
					this.router.navigate(['schemes']);
				}
			}
			else if(this.activeProcess=='album')
			{
				this.modalRef.hide();
				if(this.isBecome==1)
				{
					this.SentAlbumRequest();
				}
				else if(this.isBecome==2)
				{
					this.router.navigate(['schemes']);
				}
			}
			else if(this.activeProcess=='horoscope')
			{
				this.modalRef.hide();
				if(this.isBecome==1)
				{
					this.SentHoroscopeRequest();
				}
				else if(this.isBecome==2)
				{
					this.router.navigate(['schemes']);
				}
			}
			else if(this.activeProcess=='bookmark')
			{
				if(this.isReplyRegNo)
				{
					this.modalRef.hide();
					this.isLoading = true;
					this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/AddBookMark", "POST").subscribe((response: any) => 
					{
						this.isLoading = false;
						if(response.status==1)
			  			{
			  				this.bookmarkStatus = !this.bookmarkStatus;
			  				this.notifyService.showSuccess(response.message, "");
					    }
					    else
					    {
					    	this.notifyService.showWarning(response.message, "");
					    }
					})
				}
			}
			else if(this.activeProcess=='horoscope')
			{
				if(this.isBecome==2)
				{
					this.modalRef.hide();
					this.router.navigate(['schemes']);
				}
				
				if(this.isReplyRegNo)
				{
					this.modalRef.hide();
					this.isLoading = true;
					this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/HoroscopeRequest", "POST").subscribe((response: any) => 
					{
						this.isLoading = false;
						if(response.status==1)
			  			{
			  				this.notifyService.showSuccess(response.message, "");
					    }
					    else
					    {
					    	this.notifyService.showWarning(response.message, "");
					    }
					})
				}
			}
			else if(this.activeProcess=='block')
			{
				if(this.isReplyRegNo)
				{
					this.modalRef.hide();
					this.isLoading = true;
					this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/AddBlock", "POST").subscribe((response: any) => 
					{
						this.isLoading = false;
						if(response.status==1)
			  			{
			  				this.bookmarkStatus = false;
			  				this.notifyService.showSuccess(response.message, "");
			  				if(this.currentDiff=='searchprofile')
			  				{
  								this.issearchProfileData = true;
			  					this.getsearchProfiles();
			  				}
					    }
					    else
					    {
					    	this.notifyService.showWarning(response.message, "");
					    }
					})
				}
			}
			else if(this.activeProcess=='ignore')
			{
				if(this.isReplyRegNo)
				{
					this.modalRef.hide();
					this.isLoading = true;
					this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/AddIgnore", "POST").subscribe((response: any) => 
					{
						this.isLoading = false;
						if(response.status==1)
			  			{
			  				this.bookmarkStatus = false;
			  				this.notifyService.showSuccess(response.message, "");
				  			if(this.currentDiff=='searchprofile')
			  				{
  								this.issearchProfileData = true;
			  					this.getsearchProfiles();
			  				}
					    }
					    else
					    {
					    	this.notifyService.showWarning(response.message, "");
					    }
					})
				}
			}
			else if(this.activeProcess=='photo')
			{
				this.modalRef.hide();
				if(this.isBecome==1)
				{
					this.SentPhotoRequest();
				}
				else if(this.isBecome==2)
				{
					this.router.navigate(['schemes']);
				}
			}
  		});		
	}

}