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
  selector: 'app-edit-hobbies-details',
  templateUrl: './edit-hobbies-details.component.html',
  styleUrls: ['./edit-hobbies-details.component.css']
})
export class EditHobbiesDetailsComponent implements OnInit {

	Hobbies = [];
  	selectedHobbies = [];
  	HobbiesSettings: IDropdownSettings = {};
  	isHobbies:boolean = false;

  	Interests = [];
  	selectedInterests = [];
  	InterestsSettings: IDropdownSettings = {};
  	isInterests:boolean = false;

  	FavoriteMusic = [];
  	selectedFavoriteMusic = [];
  	FavoriteMusicSettings: IDropdownSettings = {};
  	isFavoriteMusic:boolean = false;

  	FavouriteReads = [];
  	selectedFavouriteReads = [];
  	FavouriteReadsSettings: IDropdownSettings = {};
  	isFavouriteReads:boolean = false;

  	PreferredMovies = [];
  	selectedPreferredMovies = [];
  	PreferredMoviesSettings: IDropdownSettings = {};
  	isPreferredMovies:boolean = false;

  	SportsActivities = [];
  	selectedSportsActivities = [];
  	SportsActivitiesSettings: IDropdownSettings = {};
  	isSportsActivities:boolean = false;

  	FavouriteCuisine = [];
  	selectedFavouriteCuisine = [];
  	FavouriteCuisineSettings: IDropdownSettings = {};
  	isFavouriteCuisine:boolean = false;

  	PreferredDressStyle = [];
  	selectedPreferredDressStyle = [];
  	PreferredDressStyleSettings: IDropdownSettings = {};
  	isPreferredDressStyle:boolean = false;

  	SpokenLanguages = [];
  	selectedSpokenLanguages = [];
  	SpokenLanguagesSettings: IDropdownSettings = {};
  	isSpokenLanguages:boolean = false;

  	isLoading:boolean = false;
	edithobbiesForm: FormGroup;
	disableBtn = false;
	SubmitbuttonName: string;

	isEdit:any=[];

	pageSetUp  	:any;
    regno 		:any;

  	constructor(private dbService: NgxIndexedDBService, private UserGlobalService:UserGlobalService, private formBuilder: FormBuilder, private userservice: UserService,
		private notifyService: NotificationService, private router: Router, private titleService: Title) 
  	{
  		this.edithobbiesForm = this.formBuilder.group({
			selectHobbies:'',
			selectInterests:'',
			selectFavoriteMusic:'',
			selectFavouriteReads:'',
			selectPreferredMovies:'',
			selectSportsActivities:'',
			selectFavouriteCuisine:'',
			selectPreferredDressStyle:'',
			selectSpokenLanguages:'',
		});
  		this.SubmitbuttonName = 'Update';
  	}

  	//Hobbies  
	onItemSelectedHobbies(item: any) 
		{
		    if(this.selectedHobbies)
		    {
		    	if(item.id)
		    	{
		    		this.isHobbies = true;
		    	}
		    }
		    else
		    {
		    	this.isHobbies = false;
		    }
		}

	onItemDeSelectedHobbies(item:any)
		{
	        this.isHobbies= false;
	    }

    onSelectAllHobbies(item:any){}

    //Interests  
	onItemSelectedInterests(item: any) 
		{
		    if(this.selectedInterests)
		    {
		    	if(item.id)
		    	{
		    		this.isInterests = true;
		    	}
		    }
		    else
		    {
		    	this.isInterests = false;
		    }
		}

	onItemDeSelectedInterests(item:any)
		{
	        this.isInterests= false;
	    }

    onSelectAllInterests(item:any){}

    //FavoriteMusic 
	onItemSelectedFavoriteMusic(item: any) 
		{
		    if(this.selectedFavoriteMusic)
		    {
		    	if(item.id)
		    	{
		    		this.isFavoriteMusic = true;
		    	}
		    }
		    else
		    {
		    	this.isFavoriteMusic = false;
		    }
		}

	onItemDeSelectedFavoriteMusic(item:any)
		{
	        this.isFavoriteMusic= false;
	    }

    onSelectAllFavoriteMusic(item:any){}

    //FavouriteReads 
	onItemSelectedFavouriteReads(item: any) 
		{
		    if(this.selectedFavouriteReads)
		    {
		    	if(item.id)
		    	{
		    		this.isFavouriteReads = true;
		    	}
		    }
		    else
		    {
		    	this.isFavouriteReads = false;
		    }
		}

	onItemDeSelectedFavouriteReads(item:any)
		{
	        this.isFavouriteReads= false;
	    }

    onSelectAllFavouriteReads(item:any){}

    //PreferredMovies   
	onItemSelectedPreferredMovies(item: any) 
		{
		    if(this.selectedPreferredMovies)
		    {
		    	if(item.id)
		    	{
		    		this.isPreferredMovies = true;
		    	}
		    }
		    else
		    {
		    	this.isPreferredMovies = false;
		    }
		}

