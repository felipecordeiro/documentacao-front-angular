import { Component, OnInit, ViewChild } from '@angular/core';
import { UIChart } from 'primeng/chart';
import { ChartModel } from '../chart.model';
import { DashboardCoincapService } from './dashboard-coincap.service';
import { Assets } from './models/assets.model';

@Component({
  selector: 'app-dashboard-coincap',
  templateUrl: './dashboard-coincap.component.html',
  styleUrls: ['./dashboard-coincap.component.scss']
})
export class DashboardCoincapComponent implements OnInit {

  @ViewChild('chartMaxSupply') chartMaxSupply: UIChart
  @ViewChild('chartMarketCapUsd') chartMarketCapUsd: UIChart
  @ViewChild('chartPriceUsd') chartPriceUsd: UIChart
  @ViewChild('chartChangePercent24Hr') chartChangePercent24Hr: UIChart

  backgroundColorDefault = [
    "#42A5F5",
    "#66BB6A",
    "#FFA726"
  ]

  dataMaxSupply: ChartModel
  dataMarketCapUsd: ChartModel
  dataPriceUsd: ChartModel
  dataChangePercent24Hr: ChartModel

  opcoesFiltro: string[] = [
    'Assets', 'Rates', 'Exchanges', 'Markets', 'Candles'
  ]
  valorFiltro: string

  constructor(private dashboardCoincapService: DashboardCoincapService) {
    this.inicializa()
   }

  ngOnInit(): void {
    let subs = this.dashboardCoincapService.getAllAssets()
    .subscribe(r => {
      subs.unsubscribe()
        this.dataMaxSupply.datasets[0].data = this.getTopThree(r, 'maxSupply').map(obj => obj.value)
        this.dataMaxSupply.labels = this.getTopThree(r, 'maxSupply').map(obj => obj.label)
        this.chartMaxSupply.refresh()
        
        this.dataMarketCapUsd.datasets[0].data = this.getTopThree(r, 'marketCapUsd').map(obj => obj.value)
        this.dataMarketCapUsd.labels = this.getTopThree(r, 'marketCapUsd').map(obj => obj.label)
        this.chartMarketCapUsd.refresh()

        this.dataPriceUsd.datasets[0].data = this.getTopThree(r, 'priceUsd').map(obj => obj.value)
        this.dataPriceUsd.labels = this.getTopThree(r, 'priceUsd').map(obj => obj.label)
        this.chartPriceUsd.refresh()

        this.dataChangePercent24Hr.datasets[0].data = this.getTopThree(r, 'changePercent24Hr').map(obj => obj.value)
        this.dataChangePercent24Hr.labels = this.getTopThree(r, 'changePercent24Hr').map(obj => obj.label)
        this.chartChangePercent24Hr.refresh()
      })
  }

  filtroChange(event){
    console.log(event.value)
  }

  private getTopThree(dataset: Assets[], property: string) {
    let top1: { value: number, label: string }
    let top2: { value: number, label: string }
    let top3: { value: number, label: string }
    let numberValues: number[] = dataset.map(obj => parseFloat(obj[property]))
    let labelValues: string[] = dataset.map(obj => obj.name)
    let index = 0
    index = numberValues.indexOf(Math.max(...numberValues))
    top1 = { value: numberValues[index], label: labelValues[index] } 
    numberValues.splice(index, 1)

    index = numberValues.indexOf(Math.max(...numberValues))
    top2 = { value: numberValues[index], label: labelValues[index] } 
    numberValues.splice(index, 1)

    index = numberValues.indexOf(Math.max(...numberValues))
    top3 = { value: numberValues[index], label: labelValues[index] } 
    numberValues.splice(index, 1)

    return [top1, top2, top3]
  }

  inicializa(){
    this.dataMaxSupply = { datasets: [{ data: [], backgroundColor: this.backgroundColorDefault }], labels: [] }
    this.dataMarketCapUsd = { datasets: [{ data: [], backgroundColor: this.backgroundColorDefault }], labels: [] }
    this.dataPriceUsd = { datasets: [{ data: [], backgroundColor: this.backgroundColorDefault }], labels: [] }
    this.dataChangePercent24Hr = { datasets: [{ data: [], backgroundColor: this.backgroundColorDefault }], labels: [] }
  }

}
