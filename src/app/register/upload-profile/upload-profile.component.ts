import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from './../../services/user.service';
import { FormBuilder, FormGroup} from '@angular/forms';
import { NotificationService } from './../../services/notification.service';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-upload-profile',
  templateUrl: './upload-profile.component.html',
  styleUrls: ['./upload-profile.component.css']
})
export class UploadProfileComponent implements OnInit 
{
  	urls = [];
  	myFiles:string [] = [];
	profileImageUpload: FormGroup;
	submitted = false;
	disableBtn = false;
	SubmitbuttonName: string;
	isLoading:boolean = false;

	pageSetUp :any;
  	regno     :any;

  	constructor(private dbService: NgxIndexedDBService, private formBuilder: FormBuilder, private userservice: UserService, private titleService: Title, private notifyService : NotificationService,private router: Router) {
		this.profileImageUpload = this.formBuilder.group({
			fileSource : ''
		});
		this.SubmitbuttonName = 'Continue';
	}
	gotoNextPage()
	{
		this.router.navigate(['/register/schemes']);
	}

	isSetDefault()
	  {
	    this.dbService.getByKey('setup', 1).subscribe((userData) => 
	    { 
	        localStorage.setItem('pageSetUp',JSON.stringify(userData));
	    });
	  }

  	ngOnInit(): void {

  		
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

  		this.titleService.setTitle('Upload Profile - Kalyanamalai');
  	}
	onSelectFile(event) 
	{
	    if (event.target.files && event.target.files[0]) 
	    {
	        var filesAmount = event.target.files.length;
	        for (let i = 0; i < filesAmount; i++) 
	        {
	        	this.myFiles.push(event.target.files[i]);

                var reader = new FileReader();
                reader.onload = (event:any) => 
                {
                   	this.urls.push(event.target.result); 
                 	//this.profileImageUpload.patchValue({
		          		//fileSource: reader.result
		        	//});
                }
                reader.readAsDataURL(event.target.files[i]);
	        }
	    }
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

	            this.isLoading = true;
				this.disableBtn = true;
				this.SubmitbuttonName = "Loading...";
				if(this.myFiles.length)
				{
					var myFormData = new FormData();
				   	for (var i = 0; i < this.myFiles.length; i++) 
				   	{ 
				    	myFormData.append("file[]", this.myFiles[i]);
				   	}
					myFormData.append('regno', this.regno);

			  		this.userservice.getData(myFormData, "MyDashboard/UploadUserPhotos", "MultiUpload").subscribe((response: any) => 
			  		{
			  			this.isLoading = false;
				        try 
				        {
				        	if (response.status == 1) 
				        	{
				        		this.notifyService.showSuccess("Profile Image Added Successfully", "Great...!");
				        		this.router.navigate(['/register/schemes']);
				            } 
				            else 
				            {
				            	this.notifyService.showError(response.message, "");
				                this.disableBtn = false;
				                this.SubmitbuttonName = 'Continue';
				            }
				        } 
				        catch (err) 
				        {
				            // this.notifyService.showError("Internal Server Error", "");
				            this.notifyService.showInfo("Something went wrong. Try again", "")
				            this.disableBtn = false;
				            this.SubmitbuttonName = 'Continue';
				        }
				    }, (err) => 
				    {
				    	this.isLoading = false;
				        this.disableBtn = false;
				        // this.notifyService.showError("Internal Server Error", "");
				        this.notifyService.showInfo("Something went wrong. Try again", "")
				        this.SubmitbuttonName = 'Continue';
				    });
			  	}
			  	else
			  	{
			  		this.isLoading = false;
			  		this.disableBtn = false;
			  		this.notifyService.showWarning("Select image to Continue", "");
				    this.SubmitbuttonName = 'Continue';
			  	}
	        }
	        else
	        {
	            this.router.navigate(['/']);    
	        }
	    });	
	}
}
