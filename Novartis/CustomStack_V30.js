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
        <div id="chartdiv"></div>
      </div>
    `
  
  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  // HTML extension with all necessary logic(s) wrtitten JS vvvvvvvvvvvv
  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  
  class NewStackV30 extends HTMLElement {
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
            script.src = 'https://armando-j-a-santos.github.io/SAPCustomWidget/Novartis/core.js'
            try {
                script.onload = () => {
                  resolve(script)
                  console.log('loaded core.js (first try)')
                }
            } catch (e) {
              
                  resolve(script)
                  console.log('loaded core.js (second try)')              
            }
            this._shadowRoot.appendChild(script)
        })
        
        // Library: charts.js
        new Promise(resolve => {
            let script = document.createElement('script')
            script.src = 'https://armando-j-a-santos.github.io/SAPCustomWidget/Novartis/charts.js'
            try {
                  await host.loadScript(script", this._shadowRoot);
                }
            } catch (e) {
                  resolve(script)
                  console.log('loaded charts.js (second try)')              
            }    
            this._shadowRoot.appendChild(script)
        })

        // Library: animated.js
        new Promise(resolve => {
            let script = document.createElement('script')
            script.src = 'https://armando-j-a-santos.github.io/SAPCustomWidget/Novartis/animated.js'
            try {
                script.onload = () => {  
                  resolve(script)
                  console.log('loaded animated.js (first try)')
                }
            } catch (e) {
                  resolve(script)
                  console.log('loaded animated.js (second try)')              
            }                
            this._shadowRoot.appendChild(script)
        })
    }
    
    loadScript(src, shadowRoot) {
            return new Promise(function(resolve, reject) {
                let script = document.createElement('script');
                script.src = src;
                script.onload = () => {
                    console.log("Load: " + src);
                    resolve(script);
                };
                script.onerror = () => reject(new Error(`Script load error for ${src}`));
                //shadowRoot.appendChild(script);
            });
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
      
     // loadLibraries();
      
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////     
      var mychartdiv = this._shadowRoot.getElementById('chartdiv')
      //console.log(mychartdiv) 
        
        //***

        am4core.ready(function() {
          
        // Themes
        /////am4core.useTheme(am4themes_animated);

        // Create chart
        var chart = am4core.create(mychartdiv, am4charts.XYChart);
        if (chart.logo)
        {
          chart.logo.disabled = true;
        }
      
        // Variables definition
        var CAct_Dark = "#0460a9";
        var CAct_Light =  "#68a0cb";

        var CNonAct_Col1_Dark = "#776644";
        var CNonAct_Col1_Light =  "#ADA38F";

        var CNonAct_Col2_Dark = "#822921";
        var CNonAct_Col2_Light =  "#B47F7A";

        var CNonAct_Col3_Dark = "#cfa6a4";
        var CNonAct_Col3_Light =  "#e2cac8";

        var Version_1 = "Actuals";
        var Version_2 = "Ago22";
        var Version_3 = "Sep22";
        var Version_4 = "Oct22";

        var AIScope_1 = "Base Jorge"; 
        var AIScope_2 = "New AI"; 
        var AIScope_3 = "HI"; 
        var AIScope_4 = "Non AI"; 



        // Add data
        chart.data = [ {
          "year": "2021",

         // "A1": 33.7,
         // "A2": 6.5,
         // "A3": 10.5,
         //"A4": 10.3,

          "B1": 30.2,
          "B2": 10,
          "B3": 0,
          "B4": 13.6,

         // "C1": 33.7,
         // "C2": 0,
         // "C3": 0,
         // "C4": 10.3,

        }, {
          "year": "2022",
          "A1": 33.7,
          "A2": 6.5,
          "A3": 10.5,
          "A4": 10.3,

          "B1": 30.2,
          "B2": 0.9,
          "B3": 0,
          "B4": 13.6,

          "C1": 33.7,
          "C2": 10,
          "C3": 0,
          "C4": 10.3,

        }, {
          "year": "2023",
          "A1": 29.2,
          "A2": 6.3,
          "A3": 3.3,
          "A4": 17.5,

          "B1": 30,
          "B2": 5.5,
          "B3": 16,
          "B4": 12.5,

          "C1": 33,
          "C2": 15,
          "C3": 0,
          "C4": 14
        }, {
          "year": "2024",
          "A1": 27.3,
          "A2": 4.6,
          "A3": 2.3,
          "A4": 13.5,

          "B1": 24,
          "B2": 14.6,
          "B3": 14.6,
          "B4": 5,

         "C1": 19,
         "C2": 3,
         "C3": 1.9,
          "C4": 7
        },{
          "year": "2025",
          "A1": 34,
          "A2": 10.5,
          "A3": 5.5,
          "A4": 5,

          "B1": 25.8,
          "B2": 7,
          "B3": 10,
          "B4": 7.7,

          "C1": 19.9,
          "C2": 4.3,
          "C3": 2.5,
          "C4": 9
        } ];

        // Create X axes (and customize it)
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "year";
        categoryAxis.fontFamily = "Arial";
        categoryAxis.fontSize = 14;

        //Comment/Uncomment Show/Hide Grid
        categoryAxis.renderer.grid.template.opacity = 0; 

        categoryAxis.renderer.minGridDistance = 20;

        //Star and End Location for columns (of each year)
        categoryAxis.renderer.cellStartLocation = 0.1;
        categoryAxis.renderer.cellEndLocation = 0.9;


        // Create Y axes (and customize it)
        var  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.extraMax = 0.1;
        //Show/Hide Y Axis labels
        valueAxis.renderer.labels.template.disabled = true;


        //Comment/Uncomment Show/Hide Grid
        valueAxis.renderer.grid.template.opacity = 0;

        //Function to Set diferent patterns and assign them to diferent colors
        function SetPatterns(field, color){
          var pattern = new am4core.LinePattern();

          // A2; B2; C2 >> HI 
          // A3; B3; C3 >> New AI
          // A4; B$; C4 >> Non AI

          if(field === "A2" || field === "B2" || field === "C2" ){
            var pattern = new am4core.LinePattern();
            pattern.width = 10;
            pattern.height = 10;
            pattern.strokeWidth = 3;
            pattern.gap = 0.5;
            pattern.rotation = 135;
            pattern.fill =  am4core.color(color);
            pattern.stroke = am4core.color(color);


          }else if(field === "A3"|| field === "B3" || field === "C3"){
            var pattern = new am4core.LinePattern();
            pattern.width = 6;
            pattern.height = 6;
            pattern.strokeWidth = 1;
            //pattern.gap = 0.5;
            pattern.rotation = 135;
            pattern.fill =  am4core.color(color);
            pattern.stroke = am4core.color(color);
          }
          else if(field === "A4" || field === "B4" || field === "C4" ){
            var pattern = new am4core.CirclePattern();
            pattern.width = 	6;
            pattern.height = 6;
            pattern.rotation = 45;
            pattern.radius = 0.5;
            pattern.fill =  am4core.color(color);
            pattern.stroke = am4core.color(color);
          }

          return pattern;
        }

        // Create series
        function createSeries(field, name, stacked, version) {
          var series = chart.series.push(new am4charts.ColumnSeries());

          if (field==='A1') {
            series.columns.template.fill = CNonAct_Col1_Dark;
          } else if (field==='A2') {
            series.columns.template.fill = SetPatterns(field,CNonAct_Col1_Light);
          } else if (field==='A3') {
            series.columns.template.fill = SetPatterns(field,CNonAct_Col1_Light);
          }	else if (field==='A4'){
            series.columns.template.fill = SetPatterns(field,CNonAct_Col1_Light);
          } 
            else if (field==='B1') {
            series.columns.template.fill = CNonAct_Col2_Dark;
          } else if (field==='B2') {
            series.columns.template.fill = SetPatterns(field,CNonAct_Col2_Light);
          } else if (field==='B3') {
            series.columns.template.fill = SetPatterns(field,CNonAct_Col2_Light);
          }	else if (field==='B4') {
            series.columns.template.fill = SetPatterns(field,CNonAct_Col2_Light);
          }
            else if (field==='C1') {
            series.columns.template.fill = CNonAct_Col3_Dark;
          } else if (field==='C2') {
            series.columns.template.fill = SetPatterns(field,CNonAct_Col3_Light);
          } else if (field==='C3') {
            series.columns.template.fill = SetPatterns(field,CNonAct_Col3_Light);
          }	else if (field==='C4') {
            series.columns.template.fill = SetPatterns(field,CNonAct_Col3_Light);
          }

          series.dataFields.valueY = field;
          series.dataFields.categoryX = "year";
          series.name = name; 
          series.stacked = stacked;
          //Set columns width
          series.columns.template.width = am4core.percent(80);
          //Set columns border color
          series.columns.template.stroke = am4core.color("#FFFFFF");


          // Tooltip 
          series.tooltip.getFillFromObject = false;
          series.tooltip.background.fill = am4core.color("#000000");
          series.columns.template.tooltipText = `{name}: [bold]{valueY.value} [/] 
          Version: [bold]` + version;

           // Add and edit Datalabel 
          var labelBullet = series.bullets.push(new am4charts.LabelBullet());
          labelBullet.label.text = "[bold]{valueY}";
          labelBullet.label.fill = am4core.color("#000000");
          labelBullet.locationY = 0.5;  
          labelBullet.label.fontSize = 14; 
          labelBullet.fontFamily = "Arial";

          //We used below an adapter for a color exception for year === 2021
          series.columns.template.adapter.add("fill", function(fill, target) {
          if (target.dataItem && (target.dataItem.categories.categoryX === '2021')) {
            if(target.dataItem.component.dataFields.valueY === 'B2'){
              return SetPatterns("B2",CAct_Light);
            }
            else if(target.dataItem.component.dataFields.valueY === 'B3'){
              return SetPatterns("B3",CAct_Light);
            }
            else if(target.dataItem.component.dataFields.valueY === 'B4'){
              return SetPatterns("B4",CAct_Light);
            }
            else {
              //console.log(target.dataItem.component.dataFields.valueY);
              return am4core.color(CAct_Dark);
            }
          }
          else {
            return fill;
          }
        });


        }

        // First Column
        createSeries("A1", AIScope_1, true, Version_2);
        createSeries("A2", AIScope_2, true, Version_2);
        createSeries("A3", AIScope_3, true, Version_2);
        createSeries("A4", AIScope_4, true, Version_2);

        // Second Column
        createSeries("B1", AIScope_1, false, Version_3);
        createSeries("B2", AIScope_2, true, Version_3);
        createSeries("B3", AIScope_3, true, Version_3);
        createSeries("B4", AIScope_4, true, Version_3);

        // Third Column
        createSeries("C1", AIScope_1, false, Version_4);
        createSeries("C2", AIScope_2, true, Version_4);
        createSeries("C3", AIScope_3, true, Version_4);
        createSeries("C4", AIScope_4, true, Version_4);

        //Custom legend
        //// NON AI, HI, NEW AI, BASE AI
        var legendA = new am4charts.Legend();
        //To push the custom legend top
        legendA.parent = chart.topAxesContainer; 

        //Set font size and font family for the custom legend
        legendA.fontSize = 12;  
        legendA.fontFamily = "Arial";

        //Align the custom legend to the right of its container
        legendA.contentAlign = "right";

        //Custom the markers size for the custom legend
        legendA.markers.template.width = 15;
        legendA.markers.template.height = 15;

        var patternHI = SetPatterns("A2",CAct_Light);
        var patternNEWAI = SetPatterns("A3",CAct_Light);
        var patternNONAI = SetPatterns("A4",CAct_Light);

        legendA.data = [{
          "name": AIScope_1,
           "fill": CAct_Dark
        },{
          "name": AIScope_2,
          "fill":	patternHI
        }, {
          "name": AIScope_3,
          "fill": patternNEWAI
        }, {
          "name": AIScope_4,
          "fill": patternNONAI
        }];

        //Customize the markers layout for the Custom legend
        var marker = legendA.markers.template.children.getIndex(0);
        marker.strokeWidth = 2;
        marker.strokeOpacity = 1;
        marker.stroke = am4core.color("#ccc");


        //// Version 1, Version 2, Version 3, Version 4
        var legendB = new am4charts.Legend();
        //To push the custom legend top
        legendB.parent = chart.topAxesContainer; 

        //Set font size and font family for the custom legend
        legendB.fontSize = 12;  
        legendB.fontFamily = "Arial";

        //Align the custom legend to the right of its container
        legendB.contentAlign = "right";

        //Custom the markers size for the custom legend
        legendB.markers.template.width = 15;
        legendB.markers.template.height = 15;


        legendB.data = [{
          "name": Version_1,
           "fill": CAct_Dark
        },{
          "name": Version_2,
          "fill": CNonAct_Col1_Dark
        }, {
          "name": Version_3,
          "fill": CNonAct_Col2_Dark
        }, {
          "name": Version_4,
          "fill": CNonAct_Col3_Dark
        }];

        //Customize the markers layout for the Custom legend
        var marker = legendB.markers.template.children.getIndex(0);
        marker.strokeWidth = 2;
        marker.strokeOpacity = 1;
        marker.stroke = am4core.color("#ccc");

        //Timeline ScroolBar in the bottom
        chart.scrollbarX = new am4core.Scrollbar();
        //To push the TimeLine ScroolBar down
        chart.scrollbarX.parent = chart.bottomAxesContainer;


chart.appear();
//chart.appear(1000, 100);
          
          
        //***         
        }); // end am4core.ready()
        
        //***
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
      
    } // END of method --> render 
  } // END of class NewCharts
  
  
  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  // Return the end result to SAC (SAP ANALYTICS CLOUD) application vvvvvvvvvvvvvvvvvvvvv
  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  customElements.define('com-sap-sample-asantos-new-cwstackv1', NewStackV30)
  
})() // END of function --> (function () {
