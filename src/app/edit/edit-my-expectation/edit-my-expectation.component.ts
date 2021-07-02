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
  selector: 'app-edit-my-expectation',
  templateUrl: './edit-my-expectation.component.html',
  styleUrls: ['./edit-my-expectation.component.css']
})
export class EditMyExpectationComponent implements OnInit {
    Agefrom = [];
      selectedAgefrom = [];
      AgefromSettings: IDropdownSettings = {};
      isAgefrom:boolean = false;

    Ageto           = [];
      selectedAgeto = [];
      AgetoSettings : IDropdownSettings = {};
      isAgeto       :boolean = false;

      MaritalStatus           :any =[];
      selectedMaritalstatus     :any =[];
      isMaritalstatus         :boolean = false;
      Marital_ids             :any = [];

      communities = [];
      selectedcommunitiesItems = [];
      communitiesSettings : IDropdownSettings = {};
      isCommunity :boolean = false;

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

      // Diet = [];
      // selectedDietItems = [];
      // DietSettings: IDropdownSettings = {};
      // isDiet:boolean = false;
   
    stars = [];
    selectedstarsItems = [];
    starsSettings: IDropdownSettings = {};
    isStar: boolean = false;

    HeightFrom = [];
    selectedHeightFromItems = [];
    HeightFromSettings: IDropdownSettings = {};
    isHeightFrom: boolean = false;

    HeightTo = [];
    selectedHeightToItems = [];
    HeightToSettings: IDropdownSettings = {};
    isHeightTo: boolean = false;

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

    arrayCountry: any = [];
    arraystate: any = [];
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
      //////////////////////////////////////
    isLoading:boolean = false;
    editMyExpectationsForm: FormGroup;
    disableBtn = false;
    SubmitbuttonName: string;
    countryLists: any = [];
    residingStatus: any = [];
    castateLists: any = [];
    cacityLists : any = [];
    wastateLists: any = [];
    wacityLists : any = [];
    pastateLists : any = [];
    pacityLists : any = [];
    isEdit:any=[];
    isEdit1:any=[];

    SpecialCategory :any = [];
    SpecialCategorySelected :any;
    SpecialCategoryOther    :any;
    isSpecialCategory     : boolean = false;
    isSpecialCategoryOther: boolean = false;;

    Diets :any = [];
    Agedata :any = [];
    pageSetUp :any;
    regno     :any;

    Diet_ids : any = [];

  constructor(private dbService: NgxIndexedDBService,private UserGlobalService:UserGlobalService, private formBuilder: FormBuilder, private userservice: UserService,
        private notifyService: NotificationService, private router: Router, private titleService: Title) 
  {
        this.editMyExpectationsForm = this.formBuilder.group({
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
            selectStar:'',
            selectHeightFrom: '',
            selectHeightTo: '',
            selectCountry: '',
            selectCState: '',
            selectCCity: '',
            Physical_disabilityList:'',
            PhysicaldisabilityData:'',
        });
      this.SubmitbuttonName = 'Upadte';
  }

