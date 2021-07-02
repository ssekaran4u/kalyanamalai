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
  selector: 'app-aahakalyanamalai',
  templateUrl: './aahakalyanamalai.component.html',
  styleUrls: ['./aahakalyanamalai.component.css']
})
export class AahakalyanamalaiComponent implements OnInit 
{
	aadhaInfo:any = [];
	aadhaMenu:any = [];
	aadhaInfoid:any;
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
    		this.aadhaInfo = [];
	    	this.userservice.getData({AahaId:item}, "WebHomePage/GetAahaById", "POST").subscribe((response: any) => 
			{
				if (response.status == 1) 
				{
					this.aadhaInfo = response.data[0];
					this.aadhaMenu = response.IdValues;
					this.aadhaInfoid = item;
					this.titleService.setTitle(this.aadhaInfo.AahaName+' - Kalyanamalai');
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
  		let profileId= this.route.snapshot.paramMap.get("aahaId");
  		// console.log(profileId);
  		this.titleService.setTitle('Kalyanamalai');
  		// AahaId:profileId GetAahaById
		this.userservice.getData({AahaId:profileId}, "WebHomePage/GetAahaById", "POST").subscribe((response: any) => 
		{
			if (response.status == 1) 
			{
				this.aadhaInfo = response.data[0];
				this.aadhaMenu = response.IdValues;
				this.aadhaInfoid = profileId;
				// console.log(this.aadhaInfo);
				this.titleService.setTitle(this.aadhaInfo.AahaName+' - Kalyanamalai');
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
