import { Component, OnInit } from '@angular/core';
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
  selector: 'app-edit-communication-address',
  templateUrl: './edit-communication-address.component.html',
  styleUrls: ['./edit-communication-address.component.css']
})
export class EditCommunicationAddressComponent implements OnInit {
    isEdit             : any = [];
    isCStreet          : boolean = false;
    isCAddress         : boolean = false;
    isCPincode         : boolean = false;
    isPAddress         : boolean = false;
    isPPincode         : boolean = false;
    isPstreet          : boolean = false;
    isResidingYesorNo  : boolean = false;
    isPermenantYesorNo  : boolean = false;

    ResidingYesorNo    :any;
    PermenantYesorNo   :any;
    YesorNo : any = [];

    Nationality = [];
    selectedNationalityItems = [];
    NationalitySettings: IDropdownSettings = {};
    isNationality:boolean = false;

    Country = [];
    selectedCountryItems = [];
    CountrySettings: IDropdownSettings = {};
    isCountry:boolean = false;

    State = [];
    selectedStateItems = [];
    StateSettings: IDropdownSettings = {};
    isState:boolean = false;

    City = [];
    selectedCityItems = [];
    CitySettings: IDropdownSettings = {};
    isCity:boolean = false;

    wCountry = [];
    selectedwCountryItems = [];
    wCountrySettings: IDropdownSettings = {};
    iswCountry:boolean = false;

    wState = [];
    selectedwStateItems = [];
    wStateSettings: IDropdownSettings = {};
    iswState:boolean = false;

    wCity = [];
    selectedwCityItems = [];
    wCitySettings: IDropdownSettings = {};
    iswCity:boolean = false;

    Residing_Status = [];
    selectedResiding_StatusItems = [];
    Residing_StatusSettings: IDropdownSettings = {};
    isResiding_Status:boolean = false;

    pCountry = [];
    selectedpCountryItems = [];
    pCountrySettings: IDropdownSettings = {};
    ispCountry:boolean = false;

    pState = [];
    selectedpStateItems = [];
    pStateSettings: IDropdownSettings = {};
    ispState:boolean = false;

    pCity = [];
    selectedpCityItems = [];
    pCitySettings: IDropdownSettings = {};
    ispCity:boolean = false;

	isLoading:boolean = false;
	editCommunicationAddressForm: FormGroup;
      disableBtn = false;
      SubmitbuttonName: string;
      // countryLists = [];
      // residingStatus = [];
      // castateLists = [];
      // cacityLists = [];
      // wastateLists = [];
      // wacityLists = [];
      // pastateLists = [];
      // pacityLists = [];
    pageSetUp      :any;
    regno         :any;
    username     :any;
    userprofile :any;

  constructor(private formBuilder: FormBuilder, private userservice: UserService,
		private notifyService: NotificationService, private router: Router, private titleService: Title,private dbService: NgxIndexedDBService) 
  {
  		this.editCommunicationAddressForm = this.formBuilder.group({
			selectCNationality:'',
            cStreet: '',
            Address: '',
            selectCountry: '',
            selectCState: '',
            selectCCity: '',
            selectCPincode: '',
            AskWorkingAdd: '',
            wCountry: '',
            wState: '',
            wCity: '',
            Residing_Status: '',
            AskPermanentAdd: '',
            pStreet: '',
            pAddress: '',
            pCountry: '',
            pState: '',
            pCity: '',
            pPincode: '',
		});
  	this.SubmitbuttonName = 'Update';
  }

    // this.selectedNationalityItems = [];
    // this.City=null;
     //Nationality
    onItemSelectNationality(item: any) 
        {
            if(this.selectedNationalityItems)
            {
                if(item.id)
                {
                    this.isNationality = true;
                }
            }
            else
            {
                this.isNationality = false;
            }
        }

    OnItemDeSelectNationality(item:any)
        {
            this.isNationality= false;
        }

    onSelectAllNationality(item:any){}

