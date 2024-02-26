import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { WheelOfLifeService } from '../../core/services/wheel-of-life.service';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { WheelOfLifeSegment } from '../../core/models/wheel-of-life.model';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-add-wheel-of-life',
  templateUrl: './add-wheel-of-life.component.html',
  styleUrls: ['./add-wheel-of-life.component.scss'],
})
export class AddWheelOfLifeComponent implements OnInit {
  projectForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<AddWheelOfLifeComponent>,
    private readonly wheelOfLifeService: WheelOfLifeService,
    private readonly authService: AuthService,
    private readonly notifier: NotifierService
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      items: this.fb.array([]),
    });

    this.addItem();
  }

  onClose(items?: any): void {
    this.dialogRef.close(items);
  }

  get items(): FormArray {
    return this.projectForm.get('items') as FormArray;
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
    if (this.projectForm.valid) {
      this.isLoading = true;
      this.wheelOfLifeService
        .createWheelOfLife({
          uid: this.authService.getCurrentUse()?.uid,
        })
        .then(
          (response) => {
            const promises: Promise<any>[] = [];

            this.projectForm.value.items.forEach(
              (element: WheelOfLifeSegment) => {
                promises.push(
                  this.wheelOfLifeService.addWheelOfLifeSegment({
                    uid: this.authService.getCurrentUse()?.uid,
                    sectionName: element.sectionName,
                    sectionColor: element.sectionColor,
                    sectionScore: element.sectionScore,
                    wheelOfLifeId: response.id,
                  })
                );
              }
            );

            Promise.all(promises).then(
              (response: any) => {
                this.isLoading = false;

                this.notifier.notify(
                  'success',
                  'The operation was successful.'
                );
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
            this.notifier.notify('error', 'Something went wrong.');
          }
        );
    } else {
      this.markFormGroupTouched(this.projectForm);

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
}
