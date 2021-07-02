import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery' 
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../services/user.service';
import { NotificationService } from './../services/notification.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class LoginComponent implements OnInit {

	constructor(private dbService: NgxIndexedDBService,private titleService: Title) {
	}

	onSubmit() 
	{
		// indexedDB store data
		this.dbService.add('setup', {id: 1}).subscribe((storeData) => {});

		// indexedDB reterive data
		this.dbService.getByKey('setup', 1).subscribe((userData) => 
	    { 
	        localStorage.setItem('pageSetUp',JSON.stringify(userData));
	    }); 
	}


  	ngOnInit(): void 
  	{
  	}
}