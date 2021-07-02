import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';


import { UserService } from './services/user.service';
import { ConfirmDialogService } from './services/confirm-dialog.service';
import { UserGlobalService } from './services/user.global';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home/home.component';

import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { RegLayoutComponent } from './_layout/reg-layout/reg-layout.component';
import { SiteLayout2Component } from './_layout/site-layout2/site-layout2.component'; 

import { AppHeaderComponent } from './_layout/app-header/app-header.component';
import { SiteHeaderComponent } from './_layout/site-header/site-header.component';
import { SiteFooterComponent } from './_layout/site-footer/site-footer.component';
import { SiteFooter2Component } from './_layout/site-footer2/site-footer2.component';

import { routing } from './app-routing.module';
import { NotfoundComponent } from './notfound/notfound.component';

// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {NgxPaginationModule} from 'ngx-pagination';
import { LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS, ScrollHooks } from 'ng-lazyload-image';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';
//import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
const dbConfig: DBConfig  = 
{
    name: 'kalyanamalai_v1.1.1',
    version: 1,
    objectStoresMeta: [
        {
            store: 'setup',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: []
        },
        {
            store: 'search',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: []
        }
    ]
};

import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { PersonalDetailsComponent } from './register/personal-details/personal-details.component';
import { FamilyInformationComponent } from './register/family-information/family-information.component';
import { LifestyleInformationComponent } from './register/lifestyle-information/lifestyle-information.component';
import { EducationAndCareerDetailsComponent } from './register/education-and-career-details/education-and-career-details.component';
import { CommunicationAddressComponent } from './register/communication-address/communication-address.component';
import { DescribeYourselfComponent } from './register/describe-yourself/describe-yourself.component';
import { MyExpectationsComponent } from './register/my-expectations/my-expectations.component';
import { SchemesComponent } from './schemes/schemes.component';
import { VerifyComponent } from './register/verify/verify.component';
import { RecoverComponent } from './recover/recover.component';

import { AboutComponent } from './about/about.component';

import { InformationComponent } from './information/information.component';
import { WeddingFixedComponent } from './information/wedding-fixed/wedding-fixed.component';
import { SuccessStoriesComponent } from './information/success-stories/success-stories.component';
import { TermsConditionComponent } from './information/terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from './information/privacy-policy/privacy-policy.component';
import { SuggestionComponent } from './information/suggestion/suggestion.component';
import { ReportAbuseComponent } from './information/report-abuse/report-abuse.component';
import { AdvertiseWithUsComponent } from './information/advertise-with-us/advertise-with-us.component';
import { EventsComponent } from './information/events/events.component';
import { FaqComponent } from './information/faq/faq.component';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AccountComponent } from './user/account/account.component';
import { BookmarksComponent } from './user/bookmarks/bookmarks.component';
import { SavedSearchComponent } from './user/saved-search/saved-search.component';
import { SettingsComponent } from './user/settings/settings.component';
import { UserLayoutComponent } from './_layout/user-layout/user-layout.component';
import { UserHeaderComponent } from './_layout/user-header/user-header.component';
import { UserRoofComponent } from './_layout/user-roof/user-roof.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { UserWmlayoutComponent } from './_layout/user-wmlayout/user-wmlayout.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
import { SearchComponent } from './search/search.component';
import { InboxComponent } from './user/inbox/inbox.component';
import { LogoutComponent } from './logout/logout.component';
import { SearchProfilesComponent } from './search-profiles/search-profiles.component';
import { MatchingProfilesComponent } from './user/matching-profiles/matching-profiles.component';
import { ExpressInterestComponent } from './user/express-interest/express-interest.component';
import { OutboxComponent } from './user/outbox/outbox.component';

import { EditComponent } from './edit/edit.component';
import { EditPersonalDetailsComponent } from './edit/edit-personal-details/edit-personal-details.component';
import { EditCommunicationAddressComponent } from './edit/edit-communication-address/edit-communication-address.component';
import { EditDescribeYourselfComponent } from './edit/edit-describe-yourself/edit-describe-yourself.component';
import { EditEducationAndCareerDetailsComponent } from './edit/edit-education-and-career-details/edit-education-and-career-details.component';
import { EditFamilyInformationComponent } from './edit/edit-family-information/edit-family-information.component';
import { EditLifeStyleInformationComponent } from './edit/edit-life-style-information/edit-life-style-information.component';
import { EditMyExpectationComponent } from './edit/edit-my-expectation/edit-my-expectation.component';
import { EditHobbiesDetailsComponent } from './edit/edit-hobbies-details/edit-hobbies-details.component';
import { TestingComponent } from './testing/testing.component';
import { UploadProfileComponent } from './register/upload-profile/upload-profile.component';
import { ChooseSchemeComponent } from './register/choose-scheme/choose-scheme.component';

