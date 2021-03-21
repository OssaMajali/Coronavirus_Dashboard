import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from "@angular/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_continentsLow from "@amcharts/amcharts4-geodata/continentsLow";
import am4themes_dataviz from "@amcharts/amcharts4/themes/dataviz";

am4core.useTheme(am4themes_dataviz);
am4core.useTheme(am4themes_animated);


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit  {

  
  private chart: am4charts.XYChart;
  private data: any
  constructor(private zone: NgZone,private http: HttpClient) {}


  ngOnInit(): void {   
    
  }
  ngAfterViewInit() {
   
    this.http.get('https://www.trackcorona.live/api/countries')
    .subscribe(response=>{  
      
   
   
    this.zone.runOutsideAngular(() => {
      
      let chart = am4core.create("chartdiv", am4maps.MapChart);

      // Set map definition
      chart.geodata = am4geodata_worldLow;
      
      // Set projection
      chart.projection = new am4maps.projections.Miller();
      
      // Create map polygon series
      let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      
      // Exclude Antartica
      polygonSeries.exclude = ["AQ"];
      
      // Make map load polygon (like country names) data from GeoJSON
      polygonSeries.useGeodata = true;
      
      // Configure series
      //let polygonTemplate = polygonSeries.mapPolygons.template;
      //polygonTemplate.tooltip = "{name} \n Confirmed: {confirmed} \n Deaths: {dead} \n Recovered: {recovered}"
     // polygonTemplate.polygon.fillOpacity = 0.6;
      
      
      //Create hover state and set alternative fill color
      //let hs = polygonTemplate.states.create("hover");
      //hs.properties.fill = chart.colors.getIndex(0);
      
      // Add image series
      let imageSeries = chart.series.push(new am4maps.MapImageSeries());
      imageSeries.mapImages.template.propertyFields.longitude = "longitude";
      imageSeries.mapImages.template.propertyFields.latitude = "latitude";
      imageSeries.mapImages.template.tooltipText = "{location} \n Confirmed: {confirmed} \n Deaths: {dead} \n Recovered: {recovered}";
      imageSeries.mapImages.template.propertyFields.url = "url";
      let colorSet = new am4core.ColorSet();
      let circle = imageSeries.mapImages.template.createChild(am4core.Circle);    
      circle.radius = 7;
      
      circle.stroke = am4core.color("#fff");
      circle.fill = am4core.color("#492e56");
     
      imageSeries.data = response['data']
        
      
  })

})
}


ngOnDestroy() {
  this.zone.runOutsideAngular(() => {
    if (this.chart) {
      this.chart.dispose();
    }
  });
}
}
