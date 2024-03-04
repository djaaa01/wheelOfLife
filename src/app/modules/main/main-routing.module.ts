import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { NotesComponent } from './components/notes/notes.component';
import { WheelOfLifeComponent } from './components/wheel-of-life/wheel-of-life.component';
import { NoteDetailsComponent } from './components/note-details/note-details.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'wheel-of-life',
        component: WheelOfLifeComponent,
      },
      // {
      //   path: 'notes',
      //   component: NotesComponent,
      // },
      {
        path: 'notes/:id',
        component: NoteDetailsComponent,
      },
      { path: '**', redirectTo: 'wheel-of-life', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
