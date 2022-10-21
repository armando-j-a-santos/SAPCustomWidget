(function () {
  const template = document.createElement('template')
  template.innerHTML = `
      <style>
      #root {
        background-color: white;  
      }
      #placeholder {
        padding-top: 1em;
        text-align: center;
        font-size: 1.5em;
        color: black;
      }
      
      #chartdiv {
        width: 100%;
        height: 400px;
      }
            
      </style>
      <div id="root" style="width: 100%; height: 100%;">
        <div id="my_data">
            <b>Solid Gauge.</b> 
            <br><-- Libraries --></br>
            <br>src=https://cdn.amcharts.com/lib/4/core.js</br>
            <br>src=https://cdn.amcharts.com/lib/4/charts.js</br>
            <br>src=https://cdn.amcharts.com/lib/4/themes/animated.js</br>
        </div>
        <div id="chartdiv"></div>
      </div>
    `
  
  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  // HTML extension with all necessary logic(s) wrtitten JS vvvvvvvvvvvv
  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  
  class NewStackV9 extends HTMLElement {
    constructor () {
      super()

       // Necessary statments that runs onInit (initialization) of the custom widget
      this._shadowRoot = this.attachShadow({ mode: 'open' })
      this._shadowRoot.appendChild(template.content.cloneNode(true))

      this._root = this._shadowRoot.getElementById('root')
      this._props = {}
    }
  
    //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
    onCustomWidgetAfterUpdate() {
        // Build the neceasry div tag with name: chartdiv, to be used later on the following code
        console.log("onCustomWidgetAfterUpdate")
        const div = document.createElement('div')
        div.innerHTML = '<div id="chartdiv" style="width: 100%; height: 400px;"></div>'
        this._shadowRoot.appendChild(div)
      
        // Load necessary libraries
        // Library: core.js
        new Promise(resolve => {
            let script = document.createElement('script')
            script.src = 'https://cdn.amcharts.com/lib/4/core.js'
            script.onload = () => {
              resolve(script)
              console.log('loaded core.js')
            }
            this._shadowRoot.appendChild(script)
        })
        
        // Library: charts.js
        new Promise(resolve => {
            let script = document.createElement('script')
            script.src = 'https://cdn.amcharts.com/lib/4/charts.js'
            script.onload = () => {
              resolve(script)
              console.log('loaded charts.js')
            }
            this._shadowRoot.appendChild(script)
        })

        // Library: animated.js
        new Promise(resolve => {
            let script = document.createElement('script')
            script.src = 'https://cdn.amcharts.com/lib/4/themes/animated.js'
            script.onload = () => {
              resolve(script)
              console.log('loaded animated.js')
            }
            this._shadowRoot.appendChild(script)
        })
    }

    
    // ------------------
    // Scripting methods
    // ------------------
    async render () {
      
      this._placeholder = this._root.querySelector('#placeholder')
      if (this._placeholder) {
        this._root.removeChild(this._placeholder)
        this._placeholder = null
      }
      
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////     
      var mychartdiv = this._shadowRoot.getElementById('chartdiv')
      //console.log(mychartdiv) 
        
        //***

        am4core.ready(function() {
          
        // Themes
        am4core.useTheme(am4themes_animated);

        // Create chart instance
        var chart = am4core.create(mychartdiv , am4charts.RadarChart);

        // Add data
        chart.data = [{
          "category": "Research",
          "value": 80,
          "full": 100
        }, {
          "category": "Marketing",
          "value": 35,
          "full": 100
        }, {
          "category": "Distribution",
          "value": 92,
          "full": 100
        }, {
          "category": "Human Resources",
          "value": 68,
          "full": 100
        }];

        // Make chart not full circle
        chart.startAngle = -90;
        chart.endAngle = 180;
        chart.innerRadius = am4core.percent(20);

        // Set number format
        chart.numberFormatter.numberFormat = "#.#'%'";

        // Create axes
        var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "category";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.grid.template.strokeOpacity = 0;
        categoryAxis.renderer.labels.template.horizontalCenter = "right";
        categoryAxis.renderer.labels.template.fontWeight = 500;
        categoryAxis.renderer.labels.template.adapter.add("fill", function(fill, target) {
          return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
        });
        categoryAxis.renderer.minGridDistance = 10;

        var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.grid.template.strokeOpacity = 0;
        valueAxis.min = 0;
        valueAxis.max = 100;
        valueAxis.strictMinMax = true;

        // Create series
        var series1 = chart.series.push(new am4charts.RadarColumnSeries());
        series1.dataFields.valueX = "full";
        series1.dataFields.categoryY = "category";
        series1.clustered = false;
        series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
        series1.columns.template.fillOpacity = 0.08;
        series1.columns.template.cornerRadiusTopLeft = 20;
        series1.columns.template.strokeWidth = 0;
        series1.columns.template.radarColumn.cornerRadius = 20;

        var series2 = chart.series.push(new am4charts.RadarColumnSeries());
        series2.dataFields.valueX = "value";
        series2.dataFields.categoryY = "category";
        series2.clustered = false;
        series2.columns.template.strokeWidth = 0;
        series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
        series2.columns.template.radarColumn.cornerRadius = 20;

        series2.columns.template.adapter.add("fill", function(fill, target) {
          return chart.colors.getIndex(target.dataItem.index);
        });

        // Add cursor
        chart.cursor = new am4charts.RadarCursor();          
         
        }); // end am4core.ready()
        
        //***
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
      
    } // END of method --> render 
  } // END of class NewCharts
  
  
  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  // Return the end result to SAC (SAP ANALYTICS CLOUD) application vvvvvvvvvvvvvvvvvvvvv
  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  customElements.define('com-sap-sample-asantos-new-cwstackv1', NewStackV9)
  
})() // END of function --> (function () {
