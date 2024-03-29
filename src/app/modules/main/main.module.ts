import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { NotesComponent } from './components/notes/notes.component';
import { WheelOfLifeComponent } from './components/wheel-of-life/wheel-of-life.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { WheelChartComponent } from './components/wheel-chart/wheel-chart.component';
import { AddWheelOfLifeComponent } from './components/add-wheel-of-life/add-wheel-of-life.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { NoteDetailsComponent } from './components/note-details/note-details.component';
import { NgxEditorModule } from 'ngx-editor';
import { AddNoteComponent } from './components/add-note/add-note.component';

@NgModule({
  declarations: [
    MainComponent,
    MainMenuComponent,
    NotesComponent,
    WheelOfLifeComponent,
    WheelChartComponent,
    AddWheelOfLifeComponent,
    NoteDetailsComponent,
    AddNoteComponent,
  ],
  imports: [
    NgxEditorModule,
    CommonModule,
    MainRoutingModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
  ],
})
export class MainModule {}
