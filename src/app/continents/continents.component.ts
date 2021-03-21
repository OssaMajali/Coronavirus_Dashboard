import { Chart } from 'node_modules/chart.js';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-continents',
  templateUrl: './continents.component.html',
  styleUrls: ['./continents.component.css']
})
export class ContinentsComponent implements OnInit {
 continents : any
 myChart2: Chart
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getallData()
  }
  
  getallData(){
    this.http.get('https://corona.lmao.ninja/v2/Continents')
    .subscribe(response=>{  
      this.continents =response
      console.log(response[0]['cases'])
      this.myChart2 = new Chart("myChart2", {
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
