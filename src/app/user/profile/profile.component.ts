import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from './../../services/user.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit 
{
	//regno = localStorage.getItem("INkmSet_id");
	isProfileLoading:boolean = false;
	isProfileData:boolean = true;
	myprofile:any = [];

  pageSetUp :any;
  regno     :any;

  isProfileCompleteness:boolean = false;
  defaultImage:string = '';
  isLoading:boolean = false;

	constructor(private userservice: UserService, private titleService: Title,private dbService: NgxIndexedDBService,  private router: Router) {}

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

                this.isLoading = true;

                this.isProfileLoading = true;
                this.isProfileData = false;
                this.userservice. getData({regno:this.regno}, "WebMyDashBoard/GetProfile", "POST").subscribe((response: any) => 
                  {
                    if(response.status==1)
                    {
                      this.isLoading = false;
                      this.isProfileLoading = false;
                      this.isProfileData=true;
                      this.myprofile = response.data[0];
                      
                      if(this.myprofile.ProfileCompleteness===100)
                      {
                        this.isProfileCompleteness = true;
                      }

                      window.scroll(1,1);
                    }
                    else
                    {

                    }
                  })

                  this.titleService.setTitle('My Profile - Kalyanamalai');
                  this.defaultImage = 'https://cdn.dribbble.com/users/154550/screenshots/3014408/untitled-9.gif';
            }
            else
            {
                this.router.navigate(['/logout']);    
            }  
        });
 		
  	}
}
