import { Component, OnInit, ViewChild } from '@angular/core';
import { EkalyService } from 'src/app/services/ekaly.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard-ekaly',
  templateUrl: './dashboard-ekaly.component.html',
  styleUrls: ['./dashboard-ekaly.component.css']
})
export class DashboardEkalyComponent implements OnInit {

  user_name : string;
  user_id : string;
  user_contact : string;
  token : string;
  type_user_name : string;

  labelBoard : any =  [];
  boardDataset : any =  [
    { data: [], label: 'chiffre d`affaire' },
    { data: [], label: 'cout' },
    { data: [], label: 'benefice' }
  ];

  constructor(
    private ekalyService : EkalyService,
    private cookie : CookieService,
    private router : Router
  ) {
    this.user_name = this.cookie.get('user_name');
    this.user_id = this.cookie.get('user_id');
    this.user_contact = this.cookie.get('user_contact');
    this.token = this.cookie.get('token');
    this.type_user_name = this.cookie.get('type_user_name');
   }

  ngOnInit(): void {
    if(!(this.type_user_name == "responsable" && this.token != undefined)){
      this.router.navigate(['/ekaly-bo/login']);
    }else{
      //things to do on init
      this.getCommandePretALivrer();
    }
  }

  getCommandePretALivrer(){
    let result = this.ekalyService.getdashboard(this.token);
    result.subscribe((data:any) => {
      if(data.status != 200){
        alert("erreur lors du cosulation du serveur");
      }else{
        //use cookie there;
        //console.log(data.data);
        data.data.forEach((boardResult:any) => {
          this.labelBoard.push(boardResult.restaurant_name);
          this.boardDataset[0].data.push(boardResult.chiffre_affaire);
          this.boardDataset[1].data.push(boardResult.cout);
          this.boardDataset[2].data.push(boardResult.benefice);
        });
      }
    });
  }

  //|-------------------------|
  //|-------- chart ----------|
  //|-------------------------|

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: this.labelBoard,
    datasets: this.boardDataset
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  //|-----------------------------|
  //|-------- fin chart ----------|
  //|-----------------------------|

}
