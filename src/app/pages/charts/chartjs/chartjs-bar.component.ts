import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';
import { ChartsService } from '../charts.service';

@Component({
  selector: 'ngx-chartjs-bar',
  template: `
    <chart type="bar" [data]="data" [options]="options"></chart>
  `,
})
export class ChartjsBarComponent implements OnInit, OnDestroy {
 
@Input() res: any;

 data: any;
 options: any;
 themeSubscription: any;

 chartData: any = {};

  constructor(private theme: NbThemeService, private chartService: ChartsService) {
    debugger;
   
          this.chartData.toDate = "2019-06-27";
          this.chartData.fromDate = "2019-06-15";
          this.chartData.agentId = "2";

          this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
            debugger;
              const colors: any = config.variables;
              const chartjs: any = config.variables.chartjs;
      
              this.chartService.getChartData(this.chartData).subscribe(res=>{
                debugger;
                let lblist = new Array<Number>();
                let vblist = new Array<Number>();
                let bblist = new Array<Number>();
        
                if(res != null){
                let name = new Array<string>();
                  res.forEach(element => {
                    debugger;
                    let dt = new Date(element.createdDate).toDateString();
                    name.push(dt);
                  
                    lblist.push(element.lb);
                    vblist.push(element.vb);
                    bblist.push(element.bb);                
                  }); 
                 
                  this.data.labels = name;
                  //this.data.datasets.splice(0,2);                         
                  this.data.datasets.push({data: lblist, label: 'LB', backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8) });
                  this.data.datasets.push({data: vblist, label: 'VB', backgroundColor: NbColorHelper.hexToRgbA(colors.infoLight, 0.8) });
                  this.data.datasets.push({data: bblist, label: 'BB', backgroundColor: NbColorHelper.hexToRgbA(colors.successLight, 0.8) });
                }
              });  
        
              this.data = {};  
        
              // this.data = {
              //   labels: ['2006', '2007'],
              //   datasets: [{
              //     data: [65, 59],
              //     label: 'Series A',
              //     backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
              //   }, {
              //     data: [28, 48],
              //     label: 'Series B',
              //     backgroundColor: NbColorHelper.hexToRgbA(colors.infoLight, 0.8),
              //   }]       
              // };
        
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
                         steps: 20,
                         stepValue: 500,                        
                         max: 3000
                      },
                    },
                  ],
                },
              };
            });

  }


ngOnInit():void{
  let temp = this.res;
  //console.log(temp);     
         
}

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
