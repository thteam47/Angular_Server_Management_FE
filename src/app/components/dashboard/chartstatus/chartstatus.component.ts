import { Component, OnInit, Input } from '@angular/core';
import { Status } from 'src/app/interface/status';
import { Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { ErrorToastrService } from 'src/app/services/error-toastr.service';

@Component({
  selector: 'app-chartstatus',
  templateUrl: './chartstatus.component.html',
  styleUrls: ['./chartstatus.component.css']
})
export class ChartstatusComponent implements OnInit {

  @Input() listStatus: Status[] = [];
  hide = true;
  private chart: am4charts.XYChart | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: any, private zone: NgZone) { }
  ngOnInit(): void {
    this.setChart()
  }
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }
  ngOnChanges(){
    this.setChart()
  }

  setChart() {
    // Chart code goes in here
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create("chartdiv", am4charts.XYChart);

      chart.paddingRight = 20;

      let data: any[] = [];
      let visits = 10;
      var x = 1;
      for (let i = 0; i < this.listStatus.length; i++) {
        if (this.listStatus[i].statusDt == "On") {
          visits = 1;
        } else if (this.listStatus[i].statusDt == "Off") {
          visits = 0;
        } else {
          visits = -1;
        }
        if (i > 0) {
          var date = new Date(this.listStatus[i].time)
          var dd = date.setSeconds(date.getSeconds() - 5);
          var vi = 1;
          if (i!= (this.listStatus.length-1)) {
            if (visits == 1) {
              vi = 0;
            } else {
              vi = 1;
            }
          }else {
            vi =visits;
          }
          data.push({ date: new Date(dd), name: "name" + x, value: vi });
          x++;
        }
        data.push({ date: new Date(this.listStatus[i].time), name: "name" + x, value: visits });
        if (i < this.listStatus.length - 1) {
          var date = new Date(this.listStatus[i].time)
          var dd = date.setSeconds(date.getSeconds() + 5);
          var vi = 1;
          if (visits == 1) {
            vi = 0;
          } else {
            vi = 1;
          }
          data.push({ date: new Date(dd), name: "name" + x, value: visits });
          x++;
        }
        // if (i < this.listStatus.length - 1) {
        //   var date = new Date(this.listStatus[i+1].time)
        //   var dd = date.setMinutes(date.getMinutes() - 1);
        //   var vi=1;
        //   if(visits==1) {
        //     vi=0;
        //   }else {
        //     vi=1;
        //   }
        //   data.push({ date: new Date(dd), name: "name" + x, value: vi });
        //   x++;
        // }

        x++;

        // if (i < this.listStatus.length - 1) {
        //   // var start:Date = new Date(this.listStatus[i].time);
        //   // var end:Date = new Date(this.listStatus[i+1].time);
        //   // var diffMs = (end.getTime() - start.getTime());
        //   // var diffMins = Math.round(diffMs / 60000);
        //   // for (let j=1;j<diffMins;j++){
        //   //   x++;
        //   //   var date= new Date(this.listStatus[i].time)
        //   //   var dd = date.setMinutes(date.getMinutes() + 1);
        //   //   data.push({ date: dd, name: "name" + x, value: visits });
        //   // }

        //   var date = new Date(this.listStatus[i+1].time)
        //   var dd = date.setMinutes(date.getMinutes() + 1);
        //   if(visits==1){

        //   }
        //   data.push({ date: new Date(dd), name: "name" + x, value: visits });
        // }

      }
      
      chart.data = data;
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      //valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";
      series.tooltipText = "{valueY.value}";

      chart.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      this.chart = chart;
    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}
