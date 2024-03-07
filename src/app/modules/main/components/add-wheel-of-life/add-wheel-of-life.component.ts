import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WheelOfLifeService } from '../../core/services/wheel-of-life.service';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { WheelOfLifeSegment } from '../../core/models/wheel-of-life.model';
import { NotifierService } from 'angular-notifier';
import { FirestoreService } from 'src/app/modules/core/services/firestore.service';
import { FirestoreCollections } from 'src/app/modules/core/enums/firestore-colections.enum';

@Component({
  selector: 'app-add-wheel-of-life',
  templateUrl: './add-wheel-of-life.component.html',
  styleUrls: ['./add-wheel-of-life.component.scss'],
})
export class AddWheelOfLifeComponent implements OnInit {
  addWheelOfLifeForm: FormGroup;
  isLoading: boolean = false;
  isEdit: boolean = false;
  removeItems: WheelOfLifeSegment[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public wheelOfLifeSegments: WheelOfLifeSegment[],
    private readonly dialogRef: MatDialogRef<AddWheelOfLifeComponent>,
    private fb: FormBuilder,
    private readonly wheelOfLifeService: WheelOfLifeService,
    private readonly authService: AuthService,
    private readonly notifier: NotifierService,
    private readonly firestoreService: FirestoreService
  ) {}

  ngOnInit(): void {
    this.isEdit = this.wheelOfLifeSegments?.length > 0;
    this.addWheelOfLifeForm = this.fb.group({
      items: this.fb.array([]),
    });

    if (this.isEdit) {
      this.setItems();
    } else {
      this.addItem();
    }
  }

  onClose(items?: any): void {
    this.dialogRef.close(items);
  }

  get items(): FormArray {
    return this.addWheelOfLifeForm.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  createItem(): FormGroup {
    return this.fb.group({
      sectionName: ['', Validators.required],
      sectionColor: ['', Validators.required],
      sectionScore: ['', Validators.required],
    });
  }

  onCreate(): void {
    if (this.addWheelOfLifeForm.valid) {
      this.isLoading = true;

      if (this.isEdit) {
        this.editSegments();
      } else {
        this.createWheelOfLife();
      }
    } else {
      this.markFormGroupTouched(this.addWheelOfLifeForm);

      this.items.controls.forEach((itemControl: any) => {
        this.markFormGroupTouched(itemControl);
      });
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

  editSegments(): void {
    const promises: Promise<any>[] = [];

    this.addWheelOfLifeForm.value.items.forEach(
      (element: WheelOfLifeSegment) => {
        if (element?.id) {
          promises.push(
            this.wheelOfLifeService.updateSegment({
              ...element,
              sectionName: element.sectionName,
              sectionColor: element.sectionColor,
              sectionScore: element.sectionScore,
            })
          );
        } else {
          promises.push(
            this.wheelOfLifeService.addWheelOfLifeSegment({
              uid: this.authService.getCurrentUse()?.uid,
              sectionName: element.sectionName,
              sectionColor: element.sectionColor,
              sectionScore: element.sectionScore,
              wheelOfLifeId: this.addWheelOfLifeForm.value.items.find(
                (element: WheelOfLifeSegment) => element.hasOwnProperty('id')
              ).wheelOfLifeId,
              createdDate: new Date(),
            })
          );
        }
      }
    );

    this.removeItems.forEach((element) => {
      promises.push(
        this.firestoreService.deleteDocumentById(
          FirestoreCollections.wheelOfLifeSegments,
          element.id as string
        )
      );
    });

    Promise.all(promises).then(
      (response: any) => {
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

  createWheelOfLife(): void {
    this.wheelOfLifeService
      .createWheelOfLife({
        uid: this.authService.getCurrentUse()?.uid,
        createdDate: new Date(),
      })
      .then(
        (response) => {
          const promises: Promise<any>[] = [];

          this.addWheelOfLifeForm.value.items.forEach(
            (element: WheelOfLifeSegment) => {
              promises.push(
                this.wheelOfLifeService.addWheelOfLifeSegment({
                  uid: this.authService.getCurrentUse()?.uid,
                  sectionName: element.sectionName,
                  sectionColor: element.sectionColor,
                  sectionScore: element.sectionScore,
                  wheelOfLifeId: response.id,
                  createdDate: new Date(),
                })
              );
            }
          );

          Promise.all(promises).then(
            (response: any) => {
              this.isLoading = false;

              this.notifier.notify('success', 'The operation was successful.');
              this.onClose(response);
            },
            () => {
              this.isLoading = false;
              this.notifier.notify('error', 'Something went wrong.');
            }
          );
        },
        () => {
          this.isLoading = false;
          this.notifier.notify('error', 'Something went wrong.1');
        }
      );
  }

  setItems(): void {
    this.wheelOfLifeSegments.forEach((element) => {
      this.items.push(
        this.fb.group({
          id: [element.id, Validators.required],
          wheelOfLifeId: [element.wheelOfLifeId, Validators.required],
          sectionName: [element.sectionName, Validators.required],
          sectionColor: [element.sectionColor, Validators.required],
          sectionScore: [element.sectionScore, Validators.required],
        })
      );
    });
  }

  onRemoveItem(i: number): void {
    if (this.items?.value[i]?.id) {
      this.removeItems.push(this.items.value[i]);
    }
    this.items.removeAt(i);
  }
}
