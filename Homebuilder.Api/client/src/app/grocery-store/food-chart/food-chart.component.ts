import { Component, OnInit } from "@angular/core";

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { Subscription } from "rxjs";
import { MonthEnum } from "src/app/shared/models/enums/month-enum";
import { FoodChartService } from "src/app/shared/services/food-chart.service";

@Component({
  selector: 'food-chart',
  templateUrl: './food-chart.component.html',
  styleUrls: ['food-chart.component.scss']
})

export class FoodChartComponent implements OnInit {
  public months: string[];
  public currentMonth: string;
  public currentYear: string;

  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Food Spends' }
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

  constructor(private foodChartService: FoodChartService) {

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
    this.subscription = this.foodChartService.getMonthFoodChartData(month).subscribe(res => {
      this.barChartLabels = res.months;
      this.barChartData = [{ data: res.monthPrices, label: 'Food Spends' }];
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