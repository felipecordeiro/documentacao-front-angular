import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioInvestimentosModule } from './portfolio-investimentos/portfolio-investimentos.module';
import { DashboardCoincapModule } from './dashboard-coincap/dashboard-coincap.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PortfolioInvestimentosModule,
    DashboardCoincapModule
  ]
})
export class PrimengModule { }
