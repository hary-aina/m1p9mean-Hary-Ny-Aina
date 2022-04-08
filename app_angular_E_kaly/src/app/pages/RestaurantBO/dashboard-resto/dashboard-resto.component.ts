import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard-resto',
  templateUrl: './dashboard-resto.component.html',
  styleUrls: ['./dashboard-resto.component.css']
})
export class DashboardRestoComponent implements OnInit {

  user_name : string;
  user_id : string;
  user_contact : string;
  type_user_name : string;

  restaurant_name : string;
  restaurant_id : string;
  token : string;

  per_page = 10;
  page_number = 1;

  chiffre : any = {
    chiffre_affaire : 0,
    cout : 0,
    benefice : 0,
  };

  ChiffrebyDay: any[]  =[
    {
      data: [ ],
      label: 'Chriffre d`affaire',
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      fill: 'origin',
    },
    {
      data: [ ],
      label: 'Coût',
      backgroundColor: '#ff000033',
      borderColor: 'red',
      pointBackgroundColor: 'red',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
      fill: 'origin',
    },
    {
      data: [ ],
      label: 'Benefice',
      backgroundColor: '#4f992d69',
      borderColor: '#4f992d',
      pointBackgroundColor: '#4f992d',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)',
      fill: 'origin',
    }
  ];
  labelChiffrebyDay: any[]  = [];

  constructor(
    private restaurantService : RestaurantService,
    private cookie : CookieService,
    private router : Router
  ) {
    this.token = this.cookie.get('token');  
    this.restaurant_name = this.cookie.get('restaurant_name');
    this.restaurant_id = this.cookie.get('restaurant_id');
    this.user_name = this.cookie.get('user_name');
    this.user_id = this.cookie.get('user_id');
    this.user_contact = this.cookie.get('user_contact');
    this.type_user_name = this.cookie.get('type_user_name');
   }

  ngOnInit(): void {
    if(!(this.type_user_name == "restaurant" && this.token != undefined)){
      this.router.navigate(['/resto-bo/login']);
    }
    else{
      this.getBenefit();
      this.getBenefitByDay();
    }
  }

  getBenefit(){
    let result = this.restaurantService.getBenefiteCommandeLivré(
      this.token, 
      this.restaurant_id
    );
    result.subscribe((data:any) => {
      //console.log(data);
      if(data.status != 200){
        alert(data.data);
      }else{
        //use cookie there
        this.chiffre = data.data[0];
        
      }
    });
  }

  getBenefitByDay(){
    let result = this.restaurantService.getBoardRestoByDay(
      this.token, 
      this.restaurant_id
    );
    result.subscribe((data:any) => {
      //console.log(data);
      if(data.status != 200){
        alert(data.data);
      }else{
        console.log(data.data);
        data.data.forEach((res:any) => {
          this.labelChiffrebyDay.push(res._id.day+"-"+res._id.month+"-"+res._id.year);
          this.ChiffrebyDay[0].data.push(res.chiffre_affaire);
          this.ChiffrebyDay[1].data.push(res.cout);
          this.ChiffrebyDay[2].data.push(res.benefice);
        });
      }
    });
  }

  //|------------------------|
  //|-------- chart ---------|
  //|------------------------|

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: this.ChiffrebyDay,
    labels: this.labelChiffrebyDay
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
    },
    plugins: {
      legend: { display: true }
    }

  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  //|----------------------------|
  //|-------- end chart ---------|
  //|----------------------------|

}
