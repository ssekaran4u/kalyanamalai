import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

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

@NgModule({
  declarations: [ AppComponent ],
  imports: [NgxIndexedDBModule.forRoot(dbConfig)],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule {}
