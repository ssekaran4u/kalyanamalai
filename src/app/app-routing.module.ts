import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

// Layout
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { SiteLayout2Component } from './_layout/site-layout2/site-layout2.component';  
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { RegLayoutComponent } from './_layout/reg-layout/reg-layout.component';
import { UserLayoutComponent } from './_layout/user-layout/user-layout.component';
import { UserWmlayoutComponent } from './_layout/user-wmlayout/user-wmlayout.component';

import { AuthGuardService } from './services/auth-guard.service';
import { NotfoundComponent } from './notfound/notfound.component';

import { LoginComponent } from './login/login.component';

import { ContactComponent } from './contact/contact.component';

// registration
import { PersonalDetailsComponent } from './register/personal-details/personal-details.component';
import { FamilyInformationComponent } from './register/family-information/family-information.component';
import { LifestyleInformationComponent } from './register/lifestyle-information/lifestyle-information.component';
import { EducationAndCareerDetailsComponent } from './register/education-and-career-details/education-and-career-details.component';
import { CommunicationAddressComponent } from './register/communication-address/communication-address.component';
import { DescribeYourselfComponent } from './register/describe-yourself/describe-yourself.component';
import { MyExpectationsComponent } from './register/my-expectations/my-expectations.component';
import { SchemesComponent } from './schemes/schemes.component';
import { VerifyComponent } from './register/verify/verify.component';
import { UploadProfileComponent } from './register/upload-profile/upload-profile.component';
import { ChooseSchemeComponent } from './register/choose-scheme/choose-scheme.component';

// Pages
import { ProfilesComponent } from './profiles/profiles.component';
import { RecoverComponent } from './recover/recover.component';
import { AboutComponent } from './about/about.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
import { SearchComponent } from './search/search.component';
import { LogoutComponent } from './logout/logout.component';


//informations
//import { InformationComponent } from './information/information.component';
import { WeddingFixedComponent } from './information/wedding-fixed/wedding-fixed.component';
import { SuccessStoriesComponent } from './information/success-stories/success-stories.component';
import { TermsConditionComponent } from './information/terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from './information/privacy-policy/privacy-policy.component';
import { SuggestionComponent } from './information/suggestion/suggestion.component';
import { ReportAbuseComponent } from './information/report-abuse/report-abuse.component';
import { AdvertiseWithUsComponent } from './information/advertise-with-us/advertise-with-us.component';
import { EventsComponent } from './information/events/events.component';
import { FaqComponent } from './information/faq/faq.component';


// User components Start
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AccountComponent } from './user/account/account.component';
import { BookmarksComponent } from './user/bookmarks/bookmarks.component';
import { SavedSearchComponent } from './user/saved-search/saved-search.component';
import { SettingsComponent } from './user/settings/settings.component';
import { InboxComponent } from './user/inbox/inbox.component';
import { OutboxComponent } from './user/outbox/outbox.component';
import { SearchProfilesComponent } from './search-profiles/search-profiles.component';

import { MatchingProfilesComponent } from './user/matching-profiles/matching-profiles.component';
import { ExpressInterestComponent } from './user/express-interest/express-interest.component';
import { RecentvisitorsComponent } from './user/recentvisitors/recentvisitors.component';

// User components End

//Edit components Start
import { EditComponent } from './edit/edit.component';
import { EditPersonalDetailsComponent } from './edit/edit-personal-details/edit-personal-details.component';
import { EditFamilyInformationComponent } from './edit/edit-family-information/edit-family-information.component';
import { EditLifeStyleInformationComponent } from './edit/edit-life-style-information/edit-life-style-information.component';
import { EditEducationAndCareerDetailsComponent } from './edit/edit-education-and-career-details/edit-education-and-career-details.component';
import { EditCommunicationAddressComponent } from './edit/edit-communication-address/edit-communication-address.component';
import { EditDescribeYourselfComponent } from './edit/edit-describe-yourself/edit-describe-yourself.component';
import { EditMyExpectationComponent } from './edit/edit-my-expectation/edit-my-expectation.component';
import { EditHobbiesDetailsComponent } from './edit/edit-hobbies-details/edit-hobbies-details.component';
import { EditUploadProfileComponent } from './edit/edit-upload-profile/edit-upload-profile.component'; 

