import { Component, OnInit, ElementRef,HostListener, ViewChild,ChangeDetectionStrategy } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { ToastrService } from 'ngx-toastr';

import * as $ from 'jquery' 
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-edit-life-style-information',
  templateUrl: './edit-life-style-information.component.html',
  styleUrls: ['./edit-life-style-information.component.css']
})
export class EditLifeStyleInformationComponent implements OnInit {
    isEdit : any = [];

    Height = [];
    selectedHeightItems = [];
    HeightSettings: IDropdownSettings = {};
    isHeight:boolean = false;

    Weight = [];
    selectedWeightItems = [];
    WeightSettings: IDropdownSettings = {};
    isWeight:boolean = false;

    BloodGroup = [];
    selectedBloodGroupItems = [];
    BloodGroupSettings: IDropdownSettings = {};
    isBloodGroup:boolean = false;

    Diet            :any = [];
    Complexion      :any = [];
    Physique        :any = [];
    SpecialCategory :any = [];
    SmokingDrinking :any = [];
    YesorNo         :any = [];

    DietSelected            :any;
    ComplexionSelected      :any;
    PhysiqueSelected        :any;
    SmokingSelected         :any;
    DrinkingSelected        :any;
    SpecialCategorySelected :any;
    SpecialCategoryOther    :any;
    SpecialCategoryYesorNo  :any;

    isDiet                : boolean = false;
    isComplexion          : boolean = false;
    isPhysique            : boolean = false;
    isSmoking             : boolean = false;
    isDrinking            : boolean = false;
    isSpecialCategory     : boolean = false;
    isSpecialCategoryOther: boolean = false;

    form_message = true;
    editLifeStyleForm: FormGroup;
    submitted = false;
    disableBtn = false;
    SubmitbuttonName: string;

    isLoading:boolean = false;
    isSubmitTrigger:boolean = false;

    pageSetUp      :any;
    regno         :any;


constructor(private dbService: NgxIndexedDBService, private formBuilder: FormBuilder, private userservice: UserService, 
  private notifyService : NotificationService, private router: Router, private titleService: Title)
    {
        this.editLifeStyleForm = this.formBuilder.group({
            Your_DietList: '',
            selectHeight:'',
            selectWeight:'',
            selectBloodGroup:'',
            ComplexionList: '',
            PhysiqueList:'',
            Physical_disability_YesorNo: '',
            Physical_disabilityList:'',
            PhysicaldisabilityData:'',
            Smoking_Habits:'',
            Drinking_Habits:'',
        });
        this.SubmitbuttonName = 'Upadte';
    }
    // Height
    onItemSelectHeight(item: any) 
        {
            if(this.selectedHeightItems)
            {
                if(item.id)
                {
                    this.isHeight = true;
                }
            }
            else
            {
                this.isHeight = false;
            }
        }

    OnItemDeSelectHeight(item:any)
        {
            this.isHeight= false;
        }

    onSelectAllHeight(item:any){}

    // Weight
    onItemSelectWeight(item: any) 
        {
            if(this.selectedWeightItems)
            {
                if(item.id)
                {
                    this.isWeight = true;
                }
            }
            else
            {
                this.isWeight = false;
            }
        }

    OnItemDeSelectWeight(item:any)
        {
            this.isWeight= false;
        }

    onSelectAllWeight(item:any){}

     // BloodGroup
    onItemSelectBloodGroup(item: any) 
        {
            if(this.selectedBloodGroupItems)
            {
                if(item.id)
                {
                    this.isBloodGroup = true;
                }
            }
            else
            {
                this.isBloodGroup = false;
            }
        }

    OnItemDeSelectBloodGroup(item:any)
        {
            this.isBloodGroup= false;
        }

    onSelectAllBloodGroup(item:any){}

    DietListclick(dl: any)
    {
        let Dietid = dl.getAttribute('data-Diet-id');
        // alert(Dietid);
        $('.Your_DietList li label').removeClass('active');
        $('#DietID'+Dietid).addClass('active');
    }

    ComplexionListclick(cl: any)
    {
        let Complexion = cl.getAttribute('data-Complexion-id');
        //alert(Complexion);
        $('.ComplexionList li label').removeClass('active');
        $('#ComplexionID'+Complexion).addClass('active');
    }

