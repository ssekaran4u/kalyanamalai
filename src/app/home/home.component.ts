import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../services/user.service';
import { NotificationService } from './../services/notification.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as $ from 'jquery' 
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { IDropdownSettings} from 'ng-multiselect-dropdown';
import { UserGlobalService} from '../services/user.global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit 
{
    slides = [
      {image: 'assets/images/banner/_VE_0004.jpg'},
      {image: 'assets/images/banner/_VE_0005.jpg'},
      {image: 'assets/images/banner/_VE_0007.jpg'}
   ];
   noWrapSlides  = false;
   showIndicator = true;
   showIndicator_mobile = false;

	// IsExpired: false
	// LastAccessed: "2021-01-29T05:29:18.497711Z"
	// LoginTime: "10:59"
	// RegNo: "ZR++qabv6FA="
	// StatusCheck: ""
	// Success: 1
	// UserID: "kj3rgl98i/9t3YhBgbekEw=="
	Profilecrdby: any=[];
	form_message = true;
    initialRegister: FormGroup;
    homepageSearch: FormGroup;
    submitted : boolean = false;
    disableBtn: boolean = false;
    SubmitbuttonName: string;
    SearchbuttonName: string;
    uregisterbySelected:number;

    Agefrom = [];
    selectedAgefrom = [];
    AgefromSettings: IDropdownSettings = {};
    isAgefrom: boolean = false;

    Ageto = [];
    selectedAgeto = [];
    AgetoSettings: IDropdownSettings = {};
    isAgeto: boolean = false;

    communities = [];
    selectedcommunitiesItems = [];
    communitiesSettings: IDropdownSettings = {};
    isCommunity: boolean = false;

    religions = [];
    selectedreligionsItems = [];
    religionsSettings: IDropdownSettings = {};
    isReligion: boolean = false;

    castes = [];
    selectedcastesItems = [];
    castesSettings: IDropdownSettings = {};
    isCastes: boolean = false;

    profile = [];
    selectedprofileItems = [];
    profileSettings: IDropdownSettings = {};
    isprofile: boolean = false;

    arrayval1: any = [];
    arrayval2: any = [];
    arrayCommunity: any = [];
    arrayCommunity1: any = [];
    arrayReligion: any = [];
    isLoading: boolean = false;
    user_save_info:any = [];
    user_data:any = [];

    pageSetUp :any;
    regno     :any;
    isUserloginsts: boolean = false;
    totalage1: any=[];

    Gender : any = [];
    mobileslider: any = [];
    youtubelist: any = [];
    profilecount: any=[];

 	constructor(private UserGlobalService: UserGlobalService,private dbService: NgxIndexedDBService, private formBuilder: FormBuilder, private userservice: UserService, private notifyService : NotificationService,private router: Router) 
    {     
    	this.initialRegister = this.formBuilder.group({
            uregisterby: '',
            ugender:'',
            uname:'',
            umobile :'',
            uregisterby1 : '',
        });

        this.homepageSearch = this.formBuilder.group({
            Lookingfor: '',
            Agefrom: '',
            Ageto: '',
            selectCommunity: '',
            selectReligion: '',
            selectCaste: '',
            selectprofile: '',
        });

        this.SubmitbuttonName = 'REGISTER FREE';
        this.SearchbuttonName = 'SEARCH';
    }

    numberOnly(event): boolean {
	    const charCode = (event.which) ? event.which : event.keyCode;
	    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
	      return false;
	    }
	    return true;
	}

	Profilecrdbyclick(cs: any)
	{

		let csProfileid = cs.getAttribute('data-profile-id');
		let csProfileval = cs.getAttribute('data-profile-val');
		//alert(csProfileid + csProfileval);

		$('._p1_X1').text(csProfileval);


		
		if (csProfileid == 226) 
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

    genderbyclick(ge: any)
    {
        let genderid = ge.getAttribute('data-gender-id');
        let genderval = ge.getAttribute('data-gender-val');
        $('._p1_X2').text(genderval);
    }

	 //Agefrom
    onItemSelectedAgefrom(item: any) 
    {
        this.isAgeto = false;
        this.selectedAgeto = [];
        if (this.selectedAgefrom) 
        {
            if (item.id) 
            {
                this.totalage1 = [];
                for (let j = item.id+1; j <= 55; j++) 
                {
                    this.totalage1.push({
                        id: j,
                        name: j
                    });
                }
                this.isAgefrom = true;
                this.Ageto = this.totalage1;
            }
            //console.log(this.totalage1);
        } 
        else 
        {
            this.isAgefrom = false;
            this.isAgeto = false;
            this.selectedAgeto = [];
            this.Ageto = [];
        }
    }
    onItemDeSelectedAgefrom(item: any) 
    {
        this.isAgefrom = false;
        this.isAgeto = false;
        this.selectedAgeto = [];
        this.Ageto = [];
    }
    onSelectAllAgefrom(item: any) {}

    //Ageto
    onItemSelectedAgeto(item: any) {
        if (this.selectedAgeto) {
            if (item.id) {
                this.isAgeto = true;
            }
        } else {
            this.isAgeto = false;
        }
    }
    onItemDeSelectedAgeto(item: any) {
        this.isAgeto = false;
    }
    onSelectAllAgeto(item: any) {}

    // Communities
    onItemSelectCommunities(item: any) {
        if (this.selectedcommunitiesItems) {
            if (item.id) {
                // console.log(this.selectedcommunitiesItems);
                this.isCommunity = true;
                let _ca = this.selectedcommunitiesItems;
                this.arrayCommunity = this.UserGlobalService.joinMultiSelect(_ca);
                // arrayCommunity
                this.userservice.getData({
                    CommunityId: this.arrayCommunity
                }, "IdValues/GetReligionBasedonCommunity", "POST").subscribe((response: any) => {
                    this.isLoading = false;
                    try {
                        if (response.code == 1) {
                            this.religions = response.dropdownlist;
                        } else {
                            this.notifyService.showWarning("No data found", "");

                            this.selectedcommunitiesItems = [];
                            this.isCommunity = false;

                            this.selectedreligionsItems = [];
                            this.isReligion = false;

                            this.selectedcastesItems = [];
                            this.isCastes = false;  
                        }
                    } catch (err) {

                        // this.notifyService.showWarning("Getting error", "");
                        this.notifyService.showInfo("Something went wrong. Try again", "");
                    }
                })
            }
        } else {
            this.isCommunity = false;
        }
    }
    OnItemDeSelectCommunities(item: any) {
        this.isCommunity = false;
        if (item.id) {
            this.isCommunity = true;

            let _ca = this.selectedcommunitiesItems;
            this.arrayCommunity = this.UserGlobalService.joinMultiSelect(_ca);

            this.userservice.getData({
                CommunityId: this.arrayCommunity
            }, "IdValues/GetReligionBasedonCommunity", "POST").subscribe((response: any) => {
                this.isLoading = false;
                try {
                    if (response.code == 1) {
                        this.religions = response.dropdownlist;
                    } else {
                        this.notifyService.showWarning("No data found", "");

                        this.selectedcommunitiesItems = [];
                        this.isCommunity = false;

                        this.selectedreligionsItems = [];
                        this.isReligion = false;

                        this.selectedcastesItems = [];
                        this.isCastes = false;
                    }
                } catch (err) {
                    // this.notifyService.showWarning("Getting error", "Warning");
                    this.notifyService.showInfo("Something went wrong. Try again", "");
                }
            })
        }
    }
    onSelectAllCommunities(item: any) {}
    //OnItemDeSelectallCommunities(item:any){}

    // Religions
    onItemSelectReligions(item: any) {
        if (this.selectedreligionsItems) {
            if (item.id) {
                this.isReligion = true;


                let _ca = this.selectedcommunitiesItems;
                this.arrayCommunity1 = this.UserGlobalService.joinMultiSelect(_ca);

                let _ca1 = this.selectedreligionsItems;
                this.arrayReligion = this.UserGlobalService.joinMultiSelect(_ca1);

                this.userservice.getData({
                    ReligionId: this.arrayReligion,
                    CommunityId: this.arrayCommunity1
                }, "IdValues/GetCasteBasedonCommunityReligion", "POST").subscribe((response: any) => {
                    this.isLoading = false;
                    try {
                        if (response.code == 1) {
                            const res = response.dropdownlist;
                            this.castes = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
                        } else {
                            this.notifyService.showWarning("No data found", "");

                            this.selectedreligionsItems = [];
                            this.isReligion = false;

                            this.selectedcastesItems = [];
                            this.isCastes = false;
                        }
                    } catch (err) {
                        // this.notifyService.showWarning("Getting error", "");
                        this.notifyService.showInfo("Something went wrong. Try again", "");
                    }
                })
            }
        } else {
            this.isReligion = false;
        }
    }
    OnItemDeSelectReligions(item: any) {
        this.isReligion = false;
        if (item.id) {
            this.isReligion = true;

            let _ca = this.selectedcommunitiesItems;
            this.arrayCommunity1 = this.UserGlobalService.joinMultiSelect(_ca);

            let _ca1 = this.selectedreligionsItems;
            this.arrayReligion = this.UserGlobalService.joinMultiSelect(_ca1);

            this.userservice.getData({
                ReligionId: this.arrayReligion,
                CommunityId: this.arrayCommunity1
            }, "IdValues/GetCasteBasedonCommunityReligion", "POST").subscribe((response: any) => {
                this.isLoading = false;
                try {
                    if (response.code == 1) {
                        const res = response.dropdownlist;
                        this.castes = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    } else {
                        this.notifyService.showWarning("No data found", "");

                        this.selectedreligionsItems = [];
                        this.isReligion = false;

                        this.selectedcastesItems = [];
                        this.isCastes = false;
                    }
                } catch (err) {
                    // this.notifyService.showWarning("Getting error", "Warning");
                    this.notifyService.showInfo("Something went wrong. Try again", "");
                }
            })
        }
    }
    onSelectAllReligions(item: any) {}

    // Caste
    onItemSelectCastes(item: any) {
        if (this.selectedcastesItems) {
            this.isCastes = true;
        } else {
            this.isCastes = false;
        }
    }
    OnItemDeSelectCastes(item: any) {
        this.isCastes = false;
    }
    onSelectAllCastes(item: any) {}

    // profile
    onItemSelectprofile(item: any) {
        if (this.selectedprofileItems) {
            this.isprofile = true;
        } else {
            this.isprofile = false;
        }
    }
    OnItemDeSelectprofile(item: any) {
        this.isprofile = false;
    }
    onSelectAllprofile(item: any) {}

   

    formGroup;
    onSubmit() {
        this.SubmitbuttonName = "Loading...";
        this.submitted = true;
        this.disableBtn = true;
        const result = Object.assign({}, this.initialRegister.value);
        //console.log(result);
        if(result.ugender && result.uname && result.umobile && result.uregisterby1)
        {
        	// if (result.uregisterby == 211 || result.uregisterby == 215 || result.uregisterby == 216) 
        	// {
        	// 	if(result.ugender=='')
        	// 	{
        	// 		this.notifyService.showWarning("Please enter required fields", "Warning");
        	// 		this.disableBtn = false;
        	// 		return false;
        	// 	}
        	// }
        	const user_save_info = {
				uregisterby: result.uregisterby1,
				uname: result.uname,
				umobile: result.umobile,
				ugender: result.ugender,
			};

	        this.userservice.getData(user_save_info, "Registration/RegisterWeb", "POST").subscribe((response: any) => 
	        {
	        	// console.log(response);
		        try 
		        {
		        	if (response.Success == 1) 
		        	{
		        		
		        		localStorage.setItem('INkmSet_us', response.RegNo);
		        		localStorage.setItem('INkmSet_mb', result.umobile);
		        		// this.disableBtn = false;
		        		this.dbService.add('setup', {id: 1,INkmSet_id:response.RegNo, INkmSet_nm:result.uname, INkmSet_pl:''}).subscribe((storeData) => {});
		        		this.notifyService.showSuccess(response.message, "Great...!");
		            	// this.router.navigate(['/register/personal-details']);
                        this.router.navigate(['/register/verify']);
		            } 
		            else if (response.Success==2) 
		        	{
		        		this.notifyService.showSuccess("Already you have account Please login to Continue", "Great...!");
		            	this.router.navigate(['/login']);	
		        	}
		            else 
		            {
	                    this.SubmitbuttonName = 'REGISTER FREE';
		            	this.notifyService.showWarning(response.StatusCheck, "");
		                this.disableBtn = false;
		            }
		        } 
		        catch (err) 
		        {
	                this.SubmitbuttonName = 'REGISTER FREE';
                    this.notifyService.showInfo("Something went wrong. Try again", "");
		            // this.notifyService.showWarning("Getting error", "Warning")
		        }
		    }, (err) => {
		        this.disableBtn = false;
	            this.SubmitbuttonName= 'REGISTER FREE';
		        if (err.Success == 401) 
		        {
		            // this.notifyService.showWarning("Getting error", "Warning")
                    this.notifyService.showInfo("Something went wrong. Try again", "");
		        }
		        else {
		            // this.notifyService.showWarning("Getting error", "Warning")
                    this.notifyService.showInfo("Something went wrong. Try again", "");
		        }
		    });
		}
		else
		{
			this.SubmitbuttonName= 'REGISTER FREE';
			this.disableBtn = false;
			this.notifyService.showWarning("Please enter required fields", "");
		}
    };

    onSubmitSearch() 
    {
         
       	this.dbService.getByKey('setup', 1).subscribe((userData) => 
        { 
            localStorage.setItem('pageSetUp',JSON.stringify(userData));
            this.pageSetUp   = localStorage.getItem("pageSetUp");
            if(this.pageSetUp!='undefined' && this.pageSetUp != null)
            {
                this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
                this.regno     = this.pageSetUp["INkmSet_id"];


                const result1 = Object.assign({}, this.homepageSearch.value);

		        if (result1.Agefrom.length && result1.Ageto.length) 
		        {
		            this.user_save_info = {
		                sSaveRegNo: this.regno,
		                sLookingFor: result1.LookingFor,
		                sAgeFrom: result1.Agefrom[0].id,
		                sAgeTo: result1.Ageto[0].id,
		            };

		            if (result1.selectMaritalstatus) {
		                this.user_save_info['sMaritalStatus'] = this.UserGlobalService.joinMultiSelect(result1.selectMaritalstatus);
		            }
		            if (result1.selectCommunity) {
		                this.user_save_info['sCommunity'] = this.UserGlobalService.joinMultiSelect(result1.selectCommunity);
		            }
		            if (result1.selectReligion) {
		                this.user_save_info['sReligion'] = this.UserGlobalService.joinMultiSelect(result1.selectReligion);
		            }
		            if (result1.selectCaste) {
		                this.user_save_info['sCaste'] = this.UserGlobalService.joinMultiSelect(result1.selectCaste);
		            }
		            if (result1.selectSubCaste) {
		                this.user_save_info['profile'] = this.UserGlobalService.joinMultiSelect(result1.selectprofile);
		            }

		            //this.user_save_info['sLookingFor'] = this.LookingFor1;
		            this.user_save_info['process'] = 1;
		            this.user_data =  Object.entries(this.user_save_info);
		            localStorage.setItem("INkmSearch_data", JSON.stringify(this.user_data));
		            //console.log(this.user_save_info);
		            this.userservice.getData(this.user_save_info, "WebUserSearch/SearchInputs", "POST").subscribe((response: any) => 
		            {
		                this.isLoading = true;
		                try 
		                {
		                    if (response.status == 1) 
		                    {
		                        
		                        this.isLoading = false;
		                        this.router.navigate(['search-profiles']);
		                    } 
		                    else 
		                    {
		                        this.SearchbuttonName = "SEARCH";
		                        this.isLoading = false;
		                        this.notifyService.showError(response.message, "")
		                        this.disableBtn = false;
		                    }
		                } 
		                catch (err) 
		                {
		                    this.SearchbuttonName = "SEARCH";
		                    this.isLoading = false;
		                    this.disableBtn = false;
		                    // this.notifyService.showError("Internal Server Error", "Error")
                            this.notifyService.showInfo("Something went wrong. Try again", "");
		                }
		            },
		            (err) => 
		            {
		                this.SearchbuttonName = "SEARCH";
		                this.isLoading = false;
		                this.disableBtn = false;
		                // this.notifyService.showError("Internal Server Error", "Error")
                        this.notifyService.showInfo("Something went wrong. Try again", "");
		            
		            }); 
		            this.userservice.getData(this.user_save_info, "WebUserSearch/SearchInputs", "POST").subscribe((response: any) => {
		          
		            });
		                  
		           this.router.navigate(['search-profiles']);
		        } 
		        else 
		        {
		            this.SearchbuttonName = "SEARCH";
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

    
    totalage = [];

  	ngOnInit(): void {


	  	for (let i = 18; i <= 54; i++) 
        {
            this.totalage.push({
                id: i,
                name: i
            });
        }

        this.dbService.getByKey('setup', 1).subscribe((userData) => 
        { 
            localStorage.setItem('pageSetUp',JSON.stringify(userData));
            this.pageSetUp   = localStorage.getItem("pageSetUp");
            if(this.pageSetUp!='undefined' && this.pageSetUp != null)
            {
                this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
                this.regno     = this.pageSetUp["INkmSet_id"];
                if(this.regno!=null && this.regno !='' && this.regno!='undefined')
                {
                	this.isUserloginsts=true;
                }
                else
                {
                	this.isUserloginsts=false;
                }
            }
            // else
            // {
            //     this.router.navigate(['/logout']);    
            // }
        });

         //Age From 
        this.AgefromSettings = {
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
        //////////////////////////////////

        //Age to 
        this.selectedAgeto = [];
        this.AgetoSettings = {
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
        //////////////////////////////////

        //communities
        this.selectedcommunitiesItems = [];
        this.communitiesSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true,
            closeDropDownOnSelection: true
        };
        //////////////////////////////////

        //religions
        this.selectedreligionsItems = [];
        this.religionsSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true,
            closeDropDownOnSelection: true
        };
        ////////////////////////////////

        //castesItems
        this.selectedcastesItems = [];
        this.castesSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true,
            closeDropDownOnSelection: true
        };
        ////////////////////////////////

        //castesItems
        this.selectedprofileItems = [];
        this.profileSettings = {
            singleSelection: true,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true,
            closeDropDownOnSelection: true
        };
        ////////////////////////////////

        this.userservice. getData('', "IdValues/GetRegisterValuesForWeb", "POST").subscribe((response: any) => {
		 	const res  = response.dropdownlist;
		 	this.Profilecrdby = res.filter(data => data.type == 'Profile Created By').sort((a, b) => (a.name > b.name) ? 1 : -1);
            this.communities = res.filter(data => data.type == 'Community').sort((a, b) => (a.name > b.name) ? 1 : -1);
            this.profile = res.filter(data => data.type == 'PhotoStatus').sort((a, b) => (a.name > b.name) ? 1 : -1);
            this.Gender = res.filter(data => data.type == 'Gender').sort((a, b) => (a.name > b.name) ? 1 : -1);
            this.slides   = response.homebannerslist;
            this.mobileslider = response.mobileslider;
            this.youtubelist  = response.youtubelist;
            this.profilecount  = response.profilecount[0];
            //console.log(this.profilecount);
		 	// this.communities = res[0].IdList.filter(idlist => idlist.type == 'Community').sort((a, b) => (a.name > b.name) ? 1 : -1);
		    // this.religions = res[0].IdList.filter(idlist => idlist.type == 'Religion' && idlist.communityid == this.arrayval1).sort((a, b) => (a.name > b.name) ? 1 : -1);
		    // this.castes = res[0].IdList.filter(idlist => idlist.type == 'Caste' && idlist.communityid == this.arrayval1 && idlist.religionid == this.arrayval2).sort((a, b) => (a.name > b.name) ? 1 : -1);
            
	  	})


  		// this.uregisterbySelected = 211;
  	 //    var $el = $(".cdrop");
	   //  var $ee = $(".pdrop_1");
	   //  var $eee = $(".pdrop_2");
	   //  $el.click(function(e) {
	   //      e.stopPropagation();
	   //      $(".pdrop_1").toggleClass('active');
	   //  });
	    this.uregisterbySelected = 211;
  	    var $el  = $(".cdrop");
  	    var $el1 = $(".cdrop1");
        var $el2 = $(".cdrop2");
	    var $ee  = $(".pdrop_1");
	    var $ee1 = $(".pdrop_1a");
        var $ee2 = $(".pdrop_1b");
	    var $eee = $(".pdrop_2");

	    $el.click(function(e) {
	        e.stopPropagation();
	        $(".pdrop_1").toggleClass('active');
	    });

	    $el1.click(function(e) {
	        e.stopPropagation();
	        $(".pdrop_1a").toggleClass('active');
	    });

        $el2.click(function(e) {
            e.stopPropagation();
            $(".pdrop_1b").toggleClass('active');
        });


	    $(document).on('click', function(e) {
	        if (($(e.target) != $el2) && ($ee.hasClass('active'))) {
	            $ee.removeClass('active');
	        }
	    });

	    $(document).on('click', function(e) {
	        if (($(e.target) != $el1) && ($ee1.hasClass('active'))) {
	            $ee1.removeClass('active');
	        }
	    });

        $(document).on('click', function(e) {
            if (($(e.target) != $el2) && ($ee2.hasClass('active'))) {
                $ee2.removeClass('active');
            }
        });


	    $(document).on('click', function(e) {
	        if (($(e.target) != $el) && ($eee.hasClass('active'))) {
	            $eee.removeClass('active');
	        }
	    });

	    ////$(".profileValue").click(function(e) {
	    $(document).on('click', '.profileValue', function(e) {
	        var profile = $(this).val();
	        e.stopPropagation();
	        if (profile == 211 || profile == 215 || profile == 216) {
	            $('.pdrop_1').removeClass('active');
	            $('.pdrop_2').addClass('active');
	        } else {
	            $('._p1_X').text($(this).data("value"));
	        }
	    });

	    // $(document).on('click', '.profileValue1', function(e) {
	    //     var profile = $(this).val();
	    //     e.stopPropagation();
	    //     alert(profile);
	    //     $('._p1_X1').text($(this).data("value"));
	       
	    // });

	    $(document).on('click', 'input[name="ugender"]', function() {
	        var value = $("[name=ugender]:checked").val();
	        var profile = $("input[name='uregisterby']:checked").val();
	        var _pdata = [
	            { profile: "Myself", selected: 211 },
	            { profile: "Relative", selected: 215 },
	            { profile: "Friend", selected: 216 }
	        ];

	        _pdata.forEach(function(entry) {
	            if (entry.selected == profile) {
	                $('._p1_X').text(entry.profile + ' - ' + (value == 6 ? 'Male' : 'Female'));
	            }
	        });
	    });
  }

}
