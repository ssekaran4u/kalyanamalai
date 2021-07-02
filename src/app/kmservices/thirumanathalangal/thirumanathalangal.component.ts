import { Component, OnInit, TemplateRef } from '@angular/core';
import {Location} from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { NotificationService } from './../../services/notification.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserGlobalService } from './../../services/user.global';

@Component({
  selector: 'app-thirumanathalangal',
  templateUrl: './thirumanathalangal.component.html',
  styleUrls: ['./thirumanathalangal.component.css']
})
export class ThirumanathalangalComponent implements OnInit 
{
	ThiruthanagalInfo:any = [];
  ThiruthanagalMenu:any = [];
  Thiruthanagalid : any;
  isloading:boolean=false;
  isloading1:boolean=false;


    constructor(private _location: Location, private UserGlobalService:UserGlobalService,private formBuilder: FormBuilder, private dbService: NgxIndexedDBService, private route: ActivatedRoute, private userservice: UserService,private notifyService: NotificationService, private router: Router, private titleService: Title) 
    {}
    backClicked() {
      this._location.back();
  }
    getSlug(text:any)
    {
      return text.replace(/\W+/g, '-').toLowerCase();
    }
    nextContent(item:any)
    {
      if(item)
      {
        this.Thiruthanagalid = item;
        this.ThiruthanagalInfo = [];
        this.isloading=true;
        this.userservice.getData({ThiruthanagalId:item}, "WebHomePage/GetThiruthalangalById", "POST").subscribe((response: any) => 
        {
          this.isloading=false;
          if (response.status == 1) 
          {
            this.ThiruthanagalInfo = response.data[0];
            console.log(this.ThiruthanagalInfo);
            this.ThiruthanagalMenu = response.IdValues;
            this.titleService.setTitle(this.ThiruthanagalInfo.ThiruthalangalName+' - Kalyanamalai');
          } 
          else 
          {
            this.notifyService.showError(response.message, "Error")
          }
        }, (err) => 
        {
          this.notifyService.showError("Internal Server Error", "Error")
        });
      }
    }
    ngOnInit(): void 
    {
      let profileId= this.route.snapshot.paramMap.get("ThiruthanagalId");
      //console.log(profileId);
      this.titleService.setTitle('Kalyanamalai');
      // AahaId:profileId GetAahaById
      this.isloading=true;
      this.isloading1=true;
      this.userservice.getData({ThiruthanagalId:profileId}, "WebHomePage/GetThiruthalangalById", "POST").subscribe((response: any) => 
      {
        this.isloading=false;
        this.isloading1=false;
        if (response.status == 1) 
        {
          this.ThiruthanagalInfo = response.data[0];
          this.ThiruthanagalMenu = response.IdValues;
          this.Thiruthanagalid = profileId;
          // console.log(this.ThiruthanagalInfo);
         this.titleService.setTitle(this.ThiruthanagalInfo.ThiruthalangalName+' - Kalyanamalai');
        } 
        else 
        {
          this.notifyService.showError(response.message, "Error")
        }
      }, (err) => 
      {
        this.notifyService.showError("Internal Server Error", "Error")
      });
    }

}
