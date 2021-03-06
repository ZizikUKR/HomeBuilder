import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { MonthEnum } from 'src/app/shared/models/enums/month-enum';
import { FoodChartService } from 'src/app/shared/services/food-chart.service';
import { UtilityBillService } from 'src/app/shared/services/utility-bill.service';

@Component({
  selector: 'app-utility-bill-chart',
  templateUrl: './utility-bill-chart.component.html',
  styleUrls: ['./utility-bill-chart.component.scss']
})
export class UtilityBillChartComponent implements OnInit {

  public months: string[];
  public currentMonth: string;
  public currentYear: string;

  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Utility Bills' }
  ];

  // Pie
  public pieChartOptions: ChartOptions = {
    legend: {
      display: false
    },
    responsive: true
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public subscription: Subscription;

  constructor(private chartService: UtilityBillService) {

  }
  ngOnInit(): void {
    this.initializeFilters();
    const currentDate = new Date();
    this.currentMonth = this.months[currentDate.getMonth() + 1];
    this.currentYear = currentDate.getFullYear().toString();
    this.getFoodMonthChartData(this.currentMonth);
  }

  private initializeFilters(): void {
    this.months = Object.keys(MonthEnum).filter(f => isNaN(Number(f)));
  }

  private getFoodMonthChartData(month: string): void {
    this.subscription = this.chartService.getMonthFoodChartData(month).subscribe(res => {
      this.barChartLabels = res.months;
      this.barChartData = [{ data: res.monthPrices, label: 'Utility Bills' }];
      this.pieChartLabels = res.currentMonthCategories;
      this.pieChartData = res.currentMonthCategoryPrices;
      monkeyPatchChartJsTooltip();
      monkeyPatchChartJsLegend();
      this.subscription.unsubscribe();
    });
  }

  public onMonthChange(event: any): void {
    this.pieChartData = [];
    this.getFoodMonthChartData(this.currentMonth);
  }

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

}
