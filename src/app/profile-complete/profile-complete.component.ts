import { Component, OnInit, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-profile-complete',
  templateUrl: './profile-complete.component.html',
  styleUrls: ['./profile-complete.component.css']
})
export class ProfileCompleteComponent implements OnInit {
	

	//regno = localStorage.getItem("INkmSet_id");
	activeprofiledata :any = [];
  activeprofiledata_details :any = [];
  pageSetUp :any;
  regno     :any;

  constructor( private titleService: Title, private userservice: UserService,private dbService: NgxIndexedDBService, private router: Router) { }

  // isSetDefault()
  // {
  //   this.dbService.getByKey('setup', 1).subscribe((userData) => 
  //   { 
  //         localStorage.setItem('pageSetUp',JSON.stringify(userData));
  //   });
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

                this.userservice. getData({RegNo:this.regno}, "WebMyDashboard/GetProfileCompleteness", "POST").subscribe((response: any) => 
                {
                  if(response.code==1)
                  {
                    this.activeprofiledata = response.profilecompleteness;
                    this.activeprofiledata_details = response.profilecompletenesspoints[0];
                  }
                  else
                  {
                    this.activeprofiledata = 0;
                  }
                })
                this.titleService.setTitle('Profile Complete - Kalyanamalai');
              }
              else
              {
                  this.router.navigate(['/logout']);    
              }
        });
       
  	
  }

}
