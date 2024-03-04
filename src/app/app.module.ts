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
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { NotifierModule } from 'angular-notifier';
import { NgxEditorModule } from 'ngx-editor';

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
    MatDialogModule,
    NgxEditorModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    NgApexchartsModule,
    NotifierModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
        },
        vertical: {
          position: 'top',
        },
      },
    }),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: firebaseConfig },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { autoFocus: false },
    },
  ],
  bootstrap: [AppComponent],
  exports: [NgApexchartsModule],
})
export class AppModule {}