import { ProfileCompleteComponent } from './profile-complete/profile-complete.component';
import { SchemeExclusiveComponent } from './scheme-exclusive/scheme-exclusive.component';

import { KmservicesComponent } from './kmservices/kmservices.component';
import { WeddingplannersComponent } from './kmservices/weddingplanners/weddingplanners.component';
import { SuntvprofileComponent } from './kmservices/suntvprofile/suntvprofile.component';
import { ThirumanathalangalComponent } from './kmservices/thirumanathalangal/thirumanathalangal.component';
import { AahakalyanamalaiComponent } from './kmservices/aahakalyanamalai/aahakalyanamalai.component';

import { TestingComponent } from './testing/testing.component';
// Edit components End


// Payment Page
import { SuccessComponent } from './success/success.component';

const appRoutes: Routes = [
    { 
        path: '', 
        // canActivate: [AuthGuardService],
        component: SiteLayout2Component,
        children: [
          { path: '', component: HomeComponent, pathMatch: 'full',data: { title: 'Kalyanamalai'} },
        ]
    },
    { 
        path: '',
        // canActivate: [AuthGuardService],
        component: SiteLayoutComponent, 
        children: [
          { path: 'login', component: LoginComponent,data: { title: 'Login - Kalyanamalai'} },
        ]
    },
    { 
        path: '',
        // canActivate: [AuthGuardService],
        component: RegLayoutComponent, 
        children: [
          { path: 'register/personal-details', component: PersonalDetailsComponent }
        ]
    },
    { 
        path: '',
        // canActivate: [AuthGuardService],
        component: RegLayoutComponent, 
        children: [
          { path: 'register/family-information', component: FamilyInformationComponent }
        ]
    },
    { 
        path: '',
        component: RegLayoutComponent, 
        children: [
          { path: 'register/lifestyle-information', component: LifestyleInformationComponent }
        ]
    },
    { 
        path: '',
        component: RegLayoutComponent, 
        children: [
          { path: 'register/education-and-career-details', component: EducationAndCareerDetailsComponent }
        ]
    },
    { 
        path: '',
        component: RegLayoutComponent, 
        children: [
          { path: 'register/communication-address', component: CommunicationAddressComponent }
        ]
    },
    { 
        path: '',
        component: RegLayoutComponent, 
        children: [
          { path: 'register/describe-yourself', component: DescribeYourselfComponent }
        ]
    },
    { 
        path: '',
        component: RegLayoutComponent, 
        children: [
          { path: 'register/my-expectations', component: MyExpectationsComponent }
        ]
    },
    { 
        path: '',
        component: RegLayoutComponent, 
        children: [
          { path: 'register/schemes', component: ChooseSchemeComponent }
        ]
    },
    { 
        path: '',
        component: RegLayoutComponent, 
        children: [
          { path: 'register/upload-profile', component: UploadProfileComponent }
        ]
    },

    { 
        path: '',
        component: RegLayoutComponent, 
        children: [
          { path: 'register/verify', component: VerifyComponent }
        ]
    },
    { 
        path: '',
        component: SiteLayoutComponent, 
        children: [
          { path: 'recover', component: RecoverComponent }
        ]
    },
    { 
        path: '',
        component: UserWmlayoutComponent, 
        children: [
          { path: 'profiles', component: ProfilesComponent }
        ]
    },
    { 
        path: '',
        component: UserWmlayoutComponent, 
        children: [
          { path: 'profile/:id', component: ViewprofileComponent }
        ]
    },
    { 
        path: '',
        // component: UserWmlayoutComponent, 
        component: UserLayoutComponent, 
        children: [
          { path: 'search', component: SearchComponent }
        ]
    },
    { 
        path: '',
        // canActivate: [AuthGuardService],
        component: SiteLayout2Component, 
        children: [
          { path: 'profile-complete', component: ProfileCompleteComponent }
        ]
    },
    { 
        path: '',
        // canActivate: [AuthGuardService],
        component: SiteLayoutComponent, 
        children: [
          { path: 'scheme-exclusive', component: SchemeExclusiveComponent }
        ]
    },  
    //-----------------------------------------------------------//
    //27-01-2021
    //about page
    { 
        path: '',
        component: SiteLayout2Component, 
        children: [
          { path: 'about', component: AboutComponent }
        ]
    },

    { 
        path: '',
        component: SiteLayoutComponent, 
        children: [
          { path: 'search-profiles', component: SearchProfilesComponent }
        ]
    },
    { 
        path: '',
        component: SiteLayoutComponent, 
        children: [
          { path: 'logout', component: LogoutComponent }
        ]
    },

    //information
    { 
        path: '',
        component: SiteLayout2Component, 
        children: [
          { path: 'information/wedding-fixed', component: WeddingFixedComponent }
        ]
    },

    { 
        path: '',
        component: SiteLayout2Component, 
        children: [
          { path: 'information/success-stories', component: SuccessStoriesComponent }
        ]
    },

    { 
        path: '',
        component: SiteLayout2Component, 
        children: [
          { path: 'information/terms-condition', component: TermsConditionComponent }
        ]
    },

    { 
        path: '',
        component: SiteLayout2Component, 
        children: [
          { path: 'information/privacy-policy', component: PrivacyPolicyComponent }
        ]
    },

    { 
        path: '',
        component: SiteLayout2Component, 
        children: [
          { path: 'information/suggestion', component: SuggestionComponent }
        ]
    },

    { 
        path: '',
        component: SiteLayout2Component, 
        children: [
          { path: 'information/report-abuse', component: ReportAbuseComponent }
        ]
    },

    { 
        path: '',
        component: SiteLayout2Component, 
        children: [
          { path: 'information/advertise-with-us', component: AdvertiseWithUsComponent }
        ]
    },

    { 
        path: '',
        component: SiteLayout2Component, 
        children: [
          { path: 'information/events', component: EventsComponent }
        ]
    },

    { 
        path: '',
        component: SiteLayout2Component, 
        children: [
          { path: 'information/faq', component: FaqComponent }
        ]
    },

    { 
        path: '',
        component: SiteLayout2Component, 
        children: [
          { path: 'kmservices/weddingplanners', component: WeddingplannersComponent }
        ]
    },
    { 
        path: '',
        component: SiteLayout2Component, 
        children: [
          { path: 'kmservices/suntvprofile', component: SuntvprofileComponent }
        ]
    },
    { 
        path: '',
        component: SiteLayout2Component, 
        children: [
          { path: 'kmservices/thirumanathalangal/:ThiruthanagalId/:Thiruthanagalname', component: ThirumanathalangalComponent }
        ]
    },
    { 
        path: '',
        component: SiteLayout2Component, 
        children: [
          { path: 'kmservices/aahakalyanamalai/:aahaId/:aahaName', component: AahakalyanamalaiComponent }
        ]
    },


    //-----------------------------------------------------------//
    // //Edit Start
    { 
        path: '',
        //canActivate: [AuthGuardService],
        component: RegLayoutComponent, 
        children: [
          { path: 'edit/edit-personal-details', component: EditPersonalDetailsComponent }
        ]
    },
    { 
        path: '',
        //canActivate: [AuthGuardService],
        component: RegLayoutComponent, 
        children: [
          { path: 'edit/edit-family-information', component: EditFamilyInformationComponent }
        ]
    },
    { 
        path: '',
        //canActivate: [AuthGuardService],
        component: RegLayoutComponent, 
        children: [
          { path: 'edit/edit-life-style-information', component: EditLifeStyleInformationComponent }
        ]
    },
    { 
        path: '',
        //canActivate: [AuthGuardService],
        component: RegLayoutComponent, 
        children: [
          { path: 'edit/edit-education-and-career-details', component: EditEducationAndCareerDetailsComponent }
        ]
    },
    { 
        path: '',
        // //canActivate: [AuthGuardService],
        component: RegLayoutComponent, 
        children: [
          { path: 'edit/edit-communication-address', component: EditCommunicationAddressComponent }
        ]
    },
    { 
        path: '',
        // //canActivate: [AuthGuardService],
        component: RegLayoutComponent, 
        children: [
          { path: 'edit/edit-describe-yourself', component: EditDescribeYourselfComponent }
        ]
    },
    { 
        path: '',
        //canActivate: [AuthGuardService],
        component: RegLayoutComponent, 
        children: [
          { path: 'edit/edit-my-expectation', component: EditMyExpectationComponent }
        ]
    },
    { 
        path: '',
        //canActivate: [AuthGuardService],
        component: RegLayoutComponent, 
        children: [
          { path: 'edit/edit-hobbies-details', component: EditHobbiesDetailsComponent }
        ]
    },
    { 
        path: '',
        //canActivate: [AuthGuardService],
        component: RegLayoutComponent, 
        children: [
          { path: 'edit/edit-upload-profile', component: EditUploadProfileComponent }
        ]
    },
    // //Edit End

    // User Start 
    { 
        path: '',
        // canActivate: [AuthGuardService],
        component: UserLayoutComponent, 
        children: [
          { path: 'user/dashboard', component: DashboardComponent }
        ]
    },  
    { 
        path: '',
        // canActivate: [AuthGuardService],
        component: UserLayoutComponent, 
        children: [
          { path: 'user/profile', component: ProfileComponent }
        ]
    },    
    { 
        path: '',
        // canActivate: [AuthGuardService],
        component: UserLayoutComponent, 
        children: [
          { path: 'user/account', component: AccountComponent }
        ]
    },    
    { 
        path: '',
        // canActivate: [AuthGuardService],
        component: UserLayoutComponent, 
        children: [
          { path: 'user/bookmarks', component: BookmarksComponent }
        ]
    },    
    { 
        path: '',
        // canActivate: [AuthGuardService],
        component: UserLayoutComponent, 
        children: [
          { path: 'user/saved-search', component: SavedSearchComponent }
        ]
    },    
    { 
        path: '',
        // canActivate: [AuthGuardService],
        component: UserLayoutComponent, 
        children: [
          { path: 'user/settings', component: SettingsComponent }
        ]
    },    

    { 
        path: '',
        // canActivate: [AuthGuardService],
        component: UserLayoutComponent, 
        children: [
          { path: 'user/inbox', component: InboxComponent }
        ]
    },    
    
    { 
        path: '',
        // canActivate: [AuthGuardService],
        component: UserLayoutComponent, 
        children: [
          { path: 'user/outbox', component: OutboxComponent }
        ]
    },    

    { 
        path: '',
        // canActivate: [AuthGuardService],
        component: UserLayoutComponent, 
        children: [
          { path: 'user/matching-profiles', component: MatchingProfilesComponent }
        ]
    },   

    { 
        path: '',
        // canActivate: [AuthGuardService],
        component: UserLayoutComponent, 
        children: [
          { path: 'user/express-interest', component: ExpressInterestComponent }
        ]
    },
    { 
        path: '',
        // canActivate: [AuthGuardService],
        component: UserLayoutComponent, 
        children: [
          { path: 'user/recentvisitors', component: RecentvisitorsComponent}
        ]
    },
    { 
        path: '',
        component: SiteLayout2Component, 
        children: [
          { path: 'schemes', component: SchemesComponent }
        ]
    },   
    { 
        path: '',
        component: RegLayoutComponent, 
        children: [
          { path: 'dhana', component: TestingComponent }
        ]
    },
    { 
        path: '',
        component: RegLayoutComponent, 
        children: [
          { path: 'success', component: SuccessComponent }
        ]
    },
    // User End

    { 
        path: '',
        component: SiteLayout2Component, 
        children: [
          { path: 'contact', component: ContactComponent }
        ]
    },

    { 
        path: '',
        component: RegLayoutComponent, 
        children: [
          { path: '**', component: NotfoundComponent }
        ]
    },
    
    { 
        path: '',
        component: RegLayoutComponent, 
        children: [
          { path: 'notfound', component: NotfoundComponent }
        ]
    },

];

export const routing = RouterModule.forRoot(appRoutes,{
    useHash: true,
    scrollPositionRestoration: 'enabled'
  });

// export class AppRoutingModule { 
// }