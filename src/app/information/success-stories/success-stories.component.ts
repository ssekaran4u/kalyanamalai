import { Component, OnInit, TemplateRef } from '@angular/core';
import {Location} from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { NotificationService } from './../../services/notification.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserGlobalService } from './../../services/user.global';
import * as $ from 'jquery'

@Component({
  selector: 'app-success-stories',
  templateUrl: './success-stories.component.html',
  styleUrls: ['./success-stories.component.css']
})
export class SuccessStoriesComponent implements OnInit {

	isReadMore = true
	successstoriesInfo: any=[];

	_offset=0;
	successstoriespage: number;
	itemsPerPage = 5;
	totalItems:any;
	showdata_list_start:any;
	showdata_list_end:any;
	totalsuccessstoriesItems:any;
	isStoriesLoadingData:boolean=false;
  	isStoriesNotFoundLoading:boolean=false;

	constructor(private _location: Location, private UserGlobalService:UserGlobalService,private formBuilder: FormBuilder, private dbService: NgxIndexedDBService, private route: ActivatedRoute, private userservice: UserService,private notifyService: NotificationService, private router: Router, private titleService: Title) 
	{}

	ngOnInit(): void 
  	{
  		//let profileId= this.route.snapshot.paramMap.get("aahaId");
  		//console.log(profileId);
  		//this.titleService.setTitle('Kalyanamalai');
  		// AahaId:profileId GetAahaById
		this.userservice.getData({limit:this.itemsPerPage,offset:this._offset}, "WebHomePage/GetSuccessStoryList", "POST").subscribe((response: any) => 
		{
			if (response.status == 1) 
			{
				this.successstoriesInfo = response.data;
				let _StoriesData = response.data;
	  			if(_StoriesData.length)
	  			{
	  				this.showdata_list_start = response.offset-4;
  					this.showdata_list_end = response.offset;
	  				this.totalsuccessstoriesItems = response.total;
					this.successstoriesInfo =  _StoriesData;
					//window.scroll(1,1);
	  			}
	  			else
	  			{
	  				this.isStoriesNotFoundLoading = true;
	  			}
			} 
			else 
			{
				this.notifyService.showError(response.message, "Error")
			}
		}, (err) => 
		{
			this.notifyService.showError("Internal Server Error", "Error")
		});

		this.titleService.setTitle('Success Stories - Kalyanamalai');
  	}

	showText(id)
	{
	  	//alert(id);
	  	if ($('#StoryId'+id).hasClass('limitTextHeight') == true) 
        {
            $('#StoryId'+id).removeClass('limitTextHeight');
            $('#ReadMore'+id).removeClass('show');
            $('#ReadMore'+id).addClass('hide');
            $('#ReadLess'+id).removeClass('hide');
            $('#ReadLess'+id).addClass('show');
            return false;
        } 
        else 
        {
            $('#StoryId'+id).addClass('limitTextHeight');
            $('#ReadMore'+id).addClass('show');
            $('#ReadMore'+id).removeClass('hide');
            $('#ReadLess'+id).addClass('hide');
            $('#ReadLess'+id).removeClass('show');
            return false;
        }
	    //this.isReadMore = !this.isReadMore
	}

	getPage(page) 
	{
		
		window.scroll(1,1);
		this.isStoriesLoadingData = false;
  		//this.isMatchingLoading = true;
		if(page==1)
		{
			this._offset = 0	
		}
		else
		{
			this._offset = (page - 1) * this.itemsPerPage + 1
		}
		this.userservice. getData({limit:this.itemsPerPage,offset:this._offset}, "WebHomePage/GetSuccessStoryList", "POST").subscribe((response: any) => 
		{
			console.log(response);
			if(response.status==1)
  			{
  				this.showdata_list_start = response.offset-5;
  				this.showdata_list_end = response.offset-1;
  				this.isStoriesLoadingData = true;
  				//this.isMatchingLoading = false;
  				this.totalsuccessstoriesItems = response.total;
  				let _StoriesData = response.data;

	  			if(_StoriesData.length)
	  			{
					this.successstoriesInfo =  _StoriesData;
	  			}
	  			else
	  			{
	  				this.isStoriesNotFoundLoading = true;
	  			}
		    }
		})
	}
	
 //    readMore(city) 
 //    {
	//     let dots = document.querySelector(`.card_read[data-city="${city}"] .dots`);
	//     let moreText = document.querySelector(`.card_read[data-city="${city}"] .more`); 
	//     let btnText = document.querySelector(`.card_read[data-city="${city}"] .myBtn`);

	//     if (dots.style.display === "none") {
	//         dots.style.display = "inline";
	//         btnText.textContent = "Read more";
	//         moreText.style.display = "none";
	//         btnText.style.color="#ff9400";
	//     } 
	//     else 
	//     {
	//         dots.style.display = "none";
	//         btnText.textContent = "Read less"; 
	//         moreText.style.display = "inline";
	//         btnText.style.color="#ff9400";
	//     }
	// }

}