    //Country
    onItemSelectCountry(item: any) 
        {
            if(this.selectedCountryItems)
            {
                if(item.id)
                {
                    this.isCountry = true;

                    this.selectedStateItems = [];
                    this.isState = false;

                    this.selectedCityItems = [];
                    this.isCity = false;

                    this.userservice.getData({CountryId:item.id}, "IdValues/GetStatesBasedonCountry", "POST").subscribe((response: any) => 
                    {
                        this.isLoading = false;
                        try 
                        {
                            if (response.code == 1) 
                            {
                                const res  = response.dropdownlist;
                                this.State = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
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
                this.isCountry = false;
            }
        }

    OnItemDeSelectCountry(item:any)
        {
            this.State = null;
            this.City = null;
            this.isCountry= false;

            if(item.id)
            {
                this.isCountry = true;

                this.selectedStateItems = [];
                this.isState = false;

                this.selectedCityItems = [];
                this.isCity = false;

                this.userservice.getData({CountryId:item.id}, "IdValues/GetStatesBasedonCountry", "POST").subscribe((response: any) => 
                {
                    this.isLoading = false;
                    try 
                    {
                        if (response.code == 1) 
                        {
                            const res  = response.dropdownlist;
                            this.State = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
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

    onSelectAllCountry(item:any){}

    //State
    onItemSelectState(item: any) 
        {
            if(this.selectedStateItems)
            {
                if(item.id)
                {
                    this.selectedCityItems = [];
                    this.isCity = false;

                    this.isState = true;
                    this.userservice.getData({StateId:item.id}, "IdValues/GetCitiesBasedonState", "POST").subscribe((response: any) => 
                    {
                        this.isLoading = false;
                        try {
                            if (response.code == 1) 
                            {
                                const res  = response.dropdownlist;
                                this.City = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
                            } 
                            else 
                            {
                                this.notifyService.showWarning("No data found", "Warning");
                                this.City = null;
                            }
                        } 
                        catch (err) 
                        {
                            this.notifyService.showWarning("Getting error", "Warning");
                            this.City = null;
                        }
                    })
                }
            }
            else
            {
                this.isState = false;
            }
        }

    OnItemDeSelectState(item:any)
        {
            this.isState= false;
            if(item.id)
            {
                this.selectedCityItems = [];
                this.isCity = false;
                
                this.isState = true;
                this.userservice.getData({StateId:item.id}, "IdValues/GetCitiesBasedonState", "POST").subscribe((response: any) => 
                {
                    this.isLoading = false;
                    try {
                        if (response.code == 1) 
                        {
                            const res  = response.dropdownlist;
                            this.City = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
                        } 
                        else 
                        {
                            this.notifyService.showWarning("No data found", "Warning");
                            this.City = null;
                        }
                    } 
                    catch (err) 
                    {
                        this.notifyService.showWarning("Getting error", "Warning");
                        this.City = null;
                    }
                })
            }
        }

    onSelectAllState(item:any){}

    //City
    onItemSelectCity(item: any) 
        {
            if(this.selectedCityItems)
            {
                if(item.id)
                {
                    this.isCity = true;
                }
            }
            else
            {
                this.isCity = false;
            }
        }

    OnItemDeSelectCity(item:any)
        {
            this.isCity= false;
        }

    onSelectAllCity(item:any){}

    //wCountry
    onItemSelectwCountry(item: any) 
        {
            if(this.selectedwCountryItems)
            {
                if(item.id)
                {
                    this.iswCountry = true;

                    this.selectedwStateItems = [];
                    this.iswState = false;

                    this.selectedwCityItems = [];
                    this.iswCity = false;

                    this.userservice.getData({CountryId:item.id}, "IdValues/GetStatesBasedonCountry", "POST").subscribe((response: any) => 
                    {
                        this.isLoading = false;
                        try 
                        {
                            if (response.code == 1) 
                            {
                                const res  = response.dropdownlist;
                                this.wState = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
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
                this.iswCountry = false;
            }
        }

    OnItemDeSelectwCountry(item:any)
        {
            
            if(item.id)
            {
                this.iswCountry = true;

                this.selectedwStateItems = [];
                this.iswState = false;

                this.selectedwCityItems = [];
                this.iswCity = false;

                this.userservice.getData({CountryId:item.id}, "IdValues/GetStatesBasedonCountry", "POST").subscribe((response: any) => 
                {
                    this.isLoading = false;
                    try 
                    {
                        if (response.code == 1) 
                        {
                            const res  = response.dropdownlist;
                            this.wState = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
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

    onSelectAllwCountry(item:any){}

    //wwState
    onItemSelectwState(item: any) 
        {
            if(this.selectedwStateItems)
            {
                if(item.id)
                {
                    this.selectedwCityItems = [];
                    this.iswCity = false;

                    this.iswState = true;
                    this.userservice.getData({StateId:item.id}, "IdValues/GetCitiesBasedonState", "POST").subscribe((response: any) => 
                    {
                        this.isLoading = false;
                        try {
                            if (response.code == 1) 
                            {
                                const res  = response.dropdownlist;
                                this.wCity = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
                            } 
                            else 
                            {
                                this.notifyService.showWarning("No data found", "Warning");
                                this.wCity = null;
                            }
                        } 
                        catch (err) 
                        {
                            this.notifyService.showWarning("Getting error", "Warning");
                            this.City = null;
                        }
                    })
                }
            }
            else
            {
                this.iswState = false;
            }
        }

    OnItemDeSelectwState(item:any)
        {
            this.iswState= false;
            if(item.id)
            {
                this.selectedwCityItems = [];
                this.iswCity = false;
                
                this.iswState = true;
                this.userservice.getData({StateId:item.id}, "IdValues/GetCitiesBasedonState", "POST").subscribe((response: any) => 
                {
                    this.isLoading = false;
                    try {
                        if (response.code == 1) 
                        {
                            const res  = response.dropdownlist;
                            this.wCity = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
                        } 
                        else 
                        {
                            this.notifyService.showWarning("No data found", "Warning");
                            this.City = null;
                        }
                    } 
                    catch (err) 
                    {
                        this.notifyService.showWarning("Getting error", "Warning");
                        this.City = null;
                    }
                })
            }
        }

    onSelectAllwState(item:any){}

    //wCity
    onItemSelectwCity(item: any) 
        {
            if(this.selectedwCityItems)
            {
                if(item.id)
                {
                    this.iswCity = true;
                }
            }
            else
            {
                this.iswCity = false;
            }
        }

    OnItemDeSelectwCity(item:any)
        {
            this.iswCity= false;
        }

    onSelectAllwCity(item:any){}

    //Residing_Status
    onItemSelectResiding_Status(item: any) 
        {
            if(this.selectedResiding_StatusItems)
            {
                if(item.id)
                {
                    this.isResiding_Status = true;
                }
            }
            else
            {
                this.isResiding_Status = false;
            }
        }

    OnItemDeSelectResiding_Status(item:any)
        {
            this.isResiding_Status= false;
        }

    onSelectAllResiding_Status(item:any){}

     //pCountry pCity
    onItemSelectpCountry(item: any) 
        {
            if(this.selectedpCountryItems)
            {
                if(item.id)
                {
                    this.ispCountry = true;

                    this.selectedpStateItems = [];
                    this.ispState = false;

                    this.selectedpCityItems = [];
                    this.ispCity = false;

                    this.userservice.getData({CountryId:item.id}, "IdValues/GetStatesBasedonCountry", "POST").subscribe((response: any) => 
                    {
                        this.isLoading = false;
                        try 
                        {
                            if (response.code == 1) 
                            {
                                const res  = response.dropdownlist;
                                this.pState = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
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
                this.ispCountry = false;
            }
        }

    OnItemDeSelectpCountry(item:any)
        {
            
            if(item.id)
            {
                this.ispCountry = true;

                this.selectedpStateItems = [];
                this.ispState = false;

                this.selectedpCityItems = [];
                this.ispCity = false;

                this.userservice.getData({CountryId:item.id}, "IdValues/GetStatesBasedonCountry", "POST").subscribe((response: any) => 
                {
                    this.isLoading = false;
                    try 
                    {
                        if (response.code == 1) 
                        {
                            const res  = response.dropdownlist;
                            this.pState = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
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

    onSelectAllpCountry(item:any){}

    //pState
    onItemSelectpState(item: any) 
        {
            if(this.selectedpStateItems)
            {
                if(item.id)
                {
                    this.selectedpCityItems = [];
                    this.ispCity = false;

                    this.ispState = true;
                    this.userservice.getData({StateId:item.id}, "IdValues/GetCitiesBasedonState", "POST").subscribe((response: any) => 
                    {
                        this.isLoading = false;
                        try {
                            if (response.code == 1) 
                            {
                                const res  = response.dropdownlist;
                                this.pCity = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
                            } 
                            else 
                            {
                                this.notifyService.showWarning("No data found", "Warning");
                                this.pCity = null;
                            }
                        } 
                        catch (err) 
                        {
                            this.notifyService.showWarning("Getting error", "Warning");
                            this.City = null;
                        }
                    })
                }
            }
            else
            {
                this.ispState = false;
            }
        }

    OnItemDeSelectpState(item:any)
        {
            this.ispState= false;
            if(item.id)
            {
                this.selectedpCityItems = [];
                this.ispCity = false;
                
                this.ispState = true;
                this.userservice.getData({StateId:item.id}, "IdValues/GetCitiesBasedonState", "POST").subscribe((response: any) => 
                {
                    this.isLoading = false;
                    try {
                        if (response.code == 1) 
                        {
                            const res  = response.dropdownlist;
                            this.pCity = res.sort((a, b) => (a.name > b.name) ? 1 : -1);
                        } 
                        else 
                        {
                            this.notifyService.showWarning("No data found", "Warning");
                            this.City = null;
                        }
                    } 
                    catch (err) 
                    {
                        this.notifyService.showWarning("Getting error", "Warning");
                        this.City = null;
                    }
                })
            }
        }

    onSelectAllpState(item:any){}

    //pCity
    onItemSelectpCity(item: any) 
        {
            if(this.selectedpCityItems)
            {
                if(item.id)
                {
                    this.ispCity = true;
                }
            }
            else
            {
                this.ispCity = false;
            }
        }

    OnItemDeSelectpCity(item:any)
        {
            this.ispCity= false;
        }

    onSelectAllpCity(item:any){}

  	
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
                this.regno = this.pageSetUp["INkmSet_id"];

                this.SubmitbuttonName = "Loading...";
                this.disableBtn = true;

                const result = Object.assign({}, this.editCommunicationAddressForm.value);
                if (result.selectCNationality && result.cStreet && result.Address && result.selectCountry && result.selectCState 
                    && result.selectCCity && result.selectCPincode && result.AskWorkingAdd && result.AskPermanentAdd) 
                {
                    if (result.AskWorkingAdd == 'No') 
                    {
                        if(result.wCountry =='' || result.wState =='' || result.wCity =='' || result.Residing_Status =='')
                        {
                            this.notifyService.showWarning("Please enter required fields", "Warning");
                            this.disableBtn = false;
                            return false;
                        }
                    }
                    if (result.AskPermanentAdd == 'No') 
                    {
                        if(result.pAddress =='' || result.pCountry =='' || result.pState =='' || result.pCity =='' || result.pPincode =='')
                        {
                            this.notifyService.showWarning("Please enter required fields", "Warning");
                            this.disableBtn = false;
                            return false;
                        }
                    }

                    const user_Update_info = {
                        RegNo: this.regno ,
                        Nationality: result.selectCNationality,
                        CommunicationStreet: result.cStreet,
                        CommunicationArea: result.Address,
                        CommunicationCountry: result.selectCountry[0].id,
                        CommunicationState: result.selectCState[0].id,
                        CommunicationCity: result.selectCCity[0].id,
                        CommunicationPincode: result.selectCPincode,  
                    };

                    if (result.AskWorkingAdd == '2') 
                    {
                        user_Update_info['ResidingNation']=result.wCountry[0].id;
                        user_Update_info['ResidingState']=result.wState[0].id;
                        user_Update_info['ResidingCity']=result.wCity[0].id;
                        user_Update_info['ResidingStatus']=result.Residing_Status;
                    }
                    else
                    {
                        user_Update_info['ResidingCountry']='';
                        user_Update_info['ResidingState']='';
                        user_Update_info['ResidingCity']='';
                        user_Update_info['ResidingStatus']='';
                    }
                    if (result.AskWorkingAdd == '2') 
                    { 
                        user_Update_info['PermanentArea']=result.pAddress[0].id;
                        user_Update_info['PermanentCountry']=result.pCountry[0].id;
                        user_Update_info['PermanentState']=result.pState[0].id;
                        user_Update_info['PermanentCity']=result.pCity[0].id;
                        user_Update_info['PermanentPincode']=result.pPincode;
                    }
                    else
                    {
                        user_Update_info['PermanentStreet']='';
                        user_Update_info['PermanentArea']='';
                        user_Update_info['PermanentCountry']='';
                        user_Update_info['PermanentCity']='';
                        user_Update_info['PermanentPincode']='';
                    }

                    this.userservice.getData(user_Update_info, "WebProfileUpdate/CommunicationDetails", "POST").subscribe((response: any) => {
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
    
    goToNextPage() :void {
      	this.router.navigate(['edit/edit-describe-yourself']);
    }

    AskWorkingAddclick(hc: any)
    {
        
        let hcYesorNoid = hc.getAttribute('data-AskYNYesorNo-id');
        // alert(hcYesorNoid);
        $('.AskWorkingAdd li label').removeClass('active');
        $('#AskWorkingAddID'+hcYesorNoid).addClass('active');
        
        if (hcYesorNoid == 225) 
        {
            $('#AskWorkingAdd').removeClass('hide');
            $('#AskWorkingAdd').addClass('show');
        } 
        else 
        {
            $('#AskWorkingAdd').removeClass('show');
            $('#AskWorkingAdd').addClass('hide');

            $("#wCountry").val($("#wCountry option:first").val());
            $('.wCountry').removeClass('focused');

            $("#wState").val($("#wState option:first").val());
            $('.wState').removeClass('focused');

            $("#wCity").val($("#wCity option:first").val());
            $('.wCity').removeClass('focused');

            $("#Residing_Status").val($("#Residing_Status option:first").val());
            $('.Residing_Status').removeClass('focused');
        }

    }

    AskPermanentAddclick(pc: any)
    {
        
        let pcYesorNoid = pc.getAttribute('data-AskPYNYesorNo-id');
        // alert(hcYesorNoid);
        $('.AskPermanentAdd li label').removeClass('active');
        $('#AskPermanentAddID'+pcYesorNoid).addClass('active');

        if (pcYesorNoid == 225) 
        {
            //console.log('1');
            $('#AskPermanentAdd').removeClass('hide');
            $('#AskPermanentAdd').addClass('show');
        } 
        else 
        {
            //console.log(pcYesorNoid);
            $('#AskPermanentAdd').removeClass('show');
            $('#AskPermanentAdd').addClass('hide');

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

                this.selectedNationalityItems = [];
                this.NationalitySettings ={
                      singleSelection: true,
                      idField: 'id',
                      textField: 'name',
                      selectAllText: 'Select All',
                      unSelectAllText: 'UnSelect All',
                      itemsShowLimit: 5,
                      allowSearchFilter: true,
                      closeDropDownOnSelection: true
                };

                this.selectedCountryItems = [];
                this.CountrySettings ={
                      singleSelection: true,
                      idField: 'id',
                      textField: 'name',
                      selectAllText: 'Select All',
                      unSelectAllText: 'UnSelect All',
                      itemsShowLimit: 5,
                      allowSearchFilter: true,
                      closeDropDownOnSelection: true
                };

                this.selectedStateItems = [];
                this.StateSettings ={
                      singleSelection: true,
                      idField: 'id',
                      textField: 'name',
                      selectAllText: 'Select All',
                      unSelectAllText: 'UnSelect All',
                      itemsShowLimit: 5,
                      allowSearchFilter: true,
                      closeDropDownOnSelection: true
                };

                this.selectedCityItems = [];
                this.CitySettings ={
                      singleSelection: true,
                      idField: 'id',
                      textField: 'name',
                      selectAllText: 'Select All',
                      unSelectAllText: 'UnSelect All',
                      itemsShowLimit: 5,
                      allowSearchFilter: true,
                      closeDropDownOnSelection: true
                };

                this.selectedwCountryItems = [];
                this.wCountrySettings ={
                      singleSelection: true,
                      idField: 'id',
                      textField: 'name',
                      selectAllText: 'Select All',
                      unSelectAllText: 'UnSelect All',
                      itemsShowLimit: 5,
                      allowSearchFilter: true,
                      closeDropDownOnSelection: true
                };

                this.selectedwStateItems = [];
                this.wStateSettings ={
                      singleSelection: true,
                      idField: 'id',
                      textField: 'name',
                      selectAllText: 'Select All',
                      unSelectAllText: 'UnSelect All',
                      itemsShowLimit: 5,
                      allowSearchFilter: true,
                      closeDropDownOnSelection: true
                };

                this.selectedwCityItems = [];
                this.wCitySettings ={
                      singleSelection: true,
                      idField: 'id',
                      textField: 'name',
                      selectAllText: 'Select All',
                      unSelectAllText: 'UnSelect All',
                      itemsShowLimit: 5,
                      allowSearchFilter: true,
                      closeDropDownOnSelection: true
                };

                this.selectedpCountryItems = [];
                this.pCountrySettings ={
                      singleSelection: true,
                      idField: 'id',
                      textField: 'name',
                      selectAllText: 'Select All',
                      unSelectAllText: 'UnSelect All',
                      itemsShowLimit: 5,
                      allowSearchFilter: true,
                      closeDropDownOnSelection: true
                };

                this.selectedpStateItems = [];
                this.pStateSettings ={
                      singleSelection: true,
                      idField: 'id',
                      textField: 'name',
                      selectAllText: 'Select All',
                      unSelectAllText: 'UnSelect All',
                      itemsShowLimit: 5,
                      allowSearchFilter: true,
                      closeDropDownOnSelection: true
                };

                this.selectedpCityItems = [];
                this.pCitySettings ={
                      singleSelection: true,
                      idField: 'id',
                      textField: 'name',
                      selectAllText: 'Select All',
                      unSelectAllText: 'UnSelect All',
                      itemsShowLimit: 5,
                      allowSearchFilter: true,
                      closeDropDownOnSelection: true
                };

                this.selectedResiding_StatusItems = [];
                this.Residing_StatusSettings ={
                      singleSelection: true,
                      idField: 'id',
                      textField: 'name',
                      selectAllText: 'Select All',
                      unSelectAllText: 'UnSelect All',
                      itemsShowLimit: 5,
                      allowSearchFilter: true,
                      closeDropDownOnSelection: true
                };

                  this.titleService.setTitle('Edit Your communication address - Kalyanamalai');
                this.isLoading = true;
                  this.userservice. getData({RegNo: this.regno }, "WebMyProfile/GetCommunicationDetails", "POST").subscribe((response: any) => {
                  const res = response.data[0];
                  this.isEdit = res;
                  this.isLoading = false;

                    this.editCommunicationAddressForm.setValue(
                         {
                            selectCNationality : '',
                            cStreet            : this.isEdit.CommunicationStreet,
                            Address            : this.isEdit.CommunicationArea,
                            selectCountry      : '',
                            selectCState       : '',
                            selectCCity        : '',
                            selectCPincode     : this.isEdit.CommunicationPincode,
                            AskWorkingAdd      : this.isEdit.ResidingYesorNo,
                            wCountry           : '',
                            wState             : '',
                            wCity              : '',
                            Residing_Status    : '',
                            AskPermanentAdd    : this.isEdit.PermenantYesorNo,
                            pStreet            : this.isEdit.PermanentStreet,
                            pAddress           : this.isEdit.PermanentArea,
                            pCountry           : '',
                            pState             : '',
                            pCity              : '',
                            pPincode           : this.isEdit.PermanentPincode,
                        });    

                    if(this.isEdit['CommunicationStreet'].length)
                    {
                        this.isCStreet = true;
                    }
                    if(this.isEdit['CommunicationArea'].length)
                    {
                        this.isCAddress = true;
                    }
                    if(this.isEdit['CommunicationPincode'].length)
                    {
                        this.isCPincode = true;
                    }
                     if(this.isEdit['PermanentStreet'].length)
                    {
                        this.isPstreet = true;
                    }
                    if(this.isEdit['PermanentArea'].length)
                    {
                        this.isPAddress = true;
                    }
                    if(this.isEdit['PermanentPincode'].length)
                    {
                        this.isPPincode = true;
                    }


                    this.selectedNationalityItems     = res.NationalitySelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.selectedCountryItems         = res.CommunicationCountrySelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.selectedStateItems           = res.CommunicationStateSelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.selectedCityItems            = res.CommunicationCitySelected.sort((a, b) => (a.name > b.name) ? 1 : -1);

                    this.selectedwCountryItems        = res.ResidingNationSelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.selectedwStateItems          = res.ResidingStateSelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.selectedwCityItems           = res.ResidingCitySelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.selectedResiding_StatusItems = res.ResidingStatusSelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
                   
                    this.selectedpCountryItems        = res.PermanentCountrySelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.selectedpStateItems          = res.PermanentStateSelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.selectedpCityItems           = res.PermanentCitySelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.ResidingYesorNo              = this.isEdit.ResidingYesorNo;
                    this.PermenantYesorNo             = this.isEdit.PermenantYesorNo;

                    if (this.selectedCountryItems.length) 
                    {
                        this.isCountry = true;
                        this.isNationality = true;
                        if (this.selectedStateItems.length) 
                        {
                            this.isState = true;
                            if (this.selectedCityItems.length) 
                            {
                                this.isCity = true;
                            }
                        }
                    }

                    if(this.ResidingYesorNo == 225)
                    {
                        this.isResidingYesorNo  = true;
                    }

                    if(this.PermenantYesorNo == 225)
                    {
                        this.isPermenantYesorNo = true;
                    }

                    if (this.selectedwCountryItems.length) 
                    {
                        this.iswCountry = true;
                        if (this.selectedwStateItems.length) 
                        {
                            this.iswState = true;
                            if (this.selectedwCityItems.length) 
                            {
                                this.iswCity = true;
                            }
                        }
                    }

                    if (this.selectedpCountryItems.length) 
                    {
                        this.ispCountry = true;
                        if (this.selectedwStateItems.length) 
                        {
                            this.ispState = true;
                            if (this.selectedpCityItems.length) 
                            {
                                this.ispCity = true;
                            }
                        }
                    }

                    if (this.selectedResiding_StatusItems.length) 
                    {
                        this.isResiding_Status = true;
                    }

                    

                    this.YesorNo  = res.YesorNo.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.Country  = res.Country;
                    this.State    = res.CommunicationState.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.City     = res.CommunicationCity.sort((a, b) => (a.name > b.name) ? 1 : -1);

                    this.wCountry = res.Country;
                    this.wState   = res.ResidingState.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.wCity    = res.ResidingCity.sort((a, b) => (a.name > b.name) ? 1 : -1);

                    this.pCountry = res.Country;
                    this.pState   = res.PermanentState.sort((a, b) => (a.name > b.name) ? 1 : -1);
                    this.pCity    = res.PermanentCity.sort((a, b) => (a.name > b.name) ? 1 : -1);

                    this.Residing_Status    = res.ResidingStatus.sort((a, b) => (a.name > b.name) ? 1 : -1);
                })

             //    this.userservice. getData('', "IdValues/GetEditProfile", "POST").subscribe((response: any) => {
                //     const res  = response.dropdownlist;
                //     this.Residing_Status = res.filter(data => data.type == 'Residing_Status');
                // })

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
