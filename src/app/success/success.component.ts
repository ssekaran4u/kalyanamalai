import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(private router: Router, private titleService: Title) { }

  ngOnInit(): void {
  	this.titleService.setTitle('Success - Kalyanamalai');
  }
  goPaymentPage(){
  	this.router.navigate(['/user/dashboard']);
  }
}
