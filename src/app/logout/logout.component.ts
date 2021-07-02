import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
	isUserMen:boolean = false;
	pageSetUp  	:any;

  	constructor(private router: Router, private dbService: NgxIndexedDBService) { }

  	ngOnInit(): void 
  	{
  		this.pageSetUp   = localStorage.getItem("pageSetUp");

  		if(this.pageSetUp)
		{	
			localStorage.clear(); 
			sessionStorage.clear(); 
			this.isUserMen = false;
			this.dbService.clear('setup').subscribe((successDeleted) => {
			  // console.log('success? ', successDeleted);
			});
			// this.dbService.deleteDatabase().subscribe((deleted) => {
			//   console.log('Database deleted successfully: ', deleted);
			// });
			this.router.navigate(['/']);	
		}
		else
		{
			this.router.navigate(['/']);
		}	
  	}
}
