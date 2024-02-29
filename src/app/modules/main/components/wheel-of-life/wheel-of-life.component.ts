import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddWheelOfLifeComponent } from '../add-wheel-of-life/add-wheel-of-life.component';
import { WheelOfLifeService } from '../../core/services/wheel-of-life.service';
import {
  WheelOfLife,
  WheelOfLifeSegment,
} from '../../core/models/wheel-of-life.model';
import { take } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-wheel-of-life',
  templateUrl: './wheel-of-life.component.html',
  styleUrls: ['./wheel-of-life.component.scss'],
})
export class WheelOfLifeComponent implements OnInit {
  wheelOfLifeSegments: WheelOfLifeSegment[];

  constructor(
    private dialog: MatDialog,
    private readonly wheelOfLifeService: WheelOfLifeService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.setWheel();
  }

  setWheel(): void {
    this.wheelOfLifeSegments = [];
    this.wheelOfLifeService
      .getWheelOfLife(this.authService.getCurrentUse()?.uid as string)
      .pipe(take(1))
      .subscribe((response) => {
        var wheelOfLife = response.filter(
          (item: WheelOfLife) => !item.referralId
        )[0];

        if (wheelOfLife) {
          this.wheelOfLifeService
            .getSegments(wheelOfLife?.id as string)
            .pipe(take(1))
            .subscribe((segments) => {
              this.wheelOfLifeSegments = segments;
            });
        }
      });
  }

  addWheelOfLife(isEdit: boolean): void {
    const dialogRef = this.dialog.open(AddWheelOfLifeComponent, {
      data: this.wheelOfLifeSegments,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.setWheel();
      }
    });
  }
}
