import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Editor, Toolbar } from 'ngx-editor';
import { WheelOfLifeService } from '../../core/services/wheel-of-life.service';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { NotifierService } from 'angular-notifier';
import { NoteSegment } from '../../core/models/note-segment.model';
import { FirestoreService } from 'src/app/modules/core/services/firestore.service';
import { FirestoreCollections } from 'src/app/modules/core/enums/firestore-colections.enum';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent implements OnInit {
  isLoading: boolean = false;
  addNoteForm: FormGroup;
  isEdit: boolean = false;

  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['ordered_list', 'bullet_list'],
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public noteDetails: { segmentId: string; note: NoteSegment },
    private readonly dialogRef: MatDialogRef<AddNoteComponent>,
    private fb: FormBuilder,
    private readonly wheelOfLifeService: WheelOfLifeService,
    private readonly authService: AuthService,
    private readonly notifier: NotifierService,
    private readonly firestoreService: FirestoreService
  ) {}

  ngOnInit(): void {
    this.editor = new Editor();

    if (this.noteDetails?.note) {
      this.isEdit = true;

      this.addNoteForm = this.fb.group({
        id: this.noteDetails?.note.id,
        segmentId: this.noteDetails?.note.segmentId,
        title: [this.noteDetails?.note?.title, [Validators.required]],
        note: [this.noteDetails?.note?.note, [Validators.required]],
      });
    } else {
      this.addNoteForm = this.fb.group({
        title: ['', [Validators.required]],
        note: ['', [Validators.required]],
      });
    }
  }

  onClose(items?: any): void {
    this.dialogRef.close(items);
  }

  onAdd(): void {
    if (this.addNoteForm.valid) {
      this.isLoading = true;
      if (this.isEdit) {
        this.wheelOfLifeService
          .updateNote({
            ...this.noteDetails.note,
            title: this.addNoteForm.value.title,
            note: this.addNoteForm.value.note,
          })
          .then(
            () => {
              this.isLoading = false;
              this.notifier.notify('success', 'The operation was successful.');
              this.onClose(true);
            },
            () => {
              this.isLoading = false;
              this.notifier.notify('error', 'Something went wrong.');
            }
          );
      } else {
        this.wheelOfLifeService
          .addNoteSegment({
            uid: this.authService.getCurrentUse()?.uid,
            segmentId: this.noteDetails.segmentId,
            createdDate: new Date(),
            title: this.addNoteForm.value.title,
            note: this.addNoteForm.value.note,
          })
          .then(
            (response) => {
              this.isLoading = false;
              this.notifier.notify('success', 'The operation was successful.');
              this.onClose(response);
            },
            () => {
              this.isLoading = false;
              this.notifier.notify('error', 'Something went wrong.');
            }
          );
      }
    } else {
      this.markFormGroupTouched(this.addNoteForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  onDelete(): void {
    this.firestoreService
      .deleteDocumentById(
        FirestoreCollections.noteSegments,
        this.noteDetails.note.id as string
      )
      .then(() => {
        this.notifier.notify('success', 'The operation was successful.');
        this.onClose(true);
      });
  }
}
