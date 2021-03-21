import { map } from 'rxjs/operators';
import { CountriesService } from './../services/countries.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Chart } from 'node_modules/chart.js'
import { database } from 'firebase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  posts: any= {
    active:'',
    cases:'',
    deaths:'',
    recovered:''
  };
  
  countries: any
   myChart: Chart
   myChart1: Chart
   myChart2: Chart
   myChart5: Chart
   activated: boolean= true;
  constructor(private httpClient: HttpClient){}

  ngOnInit(): void {
    this.getChart()
    this.getAllDataApi();
    this.getAllDataCountries();
    this.getAllhistorical();   
    this.getallData(); 
  }
  ngAfterViewInit(): void{
    //this.ChartLine()
  }
 
// start chart line
  ChartLine(dh,dc,dd,dr){  
      this.myChart = new Chart("myChart",{ 
      type: 'line',
			data: {
				labels:dh,
				datasets: [{
					label: 'cases',			
          data:	dc,
          borderColor: '#28a745',
					fill: false,
        },
        {
					label: 'deaths',			
          data:	dd,
          borderColor: '#dc3645',
					fill: false,
        },
        {
					label: 'recovered',			
          data:	dr,
          borderColor: '#007bfe',
					fill: false,
				}
      ]
			},
			options: {
        legend:{
            display: true

        },
				responsive: true,
				title: {
					display: true,
					text: 'Statistics covid-19 global'
				},
				tooltips: {			    
          enabled: true,
        },
        states: {
          hover: {
              filter: {
                  type: 'none',
              }
          },
      },
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Day'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'cases'
						}
					}]
				}
			}
    });
    
  }
  
  ChartDoughnut(recovered,death,active){  
  this.myChart1 = new Chart("myChart1",{ 
      
    type: 'doughnut',
    data: {
      datasets: [{
        data: [
               recovered,
               death,
               active
        ],
        backgroundColor: ['rgb(165, 218, 146)' ,'rgb(219, 237, 218)','rgb(172, 245, 145)'],
        label: 'Dataset 1'
      }],
      labels: [
        'Recovered',
        'Deaths',
        'active'
      ]
    },
    options: {
      responsive: true,
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Statistics covid-19 global'
      },
      animation: {
        animateScale: true,
        animateRotate: true
      }
    }


});

}

ChartBar(cases,recovered,death,active){
   this.myChart2 = new Chart("myChart2", {
    type: 'bar',
    data: {
        labels: ['Cases', 'Recovered', 'Deaths', 'Active'],
        label:false,
        datasets: [{           
            data: [cases, recovered, death, active],
            backgroundColor: [
              '#feda93',
              '#82dee7',
              '#fc7274',
              '#f5b855'
            ],
            borderColor: [
               
            ],
            borderWidth: 1
        }]
    },
    options: {
      title: {
        display: true,
        text: 'Statistics covid-19 global'
      },
      legend: {
        display: false
    },
      tooltips: {
        callbacks: {
           label: function(tooltipItem) {
                  return tooltipItem.yLabel;
           }
        }
    },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

}
// end chart line




// get all data history 
  dateHis : string[]=[]
  dataCasesHis = []
  dataDeathsHis =[]
  dataRecoveredHis =[]
  getAllhistorical(){
    this.httpClient.get('https://corona.lmao.ninja/v2/historical/all')
    .subscribe(response => {
      let allData = response['cases'];
      let allData1 = response['deaths'];
      let allData2 = response['recovered'];
      for (let key in allData){
        this.dataCasesHis.push(allData[key])
        this.dateHis.push(key)    
      }   
      for (let key in allData1){
        this.dataDeathsHis.push(allData1[key])
         
      } 
      for (let key in allData2){
        this.dataRecoveredHis.push(allData2[key])  
      }  
      this.ChartLine(this.dateHis,this.dataCasesHis,this.dataDeathsHis,this.dataRecoveredHis) 
  })
  }
// end get data history






  getAllDataCountries(){
    this.httpClient.get('https://corona.lmao.ninja/v2/countries')
    .subscribe(response => {
        this.countries = response  
    })
   }
  getAllDataApi(){
    this.httpClient.get('https://corona.lmao.ninja/v2/all')
    .subscribe(response => {
        this.posts=response;
    })
   }
 
   getChart(){
    this.httpClient.get('https://corona.lmao.ninja/v2/all')
    .subscribe(response => {
      this.ChartDoughnut(response['recovered'],response['deaths'],response['active'])
      this.ChartBar(response['cases'],response['recovered'],response['deaths'],response['active']) 
    })
   }

   updateData(data: string){
      this.countries.forEach(cs => {
        if(cs.country == data){
          this.posts.active = cs.active   
          this.posts.deaths = cs.deaths   
          this.posts.cases = cs.cases   
          this.posts.recovered = cs.recovered   
        }else if(data == "all"){
        // this.getAllDataApi()
        this.httpClient.get('https://corona.lmao.ninja/v2/all')
        .subscribe(response => {
            this.posts=response;
        })
        }
      });
    // if(data == "all"){    
    //   this.getAllhistorical()
    // }else{
    //   this.activated=false
    //   this.httpClient.get('https://corona.lmao.ninja/v2/historical/'+data)
    // .subscribe(response => {
    //        console.log(response)
    //        let caCntry = response['timeline']['cases']
    //        let deCntry = response['timeline']['deaths']
    //        let reCntry = response['timeline']['recovered']
    //        var CasesCntry: any[]=[]
    //        var DeathsCntry: any[]=[]
    //        var RecoveredCntry: any[]=[]
    //        var DayHis: any[]=[]
    //        for (let key in caCntry){
    //         DayHis.push(key)
    //         CasesCntry.push(caCntry[key])   
    //       } 
    //       for (let key in deCntry){         
    //         DeathsCntry.push(deCntry[key])   
    //       } 
    //       for (let key in reCntry){          
    //         RecoveredCntry.push(reCntry[key])   
    //       } 
          
          
    //       //this.removeData(this.myChart)
    //       this.ChartLine(DayHis,CasesCntry,DeathsCntry,RecoveredCntry)
                   
     //})

    }
 

    getallData(){
      this.httpClient.get('https://corona.lmao.ninja/v2/Continents')
      .subscribe(response=>{  
        this.myChart5 = new Chart("myChart5", {
          type: 'bar',
          data: {
              labels: ['Asia', 'North America', 'Europe', 'South America','Africa','Australia/Oceania'],
              label:false,
              datasets: [{  
                         
                  data: [response[0]['cases'],response[1]['cases'],response[2]['cases'],response[3]['cases'],response[4]['cases'],response[5]['cases']],
                  backgroundColor: ['rgb(255, 99, 132,0.1)',
                                    'rgb(76, 0, 153,0.1)',
                                    'rgb(255, 128, 0,0.1)',
                                    'rgb(204, 0, 0,0.1)',
                                    'rgb(255, 0, 127,0.1)',
                                    'rgb(255, 255, 0,0.1)'],
                  borderColor: ['rgb(255, 99, 132)',
                  'rgb(76, 0, 153)',
                  'rgb(255, 128, 0)',
                  'rgb(204, 0, 0)',
                  'rgb(255, 0, 127)',
                  'rgb(255, 255, 0)'],
                  borderWidth: 1
              }]
          },
          options: {
            title: {
              display: true,
              text: 'Statistics covid-19 global'
            },
            legend: {
              display: false
          },
            tooltips: {
              callbacks: {
                 label: function(tooltipItem) {
                        return tooltipItem.yLabel;
                 }
              }
          },
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
      });
      })
    }
   

}
