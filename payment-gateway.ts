import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from './../../services/user.service';
import { WindowRefService } from './../../services/window-ref.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [WindowRefService]
})
export class SettingsComponent implements OnInit 
{
	regno = 'JT1OrRr99ac=';
	mails = [];
	mobiles = [];
	mailp: number;
	mobilep: number;
	_offset=0;
	isLoading:boolean = false;
	itemsPerPage = 10;
	totalMailItems: any;
	totalMobileItems: any;
	
	isMailData:boolean = false;
	ismailLoading:boolean = true;
	ismailNotFoundLoading:boolean = false;


	isSmsData:boolean = false;
	isSmsLoading:boolean = true;
	isSmsNotFoundLoading:boolean = false;

	constructor(private winRef: WindowRefService, private userservice: UserService, private titleService: Title) {}

	createRzpayOrder(data,amount) {
    	console.log(data);
	    // call api to create order_id
	    this.payWithRazor(data, amount);
	  }

	  payWithRazor(val, amount) {
	    const options: any = {
	      key: 'rzp_test_3AHyYuodTQNvh6',
	      amount: amount, // amount should be in paise format to display Rs 1255 without decimal point
	      currency: 'INR',
	      name: 'Nem', // company name or product name
	      description: 'NAme',  // product description
	      image: './assets/images/Logo.png', // company logo or product image
	      order_id: val, // order_id created by you in backend
	      modal: {
	        // We should prevent closing of the form when esc key is pressed.
	        escape: false,
	      },
	      notes: {
	        // include notes if any
	      },
	      theme: {
	        color: '#0c238a'
	      },
	      prefill: {
	      	email : 'ssekaran4u@gmail.com',
	      	contact : '9865340224'
	      }
	    };
	    options.handler = ((response, error) => {
	      options.response = response;
	      console.log(response);
	      console.log(options);
	      // call your backend api to verify payment signature & capture transaction
	    });
	    options.modal.ondismiss = (() => {
	      // handle the case when user closes the form while transaction is in progress
	      console.log('Transaction cancelled.');
	    });
	    const rzp = new this.winRef.nativeWindow.Razorpay(options);
	    rzp.open();
	  }

  	ngOnInit(): void 
  	{
  		this.createRzpayOrder('order_GcFoT4Q5e22Nir', '540000');
  	}
}
