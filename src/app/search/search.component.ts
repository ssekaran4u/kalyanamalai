import {  Component, OnInit} from '@angular/core';
import {  FormBuilder, FormGroup, Validators} from '@angular/forms';
import {  UserService} from '../services/user.service';
import * as $ from 'jquery'
import { NotificationService} from '../services/notification.service';
import { ToastrService} from 'ngx-toastr';
import { Title} from '@angular/platform-browser';
import { Router} from '@angular/router';
import { IDropdownSettings} from 'ng-multiselect-dropdown';
import { UserGlobalService} from '../services/user.global';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    Gender = [];
    selectedGender = [];
    GenderSettings: IDropdownSettings = {};
    isGender: boolean = false;

    Agefrom = [];
    selectedAgefrom = [];
    AgefromSettings: IDropdownSettings = {};
    isAgefrom: boolean = false;

    Ageto = [];
    selectedAgeto = [];
    AgetoSettings: IDropdownSettings = {};
    isAgeto: boolean = false;

    Maritalstatus = [];
    Marital_ids     : any = [];
    Marital_idsA     : any = [];
    MaritalStatus : any;
    selectedMaritalstatus = [];
    MaritalstatusSettings: IDropdownSettings = {};
    isMaritalstatus: boolean = false;

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

    subcastes = [];
    selectedsubcastesItems = [];
    subcastesSettings: IDropdownSettings = {};
    isSubCastes: boolean = false;

    GenderA = [];
    selectedGenderA = [];
    GenderASettings: IDropdownSettings = {};
    isGenderA: boolean = false;

    AgefromA = [];
    selectedAgefromA = [];
    AgefromASettings: IDropdownSettings = {};
    isAgefromA: boolean = false;

    AgetoA = [];
    selectedAgetoA = [];
    AgetoASettings: IDropdownSettings = {};
    isAgetoA: boolean = false;

    MaritalstatusA = [];
    selectedMaritalstatusA = [];
    MaritalstatusASettings: IDropdownSettings = {};
    isMaritalstatusA: boolean = false;

    communitiesA = [];
    selectedcommunitiesAItems = [];
    communitiesASettings: IDropdownSettings = {};
    isCommunityA: boolean = false;

    religionsA = [];
    selectedreligionsAItems = [];
    religionsASettings: IDropdownSettings = {};
    isReligionA: boolean = false;

    castesA = [];
    selectedcastesAItems = [];
    castesASettings: IDropdownSettings = {};
    isCastesA: boolean = false;

    subcastesA = [];
    selectedsubcastesAItems = [];
    subcastesASettings: IDropdownSettings = {};
    isSubCastesA: boolean = false;

    Education = [];
    selectedEducationItems = [];
    EducationSettings: IDropdownSettings = {};
    isEducation: boolean = false;

    Profession = [];
    selectedProfessionItems = [];
    ProfessionSettings: IDropdownSettings = {};
    isProfession: boolean = false;

    HeightFrom = [];
    selectedHeightFromItems = [];
    HeightFromSettings: IDropdownSettings = {};
    isHeightFrom: boolean = false;

    HeightTo = [];
    selectedHeightToItems = [];
    HeightToSettings: IDropdownSettings = {};
    isHeightTo: boolean = false;

    stars = [];
    selectedstarsItems = [];
    starsSettings: IDropdownSettings = {};
    isStar: boolean = false;

    Country = [];
    selectedCountryItems = [];
    CountrySettings: IDropdownSettings = {};
    isCountry: boolean = false;

    State = [];
    selectedStateItems = [];
    StateSettings: IDropdownSettings = {};
    isState: boolean = false;

    City = [];
    selectedCityItems = [];
    CitySettings: IDropdownSettings = {};
    isCity: boolean = false;

    ProfilePosted = [];
    selectedProfilePostedItems = [];
    ProfilePostedSettings: IDropdownSettings = {};
    isProfilePosted: boolean = false;

    ProfilePostedA = [];
    selectedProfilePostedAItems = [];
    ProfilePostedASettings: IDropdownSettings = {};
    isProfilePostedA: boolean = false;

    ResultsPerPage = [];
    selectedResultsPerPage = [];
    ResultsPerPageSettings: IDropdownSettings = {};
    isResultsPerPage: boolean = false;

    ResultsPerPageA = [];
    selectedResultsPerPageA = [];
    ResultsPerPageASettings: IDropdownSettings = {};
    isResultsPerPageA: boolean = false;

    LookingFor1: any = [];
    LookingFor2: any = [];
    //ResultsPerPage: any = [];
    //ResultsPerPageA: any = [];
    ShowProfiles: any = [];
    ShowProfilesA: any = [];
    Doshams: any = [];
    Diets : any = [];
    physicalDisability : any = [];
    arrayCountry: any = [];
    arraystate: any = [];
    arrayCommunity: any = [];
    arrayCommunity1: any = [];
    arrayCommunity2: any = [];
    arrayReligion: any = [];
    arrayReligion1: any = [];
    arrayCaste: any = [];
    arraySubCaste: any = [];

    arrayCountryA: any = [];
    arraystateA: any = [];
    arrayCommunityA: any = [];
    arrayCommunityA1: any = [];
    arrayCommunityA2: any = [];
    arrayReligionA: any = [];
    arrayReligionA1: any = [];
    arrayCasteA: any = [];
    arraySubCasteA: any = [];

    arrayval1: any = [];
    arrayval2: any = [];
    arrayval3: any = [];
    user_save_info:any = [];
    user_data:any = [];
    user_data1:any = [];

    isLoading: boolean = false;
    searchForm1: FormGroup;
    searchForm2: FormGroup;
    searchForm3: FormGroup;
    ModelSaveSearchAdvForm:FormGroup;
    ModelSaveSearchForm:FormGroup;
    disableBtn = false;
    SubmitbuttonSearch: string;
    SubmitbuttonSaveSearch: string;
    SubmitbuttonAdvSearch: string;
    SubmitbuttonSaveAdvSearch: string;
    SubmitbuttonProfileSearch:string;

    pageSetUp :any;
    regno     :any;

    Diet_ids : any = [];
    physicalDis_ids : any = [];
    Dosham_ids : any = [];
    ShowProfilesA_ids : any = [];
    ShowProfiles_ids : any = [];
    CountryTypes :any = [];
    CountryType_ids : any = [];
    Agedata : any =[];

    modalRef: BsModalRef;
    config = {
        keyboard: false,
        ignoreBackdropClick: true,
        animated: true
      };
      

    constructor(private modalService: BsModalService, private dbService: NgxIndexedDBService,private UserGlobalService: UserGlobalService, private formBuilder: FormBuilder, private userservice: UserService,
        private notifyService: NotificationService, private router: Router, private titleService: Title) {
        this.searchForm1 = this.formBuilder.group(
        {
            LookingFor: '',
            Agefrom: '',
            Ageto: '',
            selectMaritalstatus: '',
            selectCommunity: '',
            selectReligion: '',
            selectCaste: '',
            selectSubCaste: '',
            selectProfilePosted: '',
            ResultsPerPages: '',
            ShowProfiles: '',  
        });

        this.searchForm2 = this.formBuilder.group(
        {
            LookingForA: '',
            AgefromA: '',
            AgetoA: '',
            selectMaritalstatusA: '',
            selectCommunityA: '',
            selectReligionA: '',
            selectCasteA: '',
            selectSubCasteA: '',
            selectEducation: '',
            selectProfession: '',
            DietList: '',
            selectHeightFrom: '',
            selectHeightTo: '',
            selectStar: '',
            Physical_disabilityList: '',
            selectDoshams:'',
            CountryType: '',
            selectCountry: '',
            selectCState: '',
            selectCCity: '',
            selectProfilePostedA: '',
            ResultsPerPagesA: '',  
            ShowProfilesA: '',
        });

        this.searchForm3 = this.formBuilder.group(
        {
            profile_id: '',
        });
        this.ModelSaveSearchAdvForm = this.formBuilder.group(
        {
            Search_Name: '',
            Search_Description: '',
        });
        this.ModelSaveSearchForm = this.formBuilder.group(
        {
            Search_Name: '',
            Search_Description: '',
        });

        this.SubmitbuttonSearch = 'Search';
        this.SubmitbuttonSaveSearch = 'Save Search';
        this.SubmitbuttonAdvSearch = 'Search';
        this.SubmitbuttonSaveAdvSearch = 'Save Search';
        this.SubmitbuttonProfileSearch = 'Search';
    }

    //Gender
    onItemSelectedGender(item: any) {
        if (this.selectedGender) {
            if (item.id) {
                this.isGender = true;
            }
        } else {
            this.isGender = false;
        }
    }
    onItemDeSelectedGender(item: any) {
        this.isGender = false;
    }
    onSelectAllGender(item: any) {}

    //Agefrom
    onItemSelectedAgefrom(item: any) {
        if (this.selectedAgefrom) 
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
            this.isAgefrom = false;
        }
    }
    onItemDeSelectedAgefrom(item: any) 
    {
        this.Ageto = [];
        this.isAgefrom = false;
        this.isAgeto = false;
        this.selectedAgeto = [];
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

    //Maritalstatus
    onItemSelectedMaritalstatus(item: any) {
        if (this.selectedMaritalstatus) {
            if (item.id) {
                this.isMaritalstatus = true;
            }
        } else {
            this.isMaritalstatus = false;
        }
    }
    onItemDeSelectedMaritalstatus(item: any) {
        this.isMaritalstatus = false;
    }
    onSelectAllMaritalstatus(item: any) {}

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

                            this.selectedsubcastesItems = [];
                            this.isSubCastes = false;
                        }
                    } catch (err) {
                        // this.notifyService.showWarning("Getting error", "Warning");
                        this.notifyService.showInfo("Something went wrong. Try again", "")
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

                        this.selectedsubcastesItems = [];
                        this.isSubCastes = false;
                    }
                } catch (err) {
                    // this.notifyService.showWarning("Getting error", "Warning");
                    this.notifyService.showInfo("Something went wrong. Try again", "")
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

                            this.selectedsubcastesItems = [];
                            this.isSubCastes = false;
                        }
                    } catch (err) {
                        // this.notifyService.showWarning("Getting error", "Warning");
                        this.notifyService.showInfo("Something went wrong. Try again", "")
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

                        this.selectedsubcastesItems = [];
                        this.isSubCastes = false;
                    }
                } catch (err) {
                    // this.notifyService.showWarning("Getting error", "Warning");
                    this.notifyService.showInfo("Something went wrong. Try again", "")
                }
            })
        }
    }
    onSelectAllReligions(item: any) {}

    // Caste
    onItemSelectCastes(item: any) 
    {
        if (this.selectedcastesItems) {
            if (item.id) {

                this.isCastes = true;

                let _ca = this.selectedcommunitiesItems;
                this.arrayCommunity2 = this.UserGlobalService.joinMultiSelect(_ca);

                let _ca1 = this.selectedreligionsItems;
                this.arrayReligion1 = this.UserGlobalService.joinMultiSelect(_ca1);

                let _ca2 = this.selectedcastesItems;
                this.arrayCaste = this.UserGlobalService.joinMultiSelect(_ca2);

                // console.log(this.arrayCommunity2);
                // console.log(this.arrayReligion1);
                // console.log(this.arrayCaste);

                this.userservice.getData({
                    CasteId: this.arrayCaste,
                    ReligionId: this.arrayReligion1,
                    CommunityId: this.arrayCommunity2
                }, "IdValues/GetSubsectByCasteCommunityReligion", "POST").subscribe((response: any) => {
                    this.isLoading = false;
                    //console.log(response);
                    try {
                        if (response.code == 1) {
                            const res = response.dropdownlist;
                            this.subcastes = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
                        } 

                        else 
                        {
                            this.notifyService.showWarning("No data found", "");

                            this.selectedcastesItems = [];
                            this.isCastes = false;

                            this.selectedsubcastesItems = [];
                            this.isSubCastes = false;
                        }
                    } catch (err) {
                        // this.notifyService.showWarning("Getting error", "Warning");
                        this.notifyService.showInfo("Something went wrong. Try again", "")
                    }
                })
            }
        } else {
            this.isCastes = false;
        }
    }
    
    OnItemDeSelectCastes(item: any) 
    {
        this.isCastes = false;

        if (item.id) {
            this.selectedsubcastesItems = [];
            this.isSubCastes = false;

            this.isCastes = true;

            let _ca = this.selectedcommunitiesItems;
            this.arrayCommunity2 = this.UserGlobalService.joinMultiSelect(_ca);

            let _ca1 = this.selectedreligionsItems;
            this.arrayReligion1 = this.UserGlobalService.joinMultiSelect(_ca1);

            let _ca2 = this.selectedcastesItems;
            this.arrayCaste = this.UserGlobalService.joinMultiSelect(_ca2);

            this.userservice.getData({
                CasteId: this.arrayCaste,
                ReligionId: this.arrayReligion1,
                CommunityId: this.arrayCommunity2
            }, "IdValues/GetSubsectByCasteCommunityReligion", "POST").subscribe((response: any) => {
                this.isLoading = false;
                try {
                        if (response.code == 1) 
                        {
                            const res = response.dropdownlist;
                            this.subcastes = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
                        } 
                        else 
                        {
                            this.notifyService.showWarning("No data found", "");

                            this.selectedcastesItems = [];
                            this.isCastes = false;

                            this.selectedsubcastesItems = [];
                            this.isSubCastes = false;
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
    onSelectAllCastes(item: any) {}

    // Sub Caste
    onItemSelectSubCastes(item: any) {
        if (this.selectedcastesItems) {
            this.isSubCastes = true;
        } else {
            this.isSubCastes = false;
        }
    }
    OnItemDeSelectSubCastes(item: any) {
        this.isSubCastes = false;
    }
    onSelectAllSubCastes(item: any) {}

    //GenderA
    onItemSelectedGenderA(item: any) {
        if (this.selectedGenderA) {
            if (item.id) {
                this.isGenderA = true;
            }
        } else {
            this.isGenderA = false;
        }
    }
    onItemDeSelectedGenderA(item: any) {
        this.isGenderA = false;
    }
    onSelectAllGenderA(item: any) {}

    //AgefromA
    onItemSelectedAgefromA(item: any) {
        if (this.selectedAgefromA) {
            if (item.id) 
            {
                this.AgetoA = [];
                this.Agedata = [];
                this.selectedAgetoA = [];
                this.isAgetoA = false;
               
                for (let j = item.id; j <= 55; j++) 
                {
                    this.Agedata.push({
                        id: j,
                        name: j
                    });
                }
               
                this.AgetoA= this.Agedata;
                this.isAgefromA = true;
            }
        } 
        else 
        {
            this.isAgefromA = false;
            this.AgetoA = [];
            this.Agedata = [];
            this.selectedAgetoA = [];
            this.isAgetoA = false;
        }
    }
    onItemDeSelectedAgefromA(item: any) {
        this.isAgefromA = false;
        this.AgetoA = [];
        this.Agedata = [];
        this.selectedAgetoA = [];
        this.isAgetoA = false;
    }
    onSelectAllAgefromA(item: any) {}

    //AgetoA
    onItemSelectedAgetoA(item: any) {
        if (this.selectedAgetoA) {
            if (item.id) {
                this.isAgetoA = true;
            }
        } else {
            this.isAgetoA = false;
        }
    }
    onItemDeSelectedAgetoA(item: any) {
        this.isAgetoA = false;
    }
    onSelectAllAgetoA(item: any) {}

    //MaritalstatusA
    onItemSelectedMaritalstatusA(item: any) {
        if (this.selectedMaritalstatusA) {
            if (item.id) {
                this.isMaritalstatusA = true;
            }
        } else {
            this.isMaritalstatusA = false;
        }
    }
    onItemDeSelectedMaritalstatusA(item: any) {
        this.isMaritalstatusA = false;
    }
    onSelectAllMaritalstatusA(item: any) {}

    // Communities
    onItemSelectCommunitiesA(item: any) {
        if (this.selectedcommunitiesAItems) {
            if (item.id) {
                // console.log(this.selectedcommunitiesItems);
                this.isCommunityA = true;

                // const result = Object.assign({}, this.myExpectationsRegister.value);
                let _ca = this.selectedcommunitiesAItems;
                this.arrayCommunityA = this.UserGlobalService.joinMultiSelect(_ca);
                // arrayCommunity
                this.userservice.getData({
                    CommunityId: this.arrayCommunityA
                }, "IdValues/GetReligionBasedonCommunity", "POST").subscribe((response: any) => {
                    this.isLoading = false;
                    try {
                        if (response.code == 1) {
                            this.religionsA = response.dropdownlist;
                        } else {
                            this.notifyService.showWarning("No data found", "");

                            this.selectedcommunitiesAItems = [];
                            this.isCommunityA = false;

                            this.selectedreligionsAItems = [];
                            this.isReligionA = false;

                            this.selectedcastesAItems = [];
                            this.isCastesA = false;

                            this.selectedsubcastesAItems = [];
                            this.isSubCastesA = false;
                        }
                    } catch (err) {
                        // this.notifyService.showWarning("Getting error", "Warning");
                        this.notifyService.showInfo("Something went wrong. Try again", "")
                    }
                })
            }
        } else {
            this.isCommunityA = false;
        }
    }
    OnItemDeSelectCommunitiesA(item: any) {
        this.isCommunityA = false;

        if (item.id) {
            this.isCommunityA = true;

            let _ca = this.selectedcommunitiesItems;
            this.arrayCommunityA = this.UserGlobalService.joinMultiSelect(_ca);

            this.userservice.getData({
                CommunityId: this.arrayCommunityA
            }, "IdValues/GetReligionBasedonCommunity", "POST").subscribe((response: any) => {
                this.isLoading = false;
                try {
                    if (response.code == 1) {
                        this.religionsA = response.dropdownlist;
                    } else {
                        this.notifyService.showWarning("No data found", "");

                        this.selectedcommunitiesAItems = [];
                        this.isCommunityA = false;

                        this.selectedreligionsAItems = [];
                        this.isReligionA = false;

                        this.selectedcastesAItems = [];
                        this.isCastesA = false;

                        this.selectedsubcastesAItems = [];
                        this.isSubCastesA = false;
                    }
                } catch (err) {
                    // this.notifyService.showWarning("Getting error", "Warning");
                    this.notifyService.showInfo("Something went wrong. Try again", "")
                }
            })
        }
    }
    onSelectAllCommunitiesA(item: any) {}
    //OnItemDeSelectallCommunities(item:any){}

    // Religions
    onItemSelectReligionsA(item: any) {
        if (this.selectedreligionsItems) {
            if (item.id) {
                this.isReligionA = true;

                let _ca = this.selectedcommunitiesAItems;
                this.arrayCommunityA1 = this.UserGlobalService.joinMultiSelect(_ca);

                let _ca1 = this.selectedreligionsAItems;
                this.arrayReligionA = this.UserGlobalService.joinMultiSelect(_ca1);

                this.userservice.getData({
                    ReligionId: this.arrayReligionA,
                    CommunityId: this.arrayCommunityA1
                }, "IdValues/GetCasteBasedonCommunityReligion", "POST").subscribe((response: any) => {
                    this.isLoading = false;
                    try {
                        if (response.code == 1) {
                            const res = response.dropdownlist;
                            this.castesA = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
                        } else {
                            this.notifyService.showWarning("No data found", "");

                            this.selectedreligionsAItems = [];
                            this.isReligionA = false;

                            this.selectedcastesAItems = [];
                            this.isCastesA = false;

                            this.selectedsubcastesAItems = [];
                            this.isSubCastesA = false;
                        }
                    } catch (err) {
                        // this.notifyService.showWarning("Getting error", "Warning");
                        this.notifyService.showInfo("Something went wrong. Try again", "")
                    }
                })
            }
        } else {
            this.isReligionA = false;
        }
    }
    OnItemDeSelectReligionsA(item: any) {
        this.isReligionA = false;
        if (item.id) {
            this.isReligionA = true;

            let _ca = this.selectedcommunitiesAItems;
            this.arrayCommunityA1 = this.UserGlobalService.joinMultiSelect(_ca);

            let _ca1 = this.selectedreligionsAItems;
            this.arrayReligionA = this.UserGlobalService.joinMultiSelect(_ca1);

            this.userservice.getData({
                ReligionId: this.arrayReligionA,
                CommunityId: this.arrayCommunityA1
            }, "IdValues/GetCasteBasedonCommunityReligion", "POST").subscribe((response: any) => {
                this.isLoading = false;
                try {
                    if (response.code == 1) {
                        const res = response.dropdownlist;
                        this.castesA = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    } else {
                        this.notifyService.showWarning("No data found", "");

                        this.selectedreligionsAItems = [];
                        this.isReligionA = false;

                        this.selectedcastesAItems = [];
                        this.isCastesA = false;

                        this.selectedsubcastesAItems = [];
                        this.isSubCastesA = false;
                    }
                } catch (err) {
                    // this.notifyService.showWarning("Getting error", "Warning");
                    this.notifyService.showInfo("Something went wrong. Try again", "")
                }
            })
        }
    }
    onSelectAllReligionsA(item: any) {}

    // Caste
    onItemSelectCastesA(item: any) {
        if (this.selectedcastesAItems) {
            if (item.id) {
                this.isCastesA = true;

                let _ca = this.selectedcommunitiesAItems;
                this.arrayCommunityA2 = this.UserGlobalService.joinMultiSelect(_ca);

                let _ca1 = this.selectedreligionsAItems;
                this.arrayReligionA1 = this.UserGlobalService.joinMultiSelect(_ca1);

                let _ca2 = this.selectedcastesAItems;
                this.arrayCasteA = this.UserGlobalService.joinMultiSelect(_ca2);

                this.userservice.getData({
                    CasteId: this.arrayCasteA,
                    ReligionId: this.arrayReligionA1,
                    CommunityId: this.arrayCommunityA2
                }, "IdValues/GetSubsectByCasteCommunityReligion", "POST").subscribe((response: any) => {
                    this.isLoading = false;
                    try {
                        if (response.code == 1) {
                            const res = response.dropdownlist;
                            this.subcastesA = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
                        } else {
                            this.notifyService.showWarning("No data found", "");
                            // this.selectedcastesAItems = [];
                            // this.isCastesA = false;

                            this.selectedsubcastesAItems = [];
                            this.isSubCastesA = false;
                        }
                    } catch (err) {
                        // this.notifyService.showWarning("Getting error", "Warning");
                        this.notifyService.showInfo("Something went wrong. Try again", "")
                    }
                })
            }
        } else {
            this.isCastesA = false;
        }
    }
    OnItemDeSelectCastesA(item: any) {
        this.isCastesA = false;

        if (item.id) {
            this.selectedsubcastesAItems = [];
            this.isSubCastesA = false;

            this.isCastesA = true;

            let _ca = this.selectedcommunitiesAItems;
            this.arrayCommunityA2 = this.UserGlobalService.joinMultiSelect(_ca);

            let _ca1 = this.selectedreligionsAItems;
            this.arrayReligionA1 = this.UserGlobalService.joinMultiSelect(_ca1);

            let _ca2 = this.selectedcastesAItems;
            this.arrayCasteA = this.UserGlobalService.joinMultiSelect(_ca2);

            this.userservice.getData({
                CasteId: this.arrayCasteA,
                ReligionId: this.arrayReligionA1,
                CommunityId: this.arrayCommunityA2
            }, "IdValues/GetSubsectByCasteCommunityReligion", "POST").subscribe((response: any) => {
                this.isLoading = false;
                try {
                    if (response.code == 1) 
                    {
                        const res = response.dropdownlist;
                        this.subcastesA = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    } 
                    else 
                    {
                        this.notifyService.showWarning("No data found", "");

                        this.selectedcastesAItems = [];
                        this.isCastesA = false;

                        this.selectedsubcastesAItems = [];
                        this.isSubCastesA = false;
                    }
                } catch (err) {
                    // this.notifyService.showWarning("Getting error", "Warning");
                    this.notifyService.showInfo("Something went wrong. Try again", "")
                }
            })
        }
    }
    onSelectAllCastesA(item: any) {}

    // Sub Caste
    onItemSelectSubCastesA(item: any) {
        if (this.selectedcastesAItems) {
            this.isSubCastesA = true;
        } else {
            this.isSubCastesA = false;
        }
    }
    OnItemDeSelectSubCastesA(item: any) {
        this.isSubCastesA = false;
    }
    onSelectAllSubCastesA(item: any) {}

    //Education
    onItemSelectedEducation(item: any) {
        if (this.selectedEducationItems) {
            if (item.id) {
                this.isEducation = true;
            }
        } else {
            this.isEducation = false;
        }
    }
    onItemDeSelectedEducation(item: any) {
        this.isEducation = false;
    }
    onSelectAllEducation(item: any) {}

    //Profession
    onItemSelectedProfession(item: any) {
        if (this.selectedProfessionItems) {
            if (item.id) {
                this.isProfession = true;
            }
        } else {
            this.isProfession = false;
        }
    }
    onItemDeSelectedProfession(item: any) {
        this.isProfession = false;
    }
    onSelectAllProfession(item: any) {}


    // HeightFrom
    onItemSelectHeightFrom(item: any) {
        if (this.selectedHeightFromItems) {
            if (item.id) {
                this.isHeightFrom = true;
            }
        } else {
            this.isHeightFrom = false;
        }
    }
    OnItemDeSelectHeightFrom(item: any) {
        this.isHeightFrom = false;
    }
    onSelectAllHeightFrom(item: any) {}

    // Heightto
    onItemSelectHeightTo(item: any) {
        if (this.selectedHeightToItems) {
            if (item.id) {
                this.isHeightTo = true;
            }
        } else {
            this.isHeightTo = false;
        }
    }
    OnItemDeSelectHeightTo(item: any) {
        this.isHeightTo = false;
    }
    onSelectAllHeightTo(item: any) {}

    //stars
    onItemSelectStar(item: any) {
        if (this.selectedcastesItems) {
            this.isStar = true;
        } else {
            this.isStar = false;
        }
    }
    OnItemDeSelectStar(item: any) {
        this.isStar = false;
    }

    //Country
    onItemSelectCountry(item: any) {
        if (this.selectedCountryItems) {
            if (item.id) {
                this.isCountry = true;

                this.selectedStateItems = [];
                this.isState = false;

                this.selectedCityItems = [];
                this.isCity = false;
                this.arrayCountry = this.UserGlobalService.joinMultiSelect(this.selectedCountryItems);

                this.userservice.getData({
                    CountryId: this.arrayCountry
                }, "IdValues/GetStatesBasedonCountry", "POST").subscribe((response: any) => {
                    this.isLoading = false;
                    try {
                        if (response.code == 1) {
                            const res = response.dropdownlist;
                            this.State = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
                        } else {
                            this.notifyService.showWarning("No data found", "");
                        }
                    } catch (err) {
                        // this.notifyService.showWarning("Getting error", "Warning");
                        this.notifyService.showInfo("Something went wrong. Try again", "")
                    }
                })
            }
        } else {
            this.isCountry = false;
        }
    }

    OnItemDeSelectCountry(item: any) {
        this.State = null;
        this.City = null;
        this.isCountry = false;

        if (item.id) {
            this.isCountry = true;

            this.selectedStateItems = [];
            this.isState = false;

            this.selectedCityItems = [];
            this.isCity = false;

            this.userservice.getData({
                CountryId: item.id
            }, "IdValues/GetStatesBasedonCountry", "POST").subscribe((response: any) => {
                this.isLoading = false;
                try {
                    if (response.code == 1) {
                        const res = response.dropdownlist;
                        this.State = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    } else {
                        this.notifyService.showWarning("No data found", "");
                    }
                } catch (err) {
                    // this.notifyService.showWarning("Getting error", "Warning");
                    this.notifyService.showInfo("Something went wrong. Try again", "")
                }
            })
        }
    }

    onSelectAllCountry(item: any) {}

    //State
    onItemSelectState(item: any) {
        if (this.selectedStateItems) {
            if (item.id) {
                this.selectedCityItems = [];
                this.isCity = false;

                this.isState = true;

                let _ca = this.selectedStateItems;
                this.arraystate = this.UserGlobalService.joinMultiSelect(_ca);

                this.userservice.getData({
                    StateId: this.arraystate
                }, "IdValues/GetCitiesBasedonState", "POST").subscribe((response: any) => {
                    this.isLoading = false;
                    try {
                        if (response.code == 1) {
                            const res = response.dropdownlist;
                            this.City = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
                        } else {
                            this.notifyService.showWarning("No data found", "");
                            this.City = null;
                        }
                    } catch (err) {
                        // this.notifyService.showWarning("Getting error", "Warning");
                        this.notifyService.showInfo("Something went wrong. Try again", "")
                        this.City = null;
                    }
                })
            }
        } else {
            this.isState = false;
        }
    }

    OnItemDeSelectState(item: any) {
        this.isState = false;
        if (item.id) {
            this.selectedCityItems = [];
            this.isCity = false;

            this.isState = true;
            this.userservice.getData({
                StateId: item.id
            }, "IdValues/GetCitiesBasedonState", "POST").subscribe((response: any) => {
                this.isLoading = false;
                try {
                    if (response.code == 1) {
                        const res = response.dropdownlist;
                        this.City = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    } else {
                        this.notifyService.showWarning("No data found", "");
                        this.City = null;
                    }
                } catch (err) {
                    // this.notifyService.showWarning("Getting error", "Warning");
                    this.notifyService.showInfo("Something went wrong. Try again", "")
                    this.City = null;
                }
            })
        }
    }

    onSelectAllState(item: any) {}

    //City
    onItemSelectCity(item: any) {
        if (this.selectedCityItems) {
            if (item.id) {
                this.isCity = true;
            }
        } else {
            this.isCity = false;
        }
    }

    OnItemDeSelectCity(item: any) {
        this.isCity = false;
    }

    onSelectAllCity(item: any) {}

    //ProfilePosted
    onItemSelectProfilePosted(item: any) {
        if (this.selectedProfilePostedItems) {
            if (item.id) {
                this.isProfilePosted = true;
            }
        } else {
            this.isProfilePosted = false;
        }
    }

    OnItemDeSelectProfilePosted(item: any) {
        this.isProfilePosted = false;
    }

    onSelectAllProfilePosted(item: any) {}

    //ProfilePostedA
    onItemSelectProfilePostedA(item: any) {
        if (this.selectedProfilePostedAItems) {
            if (item.id) {
                this.isProfilePostedA = true;
            }
        } else {
            this.isProfilePostedA = false;
        }
    }

    OnItemDeSelectProfilePostedA(item: any) {
        this.isProfilePostedA = false;
    }

    onSelectAllProfilePostedA(item: any) {}

    //ResultsPerPage
    onItemSelectedResultsPerPage(item: any) {
        if (this.selectedResultsPerPage) {
            if (item.id) {
                this.isResultsPerPage = true;
            }
        } else {
            this.isResultsPerPage = false;
        }
    }
    onItemDeSelectedResultsPerPage(item: any) {
        this.isResultsPerPage = false;
    }
    onSelectAllResultsPerPage(item: any) {}

    //ResultsPerPageA
    onItemSelectedResultsPerPageA(item: any) {
        if (this.selectedResultsPerPageA) {
            if (item.id) {
                this.isResultsPerPageA = true;
            }
        } else {
            this.isResultsPerPageA = false;
        }
    }
    onItemDeSelectedResultsPerPageA(item: any) {
        this.isResultsPerPageA = false;
    }
    onSelectAllResultsPerPageA(item: any) {}

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

    physicalDisChange(name: string, isChecked: boolean)
    {
        if (isChecked) 
        {
            this.physicalDis_ids.push(name);
        } 
        else 
        {
            let i: number = 0;
              this.physicalDis_ids.forEach((item) => 
              {
                if (item == name) 
                {
                    this.physicalDis_ids.splice(i, 1);
                }
                i++;
              });
              
        }

        if ($('#physicalDisID'+name).hasClass('active') == true) 
        {
            $('#physicalDisID'+name).removeClass('active');
            return false;
        } 
        else 
        {
            $('#physicalDisID'+name).addClass('active');
            return false;
        }
    }

    DoshamChange(name: string, isChecked: boolean)
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

    ShowProfilesChange(name: string, isChecked: boolean)
    {
        //alert(name);
        if (isChecked) 
        {
            this.ShowProfiles_ids.push(name);
        } 
        else 
        {
            let i: number = 0;
              this.ShowProfiles_ids.forEach((item) => 
              {
                if (item == name) 
                {
                    this.ShowProfiles_ids.splice(i, 1);
                }
                i++;
              });
              
        }

        if ($('#ShowProfilesID'+name).hasClass('active') == true) 
        {
            $('#ShowProfilesID'+name).removeClass('active');
            return false;
        } 
        else 
        {
            $('#ShowProfilesID'+name).addClass('active');
            return false;
        }
    }

    ShowProfilesAChange(name: string, isChecked: boolean)
    {
        //alert(name);
        if (isChecked) 
        {
            this.ShowProfilesA_ids.push(name);
        } 
        else 
        {
            let i: number = 0;
            this.ShowProfilesA_ids.forEach((item) => 
            {
                if (item == name) 
                {
                    this.ShowProfilesA_ids.splice(i, 1);
                }
                i++;
            });
        }

        if ($('#ShowProfilesAID'+name).hasClass('active') == true) 
        {
            $('#ShowProfilesAID'+name).removeClass('active');
            return false;
        } 
        else 
        {
            $('#ShowProfilesAID'+name).addClass('active');
            return false;
        }
    }

    CountryTypeChange(name: string, isChecked: boolean)
    {
        
        if (isChecked) 
        {
            this.CountryType_ids.push(name);
        } 
        else 
        {
            let i: number = 0;
            this.CountryType_ids.forEach((item) => 
            {
                if (item == name) 
                {
                    this.CountryType_ids.splice(i, 1);
                }
                i++;
            });
        }

        if ($('#CountryTypeID'+name).hasClass('active') == true) 
        {
            $('#CountryTypeID'+name).removeClass('active');
            return false;
        } 
        else 
        {
            $('#CountryTypeID'+name).addClass('active');
            return false;
        }
    }


    openSaveSearchModal(personalized, prosess, regnumber) 
    {
        this.dbService.getByKey('setup', 1).subscribe((userData) => 
        { 
            localStorage.setItem('pageSetUp',JSON.stringify(userData));
        });

        if(prosess=='SaveSearch')
        {
            this.modalRef = this.modalService.show(personalized, this.config);
        }
    } 

    openSaveSearchAdvModal(personalized, prosess, regnumber) 
    {
        this.dbService.getByKey('setup', 1).subscribe((userData) => 
        { 
            localStorage.setItem('pageSetUp',JSON.stringify(userData));
        });

        // const result2 = Object.assign({}, this.searchForm2.value);
        //  if( result2.AgefromA ) 
        // {
        //     this.user_save_info = {
        //         sSaveRegNo:this.regno,
        //         sLookingFor: result2.LookingForA,
        //         sAgeFrom: result2.AgefromA[0].id,
        //         sAgeTo: result2.AgetoA[0].id,
        //     };
        //     if (result2.selectMaritalstatusA) {
        //          this.user_save_info['sMaritalStatus'] = this.UserGlobalService.joinMultiSelect(result2.selectMaritalstatusA);
        //     }
        //     if (result2.selectCommunityA) {
        //          this.user_save_info['sCommunity'] = this.UserGlobalService.joinMultiSelect(result2.selectCommunityA);
        //     }
        //     if (result2.selectReligionA) {
        //          this.user_save_info['sReligion'] = this.UserGlobalService.joinMultiSelect(result2.selectReligionA);
        //     }
        //     if (result2.selectCasteA) {
        //          this.user_save_info['sCaste'] = this.UserGlobalService.joinMultiSelect(result2.selectCasteA);
        //     }
        //     if (result2.selectSubCasteA) {
        //          this.user_save_info['sSubsect'] = this.UserGlobalService.joinMultiSelect(result2.selectSubCasteA);
        //     }

        //     if (result2.selectEducation) {
        //          this.user_save_info['sEducation'] = this.UserGlobalService.joinMultiSelect(result2.selectEducation);
        //     }
        //     if (result2.selectProfession) {
        //          this.user_save_info['sProfession'] = this.UserGlobalService.joinMultiSelect(result2.selectProfession);
        //     }
        //     if (result2.DietList) 
        //     {
        //          this.user_save_info['sDiet'] = this.Diet_ids.join();//this.UserGlobalService.joinMultiSelect(this.Diet_ids.join());
        //     }
        //     if (result2.selectHeightFrom) {
        //          this.user_save_info['sHeightFrom'] = this.UserGlobalService.joinMultiSelect(result2.selectHeightFrom);
        //     }
        //     if (result2.selectHeightTo) {
        //          this.user_save_info['sHeightTo'] = this.UserGlobalService.joinMultiSelect(result2.selectHeightTo);
        //     }
        //     if (result2.selectStar) {
        //          this.user_save_info['sStar'] = this.UserGlobalService.joinMultiSelect(result2.selectStar);
        //     }
        //     if (result2.Physical_disabilityList) 
        //     {
        //         this.user_save_info['sSpecialCatogory'] = this.physicalDis_ids.join(); //this.UserGlobalService.joinMultiSelect(result2.Physical_disabilityList);
        //     }
        //     if (result2.selectDoshams) {
        //          this.user_save_info['sDosham'] = this.Dosham_ids.join();//this.UserGlobalService.joinMultiSelect(result2.selectDoshams);
        //     }
        //     if (result2.CountryType) 
        //     {
        //          this.user_save_info['sCountryType'] = this.CountryType_ids.join(); //this.UserGlobalService.joinMultiSelect(result2.CountryType);
        //     }
        //     if (result2.selectCountry) {
        //         this. user_save_info['sCountry'] = this.UserGlobalService.joinMultiSelect(result2.selectCountry);
        //     }
        //     if (result2.selectCState) {
        //          this.user_save_info['sState'] = this.UserGlobalService.joinMultiSelect(result2.selectCState);
        //     }
        //     if (result2.selectCCity) {
        //          this.user_save_info['sCity'] = this.UserGlobalService.joinMultiSelect(result2.selectCCity);
        //     }
        //     if (result2.selectProfilePostedA) {
        //          this.user_save_info['profilePosted'] = this.UserGlobalService.joinMultiSelect(result2.selectProfilePostedA);
        //     }
        //     if (result2.ResultsPerPageA) {
        //          this.user_save_info['resultPerPage'] = this.UserGlobalService.joinMultiSelect(result2.ResultsPerPageA);
        //     }
        //     if (result2.ShowProfilesA) 
        //     {
        //          //this.ShowProfilesA_ids.join();
        //          this.user_save_info['photoStatus'] =result2.ShowProfilesA;
        //          this.user_save_info['horoStatus'] = result2.ShowProfilesA;
        //          this.user_save_info['starCompatibility'] = result2.ShowProfilesA;
        //     }
          
        // } 

        
        if(prosess=='SaveSearchAdv')
        {
            this.modalRef = this.modalService.show(personalized, this.config);
        }
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
        //alert(this.Marital_ids);
       // console.log(this.Marital_ids);
    
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

    MaritalStatusASearch(nameA: string, isCheckedA: boolean)
    {
        if (isCheckedA) 
        {
            this.Marital_idsA.push(nameA);
        } 
        else 
        {
            let i: number = 0;
            this.Marital_idsA.forEach((item) => 
            {
                if (item == nameA) 
                {
                    this.Marital_idsA.splice(i, 1);
                }
                i++;
            });
              
        }
        //alert(this.Marital_idsA);
       /// console.log(this.Marital_idsA);
    
        if ($('#MaritalIDA'+nameA).hasClass('active') == true) 
        {
            $('#MaritalIDA'+nameA).removeClass('active');
            return false;
        } 
        else 
        {
            $('#MaritalIDA'+nameA).addClass('active');
            return false;
        }
    }

    onSubmit1(process) 
    {
         
        this.SubmitbuttonSearch = "Loading...";
        this.SubmitbuttonSaveSearch = "Loading...";
        this.disableBtn = true;
        const result1 = Object.assign({}, this.searchForm1.value);
        const resultsearchmodel = Object.assign({}, this.ModelSaveSearchForm.value);
        //console.log(result1);


        // result1.LookingFor &&  && result1.ResultsPerPage  && result1.ShowProfiles && result1.selectProfilePosted

        if (result1.Agefrom && result1.Ageto && this.Marital_ids !=null && result1.selectCommunity && result1.selectReligion &&
            result1.selectCaste && result1.selectSubCaste ) 
        {
            this.user_save_info = {
                sSaveRegNo: this.regno,
                sLookingFor: result1.LookingFor,
                sAgeFrom: result1.Agefrom[0].id,
                sAgeTo: result1.Ageto[0].id,
            };
            if (result1.selectMaritalstatus) {
                this.user_save_info['sMaritalStatus'] = this.Marital_ids; //this.UserGlobalService.joinMultiSelect(result1.selectMaritalstatus);
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
                this.user_save_info['sSubsect'] = this.UserGlobalService.joinMultiSelect(result1.selectSubCaste);
            }
            // if (result1.selectProfilePosted) {
            //     this.user_save_info['profilePosted'] = this.UserGlobalService.joinMultiSelect(result1.selectProfilePosted);
            // }
            // if (result1.selectProfession) {
            //     this.user_save_info['resultPerPage'] = this.UserGlobalService.joinMultiSelect(result1.ResultsPerPage);
            // }
            // if (result1.ShowProfiles) 
            // {
            //     this.ShowProfiles_ids.join();
            //     this.user_save_info['photoStatus'] =result1.ShowProfiles;
            //     this.user_save_info['horoStatus'] = result1.ShowProfiles;
            //     this.user_save_info['starCompatibility'] = result1.ShowProfiles;
            // }
            
           
           if(process=='Search')
           {
                this.user_save_info['sLookingFor'] = this.LookingFor1;
                this.user_save_info['process'] = 2;
                this.user_data =  Object.entries(this.user_save_info);
                localStorage.setItem("INkmSearch_data", JSON.stringify(this.user_data));
                console.log(this.user_save_info);
                this.userservice.getData(this.user_save_info, "WebUserSearch/SearchInputs", "POST").subscribe((response: any) => {
               // console.log(response);
                });
                  
                this.router.navigate(['search-profiles']);
           }
           else
           {
               if(resultsearchmodel.Search_Name && resultsearchmodel.Search_Description)
               {
                    this.user_save_info['sUsersSavedSearchName'] = resultsearchmodel.Search_Name;
                    this.user_save_info['sUsersSavedSearchDescription'] = resultsearchmodel.Search_Description;
                   
                    this.user_save_info['sLookingFor'] = this.LookingFor1;
                    this.user_save_info['process'] = 2;
                    console.log(this.user_save_info);
                    this.userservice.getData(this.user_save_info, "WebUserSearch/SearchInputs", "POST").subscribe((response: any) => {
                    this.isLoading = true;
                       
                        try {
                            if (response.message == "Success") {
                                this.closeModal();
                                this.isLoading = false;
                                this.router.navigate(['search-profiles']);
                            } 
                            else 
                            {
                                this.SubmitbuttonSearch = "Search";
                                this.SubmitbuttonSaveSearch = "Save Search";
                                this.isLoading = false;
                                this.notifyService.showError(response.message, "")
                                this.disableBtn = false;
                            }
                        } catch (err) {
                            this.SubmitbuttonSearch = "Search";
                            this.SubmitbuttonSaveSearch = "Save Search";
                            this.isLoading = false;
                            this.disableBtn = false;
                            // this.notifyService.showError("Internal Server Error", "Error")
                            this.notifyService.showInfo("Something went wrong. Try again", "")
                        }
                    }, (err) => {
                        this.SubmitbuttonSearch = "Search";
                        this.SubmitbuttonSaveSearch = "Save Search";
                        this.isLoading = false;
                        this.disableBtn = false;
                        // this.notifyService.showError("Internal Server Error", "Error")
                        this.notifyService.showInfo("Something went wrong. Try again", "")
                    });

               }
               else
               {
                    this.SubmitbuttonSearch = "Search";
                    this.SubmitbuttonSaveSearch = "Save Search";
                    this.disableBtn = false;
                    this.notifyService.showWarning("Please enter required fields", "");
               }
                
            }
        } 
        else 
        {
            this.SubmitbuttonSearch = "Search";
            this.SubmitbuttonSaveSearch = "Save Search";
            this.disableBtn = false;
            this.notifyService.showWarning("Please enter required fields", "");
        }
    };

    closeModal()
    {
        this.modalRef.hide();
        this.ModelSaveSearchAdvForm.reset();
        this.ModelSaveSearchForm.reset();
    }

    onSubmit2(process) 
    { 
        this.SubmitbuttonAdvSearch = "Loading...";
        this.SubmitbuttonSaveAdvSearch = "Loading...";
        this.disableBtn = true;
        const result2 = Object.assign({}, this.searchForm2.value);
        const resultsearchadvmodel = Object.assign({}, this.ModelSaveSearchAdvForm.value);

// (result2.LookingForA && result2.AgefromA && result2.AgetoA && result2.selectMaritalstatusA && result2.selectCommunityA && result2.selectReligionA &&    result2.selectCasteA && result2.selectSubCasteA &&  result2.selectEducation && result2.selectProfession && result2.DietList && result2.selectHeightFrom && result2.selectHeightTo && result2.selectStar && result2.Physical_disabilityList && result2.selectDoshams && result2.CountryType && result2.selectCountry && result2.selectCState && result2.selectCCity && result2.selectProfilePostedA && result2.ResultsPerPageA && result2.ShowProfilesA
        if(result2.AgefromA ) 
        {
            this.user_save_info = {
                sSaveRegNo:this.regno,
                sLookingFor: result2.LookingForA,
                sAgeFrom: result2.AgefromA[0].id,
                sAgeTo: result2.AgetoA[0].id,
            };
            if (result2.selectMaritalstatusA) {
                 this.user_save_info['sMaritalStatus'] = this.Marital_idsA; //this.UserGlobalService.joinMultiSelect(result2.selectMaritalstatusA);
            }
            if (result2.selectCommunityA) {
                 this.user_save_info['sCommunity'] = this.UserGlobalService.joinMultiSelect(result2.selectCommunityA);
            }
            if (result2.selectReligionA) {
                 this.user_save_info['sReligion'] = this.UserGlobalService.joinMultiSelect(result2.selectReligionA);
            }
            if (result2.selectCasteA) {
                 this.user_save_info['sCaste'] = this.UserGlobalService.joinMultiSelect(result2.selectCasteA);
            }
            if (result2.selectSubCasteA) {
                 this.user_save_info['sSubsect'] = this.UserGlobalService.joinMultiSelect(result2.selectSubCasteA);
            }

            if (result2.selectEducation) {
                 this.user_save_info['sEducation'] = this.UserGlobalService.joinMultiSelect(result2.selectEducation);
            }
            if (result2.selectProfession) {
                 this.user_save_info['sProfession'] = this.UserGlobalService.joinMultiSelect(result2.selectProfession);
            }
            if (result2.DietList) 
            {
                 this.user_save_info['sDiet'] = this.Diet_ids.join();//this.UserGlobalService.joinMultiSelect(this.Diet_ids.join());
            }
            if (result2.selectHeightFrom) {
                 this.user_save_info['sHeightFrom'] = this.UserGlobalService.joinMultiSelect(result2.selectHeightFrom);
            }
            if (result2.selectHeightTo) {
                 this.user_save_info['sHeightTo'] = this.UserGlobalService.joinMultiSelect(result2.selectHeightTo);
            }
            if (result2.selectStar) {
                 this.user_save_info['sStar'] = this.UserGlobalService.joinMultiSelect(result2.selectStar);
            }
            if (result2.Physical_disabilityList) 
            {
                this.user_save_info['sSpecialCatogory'] = this.physicalDis_ids.join(); //this.UserGlobalService.joinMultiSelect(result2.Physical_disabilityList);
            }
            if (result2.selectDoshams) {
                 this.user_save_info['sDosham'] = this.Dosham_ids.join();//this.UserGlobalService.joinMultiSelect(result2.selectDoshams);
            }
            if (result2.CountryType) 
            {
                 this.user_save_info['sCountryType'] = this.CountryType_ids.join(); //this.UserGlobalService.joinMultiSelect(result2.CountryType);
            }
            if (result2.selectCountry) {
                this. user_save_info['sCountry'] = this.UserGlobalService.joinMultiSelect(result2.selectCountry);
            }
            if (result2.selectCState) {
                 this.user_save_info['sState'] = this.UserGlobalService.joinMultiSelect(result2.selectCState);
            }
            if (result2.selectCCity) {
                 this.user_save_info['sCity'] = this.UserGlobalService.joinMultiSelect(result2.selectCCity);
            }
            // if (result2.selectProfilePostedA) {
            //      this.user_save_info['profilePosted'] = this.UserGlobalService.joinMultiSelect(result2.selectProfilePostedA);
            // }
            // if (result2.ResultsPerPageA) {
            //      this.user_save_info['resultPerPage'] = this.UserGlobalService.joinMultiSelect(result2.ResultsPerPageA);
            // }
            // if (result2.ShowProfilesA) 
            // {
            //      this.user_save_info['photoStatus'] =result2.ShowProfilesA;
            //      this.user_save_info['horoStatus'] = result2.ShowProfilesA;
            //      this.user_save_info['starCompatibility'] = result2.ShowProfilesA;
            // }

            if(process=='Search')
            {

                this.isLoading = true;
                this.user_save_info['sLookingFor'] = this.LookingFor1;
                this.user_save_info['process'] = 2;
                this.user_data1 =  Object.entries(this.user_save_info);
                
                localStorage.setItem("INkmSearch_data", JSON.stringify(this.user_data1));
                this.userservice.getData(this.user_save_info, "WebUserSearch/SearchInputs", "POST").subscribe((response: any) => 
                {
                    if (response.status == 1) 
                    {
                        this.isLoading = false;
                        this.router.navigate(['search-profiles']);
                    } 
                    else 
                    {
                        this.SubmitbuttonAdvSearch = "Search";
                        this.SubmitbuttonSaveAdvSearch = "Search";
                        this.isLoading = false;
                        this.notifyService.showError(response.message, "")
                        this.disableBtn = false;
                    }
                
                });
                
            }
            else
            {
                if(resultsearchadvmodel.Search_Name && resultsearchadvmodel.Search_Description)
                {
                    this.user_save_info['sUsersSavedSearchName'] = resultsearchadvmodel.Search_Name;
                    this.user_save_info['sUsersSavedSearchDescription'] = resultsearchadvmodel.Search_Description;
                    this.user_save_info['sLookingFor'] = this.LookingFor1;
                    this.user_save_info['process'] = 2;
                    this.userservice.getData(this.user_save_info, "WebUserSearch/SearchInputs", "POST").subscribe((response: any) => 
                    {
                        this.isLoading = true;
                        try 
                        {
                            if (response.status == 1) 
                            {
                                this.closeModal();
                                this.isLoading = false;
                                this.router.navigate(['search-profiles']);
                            } 
                            else 
                            {
                                this.SubmitbuttonAdvSearch = "Search";
                                this.SubmitbuttonSaveAdvSearch = "Search";
                                this.isLoading = false;
                                this.notifyService.showError(response.message, "")
                                this.disableBtn = false;
                            }
                        } 
                        catch (err) 
                        {
                            this.SubmitbuttonAdvSearch = "Search";
                            this.SubmitbuttonSaveAdvSearch = "Search";
                            this.isLoading = false;
                            this.disableBtn = false;
                            // this.notifyService.showError("Internal Server Error", "Error")
                            this.notifyService.showInfo("Something went wrong. Try again", "")
                        }
                    },
                    (err) => 
                    {
                        this.SubmitbuttonAdvSearch = "Search";
                        this.SubmitbuttonSaveAdvSearch = "Search";
                        this.isLoading = false;
                        this.disableBtn = false;
                        // this.notifyService.showError("Internal Server Error", "Error")
                        this.notifyService.showInfo("Something went wrong. Try again", "")
                    
                    }); 
                }
                else
                {
                    this.SubmitbuttonAdvSearch = "Search";
                    this.SubmitbuttonSaveAdvSearch = "Save Search";
                    this.disableBtn = false;
                    this.notifyService.showWarning("Please enter required fields", ""); 
                }
                
                // this.userservice.getData(this.user_save_info, "Registration/SaveUserInfo", "POST").subscribe((response: any) => 
                // {
                //     this.isLoading = true;
                //     try 
                //     {
                //         if (response.status == 1) 
                //         {
                //             this.isLoading = false;
                //             this.router.navigate(['/user/dashboard']);
                //         } 
                //         else 
                //         {
                //             this.SubmitbuttonAdvSearch = "Search";
                //             this.SubmitbuttonSaveAdvSearch = "Search";
                //             this.isLoading = false;
                //             this.notifyService.showError(response.message, "Error")
                //             this.disableBtn = false;
                //         }
                //     } 
                //     catch (err) 
                //     {
                //         this.SubmitbuttonAdvSearch = "Search";
                //         this.SubmitbuttonSaveAdvSearch = "Search";
                //         this.isLoading = false;
                //         this.disableBtn = false;
                //         this.notifyService.showError("Internal Server Error", "Error")
                //     }
                // }, 
                // (err) => 
                // {
                //     this.SubmitbuttonAdvSearch = "Search";
                //     this.SubmitbuttonSaveAdvSearch = "Search";
                //     this.isLoading = false;
                //     this.disableBtn = false;
                //     this.notifyService.showError("Internal Server Error", "Error")
                // });
            }
        } 
        else 
        {
            this.SubmitbuttonAdvSearch = "Search";
            this.SubmitbuttonSaveAdvSearch = "Search";
            this.disableBtn = false;
            this.notifyService.showWarning("Please enter required fields", "");
        }
    };
    onSubmit3() 
    {
        this.SubmitbuttonProfileSearch = "Loading...";
        this.disableBtn = true;
        const result3 = Object.assign({}, this.searchForm3.value);
        //console.log(result3.profile_id);
        if (result3.profile_id) 
        {
            const user_save_info = 
            {
                sSaveRegNo: this.regno,
                sRegNo: result3.profile_id,

            };
            

            this.userservice.getData(user_save_info, "WebUserSearch/SearchInputs", "POST").subscribe((response: any) => {
                this.isLoading = true;
                try {
                    if (response.status == 1) {
                        this.isLoading = false;
                        this.router.navigate(['search-profiles']);
                    } 
                    else 
                    {
                        this.SubmitbuttonProfileSearch = "Search";
                        this.isLoading = false;
                        this.notifyService.showError(response.message, "")
                        this.disableBtn = false;
                    }
                } catch (err) {
                    this.SubmitbuttonProfileSearch = "Search";
                    this.isLoading = false;
                    this.disableBtn = false;
                    // this.notifyService.showError("Internal Server Error", "Error")
                    this.notifyService.showInfo("Something went wrong. Try again", "")
                }
            }, (err) => {
                this.SubmitbuttonProfileSearch = "Search";
                this.isLoading = false;
                this.disableBtn = false;
                // this.notifyService.showError("Internal Server Error", "Error")
                this.notifyService.showInfo("Something went wrong. Try again", "")
            });
        } 
        else 
        {
            this.SubmitbuttonProfileSearch = "Search";
            this.disableBtn = false;
            this.notifyService.showWarning("Please enter required fields", "");
        }
    };

    isSetDefault()
      {
        this.dbService.getByKey('setup', 1).subscribe((userData) => 
        { 
              localStorage.setItem('pageSetUp',JSON.stringify(userData));
          });
      }

    totalage = [];
    ngOnInit(): void
    // selectedAgefrom
    {
        this.isLoading = true;

        for (let i = 18; i <= 55; i++) {
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

            //Gender 
            this.selectedGender = [];
            this.GenderSettings = {
                singleSelection: true,
                idField: 'id',
                textField: 'name',
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                itemsShowLimit: 5,
                allowSearchFilter: true,
                closeDropDownOnSelection: true
            };
            this.Gender = this.totalage
            //////////////////////////////

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
           // this.Ageto = this.totalage
            ///////////////////////////////////

            //Maritalstatus
            this.selectedMaritalstatus = [];
            this.MaritalstatusSettings = {
                singleSelection: false,
                idField: 'id',
                textField: 'name',
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                itemsShowLimit: 4,
                allowSearchFilter: true,
                closeDropDownOnSelection: true
            };
            ///////////////////////////////////

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

            //subcastesItems
            this.selectedsubcastesItems = [];
            this.subcastesSettings = {
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

            //GenderA 
            this.selectedGenderA = [];
            this.GenderASettings = {
                singleSelection: true,
                idField: 'id',
                textField: 'name',
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                itemsShowLimit: 5,
                allowSearchFilter: true,
                closeDropDownOnSelection: true
            };
            this.GenderA = this.totalage
            //////////////////////////////

            //Age From 
            this.selectedAgefromA = [];
            this.AgefromASettings = {
                singleSelection: true,
                idField: 'id',
                textField: 'name',
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                itemsShowLimit: 5,
                allowSearchFilter: true,
                closeDropDownOnSelection: true
            };
            this.AgefromA = this.totalage
            //////////////////////////////////

            //Age to 
            this.selectedAgetoA = [];
            this.AgetoASettings = {
                singleSelection: true,
                idField: 'id',
                textField: 'name',
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                itemsShowLimit: 5,
                allowSearchFilter: true,
                closeDropDownOnSelection: true
            };
            this.AgetoA = this.totalage
            ///////////////////////////////////

            //MaritalstatusA
            this.selectedMaritalstatusA = [];
            this.MaritalstatusASettings = {
                singleSelection: false,
                idField: 'id',
                textField: 'name',
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                itemsShowLimit: 4,
                allowSearchFilter: true,
                closeDropDownOnSelection: true
            };
            this.MaritalstatusA = this.totalage
            ///////////////////////////////////

            //communitiesA
            this.selectedcommunitiesAItems = [];
            this.communitiesASettings = {
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

            //religionsA
            this.selectedreligionsAItems = [];
            this.religionsASettings = {
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

            //castesItemsA
            this.selectedcastesAItems = [];
            this.castesASettings = {
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

            //subcastesItems
            this.selectedsubcastesAItems = [];
            this.subcastesASettings = {
                singleSelection: false,
                idField: 'id',
                textField: 'name',
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                itemsShowLimit: 3,
                allowSearchFilter: true,
                closeDropDownOnSelection: true
            };

            //Education
            this.selectedEducationItems = [];
            this.EducationSettings = {
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
            this.ProfessionSettings = {
                singleSelection: false,
                idField: 'id',
                textField: 'name',
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                itemsShowLimit: 2,
                allowSearchFilter: true,
                closeDropDownOnSelection: true
            };

            //Height From
            this.selectedHeightFromItems = [];
            this.HeightFromSettings = {
                singleSelection: true,
                idField: 'id',
                textField: 'name',
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                itemsShowLimit: 5,
                allowSearchFilter: true,
                closeDropDownOnSelection: true
            };

            //Height To
            this.selectedHeightToItems = [];
            this.HeightToSettings = {
                singleSelection: true,
                idField: 'id',
                textField: 'name',
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                itemsShowLimit: 5,
                allowSearchFilter: true,
                closeDropDownOnSelection: true
            };

            //Star
            this.selectedstarsItems = [];
            this.starsSettings = {
                singleSelection: false,
                idField: 'id',
                textField: 'name',
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                itemsShowLimit: 3,
                allowSearchFilter: true,
                closeDropDownOnSelection: true
            };

            //Country
            this.selectedCountryItems = [];
            this.CountrySettings = {
                singleSelection: false,
                idField: 'id',
                textField: 'name',
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                itemsShowLimit: 5,
                allowSearchFilter: true,
                closeDropDownOnSelection: true
            };

            //State
            this.selectedStateItems = [];
            this.StateSettings = {
                singleSelection: false,
                idField: 'id',
                textField: 'name',
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                itemsShowLimit: 5,
                allowSearchFilter: true,
                closeDropDownOnSelection: true
            };

            //City
            this.selectedCityItems = [];
            this.CitySettings = {
                singleSelection: false,
                idField: 'id',
                textField: 'name',
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                itemsShowLimit: 5,
                allowSearchFilter: true,
                closeDropDownOnSelection: true
            };

            //ProfilePosted
            this.selectedProfilePostedItems = [];
            this.ProfilePostedSettings = {
                singleSelection: true,
                idField: 'id',
                textField: 'name',
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                itemsShowLimit: 5,
                allowSearchFilter: true,
                closeDropDownOnSelection: true
            };

            //ProfilePostedA
            this.selectedProfilePostedAItems = [];
            this.ProfilePostedASettings = {
                singleSelection: true,
                idField: 'id',
                textField: 'name',
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                itemsShowLimit: 5,
                allowSearchFilter: true,
                closeDropDownOnSelection: true
            };
            //////////////////////////////////

            //ResultsPerPage 
            this.ResultsPerPageSettings = {
                singleSelection: true,
                idField: 'id',
                textField: 'name',
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                itemsShowLimit: 5,
                allowSearchFilter: true,
                closeDropDownOnSelection: true
            };
          
            //////////////////////////////////

            //ResultsPerPageA 
            this.ResultsPerPageASettings = {
                singleSelection: true,
                idField: 'id',
                textField: 'name',
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                itemsShowLimit: 5,
                allowSearchFilter: true,
                closeDropDownOnSelection: true
            };
            //////////////////////////////////


            this.userservice.getData({
                RegNo: this.regno
            }, "WebMyDashboard/GetMyExpectationsInfo", "POST").subscribe((response: any) => {
                this.isLoading = false;
                const res = response.data[0];
                const IdList = response.IdList[0];
                console.log(res);
                this.LookingFor1 = res.GenderSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.selectedAgefrom = [{
                    "id": res.AgeMin,
                    "name": res.AgeMin
                }]
                this.selectedAgeto = [{
                    "id": res.AgeMax,
                    "name": res.AgeMax
                }]
                this.selectedMaritalstatus = res.MaritalSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.selectedcommunitiesItems = res.CommunitySelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.selectedreligionsItems = res.ReligionSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.selectedcastesItems = res.CasteSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.selectedsubcastesItems = res.SubsectSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);

                this.LookingFor2 = res.GenderSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.selectedAgefromA = [{"id": res.AgeMin, "name": res.AgeMin }]
                this.selectedAgetoA = [{"id": res.AgeMax, "name": res.AgeMax }]
                this.selectedMaritalstatusA = res.MaritalSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.selectedcommunitiesAItems = res.CommunitySelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.selectedreligionsAItems = res.ReligionSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.selectedcastesAItems = res.CasteSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.selectedsubcastesAItems = res.SubsectSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.selectedEducationItems = res.EducationSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.selectedProfessionItems = res.ProfessionSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.selectedHeightFromItems = res.HeightMinSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.selectedHeightToItems = res.HeightMaxSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                

                if (this.selectedAgefrom.length) {
                    this.isAgefrom = true;
                    this.isAgefromA = true;
                }
                if (this.selectedAgeto.length) {
                    this.isAgeto = true;
                    this.isAgetoA = true;
                }
                if (this.selectedMaritalstatus.length) {
                    this.isMaritalstatus = true;
                    this.isMaritalstatusA = true;
                }
                if (this.selectedcommunitiesItems.length) {
                    this.isCommunity = true;
                    this.isCommunityA = true;
                    this.arrayval1 = this.UserGlobalService.joinMultiSelect(this.selectedcommunitiesAItems);
                    if (this.selectedreligionsItems.length) {
                        this.isReligion = true;
                        this.isReligionA = true;
                        this.arrayval2 = this.UserGlobalService.joinMultiSelect(this.selectedreligionsItems);
                        if (this.selectedcastesItems.length) {
                            this.isCastes = true;
                            this.isCastesA = true;
                            this.arrayval3 = this.UserGlobalService.joinMultiSelect(this.selectedcastesItems);
                            if (this.selectedsubcastesAItems.length) {
                                this.isSubCastes = true;
                                this.isSubCastesA = true;
                            }
                        }
                    }
                }
                if (this.selectedEducationItems.length) {
                    this.isEducation = true;
                }
                if (this.selectedProfessionItems.length) {
                    this.isProfession = true;
                }
                if (this.selectedHeightFromItems.length) {
                    this.isHeightFrom = true;
                }
                if (this.selectedHeightToItems.length) {
                    this.isHeightTo = true;
                }

                //Overall Data
                this.Maritalstatus = IdList.MaritalList.sort((a, b) => (a.name > b.name) ? 1 : -1); 
                // res[0].IdList.filter(idlist => idlist.type == 'MaritalList').sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.communities   = IdList.CommunityList.sort((a, b) => (a.name > b.name) ? 1 : -1); 
                this.religions     = IdList.ReligionList.sort((a, b) => (a.name > b.name) ? 1 : -1); 
                this.castes        = IdList.CasteList.sort((a, b) => (a.name > b.name) ? 1 : -1); 
                this.subcastes     = IdList.SubsectList.sort((a, b) => (a.name > b.name) ? 1 : -1); 
                // this.ProfilePosted = IdList.MaritalList.sort((a, b) => (a.name > b.name) ? 1 : -1); 
                // this.ResultsPerPage= IdList.MaritalList.sort((a, b) => (a.name > b.name) ? 1 : -1); 
                // this.ShowProfiles  = IdList.MaritalList.sort((a, b) => (a.name > b.name) ? 1 : -1); 


                this.MaritalstatusA = IdList.MaritalList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.communitiesA   = IdList.CommunityList;
                this.religionsA     = IdList.ReligionList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.castesA        = IdList.CasteList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.subcastesA     = IdList.SubsectList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.Education      = IdList.EducationList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.Profession     = IdList.ProfessionList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.Diets          = IdList.DietList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.HeightFrom     = IdList.HeightMaxList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.HeightTo       = IdList.HeightMinList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.stars          = IdList.StarList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.physicalDisability = IdList.PhysiqueList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.Doshams        = IdList.DoshamList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.Country        = IdList.ResidingCountryList;
                // this.ProfilePostedA = IdList.SubsectList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                // this.ResultsPerPageA= IdList.SubsectList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                // this.ShowProfilesA  = IdList.SubsectList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.CountryTypes   = IdList.CountryTypeList.sort((a, b) => (a.name > b.name) ? 1 : -1);

                console.log(this.CountryTypes);
                this.Maritalstatus.forEach((item) => 
                {
                    if (item.selected == 1) 
                    {
                        this.Marital_ids.push(item.id);
                        this.Marital_idsA.push(item.id);
                    }
                });
            })

            this.titleService.setTitle('Search - Kalyanamalai');

            // ShowProfiles
            $(document).on('click', '.s_ShowProfiles', function() {
                if ($(this).hasClass('active') == true) {
                    $(this).removeClass('active');
                } else {
                    $(this).addClass('active');
                }
            });

            $(document).on('click', '.a_ShowProfiles', function() {
                if ($(this).hasClass('active') == true) {
                    $(this).removeClass('active');
                } else {
                    $(this).addClass('active');
                }
            });

            // Dosham
            $(document).on('click', '.a_Dosham', function() {
                if ($(this).hasClass('active') == true) {
                    $(this).removeClass('active');
                } else {
                    $(this).addClass('active');
                }
            });

            // Physical Disability
            $(document).on('click', '._Ms_phsiys', function() {
                if ($(this).hasClass('active') == true) {
                    $(this).removeClass('active');
                } else {
                    $(this).addClass('active');
                }
            });

            // ResultsPerPage
            $(document).on('click', '.s_ResultsPerPage', function() {
                $('.s_ResultsPerPage').removeClass('active');
                $(this).addClass('active');
               //  //$("input[name='ResultsPerPage']").removeAttr("checked");
               //  //$(this).addClass('active');
               // // $(this).data('id')
               //   var id=$(this).data('id');
               //  alert(id);

            });

            $(document).on('click', '.a_ResultsPerPage', function() {
                $('.s_ResultsPerPage').removeClass('active');
                $(this).addClass('active');

            });

            // CountryType
            $(document).on('click', '.a_CountryType', function() {
                if ($(this).hasClass('active') == true) {
                    $(this).removeClass('active');
                } else {
                    $(this).addClass('active');
                }
            });

            // DietList
            $(document).on('click', '.a_DietList', function() 
            {
                if ($(this).hasClass('active') == true) 
                {
                    $(this).removeClass('active');
                } 
                else 
                {
                    $(this).addClass('active');
                   // $(this).Attr("checked");
                }
            });

            // navTab
            $(document).on('click', '.navTab1', function()
                {
                    $('#navTabListing2').removeClass('show');
                    $('#navTabListing2').addClass('hide');
                    $('#navTabListing2').addClass('displayhide');

                    $('#navTabListing1').removeClass('displayhide');
                    $('#navTabListing1').addClass('show');
                });

            $(document).on('click', '.navTab2', function()
                {
                    $('#navTabListing1').removeClass('show');
                    $('#navTabListing1').addClass('hide');
                    $('#navTabListing1').addClass('displayhide');

                    $('#navTabListing2').removeClass('displayhide');
                    $('#navTabListing2').addClass('show');
                });
            }
            else
            {
                this.router.navigate(['/']);    
            }
        });
       

        


    }

}