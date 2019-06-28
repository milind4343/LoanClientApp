import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';

@Component({
  selector: 'ngx-chartjs-bar',
  template: `
    <chart type="bar" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsBarComponent implements OnInit, OnDestroy {
 
@Input() child2: any;

 data: any;
 options: any;
 themeSubscription: any;

 //chartData: any = {};
 custcolors: any;

  constructor(private theme: NbThemeService) {
        
      // this.chartData.toDate = "2019-06-27";
      // this.chartData.fromDate = "2019-06-15";
      // this.chartData.agentId = "2";

      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
       
          const colors: any = config.variables;
          const chartjs: any = config.variables.chartjs;
          this.custcolors = colors;          
          
          this.data = {
            labels: ['2006', '2007'],
            datasets: [{
              data: [65, 59],
              label: 'Series A',
              backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
            }, {
              data: [28, 48],
              label: 'Series B',
              backgroundColor: NbColorHelper.hexToRgbA(colors.infoLight, 0.8),
            }]       
          };
    
          this.options = {
            maintainAspectRatio: false,
            responsive: true,    
            animation: {
              duration: 0
          },
          hover: {
              animationDuration: 0
          },
          responsiveAnimationDuration: 0,    
            legend: {
              labels: {
                fontColor: chartjs.textColor,
              },
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    display: false,
                    color: chartjs.axisLineColor,
                  },
                  ticks: {
                    fontColor: chartjs.textColor,
                  },
                },
              ],
              yAxes: [
                {
                  gridLines: {
                    display: true,
                    color: chartjs.axisLineColor,
                  },
                  ticks: {
                    fontColor: chartjs.textColor,
                    // beginAtZero: true,
                    //  steps: 20,
                    //  stepValue: 200,                        
                    //  max: 3000
                  },
                },
              ],
            },
          };
        });
  }


  ngOnInit(): void {
    let lblist = new Array<Number>();
    let vblist = new Array<Number>();
    let bblist = new Array<Number>();
    let name = new Array<string>();

    console.log(this.child2);
    
    if(this.child2.length > 0){
      this.child2.forEach(element => {
        debugger;
        let dt = new Date(element.createdDate).toDateString();
        name.push(dt);
  
        lblist.push(element.lb);
        vblist.push(element.vb);
        bblist.push(element.bb);
      });
  
      this.data.labels = name;
      this.data.datasets.splice(0,2);                         
      this.data.datasets.push({ data: lblist, label: 'LB', backgroundColor: NbColorHelper.hexToRgbA(this.custcolors.primaryLight, 0.8) });
      this.data.datasets.push({ data: vblist, label: 'VB', backgroundColor: NbColorHelper.hexToRgbA(this.custcolors.infoLight, 0.8) });
      this.data.datasets.push({ data: bblist, label: 'BB', backgroundColor: NbColorHelper.hexToRgbA(this.custcolors.successLight, 0.8) });    
    }

  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