import { ProfileCompleteComponent } from './profile-complete/profile-complete.component';
import { SchemeExclusiveComponent } from './scheme-exclusive/scheme-exclusive.component';
import { SuccessComponent } from './success/success.component';
import { RecentvisitorsComponent } from './user/recentvisitors/recentvisitors.component';
import { KmservicesComponent } from './kmservices/kmservices.component';
import { WeddingplannersComponent } from './kmservices/weddingplanners/weddingplanners.component';
import { SuntvprofileComponent } from './kmservices/suntvprofile/suntvprofile.component';
import { ThirumanathalangalComponent } from './kmservices/thirumanathalangal/thirumanathalangal.component';
import { AahakalyanamalaiComponent } from './kmservices/aahakalyanamalai/aahakalyanamalai.component';
import { EditUploadProfileComponent } from './edit/edit-upload-profile/edit-upload-profile.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppLayoutComponent, SiteLayoutComponent, RegLayoutComponent, AppHeaderComponent, SiteHeaderComponent, 
    SiteFooterComponent, NotfoundComponent, LoginComponent, ContactComponent, RegisterComponent, PersonalDetailsComponent, 
    FamilyInformationComponent, LifestyleInformationComponent, EducationAndCareerDetailsComponent, 
    CommunicationAddressComponent, DescribeYourselfComponent, MyExpectationsComponent, SchemesComponent, VerifyComponent, 
    RecoverComponent, AboutComponent, InformationComponent, WeddingFixedComponent, SuccessStoriesComponent, 
    TermsConditionComponent, PrivacyPolicyComponent, SuggestionComponent, ReportAbuseComponent, AdvertiseWithUsComponent, 
    EventsComponent, FaqComponent, UserComponent, DashboardComponent, ProfileComponent, AccountComponent, BookmarksComponent,
    SavedSearchComponent, SettingsComponent, UserLayoutComponent, UserHeaderComponent, UserRoofComponent, ProfilesComponent, 
    UserWmlayoutComponent, ViewprofileComponent, SearchComponent, InboxComponent, LogoutComponent, SearchProfilesComponent, 
    MatchingProfilesComponent, ExpressInterestComponent, OutboxComponent, EditComponent, EditPersonalDetailsComponent,
    EditCommunicationAddressComponent, EditCommunicationAddressComponent, EditDescribeYourselfComponent, EditEducationAndCareerDetailsComponent,
    EditFamilyInformationComponent, EditLifeStyleInformationComponent, EditMyExpectationComponent, EditHobbiesDetailsComponent, 
    TestingComponent, UploadProfileComponent, ChooseSchemeComponent, ProfileCompleteComponent, SchemeExclusiveComponent, SuccessComponent, RecentvisitorsComponent, KmservicesComponent, WeddingplannersComponent, SuntvprofileComponent, ThirumanathalangalComponent, AahakalyanamalaiComponent, EditUploadProfileComponent, SiteFooter2Component, SiteLayout2Component

  ],
  // EditComponent, EditPersonalDetailsComponent, EditCommunicationAddressComponent, 
   // EditCommunicationAddressComponent, EditDescribeYourselfComponent, EditEducationAndCareerDetailsComponent, 
 //   EditFamilyInformationComponent, EditLifeStyleInformationComponent, EditMyExpectationComponent, EditHobbiesDetailsComponent
  //MatCheckboxModule
//   providers: [
//   {provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' } as MatCheckboxDefaultOptions}
// ]
  imports: [  BrowserModule, BrowserAnimationsModule, routing,ToastrModule.forRoot({positionClass: 'toast-center-center',maxOpened:1,autoDismiss:true}), FormsModule, ReactiveFormsModule, HttpClientModule,BsDatepickerModule.forRoot(), AngularMultiSelectModule, NgMultiSelectDropDownModule.forRoot(),NgxPaginationModule,LazyLoadImageModule, ModalModule.forRoot(), CarouselModule.forRoot(), NgxIndexedDBModule.forRoot(dbConfig)],
  providers: [ UserService, UserGlobalService, Title, ConfirmDialogService],
  bootstrap: [AppComponent]
})
// ,{ provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks } 
export class AppModule {}
