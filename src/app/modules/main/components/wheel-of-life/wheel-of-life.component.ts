import { Component, ViewChild } from '@angular/core';

import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-wheel-of-life',
  templateUrl: './wheel-of-life.component.html',
  styleUrls: ['./wheel-of-life.component.scss'],
})
export class WheelOfLifeComponent {
  @ViewChild('chart') chart: ChartComponent;
  chartOptions: any;

  constructor() {
    this.chartOptions = {
      series: [42, 39, 35, 29, 26],
      chart: {
        type: 'polarArea',
      },
      // labels: ['Rose A', 'Rose B', 'Rose C', 'Rose D', 'Rose E'],
      fill: {
        opacity: 1,
      },
      stroke: {
        width: 1,
        colors: undefined,
      },
      yaxis: {
        show: false,
      },
      legend: {
        position: 'right',
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 0,
          },
        },
      },
      theme: {
        monochrome: {
          //    enabled: true,
          shadeTo: 'light',
          shadeIntensity: 0.6,
        },
      },
    };
  }
}