	onItemDeSelectedPreferredMovies(item:any)
		{
	        this.isPreferredMovies= false;
	    }

    onSelectAllPreferredMovies(item:any){}

    //SportsActivities    
	onItemSelectedSportsActivities(item: any) 
		{
		    if(this.selectedSportsActivities)
		    {
		    	if(item.id)
		    	{
		    		this.isSportsActivities = true;
		    	}
		    }
		    else
		    {
		    	this.isSportsActivities = false;
		    }
		}

	onItemDeSelectedSportsActivities(item:any)
		{
	        this.isSportsActivities= false;
	    }

    onSelectAllSportsActivities(item:any){}

    //FavouriteCuisine 
	onItemSelectedFavouriteCuisine(item: any) 
		{
		    if(this.selectedFavouriteCuisine)
		    {
		    	if(item.id)
		    	{
		    		this.isFavouriteCuisine = true;
		    	}
		    }
		    else
		    {
		    	this.isFavouriteCuisine = false;
		    }
		}

	onItemDeSelectedFavouriteCuisine(item:any)
		{
	        this.isFavouriteCuisine= false;
	    }

    onSelectAllFavouriteCuisine(item:any){}

    //PreferredDressStyle 
	onItemSelectedPreferredDressStyle(item: any) 
		{
		    if(this.selectedPreferredDressStyle)
		    {
		    	if(item.id)
		    	{
		    		this.isPreferredDressStyle = true;
		    	}
		    }
		    else
		    {
		    	this.isPreferredDressStyle = false;
		    }
		}

	onItemDeSelectedPreferredDressStyle(item:any)
		{
	        this.isPreferredDressStyle= false;
	    }

    onSelectAllPreferredDressStyle(item:any){}

    //SpokenLanguages    
	onItemSelectedSpokenLanguages(item: any) 
		{
		    if(this.selectedSpokenLanguages)
		    {
		    	if(item.id)
		    	{
		    		this.isSpokenLanguages = true;
		    	}
		    }
		    else
		    {
		    	this.isSpokenLanguages = false;
		    }
		}

	onItemDeSelectedSpokenLanguages(item:any)
		{
	        this.isSpokenLanguages= false;
	    }

    onSelectAllSpokenLanguages(item:any){}


    /////////////////////////////////////////////////////////////

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
		        	
