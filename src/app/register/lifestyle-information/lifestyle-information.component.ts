import { Component, OnInit, ElementRef,HostListener, ViewChild,ChangeDetectionStrategy } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { ToastrService } from 'ngx-toastr';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import * as $ from 'jquery' 
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-lifestyle-information',
  templateUrl: './lifestyle-information.component.html',
  styleUrls: ['./lifestyle-information.component.css']
})

export class LifestyleInformationComponent implements OnInit 
{
    Height = [];
    selectedHeightItems = [];
    HeightSettings: IDropdownSettings = {};
    isHeight:boolean = false;

    Diets          :any = [];
    userHeight     :any = [];
    userComplexion :any = [];
    userPhysique   :any = [];
    physicalDisability :any = [];
    SmokingDrinkingHabits :any = [];
    form_message:boolean = true;
    lifeStyleInfoRegister: FormGroup;
    submitted:boolean = false;
    disableBtn :boolean= false;
    SubmitbuttonName: string;

    isLoading:boolean = false;
    isSubmitTrigger:boolean = false;

    pageSetUp :any;
    regno     :any;




constructor(private dbService: NgxIndexedDBService,private formBuilder: FormBuilder, private userservice: UserService, 
  private notifyService : NotificationService, private router: Router, private titleService: Title)
    {
        this.lifeStyleInfoRegister = this.formBuilder.group({
            Your_DietList: '',
            selectHeight:'',
            ComplexionList: '',
            PhysiqueList:'',
            Physical_disabilityList: '',
            Physical_disabilityList_Phy_Yes:'',
            PhysicaldisabilityData:'',
            Smoking_Habits:'',
            Drinking_Habits:'',
        });
        this.SubmitbuttonName = 'Continue';
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
                const result = Object.assign({}, this.lifeStyleInfoRegister.value);
                // console.log(result);
                  // && result.Smoking_Habits && result.Drinking_Habits
                if(result.Your_DietList && result.selectHeight && result.ComplexionList && result.PhysiqueList)
                {
                    if(result.Physical_disabilityList_No==1)
                    {
                        if(result.Physical_disabilityList_Phy_Yes=='')
                        {
                            this.notifyService.showWarning("Please enter required fields", "");
                            this.isSubmitTrigger = false;
                            this.SubmitbuttonName = 'Continue';
                            this.disableBtn = false;
                        }
                        else
                        {
                            if(result.Physical_disabilityList_Phy_Yes=='Other')   
                            {
                                if(result.PhysicaldisabilityData=='')
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
                            RegistrationStages:4,
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
                        //console.log(user_save_info);
                        this.userservice.getData(user_save_info, "Registration/SaveUserInfo", "POST").subscribe((response: any) => 
                        {
                            // console.log(response);
                            try 
                            {
                                if (response.status == 1) 
                                {
                                    // this.isLoading = false;
                                    this.notifyService.showSuccess(response.message, "Great...!");
                                    this.router.navigate(['/register/education-and-career-details']);
                                } 
                                else 
                                {
                                    this.isLoading = false;
                                    this.disableBtn = false;
                                    this.SubmitbuttonName= 'Continue';
                                    this.notifyService.showError(response.message, "");
                                }
                            } 
                            catch (err) 
                            {
                                this.isLoading = false;
                                this.disableBtn = false;
                                this.SubmitbuttonName= 'Continue';
                                this.notifyService.showInfo("Something went wrong. Try again", "")
                                // this.notifyService.showError("Internal Server Error", "Error");
                            }
                        }, 
                        (err) => 
                        {
                            this.isLoading = false;
                            this.disableBtn = false;
                            this.SubmitbuttonName= 'Continue';
                            this.notifyService.showInfo("Something went wrong. Try again", "")
                            // this.notifyService.showError("Internal Server Error", "Error");
                        });
                    }
                }
                else
                {
                    this.SubmitbuttonName= 'Continue';
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
  	this.router.navigate(['/register/education-and-career-details']);
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


            this.titleService.setTitle('Provide Lifestyle Information - Kalyanamalai');

            this.userservice. getData('', "IdValues/GetEditProfile", "POST").subscribe((response: any) => {
                const res  = response.dropdownlist;
                this.Height = res.filter(data => data.type == 'Height').sort((a, b) => (a.id > b.id) ? 1 : -1);
                //this.userHeight = res.filter(data => data.type == 'Height').sort((a, b) => (a.id > b.id) ? 1 : -1);
                this.userComplexion = res.filter(data => data.type == 'Complexion').sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.userPhysique = res.filter(data => data.type == 'Physique').sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.physicalDisability = res.filter(data => data.type == 'Physical Disability').sort((a, b) => (a.name > b.name) ? 1 : -1);
                this.Diets = res.filter(data => data.type == 'Diet').sort((a, b) => (a.id > b.id) ? 1 : -1);
                this.SmokingDrinkingHabits = res.filter(data => data.type == 'SmokingDrinkingHabits');


            })

            $(document).on('focus blur change', '.form-control', function(e){
              //$('.form-control').on('focus blur change', function(e) {
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
            $(document).on('focusin', 'input', function(){
                $(this).parent().find('label').addClass('active');
            });

            $(document).on('focusout', 'input', function(){
            //$('input').on('focusout', function() {
                if (!this.value) {
                    $(this).parent().find('label').removeClass('active');
                }
            });

             // Diet List
            $(document).on('click', '._Ms_ydi', function() {
                $('.Your_DietList li label').removeClass('active');
                $(this).addClass('active');
            });

            // Complexion List
            $(document).on('click', '._Ms_cmlt', function() {
                $('.ComplexionList li label').removeClass('active');
                $(this).addClass('active');
            });

            // Physique List
            $(document).on('click', '._Ms_physique', function() {
                $('._Ms_physique').removeClass('active');
                $(this).addClass('active');
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
                 console.log($("input[name='Physical_disabilityList_Phy_Yes']:checked").val());

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
            this.router.navigate(['/']);    
        }
    });
        
  }

}
