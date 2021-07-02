import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from './../services/user.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit 
{
	ngModel:any;
	dropdownList = [];
	cartoons:any = [];
	regno = '408237';
	isProfileLoading:boolean = false;
	isProfileData:boolean = true;
	myprofile:any = [];
	DhanaTesting: FormGroup;
	checkboxChecked:number;
	filedata:any;

	myFiles:string [] = [];
	isCount:number= 0;
	constructor(private http: HttpClient, private formBuilder: FormBuilder, private userservice: UserService, private titleService: Title) {
		this.DhanaTesting = this.formBuilder.group({
			father_name: '',
			father_profession:'',
			mother_name: '',
			mother_profession:'',
			checkBox: '',
			fileSource : ''
		});
	}
	search(term:string) {
		this.isCount = term.length;
	}
	// form: formGroup;
	onSubmit() 
	{
	      // const headers = new HttpHeaders();
	      // headers.append('Content-Type', 'multipart/form-data');
	      // headers.append('Accept', 'application/json');
		  var myFormData = new FormData();
		   for (var i = 0; i < this.myFiles.length; i++) { 
		      myFormData.append("file[]", this.myFiles[i]);
		   }
		   myFormData.append('regno', '869736');
		   this.userservice.getData(myFormData, "MyDashboard/UploadUserPhotos", "MultiUpload").subscribe((response: any) => 
  			{
  				alert("Success");
  			});

		   // this.userservice. getData({regno:869736,file:this.filedata}, "MyDashboard/UploadUserPhotos", 
	      
	      // myFormData.append('file', this.filedata);
		// const form_result = Object.assign({}, this.DhanaTesting.value);
		// form_result['checkBox'] = this.cartoons;
		// console.log(form_result);
		// this.userservice. getData({regno:869736,file:this.filedata}, "MyDashboard/UploadUserPhotos", "POSTUpload").subscribe((response: any) => 
  // 		{
  // 			console.log(response);
  // 		});

  		// this.http.post('http://115.124.109.53/api/MyDashboard/UploadUserPhotos', myFormData, { headers: headers}).subscribe(data => {
	       //Check success message
	      //  console.log(data);
	      // });  
	};

	urls = [];
	onSelectFile(event) 
	{
	    if (event.target.files && event.target.files[0]) 
	    {
	    	this.filedata = event.target.files;

	        var filesAmount = event.target.files.length;
	        for (let i = 0; i < filesAmount; i++) 
	        {
	        	this.myFiles.push(event.target.files[i]);

                var reader = new FileReader();
                reader.onload = (event:any) => 
                {
                   	this.urls.push(event.target.result); 
                 	this.DhanaTesting.patchValue({
		          		fileSource: reader.result
		        	});
                }
                reader.readAsDataURL(event.target.files[i]);
	        }
	    }
	}

	onChange(name: string, isChecked: boolean) 
	{
	    if (isChecked) 
	    {
	    	this.cartoons.push(name);
	    } 
	    else 
	    {
	      	let i: number = 0;
	      	this.cartoons.forEach((item) => 
	      	{
	        	if (item == name) 
	        	{
	        		this.cartoons.splice(i, 1);
	        	}
	        	i++;
	      	});
	    }
	    console.log(this.cartoons);
	}

 	ngOnInit(): void 
 	{
 		this.dropdownList = [
	      { id: 11, name: 'Mumbai' },
	      { id: 12, name: 'Bangaluru' },
	      { id: 13, name: 'Pune' },
	      { id: 14, name: 'Navsari' },
	      { id: 15, name: 'New Delhi' }
	    ];
 		this.checkboxChecked = 11;
 		this.isProfileLoading = true;
 		this.isProfileData = false;
 		this.userservice. getData({regno:this.regno}, "WebViewMatchProfile/GetProfile", "POST").subscribe((response: any) => 
  		{
  			if(response.status==1)
  			{
  				this.isProfileLoading = false;
  				this.isProfileData=true;
  				this.myprofile = response.data[0];
  				this.DhanaTesting.setValue({
				  	father_name: this.myprofile.FatherName,
				  	father_profession: this.myprofile.FatherProfession,
					mother_name:  this.myprofile.MotherName,
					mother_profession: this.myprofile.MotherProfession,
					checkBox: '',
					fileSource : ''
				});
  			}
	  	})

  		this.titleService.setTitle('My Profile - Kalyanamalai');
  	}
}