		        const result = Object.assign({}, this.edithobbiesForm.value);
		        if (result.selectHobbies && result.selectInterests && result.selectFavoriteMusic && result.selectFavouriteReads 
		        	&& result.selectPreferredMovies && result.selectSportsActivities && result.selectFavouriteCuisine 
		        	&& result.selectPreferredDressStyle && result.selectSpokenLanguages) 
		        {
		        	const user_save_info = 
		        	{
		                RegNo: this.regno,
		               
		            };
		            if(result.selectHobbies)
					{
						user_save_info['ExpectMaritalStatus'] = this.UserGlobalService.joinMultiSelect(result.selectHobbies);
					}
					if(result.selectInterests)
					{
						user_save_info['ExpectCommunity'] = this.UserGlobalService.joinMultiSelect(result.selectInterests);
					}
					if(result.selectFavoriteMusic)
					{
						user_save_info['ExpectReligion'] = this.UserGlobalService.joinMultiSelect(result.selectFavoriteMusic);
					}
					if(result.selectFavouriteReads)
					{
						user_save_info['ExpectCaste'] = this.UserGlobalService.joinMultiSelect(result.selectFavouriteReads);
					}
					if(result.selectPreferredMovies)
					{
						user_save_info['ExpectSubsect'] = this.UserGlobalService.joinMultiSelect(result.selectPreferredMovies);
					}
					if(result.selectSportsActivities)
					{
						user_save_info['ExpectEducation'] = this.UserGlobalService.joinMultiSelect(result.selectSportsActivities);
					}
					if(result.selectFavouriteCuisine)
					{
						user_save_info['ExpectProfession'] = this.UserGlobalService.joinMultiSelect(result.selectFavouriteCuisine);
					}
					if(result.selectPreferredDressStyle)
					{
						user_save_info['ExpectDiet'] = this.UserGlobalService.joinMultiSelect(result.selectPreferredDressStyle);
					}
					if(result.selectSpokenLanguages)
					{
						user_save_info['ExpectDiet'] = this.UserGlobalService.joinMultiSelect(result.selectSpokenLanguages);
					}

		            this.userservice.getData(user_save_info, "WebProfileUpdate/Interests", "POST").subscribe((response: any) => {
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
		        else 
		        {
		            this.SubmitbuttonName = 'Update';
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

	            //Hobbies
			  	this.selectedHobbies = [];
			    this.HobbiesSettings ={
			      	singleSelection: false,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 5,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    //Interests 
			  	this.selectedInterests = [];
			    this.InterestsSettings ={
			      	singleSelection: false,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 2,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    //FavoriteMusic 
			  	this.selectedFavoriteMusic = [];
			    this.FavoriteMusicSettings ={
			      	singleSelection: false,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 2,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    //FavouriteReads 
			  	this.selectedFavouriteReads = [];
			    this.FavouriteReadsSettings ={
			      	singleSelection: false,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 2,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    //PreferredMovies 
			  	this.selectedPreferredMovies = [];
			    this.PreferredMoviesSettings ={
			      	singleSelection: false,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 2,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    //SportsActivities 
			  	this.selectedSportsActivities = [];
			    this.SportsActivitiesSettings ={
			      	singleSelection: false,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 2,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    //FavouriteCuisine 
			  	this.selectedFavouriteCuisine = [];
			    this.FavouriteCuisineSettings ={
			      	singleSelection: false,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 2,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    //PreferredDressStyle 
			  	this.selectedPreferredDressStyle = [];
			    this.PreferredDressStyleSettings ={
			      	singleSelection: false,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 2,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    //SpokenLanguages 
			  	this.selectedSpokenLanguages = [];
			    this.SpokenLanguagesSettings ={
			      	singleSelection: false,
			      	idField: 'id',
			      	textField: 'name',
			      	selectAllText: 'Select All',
			      	unSelectAllText: 'UnSelect All',
			      	itemsShowLimit: 2,
			      	allowSearchFilter: true,
			      	closeDropDownOnSelection: true
			    };

			    this.isLoading = true;
			    this.userservice. getData({RegNo: this.regno}, "WebMyProfile/GetHobbiesDetails", "POST").subscribe((response: any) => {
			        const res = response.data[0];
			        this.isLoading = false;

			        this.isEdit = res;
			        this.selectedHobbies   		      = this.isEdit.HobbiesSelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
			        this.selectedInterests 		      = this.isEdit.InterestsSelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
			        this.selectedFavoriteMusic        = this.isEdit.FavoriteMusicSelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
			        this.selectedFavouriteReads       = this.isEdit.FavouriteReadsSelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
			        this.selectedPreferredMovies      = this.isEdit.PreferredMoviesSelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
			        this.selectedSportsActivities     = this.isEdit.SportsActivitiesSelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
			        this.selectedFavouriteCuisine     = this.isEdit.FavouriteCuisineSelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
			        this.selectedPreferredDressStyle  = this.isEdit.PreferredDressStyleSelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
			        this.selectedSpokenLanguages      = this.isEdit.SpokenLanguagesSelected.sort((a, b) => (a.name > b.name) ? 1 : -1);

			        
			        if (this.selectedHobbies.length) 
			        {
			            this.isHobbies = true;
			        }
			        if (this.selectedInterests.length) 
			        {
			            this.isInterests = true;
			        }
			        if (this.selectedFavoriteMusic.length) 
			        {
			            this.isFavoriteMusic = true;
			        }
			        if (this.selectedFavouriteReads.length) 
			        {
			            this.isFavouriteReads = true;
			        }
			        if (this.selectedPreferredMovies.length) 
			        {
			            this.isPreferredMovies = true;
			        }
			        if (this.selectedSportsActivities.length) 
			        {
			            this.isSportsActivities = true;
			        }
			        if (this.selectedFavouriteCuisine.length) 
			        {
			            this.isFavouriteCuisine = true;
			        }
			        if (this.selectedPreferredDressStyle.length) 
			        {
			            this.isPreferredDressStyle = true;
			        }
			        if (this.selectedSpokenLanguages.length) 
			        {
			            this.isSpokenLanguages = true;
			        }

				 	this.Hobbies 			 = this.isEdit.Hobbies.sort((a, b) => (a.name > b.name) ? 1 : -1);
				  	this.Interests   		 = this.isEdit.Interests.sort((a, b) => (a.name > b.name) ? 1 : -1);
				 	this.FavoriteMusic 		 = this.isEdit.FavoriteMusic.sort((a, b) => (a.name > b.name) ? 1 : -1);
				 	this.FavouriteReads 	 = this.isEdit.FavouriteReads.sort((a, b) => (a.name > b.name) ? 1 : -1);
				 	this.PreferredMovies 	 = this.isEdit.PreferredMovies.sort((a, b) => (a.name > b.name) ? 1 : -1);
				 	this.SportsActivities 	 = this.isEdit.SportsActivities.sort((a, b) => (a.name > b.name) ? 1 : -1);
				 	this.FavouriteCuisine 	 = this.isEdit.FavouriteCuisine.sort((a, b) => (a.name > b.name) ? 1 : -1);
				 	this.PreferredDressStyle = this.isEdit.PreferredDressStyle.sort((a, b) => (a.name > b.name) ? 1 : -1);
				 	this.SpokenLanguages 	 = this.isEdit.SpokenLanguages.sort((a, b) => (a.name > b.name) ? 1 : -1);
			  	})

		  		this.titleService.setTitle('Edit Hobbies- Kalyanamalai');

		  	    $(document).on('focus blur change', '.form-control', function(e) 
		  	    {
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
