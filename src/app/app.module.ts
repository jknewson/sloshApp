import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WimtableComponent } from './wimtable/wimtable.component';
import { CdkTableModule } from '@angular/cdk/table';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database'; 
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    WimtableComponent
  ],
  imports: [
    BrowserModule,
    CdkTableModule,
    AngularFireModule.initializeApp(environment.firebase, 'sloshapp'),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
