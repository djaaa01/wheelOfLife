import { Component, OnInit } from '@angular/core';
import { AddNoteComponent } from '../add-note/add-note.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { WheelOfLifeService } from '../../core/services/wheel-of-life.service';
import { NoteSegment } from '../../core/models/note-segment.model';
import { take } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { WheelOfLifeSegment } from '../../core/models/wheel-of-life.model';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
})
export class NoteDetailsComponent implements OnInit {
  segmentId: string;
  segment: WheelOfLifeSegment;
  notes: NoteSegment[];

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private readonly wheelOfLifeService: WheelOfLifeService,
    private readonly notifier: NotifierService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.segmentId = this.route.snapshot.paramMap.get('id') as string;
    this.wheelOfLifeService.getSegment(this.segmentId).then((response) => {
      if (response) {
        this.segment = response;
        this.setNotes();
      } else {
        this.router.navigate(['/wheel-of-life']);
      }
    });
  }

  setNotes(): void {
    this.notes = [];

    this.wheelOfLifeService
      .getNoteSegments(this.segmentId)
      .pipe(take(1))
      .subscribe(
        (response) => {
          this.notes = response?.sort(function (a, b) {
            return (b.createdDate as any) - (a.createdDate as any);
          });
        },
        () => {
          this.notifier.notify('error', 'Something went wrong.');
        }
      );
  }

  onAddNote(note?: NoteSegment): void {
    const dialogRef = this.dialog.open(AddNoteComponent, {
      data: { segmentId: this.segmentId, note: note },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.setNotes();
      }
    });
  }
}
