import { Injectable } from '@angular/core';
import {Router,CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate 
{
	constructor(private router:Router) { }
  	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) 
  	{
  		if(state.url=="/login" || state.url=="/register/personal-details" || state.url=="/register/family-information" || state.url=="/register/lifestyle-information" || state.url=="/register/education-and-career-details" || state.url=="/register/communication-address" || state.url=="/register/describe-yourself" || state.url=="/register/schemes" || state.url=="/register/verify")
  		{
  			if(localStorage.getItem('INkmSet_id'))	
  			{
  				this.router.navigate(['/user/dashboard']);	
  				return false;
  			}
  			return true;
  		}
		else if(localStorage.getItem('INkmSet_id') == null)
		{
	  		// this.router.navigate(['/logout'], { queryParams: { returnUrl: state.url }});
	  		this.router.navigate(['/']);
	  		return false;
		}
  		else
  		{
  			return false;
  		}
  	}
}
