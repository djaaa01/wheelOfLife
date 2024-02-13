import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';



const firebaseConfig = {
  apiKey: 'AIzaSyBbYKULE_E9wn9wLnqvMe0cLhExMsbbsmU',
  authDomain: 'wheeloflife-37af1.firebaseapp.com',
  projectId: 'wheeloflife-37af1',
  storageBucket: 'wheeloflife-37af1.appspot.com',
  messagingSenderId: '982019319263',
  appId: '1:982019319263:web:88a2369a10f6a4ac20506a',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgApexchartsModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: firebaseConfig }],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