    YesorNoclick(yn: any)
    {
        let YesorNo = yn.getAttribute('data-YesorNo-id');
        //alert(Complexion);
        $('.Physical_disabilityList li label').removeClass('active');
        $('#YesorNoID'+YesorNo).addClass('active');


        if (YesorNo == 226) 
        {
            $('#Physical_disability').removeClass('hide');
            $('#Physical_disability').addClass('show');
        } 
        else 
        {
            
            $('.Physical_disabilityLists li label').removeClass('active');
            $('#Physical_disability').removeClass('show');
            $('#Physical_disability').addClass('hide');
            $('.Physical_disabilityList li').removeClass('active');
            $('#PhysicaldisabilityData').removeClass('show');
            $('#PhysicaldisabilityData').addClass('hide');
            $('#PhysicaldisabilityOther').val('');
            $('.PhysicaldisabilityOther').removeClass('active');
            $('#PhysicaldisabilityData1').removeClass('focused');
        }

        // $('.Physical_disabilityList li').removeClass('active');
        // $(this).addClass('active');

        // $('.Physical_disabilityLists li label').removeClass('active');
        // $("input[name='Physical_disabilityList_Phy_Yes']").removeAttr("checked");
        // $('._Ms_phsiys').removeClass('active');
        // $('#PhysicaldisabilityOther').val("");
        // $('#PhysicaldisabilityData1').removeClass('focused');
        //$('#PhysicaldisabilityData').removeClass('focused');
    }

    PhysiqueListclick(pl: any)
    {
        let Physique = pl.getAttribute('data-PhysiqueList-id');
        //alert(Physique);
        $('.PhysiqueList li label').removeClass('active');
        $('#PhysiqueListID'+Physique).addClass('active');
    }

