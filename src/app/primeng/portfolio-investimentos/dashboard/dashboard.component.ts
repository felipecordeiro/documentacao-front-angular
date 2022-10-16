import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { UIChart } from 'primeng/chart';
import { ChartModel } from '../../chart.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, AfterViewInit {

  data: ChartModel;

  chartOptions: any;

  @ViewChild('chart') chart: UIChart

  dataPieChart = [100, 50, 300, 10, 390, 100]

  constructor() { }

  ngOnInit(): void {
    this.data = {
      labels: ['A', 'B', 'C', 'D', 'E', 'F'],
      datasets: [
        {
          data: this.dataPieChart,
          backgroundColor: [
            "#42A5F5",
            "#66BB6A",
            "#FFA726",
            "#ff1100",
            "#00fbff",
            "#ff00ea",
          ],
          hoverBackgroundColor: [
            "#dfdfee",
          ]
        }
      ]
    };
  }

  ngAfterViewInit(): void {
    setInterval(() => {
      this.dataPieChart = [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
      ]
      this.data.datasets[0].data = this.dataPieChart
      this.chart.refresh()
    }, 1000)
  }

}
