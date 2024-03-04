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
import { Router } from '@angular/router';

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
    private readonly authService: AuthService,
    private readonly router: Router
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

  onSegment(event: MouseEvent, segment: WheelOfLifeSegment): void {
    if (event.button === 0) {
      console.log(segment);

      this.router.navigate([`/notes/${segment.id}`]);
    }

    if (event.button === 1) {
      const routePath = `/notes/${segment.id}`;
      const url = window.location.origin + routePath;
      window.open(url, '_blank');
    }
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