    physicalDisclick(item: any)
    {
        //console.log(item);
        //let physicalDis = pd.getAttribute('data-physicalDislist-id');
        let physicalDi = item;
        //alert(physicalDis);
        $('.Physical_disabilityLists li label').removeClass('active');
        $('#physicalDisID'+physicalDi).addClass('active');

        // if ($(this).hasClass('active') == true) 
        // {
        //     $(this).removeClass('active');
        // }
        // else 
        // {
        //     $(this).addClass('active');
        // }

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

    Smokingclick(sl: any)
    {
        let Smoking = sl.getAttribute('data-Smoking-id');
        // alert(Dietid);
        $('.Smoking_Habits li label').removeClass('active');
        $('#SmokingID'+Smoking).addClass('active');
    }

    Drinkingclick(sl: any)
    {
        let Drink = sl.getAttribute('data-Drink-id');
        // alert(Dietid);
        $('.Drinking_Habits li label').removeClass('active');
        $('#DrinkID'+Drink).addClass('active');
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
                const result = Object.assign({}, this.editLifeStyleForm.value);
                if(result.Your_DietList && result.selectHeight && result.ComplexionList && result.PhysiqueList  && result.Smoking_Habits && result.Drinking_Habits)
                {
                    if(result.Physical_disabilityList_No==1)
                    {
                        if(result.Physical_disabilityList_Phy_Yes=='')
                        {
                            this.notifyService.showWarning("Please enter required fields", "Warning");
                            this.isSubmitTrigger = false;
                            this.SubmitbuttonName = 'Upadte';
                            this.disableBtn = false;
                        }
                        else
                        {
                            if(result.Physical_disabilityList_Phy_Yes=='Other')   
                            {
                                if(result.PhysicaldisabilityData=='')
                                {
                                    this.notifyService.showWarning("Please enter required fields", "Warning");
                                    this.isSubmitTrigger = false;
                                    this.SubmitbuttonName = 'Upadte';
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
                    }
                    else
                    {
                        this.isSubmitTrigger = true;
                    }

                    if(this.isSubmitTrigger)
                    {
                        const user_save_info = {
                            RegNo: this.regno,
                            Diet: result.Your_DietList,
                            Height:result.selectHeight[0].id,
                            //Height: result.selectHeight,
                            Smoking: result.Smoking_Habits,
                            Drinking: result.Drinking_Habits,
                            Complexion: result.ComplexionList,
                            Physique: result.PhysiqueList,
                        };
                        if(result.Physical_disabilityList_No==1)
                        {
                            if(result.Physical_disabilityList_Phy_Yes=='Other')   
                            {
                                user_save_info['SpecialCategory'] = '';
                                user_save_info['SpecialCategoryOther'] = result.PhysicaldisabilityData
                            }
                            else
                            {
                                user_save_info['SpecialCategory'] = result.Physical_disabilityList_Phy_Ye
                                user_save_info['SpecialCategoryOther'] = '';
                            }
                        }

                        this.userservice.getData(user_save_info, "/WebProfileUpdate/Habits", "POST").subscribe((response: any) => 
                        {
                            // console.log(response);
                            try {
                                if (response.status == 1) 
                                {
                                    this.isLoading = false;
                                    this.notifyService.showSuccess(response.message, "Updated");
                                    this.router.navigate(['user/profile']);
                                } 
                                else 
                                {
                                    this.isLoading = false;
                                    this.notifyService.showError(response.message, "Error")
                                    this.disableBtn = false;
                                }
                            } 
                            catch (err) 
                            {
                                this.isLoading = false;
                                this.notifyService.showError("Internal Server Error", "Error")
                            }
                        }, 
                        (err) => 
                        {
                            this.isLoading = false;
                            this.notifyService.showError("Internal Server Error", "Error")
                        });
                    }
                }
                else
                {
                    this.SubmitbuttonName= 'Upadte';
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
  	this.router.navigate(['/register/education-and-career-details']);
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

                    this.selectedHeightItems = [];
                    this.HeightSettings ={
                          singleSelection: true,
                          idField: 'id',
                          textField: 'name',
                          selectAllText: 'Select All',
                          unSelectAllText: 'UnSelect All',
                          itemsShowLimit: 5,
                          allowSearchFilter: true,
                          closeDropDownOnSelection: true
                    };

                    this.selectedWeightItems = [];
                    this.WeightSettings ={
                          singleSelection: true,
                          idField: 'id',
                          textField: 'name',
                          selectAllText: 'Select All',
                          unSelectAllText: 'UnSelect All',
                          itemsShowLimit: 5,
                          allowSearchFilter: true,
                          closeDropDownOnSelection: true
                    };

                    this.selectedBloodGroupItems = [];
                    this.BloodGroupSettings ={
                          singleSelection: true,
                          idField: 'id',
                          textField: 'name',
                          selectAllText: 'Select All',
                          unSelectAllText: 'UnSelect All',
                          itemsShowLimit: 5,
                          allowSearchFilter: true,
                          closeDropDownOnSelection: true
                    };


                      this.titleService.setTitle('Edit Lifestyle Information - Kalyanamalai');

                      this.isLoading = false;
                    this.userservice. getData({RegNo: this.regno}, "WebMyProfile/GetLifeStyleDetails", "POST").subscribe((response: any) => {
                        const res  = response.data[0];
                        this.isEdit = res;
                        this.isLoading = false;
                        this.editLifeStyleForm.setValue(
                             {
                                Your_DietList               : this.isEdit['DietSelected'],
                                selectHeight                : '',
                                selectWeight                : '',
                                selectBloodGroup            : '',
                                ComplexionList              : this.isEdit['ComplexionSelected'],
                                PhysiqueList                : this.isEdit['PhysiqueSelected'],
                                Physical_disability_YesorNo : this.isEdit['SpecialCategoryYesorNo'],
                                Physical_disabilityList     : this.isEdit['SpecialCategorySelected'],
                                PhysicaldisabilityData      : this.isEdit['SpecialCategoryOther'],
                                Smoking_Habits              : this.isEdit['SmokingSelected'],
                                Drinking_Habits             : this.isEdit['DrinkingSelected'],
                            });   


                        this.DietSelected            = this.isEdit['DietSelected'];
                        this.selectedHeightItems     = res.HeightSelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
                        this.selectedWeightItems     = res.WeightSelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
                        this.selectedBloodGroupItems = res.BloodGroupSelected.sort((a, b) => (a.name > b.name) ? 1 : -1);
                        this.ComplexionSelected      = this.isEdit['ComplexionSelected'];
                        this.PhysiqueSelected        = this.isEdit['PhysiqueSelected'];
                        this.SmokingSelected         = this.isEdit['SmokingSelected'];
                        this.DrinkingSelected        = this.isEdit['DrinkingSelected'];
                        this.SpecialCategorySelected = this.isEdit['SpecialCategorySelected'];
                        this.SpecialCategoryOther    = this.isEdit['SpecialCategoryOther'];
                        this.SpecialCategoryYesorNo  = this.isEdit['SpecialCategoryYesorNo'];

                        if (this.DietSelected) 
                        {
                            this.isDiet = true;
                        }
                        if (this.selectedHeightItems.length) 
                        {
                            this.isHeight = true;
                        }
                        if (this.selectedWeightItems.length) 
                        {
                            this.isWeight = true;
                        }
                        if (this.selectedBloodGroupItems.length) 
                        {
                            this.isBloodGroup = true;
                        }
                        if (this.ComplexionSelected) 
                        {
                            this.isComplexion = true;
                        }
                        if (this.PhysiqueSelected) 
                        {
                            this.isPhysique = true;
                        }
                        if (this.SmokingSelected) 
                        {
                            this.isSmoking = true;
                        }
                        if (this.DrinkingSelected) 
                        {
                            this.isDrinking = true;
                        }
                        if (this.SpecialCategorySelected) 
                        {
                            this.isSpecialCategory = true;
                        }
                        
                        if (this.SpecialCategoryOther) 
                        {
                            this.isSpecialCategoryOther = true;
                        }


                        this.Diet            = res.Diet.sort((a, b) => (a.name > b.name) ? 1 : -1);
                        this.BloodGroup      = res.BloodGroup.sort((a, b) => (a.name > b.name) ? 1 : -1);
                        this.Height          = res.Height.sort((a, b) => (a.name > b.name) ? 1 : -1);
                        this.Weight          = res.Weight.sort((a, b) => (a.name > b.name) ? 1 : -1);
                        this.Complexion      = res.Complexion.sort((a, b) => (a.name > b.name) ? 1 : -1);
                        this.Physique        = res.Physique.sort((a, b) => (a.name > b.name) ? 1 : -1);
                        this.SmokingDrinking = res.SmokingDrinking.sort((a, b) => (a.name > b.name) ? 1 : -1);
                        this.SpecialCategory = res.SpecialCategory.sort((a, b) => (a.name > b.name) ? 1 : -1);
                        this.YesorNo         = res.YesorNo.sort((a, b) => (a.name > b.name) ? 1 : -1);

                    })

                    $(document).on('focus blur change', '.form-control', function(e) {
                      // $('.form-control').on('focus blur change', function(e) {
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


                    //$('input').on('focusin', function() {
                    $(document).on('focusin', 'input', function() {
                        $(this).parent().find('label').addClass('active');
                    });


                    // $('input').on('focusout', function() {
                    $(document).on('focusout', 'input', function() {
                        if (!this.value) {
                            $(this).parent().find('label').removeClass('active');
                        }
                    });

                    // Physical disability
                    $(document).on('click', '._Ms_phsi', function() {
                        var value = $(this).data("item");
                        $('.Physical_disabilityList li label').removeClass('active');
                        if (value == 1) 
                        {
                            $('#Physical_disability').show();
                        } 
                        else 
                        {
                            $('#Physical_disability').hide();
                            $('.Physical_disabilityList li').removeClass('active');
                            $('#PhysicaldisabilityData').hide();
                            $('#PhysicaldisabilityOther').val('');
                            $('.PhysicaldisabilityOther').removeClass('active');
                        }

                        $('.Physical_disabilityList li').removeClass('active');
                        $(this).addClass('active');

                        $('.Physical_disabilityLists li label').removeClass('active');
                        $("input[name='Physical_disabilityList_Phy_Yes']").removeAttr("checked");
                        $('._Ms_phsiys').removeClass('active');
                        $('#PhysicaldisabilityOther').val("");
                        $('#PhysicaldisabilityData').removeClass('focused');

                    });

                    // Physical disability  
                     $(document).on('click', '._Ms_phsiys', function() {
                         //console.log($("input[name='Physical_disabilityList_Phy_Yes']:checked").val());

                       $('._Phy_Yes li label').removeClass('active');
                        if ($(this).hasClass('active') == true) 
                        {
                            $(this).removeClass('active');
                        }
                        else 
                        {
                            $(this).addClass('active');
                        }

                        if ($(this).data("item") == "Other" && $(this).hasClass('active') == true) 
                        {
                            $('#PhysicaldisabilityData').show();
                        } 
                        else
                        {
                            $('#PhysicaldisabilityData').hide();
                            $('#PhysicaldisabilityOther').val("");
                            $('.PhysicaldisabilityOther').removeClass('active'); 
                            $('#PhysicaldisabilityData').removeClass('focused');
                        }
                    });

                    // Smoking Habits
                    $(document).on('click', '._Ms_smhb', function() {
                        $('.Smoking_Habits li label').removeClass('active');
                        $(this).addClass('active');
                    });

                    // Drinking Habits
                    $(document).on('click', '._Ms_drhb', function() {
                        $('.Drinking_Habits li label').removeClass('active');
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
