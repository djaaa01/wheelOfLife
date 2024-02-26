import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { WheelOfLifeSegment } from '../../core/models/wheel-of-life.model';

@Component({
  selector: 'app-wheel-chart',
  templateUrl: './wheel-chart.component.html',
  styleUrls: ['./wheel-chart.component.scss'],
})
export class WheelChartComponent implements OnInit {
  @Input() set wheelOfLifeSegments(wheelOfLifeSegments: WheelOfLifeSegment[]) {
    if (wheelOfLifeSegments?.length) {
      this.setChart(wheelOfLifeSegments);
    }
  }

  chartOptions: any;

  constructor() {}

  setChart(wheelOfLifeSegments: WheelOfLifeSegment[]): void {
    const series: number[] = [];
    const labels: string[] = [];
    const colors: string[] = [];

    wheelOfLifeSegments.forEach((element) => {
      series.push(element.sectionScore);
      labels.push(element.sectionName);
      colors.push(element.sectionColor);
    });

    console.log(wheelOfLifeSegments);
    console.log(series);
    console.log(labels);
    console.log(colors);
    this.chartOptions = {
      series: series,
      labels: labels,
      fill: {
        colors: colors,
        opacity: 1,
      },
      chart: {
        type: 'polarArea',
        width: '500px',
        height: '500px',
      },
      tooltip: {
        custom: function (options: any) {
          return `<div class="label"><span>${
            options.w.globals.seriesNames[options.seriesIndex]
          }: ${options.series[options.seriesIndex]}</span></div>`;
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      yaxis: {
        show: false,
      },
      legend: {
        show: false,
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
          shadeTo: 'light',
          shadeIntensity: 0.6,
        },
      },
    };
  }

  ngOnInit(): void {
  }
}
