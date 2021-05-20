import { Component, OnInit } from "@angular/core";

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { Subscription } from "rxjs";
import { FoodChartService } from "src/app/shared/services/food-chart.service";

@Component({
  selector: 'food-chart',
  templateUrl: './food-chart.component.html',
  styleUrls: ['food-chart.component.scss']
})

export class FoodChartComponent implements OnInit {
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Food Spends' }
  ];

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [300, 500, 100, 50, 56, 43, 23, 87, 99];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public subscription: Subscription;

  constructor(private foodChartService: FoodChartService) {

  }
  ngOnInit(): void {
    this.getFoodMonthChartData();
  }

  private getFoodMonthChartData(): void {
    this.subscription = this.foodChartService.getMonthFoodChartData().subscribe(res => {
      this.barChartLabels = res.months;
      this.barChartData = [{ data: res.monthPrices, label: 'Food Spends' }];
      this.pieChartLabels = res.currentMonthCategories;
      this.pieChartData = res.currentMontCategoryPrices;

      monkeyPatchChartJsTooltip();
      monkeyPatchChartJsLegend();
      this.subscription.unsubscribe();
    });
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