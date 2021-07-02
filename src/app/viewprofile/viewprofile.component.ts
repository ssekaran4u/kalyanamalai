import { Component, OnInit, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from './../services/user.service';
import { NotificationService } from './../services/notification.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserGlobalService } from './../services/user.global';



@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit 
{
    // regno = window.sessionStorage.getItem("INkmSet_id");
    modalRef: BsModalRef;
    config = {
        keyboard: false,
        ignoreBackdropClick: true,
        animated: true
    };
	profile = [];
    expressInterestMsg = [];
    isExclisive:boolean = false;
    isLoading:boolean = false;
    isLoading1:boolean = false;
    isRunLoading:boolean = false;
    isData:boolean = false;
    isLoadingNotFound:boolean = false;

    disableBtn = false;
    SubmitbuttonName: string;

    defaultImage:string = '';

    getEmail:string = '';
    getMobile:string = '';
    getPhone:string = '';
    SentInterestMessage: number = null;
    isExpressRegno :string = '';

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

    matchinglists:any = [];
    isMatchingLoading:boolean = false;
    isMatchingLoadingData:boolean = true;
    isMatchingNotFoundLoading:boolean = false;
    totalMatchingItems: any;

    isBecome:number = null;
    isTotalNofOfContact:string = '';
    isViewedContact:string = '';

    //SentInterestMessage: number = null;
    isReplyRegNo:string = '';
    activeProcess:string = '';
    activeMessage:string = '';
    thisContent:string = '';
    textContent:string= '';
    actionButtonTrue:string = '';
    actionButtonFalse:string = '';
    FwdSubmitbuttonName:string;
    MsgFwddisableBtn:boolean = false;

    activeprofiledata:any=[];
    activeRegNumber:any;

    pageSetUp :any;
    regno     :any;
    activeSlide = 0;
    items: any= [];
    galleryItems = [];
    galleryItemsdata:any = [];
    
    getContactInfo:any = [];
    currentDiff:string = '';
    bookmarkStatus: boolean = false;
    FwrdProfileMessage:any = [];

    partnerpreference:any=[];
    profilename:string = '';

    constructor(private UserGlobalService:UserGlobalService,private formBuilder: FormBuilder, private dbService: NgxIndexedDBService, private modalService: BsModalService, private route: ActivatedRoute, 
      private userservice: UserService,private notifyService: NotificationService, private router: Router, private titleService: Title) 
    {
        this.personalizedMessageForm = this.formBuilder.group(
        {
            message: ''
        });

        this.FwdMessageForm = this.formBuilder.group(
        {
            yourEmail: '',
            fwdEmail: ''
        });

        this.MsgSubmitbuttonName = 'Sent Message';
        this.FwdSubmitbuttonName = 'Forward';
    }

    // isSetDefault()
    // {
    //     this.dbService.getByKey('setup', 1).subscribe((userData) => 
    //     { 
    //         localStorage.setItem('pageSetUp',JSON.stringify(userData));
    //     });
    // }


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

               
                this.SubmitbuttonName= 'Sent Interest';
                this.titleService.setTitle('Profile - Kalyanamalai');
                this.isLoading = true;
                this.isData = false;
                this.isExclisive=false;
                let profileId= this.route.snapshot.paramMap.get("id");
                //console.log(profileId);
                this.userservice. getData('', "IdValues/GetExpressInterest", "POST").subscribe((response: any) => 
                {
                    if(response.code==1)
                    {
                        this.expressInterestMsg = response.dropdownlist;
                    }    
                })
              
                this.titleService.setTitle('Profile - Kalyanamalai');
                this.defaultImage = 'https://cdn.dribbble.com/users/154550/screenshots/3014408/untitled-9.gif';
                this.userservice. getData({regno:profileId,LoginRegNo:this.regno}, "WebViewMatchProfile/GetProfile", "POST").subscribe((response: any) => 
                {
                    this.isLoading = false;
                    if(response.status==1)
                    {
                        this.isData = true;
                        this.profile = response.data[0];
                        this.profilename = response.data[0].name;
                        this.partnerpreference = response.partnerpreference[0];
                        this.titleService.setTitle(response.data[0].name+' | '+ response.data[0].id+ ' Profile - Kalyanamalai');

                          this.activeprofiledata = response.contactdetails[0];
                          this.activeRegNumber =this.activeprofiledata.RegNumber;

                          this.expressInterestMsg = this.activeprofiledata.expressinterestlist;

                          this.isTotalNofOfContact= this.activeprofiledata.NoOfContacts;
                          this.isViewedContact= this.activeprofiledata.ViewedContacts;
                          

                        let _matchData = response.data[0];
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
                    else if(response.status==2)
                    {
                        this.isExclisive=true;
                    }
                    else
                    {
                        this.isLoadingNotFound = true;
                    }
                })
            }
            else
            {
                this.router.navigate(['/logout']);    
            }       
        });
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
                this.isLoading1 = true;
                this.userservice. getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo,Message:result.message}, "WebViewMatchProfile/SendMessage", "POST").subscribe((response: any) => 
                  {
                    this.isLoading1 = false;
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
                    this.isLoading1 = true;
                    this.userservice. getData({LoginRegNo:this.regno,ForwardProfileRegNo:this.isReplyRegNo,ToEmail:fwdresult.fwdEmail}, "WebMyDashboard/ProfileForward", "POST").subscribe((response: any) => 
                      {
                        this.isLoading1 = false;
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

    closeModal()
    {
        this.modalRef.hide();
        this.SentInterestMessage = null;
        this.personalizedMessageForm.reset();
        this.FwdMessageForm.reset();
        this.isReplyRegNo = '';
        this.getContactInfo = [];
    }

    SentExpressInterest() 
    {
        if(this.SentInterestMessage!=null && this.isReplyRegNo)
        {
            let vs = this.expressInterestMsg[this.SentInterestMessage].name;
            this.isLoading1 = true;
            this.disableBtn = true;
            this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo,Message:vs}, "WebViewMatchProfile/SendExpressInterest", "POST").subscribe((res: any) => 
            {
                this.isLoading1 = false;
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
                this.isLoading1 = false;
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
        this.isLoading1 = true;
        this.userservice. getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/HoroscopeRequest", "POST").subscribe((response: any) => 
        {
            this.isLoading1 = false;
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
        this.isLoading1 = true;
        this.userservice. getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/AlbumRequest", "POST").subscribe((response: any) => 
        {
            this.isLoading1 = false;
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
        this.isLoading1 = true;
        this.userservice. getData({FromRegNo:this.regno,ToRegNo:this.isReplyRegNo}, "WebViewMatchProfile/PhotoRequest", "POST").subscribe((response: any) => 
        {
            this.isLoading1 = false;
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
            this.isLoading1 = true;
            this._ModalResponseLoading = true;
            this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/GetContactStatusMsg", "POST").subscribe((response: any) => 
            {
                this.isLoading1 = false;
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
            this.isLoading1 = true;
            this._ModalResponseLoading = true;
            this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/CheckAlreadyExpress", "POST").subscribe((response: any) => 
            {
                this.isLoading1 = false;
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
            this.isLoading1 = true;
            this._ModalResponseLoading = true;
            this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/CheckMessageStatusMsg", "POST").subscribe((response: any) => 
            {
                this.isLoading1 = false;
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
            this.isLoading1 = true;
            this._ModalResponseLoading = true;
            this.userservice.getData({FromRegNo:this.regno,ToRegNo:this.isReplyRegNo}, "WebViewMatchProfile/GetPhotoStatusMsg", "POST").subscribe((response: any) => 
            {
                this.isLoading1 = false;
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
            this.isLoading1 = true;
            this._ModalResponseLoading = true;
            this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/GetAlbumStatusMsg", "POST").subscribe((response: any) => 
            {
                this.isLoading1 = false;
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
            this.isLoading1 = true;
            this._ModalResponseLoading = true;
            this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/GetHoroscopeStatusMsg", "POST").subscribe((response: any) => 
            {
                this.isLoading1 = false;
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
            this.isLoading1 = true;
            this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/GetConfirmationtoBlock", "POST").subscribe((response: any) => 
            {
                this.isLoading1 = false;
                this._ModalResponseLoading = false;
                if(response.status==0)
                {
                    this.isLoading1 = false;
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
            this.isLoading1 = true;
            this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/GetConfirmationtoBookmark", "POST").subscribe((response: any) => 
            {
                this.isLoading1 = false;
                this._ModalResponseLoading = false;
                if(response.status==0)
                {
                    this.isLoading1 = false;
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
            this.isLoading1 = true;
            this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/GetConfirmationtoIgnore", "POST").subscribe((response: any) => 
            {
                this.isLoading1 = false;
                this._ModalResponseLoading = false;
                if(response.status==0)
                {
                    this.isLoading1 = false;
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
            this.isLoading1 = true;
            this.userservice.getData({LoginRegNo:this.regno,ForwardProfileRegNo:this.isReplyRegNo}, "WebMyDashboard/ProfileForwardContent", "POST").subscribe((response: any) => 
            {
                this.isLoading1 = false;
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
            console.log(this.profile);
            //console.log(this.isReplyRegNo);
            this.galleryItemsdata = this.profile;//this.UserGlobalService.getGalleryItem(this.profile, this.isReplyRegNo);
            
            this.galleryItems = this.galleryItemsdata.images;
            this.modalRef = this.modalService.show(personalized, Object.assign({}, { class: 'top2Per',keyboard: false,ignoreBackdropClick: true,animated: true, })); 
        }
    } 

    getMatchingProfiles()
    {
        let profileId= this.route.snapshot.paramMap.get("id");
        this.userservice. getData({regno:profileId,LoginRegNo:this.regno}, "WebViewMatchProfile/GetProfile", "POST").subscribe((response: any) => 
          {
              this.isMatchingLoading = false;
              if(response.status==1)
              {
                  this.totalMatchingItems = response.total;
                  let _matchData = response.data;
                  if(_matchData.length)
                  {
                    this.matchinglists =  _matchData;
                  }
                  else
                  {
                      this.isMatchingNotFoundLoading = true;
                  }
              }
              else
              {
                  this.isMatchingNotFoundLoading = true;
                  this.totalMatchingItems = 0;
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
                    this.isLoading1 = true;
                    this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/AddBookMark", "POST").subscribe((response: any) => 
                    {
                        this.isLoading1 = false;
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
                    this.isLoading1 = true;
                    this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/HoroscopeRequest", "POST").subscribe((response: any) => 
                    {
                        this.isLoading1 = false;
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
                    this.isLoading1 = true;
                    this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/AddBlock", "POST").subscribe((response: any) => 
                    {
                        this.isLoading1 = false;
                        if(response.status==1)
                          {
                              this.bookmarkStatus = false;
                              this.notifyService.showSuccess(response.message, "");
                              if(this.currentDiff=='matching')
                              {
                                  this.isMatchingLoading = true;
                                  this.getMatchingProfiles();
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
                    this.isLoading1 = true;
                    this.userservice.getData({LoginRegNo:this.regno,UserRegNo:this.isReplyRegNo}, "WebViewMatchProfile/AddIgnore", "POST").subscribe((response: any) => 
                    {
                        this.isLoading1 = false;
                        if(response.status==1)
                          {
                              this.bookmarkStatus = false;
                              this.notifyService.showSuccess(response.message, "");
                              if(this.currentDiff=='matching')
                              {
                                  this.isMatchingLoading = true;
                                  this.getMatchingProfiles();
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
