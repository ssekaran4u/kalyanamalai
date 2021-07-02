import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

 
@Injectable()
export class UserGlobalService {
	APIUrl: string;
	token: string; 
	constructor(private http: HttpClient) {
		this.APIUrl = environment.apiUrl;
	}
	selectBox(cond) {
		if(cond)
		{
			let tmp = [];
			cond.forEach(function (value) {
		        tmp.push({ id: value.id, itemName: value.name });
			});
			return tmp;
		}
	}
	joinMultiSelect(cond) {
		if(cond)
		{
			let tmp = [];
			cond.forEach(function (value) {
		        tmp.push(value.id);
			});
			return tmp.join();
			// result 1,2,3,4,5
		}
	}
	getGalleryItem(array, regnno) 
	{
		if(array && regnno)
		{
			let tmp = [];
			array.forEach(function (value) 
			{
				if(value.RegNo==regnno)
				{
					tmp = value;
				}
			});
			return tmp;
		}
	}
	getGalleryItemforsearch(array, regnno) 
	{
		if(array && regnno)
		{
			let tmp = [];
			array.forEach(function (value) 
			{
				if(value.REGNUMBER==regnno)
				{
					tmp = value;
				}
			});
			return tmp;
		}
	}
	// getGalleryItem(array, regnno) 
	// {
	// 	if(array && regnno)
	// 	{
	// 		let tmp = [];
	// 		array.forEach(function (value) 
	// 		{
	// 			if(value.RegNumber==regnno)
	// 			{
	// 				tmp = value.images;
	// 			}
	// 		});
	// 		return tmp;
	// 	}
	// }
	getuserSearchId(array, regnno) 
	{
		if(array && regnno)
		{
			let tmp = [];
			array.forEach(function (value) 
			{
				if(value.RegNumber==regnno)
				{
					tmp = value.images;
				}
			});
			return tmp;
		}
	}
}