      // HeightFrom
    onItemSelectHeightFrom(item: any) 
    {
        if (this.selectedHeightFromItems) 
        {
            if (item.id) {
                this.isHeightFrom = true;
            }
        } else {
            this.isHeightFrom = false;
        }
    }
    OnItemDeSelectHeightFrom(item: any) 
    {
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
                this.isAgefrom = false;
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

    
    // Communities
    onItemSelectCommunities(item: any) {
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
                // const result = Object.assign({}, this.editMyExpectationsForm.value);
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
                // const result = Object.assign({}, this.editMyExpectationsForm.value);
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

        if(item.id)
            {
                this.selectedsubcastesItems = [];
                this.isSubCastes = false;

                this.isCastes = true;

                let _ca = this.selectedcommunitiesItems;
                this.arrayCommunity2 = this.UserGlobalService.joinMultiSelect(_ca);

                let _ca1 = this.selectedreligionsItems;
                this.arrayReligion1 = this.UserGlobalService.joinMultiSelect(_ca1);

                let _ca2 = this.selectedreligionsItems;
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
                            this.notifyService.showWarning("No data found", "Warning");
                        }
                    } catch (err) {
                        this.notifyService.showWarning("Getting error", "Warning");
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
                        this.notifyService.showWarning("No data found", "Warning");
                    }
                } catch (err) {
                    this.notifyService.showWarning("Getting error", "Warning");
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
                            this.notifyService.showWarning("No data found", "Warning");
                            this.City = null;
                        }
                    } catch (err) {
                        this.notifyService.showWarning("Getting error", "Warning");
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
                        this.notifyService.showWarning("No data found", "Warning");
                        this.City = null;
                    }
                } catch (err) {
                    this.notifyService.showWarning("Getting error", "Warning");
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
                //this.disableBtn = true;

                const result = Object.assign({}, this.editMyExpectationsForm.value);
               // console.log(result);
                if (result.Physical_disabilityList && result.Agefrom && result.Ageto && this.Marital_ids!='' && result.selectCommunity && result.selectReligion 
                    && result.selectCaste && result.selectSubCaste && result.selectEducation && result.selectProfession && this.Diet_ids!='') 
                {
                    const user_save_info = 
                    {
                        RegNo: this.regno,
                        AgeMin: result.Agefrom[0].id,
                        AgeMax: result.Ageto[0].id,
                    };
                    if(result.selectMaritalstatus)
                    {
                        user_save_info['MaritalStatus'] = this.Marital_ids.join();
                    }
                    if(result.selectCommunity)
                    {
                        user_save_info['Community'] = this.UserGlobalService.joinMultiSelect(result.selectCommunity);
                    }
                    if(result.selectReligion)
                    {
                        user_save_info['Religion'] = this.UserGlobalService.joinMultiSelect(result.selectReligion);
                    }
                    if(result.selectCaste)
                    {
                        user_save_info['Caste'] = this.UserGlobalService.joinMultiSelect(result.selectCaste);
                    }
                    if(result.selectSubCaste)
                    {
                        user_save_info['Subsect'] = this.UserGlobalService.joinMultiSelect(result.selectSubCaste);
                    }
                    if(result.selectEducation)
                    {
                        user_save_info['Education'] = this.UserGlobalService.joinMultiSelect(result.selectEducation);
                    }
                    if(result.selectProfession)
                    {
                        user_save_info['Profession'] = this.UserGlobalService.joinMultiSelect(result.selectProfession);
                    }
                    if(result.selectDiet)
                    {
                        user_save_info['Diet'] = this.Diet_ids.join();
                    }
                    if(result.selectStar)
                    {
                        user_save_info['Star'] = this.UserGlobalService.joinMultiSelect(result.selectStar);
                    }
                     if(result.selectHeightFrom)
                    {
                        user_save_info['HeightMin'] = this.UserGlobalService.joinMultiSelect(result.selectHeightFrom);
                    }
                    if(result.selectHeightTo)
                    {
                        user_save_info['HeightMax'] = this.UserGlobalService.joinMultiSelect(result.selectHeightTo);
                    }
                    if(result.Physical_disabilityList)
                    {
                        user_save_info['SpecialCategory'] = result.Physical_disabilityList;
                    }
                    if(result.PhysicaldisabilityData)
                    {
                        user_save_info['SpecialCategoryOther'] = result.PhysicaldisabilityData;
                    }
                    if(result.selectCountry)
                    {
                        user_save_info['ResidingCountry'] = this.UserGlobalService.joinMultiSelect(result.selectCountry);
                    }
                    if(result.selectCState)
                    {
                        user_save_info['ResidingState'] = this.UserGlobalService.joinMultiSelect(result.selectCState);
                    }
                    if(result.selectCCity)
                    {
                        user_save_info['ResidingCity'] = this.UserGlobalService.joinMultiSelect(result.selectCCity);
                    }
                    
                   // console.log(user_save_info);

                    this.userservice.getData(user_save_info, "WebProfileUpdate/Expectation", "POST").subscribe((response: any) => {
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
                else 
                {
                    this.SubmitbuttonName = 'Upadte';
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
      
    goToNextPage() :void {
        this.router.navigate(['edit/edit-hobbies-details']);
          //this.router.navigate(['/register/describe-yourself']);
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
        console.log(this.Marital_ids);
       
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

     physicalDisclick(item: any)
    {
     
        let physicalDi = item;
        $('.Physical_disabilityLists li label').removeClass('active');
        $('#physicalDisID'+physicalDi).addClass('active');

       

        if (physicalDi == 48) 
        {
            $('#PhysicaldisabilityData').removeClass('hide');
            $('#PhysicaldisabilityData').addClass('show');
        } 
        else
        {
            $('#PhysicaldisabilityData').removeClass('show');
            $('#PhysicaldisabilityData').addClass('hide');
            $('#PhysicaldisabilityOther').val("");
            $('.PhysicaldisabilityOther').removeClass('active');
            $('#PhysicaldisabilityData1').removeClass('focused');
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
    ngOnInit(): void 
    {
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
                ///////////////////////////////////////
                    this.isLoading = true;
                    this.userservice. getData({RegNo: this.regno}, "WebMyProfile/GetMyExpectationsInfo", "POST").subscribe((response: any) => {
                    const res = response.data[0];
                    this.isEdit = res;

                    const res1 = response.IdList[0];
                    this.isEdit1 = res1;
                    //console.log(this.isEdit1);
                    
                    this.isLoading = false;

                    this.selectedAgefrom          = [{"id":this.isEdit.AgeMin,"name":this.isEdit.AgeMin}];
                    this.selectedAgeto            = [{"id":this.isEdit.AgeMax,"name":this.isEdit.AgeMax}];
                   
                    this.selectedcommunitiesItems = this.isEdit.CommunitySelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.selectedreligionsItems   = this.isEdit.ReligionSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.selectedcastesItems      = this.isEdit.CasteSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.selectedsubcastesItems   = this.isEdit.SubsectSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.selectedEducationItems   = this.isEdit.EducationSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.selectedProfessionItems  = this.isEdit.ProfessionSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    //this.selectedDietItems        = this.isEdit.DietSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.selectedstarsItems       = this.isEdit.StarSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.selectedHeightFromItems  = this.isEdit.HeightMinSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.selectedHeightToItems    = this.isEdit.HeightMaxSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.selectedCountryItems     = this.isEdit.ResidingCountrySelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.selectedStateItems       = this.isEdit.ResidingStateSelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.selectedCityItems        = this.isEdit.ResidingCitySelectedList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.SpecialCategorySelected  = this.isEdit['SpecialCategoryListSelected'];
                    this.SpecialCategoryOther     = this.isEdit['SpecialCategoryOther'];

                    // this.editMyExpectationsForm = this.formBuilder.group({
                       
                    //     selectMaritalstatus     :'',
                    //     selectCommunity         : '',
                    //     selectReligion          : '',
                    //     selectCaste             : '',
                    //     selectSubCaste          : '',
                    //     selectEducation         : '',
                    //     selectProfession        : '',
                    //     selectDiet              : '',
                    //     selectStar              :'',
                    //     selectHeightFrom        : '',
                    //     selectHeightTo          : '',
                    //     selectCountry           : '',
                    //     selectCState            : '',
                    //     selectCCity             : '',
                    //     Physical_disabilityList :  '',
                    //     PhysicaldisabilityData  : this.isEdit['SpecialCategoryOther'],
                    // });

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
                    
                    // if (this.selectedDietItems.length) 
                    // {
                    //     this.isDiet = true;
                    // }

                    if (this.selectedstarsItems.length) 
                    {
                        this.isStar = true;
                    }

                    if (this.selectedHeightFromItems.length) 
                    {
                        this.isHeightFrom = true;
                    }
                    if (this.selectedHeightToItems.length) 
                    {
                        this.isHeightTo = true;
                    }

                    if (this.selectedCountryItems.length) 
                    {
                        this.isCountry = true;
                    }

                    if (this.selectedStateItems.length) 
                    {
                        this.isState = true;
                    }

                    if (this.selectedCityItems.length) 
                    {
                        this.isCity = true;
                    }

                    if (this.SpecialCategorySelected!='') 
                    {
                        this.SpecialCategorySelected=this.SpecialCategorySelected;
                        this.isSpecialCategory = true;
                    }
                    
                    if (this.SpecialCategoryOther) 
                    {
                        this.isSpecialCategoryOther = true;
                    }



                     this.MaritalStatus   = this.isEdit1.MaritalList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                     this.communities     = this.isEdit1.CommunityList;
                     this.religions       = this.isEdit1.ReligionList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                     this.castes          = this.isEdit1.CasteList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                     this.subcastes       = this.isEdit1.SubsectList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                     this.Education       = this.isEdit1.EducationList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                     this.Profession      = this.isEdit1.ProfessionList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                     this.Diets           = this.isEdit1.DietList.sort((a, b) => (a.name > b.name) ? 1 : -1);      
                     this.stars           = this.isEdit1.StarList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                     this.HeightFrom      = this.isEdit1.HeightMinList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                     this.HeightTo        = this.isEdit1.HeightMaxList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                     this.Country         = this.isEdit1.ResidingCountryList;
                     this.State           = this.isEdit1.ResidingStateList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                     this.City            = this.isEdit1.ResidingCityList.sort((a, b) => (a.name > b.name) ? 1 : -1);
                     this.SpecialCategory = this.isEdit1.SpecialCategoryList.sort((a, b) => (a.name > b.name) ? 1 : -1);

                     this.MaritalStatus.forEach((item) => 
                    {
                        if (item.selected == 1) 
                        {
                            this.Marital_ids.push(item.id);
                        }
                    });

                    this.Diets.forEach((item) => 
                    {
                        if (item.selected == 1) 
                        {
                            this.Diet_ids.push(item.id);
                        }
                    });


                  })

                  this.titleService.setTitle('Edit Your communication address - Kalyanamalai');

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

