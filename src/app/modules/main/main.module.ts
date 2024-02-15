import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { NotesComponent } from './components/notes/notes.component';
import { WheelOfLifeComponent } from './components/wheel-of-life/wheel-of-life.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    MainComponent,
    MainMenuComponent,
    NotesComponent,
    WheelOfLifeComponent,
  ],
  imports: [CommonModule, MainRoutingModule, NgApexchartsModule],
})
export class MainModule {}
