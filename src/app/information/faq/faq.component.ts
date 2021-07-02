import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConfirmDialogService } from './../../services/confirm-dialog.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

	message: any;
  	FaqForm: FormGroup;

  	isLoading:boolean = false;
  	disableBtn = false;
  	SubmitbuttonName: string;

  	pageSetUp   :any;
  	regno       :any;
  	username    :any;
  	userprofile :any;

  	constructor(private notifyService: NotificationService,private userservice: UserService, private formBuilder: FormBuilder, private router: Router, private titleService: Title, private confirmDialogService: ConfirmDialogService,private dbService: NgxIndexedDBService) 
  	{ 
  		this.FaqForm = this.formBuilder.group({
	        Name:'',
	        Email: '',
	        Question: '',
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
                const result = Object.assign({}, this.FaqForm.value);
                if (result.Name && result.Email && result.Question) 
                {
                    const user_Update_info = 
                    {
                        Name: result.Name,
                        
                        EmailId: result.Email,  
                        Question: result.Question, 
                    };

                    this.userservice.getData(user_Update_info, "WebHomePage/SubmitFaq", "POST").subscribe((response: any) => {
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
	  	this.titleService.setTitle('FAQ - Kalyanamalai');
	} 


}
