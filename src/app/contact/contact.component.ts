import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfirmDialogService } from './../services/confirm-dialog.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
	message: any;
  CommunicationForm: FormGroup;

  isLoading:boolean = false;
  disableBtn = false;
  SubmitbuttonName: string;

  pageSetUp   :any;
  regno       :any;
  username    :any;
  userprofile :any;

  	constructor(private notifyService: NotificationService,private userservice: UserService, private formBuilder: FormBuilder, private router: Router, private titleService: Title, private confirmDialogService: ConfirmDialogService,private dbService: NgxIndexedDBService) 
    {
      this.CommunicationForm = this.formBuilder.group({
          cname:'',
          c_regno: '',
          // c_office: '',
          // c_city: '',
          // c_country: '',
          c_emailid: '',
          c_mobileno: '',
          c_message: '',
      });
      this.SubmitbuttonName = 'Send';
    }
  	
    onSubmit() 
    {
        // this.dbService.getByKey('setup', 1).subscribe((userData) => 
        // { 
        //     localStorage.setItem('pageSetUp',JSON.stringify(userData));
        //     this.pageSetUp   = localStorage.getItem("pageSetUp");

            // if(this.pageSetUp!='undefined' && this.pageSetUp != null)
            // {
                this.pageSetUp = JSON.parse(localStorage.getItem("pageSetUp"));
                this.regno = this.pageSetUp["INkmSet_id"];

                this.SubmitbuttonName = "Loading...";
                this.disableBtn = true;
              // && result.c_regno && result.c_office && result.c_city && result.c_country 
                const result = Object.assign({}, this.CommunicationForm.value);
                if (result.cname && result.c_emailid && result.c_mobileno && result.c_message) 
                {
                    const user_Update_info = 
                    {
                        // RegNo: this.regno ,
                        CommunicationName: result.cname,
                        RegNo: result.c_regno,
                        // CommunicationOffice: result.c_office,
                        // City: result.c_city,
                        // Country: result.c_country,
                        EmailId: result.c_emailid,
                        MobileNumber: result.c_mobileno,  
                        Comments: result.c_message, 
                    };

                    this.userservice.getData(user_Update_info, "WebHomePage/SubmitContact", "POST").subscribe((response: any) => {
                        this.isLoading = true;
                        try {
                            if (response.status == 1) 
                            {
                              this.SubmitbuttonName= 'Send';
                              this.isLoading = false;
                              this.notifyService.showSuccess(response.message, "Submited");
                              //this.router.navigate(['contact']);
                              //function reloadDIV () {document.getElementById("here").innerHTML.reload}
                              window.location.reload();

                            } 
                            else 
                            {
                                this.SubmitbuttonName= 'Send';
                                this.isLoading = false;
                                this.notifyService.showError(response.message, "Error")
                                this.disableBtn = false;
                            }
                        } 
                        catch (err) 
                        {
                            this.SubmitbuttonName= 'Send';
                            this.isLoading = false;
                            this.disableBtn = false;
                            this.notifyService.showError("Internal Server Error", "Error")
                        }
                    }, (err) => 
                    {
                        this.SubmitbuttonName= 'Send';
                        this.isLoading = false;
                        this.disableBtn = false;
                        this.notifyService.showError("Internal Server Error", "Error")
                    });
                } 
                else 
                {
                    this.SubmitbuttonName = 'Send';
                    this.disableBtn = false;
                    this.notifyService.showWarning("Please enter required fields", "Warning");
                }
            // }
            // else
            // {
            //     this.router.navigate(['/logout']);    
            // } 
    //     });
    };

  	ngOnInit(): void 
  	{
  		this.confirmDialogService.getMessage().subscribe(message => 
  		{  
            this.message = message;  
        }); 
  		this.titleService.setTitle('Contact - Kalyanamalai');
  	}
  	showDialog() 
  	{  
	    this.confirmDialogService.confirmThis("Are you sure to delete?", function () 
	    {  
	    	console.log("Yes clicked");  
	    }, function () 
	    {  
	     	console.log("No clicked");  
	    })  
	}  
}
