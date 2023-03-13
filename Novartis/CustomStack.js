(function() {
    const template = document.createElement('template')
    template.innerHTML = `
    <style>
    html,body
    {
        height: 100%;
        margin: 0;
    }
    
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
        height: 98%;
        
        /* To make the chart widget RESPONSIBLE */
        flex-direction: column;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
    }
          
    </style>
    <div id="root" style="width: 100%; height: 100%;">
      <div id="chartdiv"></div>
    </div>
  `

    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // HTML extension with all necessary logic(s) wrtitten JS vvvvvvvvvvvv
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  
    class NewStackV127 extends HTMLElement {
        constructor() {
            super()

            // Necessary statments that runs onInit (initialization) of the custom widget
            this._shadowRoot = this.attachShadow({
                mode: 'open'
            })
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
            // Library: core.js & charts.js
            new Promise(resolve => {
                let script = document.createElement('script')
                script.src = 'https://cdn.amcharts.com/lib/4/core.js'
                script.onload = () => {
                    resolve(script)
                    console.log('loaded core.js')
                }
                this._shadowRoot.appendChild(script)

                // ###########################################################################################################
                // NOTE:
                // To avoid error: am4internal_webpackJsonp is not defined.
                // The issue is due to the fact that the library charts.js is being loaded first than the libray core.js and
                // core.js NEEDS to be loaded in first place ALWAYS.
                // So, the workaround is to load first core.js and after create a a timeout (like a Timer in SAC) that
                // waits 1 second and only after that loads the second libarary needed charts.js.
                // ###########################################################################################################

                let delay = 1000; // delay 1 second
                let timer = null; // Will hold a reference to the timer
                let script1 = document.createElement('script')
                timer = setTimeout(function() {
                    script1.src = 'https://cdn.amcharts.com/lib/4/charts.js'
                    script1.onload = () => {
                        resolve(script1)
                        console.log('loaded charts.js')
                    }
                }, delay);
                this._shadowRoot.appendChild(script1)
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
        async setConfigChart(resultSet, newJSONSets) {

            this._placeholder = this._root.querySelector('#placeholder')
            if (this._placeholder) {
                this._root.removeChild(this._placeholder)
                this._placeholder = null
            }

            var mychartdiv = this._shadowRoot.getElementById('chartdiv')
            //console.log(mychartdiv) 

            //console.log('newJSONSets:')
            //console.log(newJSONSets)     

            am4core.ready(function() {


                var chartConfigurations = JSON.parse(newJSONSets);
                console.log(chartConfigurations.CAct_Dark);

                // Themes
                /////am4core.useTheme(am4themes_animated);

                // Create chart
                var chart = am4core.create(mychartdiv, am4charts.XYChart);
                if (chart.logo) {
                    chart.logo.disabled = true;
                }

                // Variables definition
                var CAct_Dark = String(chartConfigurations.CAct_Dark);
                var CAct_Light = String(chartConfigurations.CAct_Light);

                var CNonAct_Col1_Dark = String(chartConfigurations.CNonAct_Col1_Dark);
                var CNonAct_Col1_Light = String(chartConfigurations.CNonAct_Col1_Light);

                var CNonAct_Col2_Dark = String(chartConfigurations.CNonAct_Col2_Dark);
                var CNonAct_Col2_Light = String(chartConfigurations.CNonAct_Col2_Light);

                var CNonAct_Col3_Dark = String(chartConfigurations.CNonAct_Col3_Dark);
                var CNonAct_Col3_Light = String(chartConfigurations.CNonAct_Col3_Light);

                var CNonAct_Col4_Dark = String(chartConfigurations.CNonAct_Col4_Dark);
                var CNonAct_Col4_Light = String(chartConfigurations.CNonAct_Col4_Light);

                var Version_1 = String(chartConfigurations.Version_1);
                var Version_2 = String(chartConfigurations.Version_2);
                var Version_3 = String(chartConfigurations.Version_3);
                var Version_4 = String(chartConfigurations.Version_4);
                var Version_5 = String(chartConfigurations.Version_5);

                var AIScope_1 = String(chartConfigurations.AIScope_1);
                var AIScope_2 = String(chartConfigurations.AIScope_2);
                var AIScope_3 = String(chartConfigurations.AIScope_3);
                var AIScope_4 = String(chartConfigurations.AIScope_4);

                var AIScope_color = String(chartConfigurations.AIScope_color);
                var Scale = String(chartConfigurations.Scale);
                var BaseLabelColorExc = String(chartConfigurations.BaseLabelColorExc);
                var NumVersions = Number(String(chartConfigurations.NumVersions));

                var ShowStackedTotals = String(chartConfigurations.ShowStackedTotals);
                var MinValue = Number(String(chartConfigurations.MinValue));
                var DataLabelsFontSize = Number(String(chartConfigurations.DataLabelsFontSize));
                var TotalsDataLabelsFontSize = Number(String(chartConfigurations.TotalsDataLabelsFontSize));
                var TotalsBackgroundColor = String(chartConfigurations.TotalsBackgroundColor);
                               
                var NumYears = Number(chartConfigurations.NumYears);  // NumYears = 2 || 3 || 4
                var ScrollbarXHeight = Number(chartConfigurations.ScrollbarXHeight);  
                var LegendRightPadding = Number(chartConfigurations.LegendRightPadding);  
                var YaxisMaxValue = Number(chartConfigurations.YaxisMaxValue);  
                var YAxisTitle = String(chartConfigurations.YAxisTitle);
                var EnabledActuals = String(chartConfigurations.EnabledActuals);

                
                var CYy = Number(String(chartConfigurations.CYy));

                var CY_Minus1y = String(CYy - 1);
                var CY_Plus1y = String(CYy + 1);
                var CY_Plus2y = String(CYy + 2);
                var CY_Plus3y = String(CYy + 3);
                CYy = String(CYy);

                let CY_Minus1 = {};

                console.log("EnabledActuals CW trigger:");
                console.log(EnabledActuals);
                
                if(EnabledActuals === "true"){
                    // Previous Year column defintion
                    if (NumVersions === 0 || NumVersions === 1 || NumVersions === 2) {
                        CY_Minus1 = {
                            "year": CY_Minus1y,

                            "A1": undefined,
                            "A2": undefined,
                            "A3": undefined,
                            "A4": undefined,
                            "none": 0
                        }
                    } else if (NumVersions === 3 || NumVersions === 4) {
                        CY_Minus1 = {
                            "year": CY_Minus1y,

                            "B1": undefined,
                            "B2": undefined,
                            "B3": undefined,
                            "B4": undefined,
                            "none": 0
                        }
                    }
                }

                // Strutures definition for CY, CY+1, CY+2, CY+3
                const CY = {
                    year: CYy,
                    A1: undefined,
                    A2: undefined,
                    A3: undefined,
                    A4: undefined,

                    B1: undefined,
                    B2: undefined,
                    B3: undefined,
                    B4: undefined,

                    C1: undefined,
                    C2: undefined,
                    C3: undefined,
                    C4: undefined,

                    D1: undefined,
                    D2: undefined,
                    D3: undefined,
                    D4: undefined,
                    none: 0
                };

                const CY_Plus1 = {
                    year: CY_Plus1y,
                    A1: undefined,
                    A2: undefined,
                    A3: undefined,
                    A4: undefined,

                    B1: undefined,
                    B2: undefined,
                    B3: undefined,
                    B4: undefined,

                    C1: undefined,
                    C2: undefined,
                    C3: undefined,
                    C4: undefined,

                    D1: undefined,
                    D2: undefined,
                    D3: undefined,
                    D4: undefined,
                    none: 0
                };

                const CY_Plus2 = {
                    year: CY_Plus2y,
                    A1: undefined,
                    A2: undefined,
                    A3: undefined,
                    A4: undefined,

                    B1: undefined,
                    B2: undefined,
                    B3: undefined,
                    B4: undefined,

                    C1: undefined,
                    C2: undefined,
                    C3: undefined,
                    C4: undefined,

                    D1: undefined,
                    D2: undefined,
                    D3: undefined,
                    D4: undefined,
                    none: 0
                };

                const CY_Plus3 = {
                    year: CY_Plus3y,
                    A1: undefined,
                    A2: undefined,
                    A3: undefined,
                    A4: undefined,

                    B1: undefined,
                    B2: undefined,
                    B3: undefined,
                    B4: undefined,

                    C1: undefined,
                    C2: undefined,
                    C3: undefined,
                    C4: undefined,

                    D1: undefined,
                    D2: undefined,
                    D3: undefined,
                    D4: undefined,
                    none: 0
                };


                // Loop trhough the resultset received from SAC side
                resultSet.forEach(dp => {
                    //console.log(dp)

                    if (dp["TIME.YEAR"].id === CYy) {

                        ////////////////////////////////////////////
                        //Column 2021  (Blue Column)
                        //CW --> Version Actuals
                        //Actuals
                        ////////////////////////////////////////////
                        if (NumVersions === 3 || NumVersions === 4) {
                            if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_Act_AI_Only]") {
                                CY_Minus1.B1 = dp["@MeasureDimension"].formattedValue;
                            }
                            if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_Act_New_AI]") {
                                CY_Minus1.B2 = dp["@MeasureDimension"].formattedValue;
                            }
                            if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_Act_AI_Drivers]") {
                                CY_Minus1.B3 = dp["@MeasureDimension"].formattedValue;
                            }
                            if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_Act_Non_AI]") {
                                CY_Minus1.B4 = dp["@MeasureDimension"].formattedValue;
                            }
                        } else if (NumVersions === 0 || NumVersions === 1 || NumVersions === 2) {
                            if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_Act_AI_Only]") {
                                CY_Minus1.A1 = dp["@MeasureDimension"].formattedValue;
                            }
                            if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_Act_New_AI]") {
                                CY_Minus1.A2 = dp["@MeasureDimension"].formattedValue;
                            }
                            if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_Act_AI_Drivers]") {
                                CY_Minus1.A3 = dp["@MeasureDimension"].formattedValue;
                            }
                            if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_Act_Non_AI]") {
                                CY_Minus1.A4 = dp["@MeasureDimension"].formattedValue;
                            }
                        }

                        ////////////////////////////////////////////
                        //Column 1 
                        //CW --> Version_2
                        //Model Variable --> Selected_Version_1 
                        ////////////////////////////////////////////

                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C1_AI_Only]") {
                            CY.A1 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C1_New_AI]") {
                            CY.A2 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C1_AI_Drivers]") {
                            CY.A3 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C1_Non_AI]") {
                            CY.A4 = dp["@MeasureDimension"].formattedValue;
                        }

                        ////////////////////////////////////////////
                        //Column 2 
                        //CW --> Version_3
                        //Model Variable --> Selected_Version_2 
                        ////////////////////////////////////////////

                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C2_AI_Only]") {
                            CY.B1 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C2_New_AI]") {
                            CY.B2 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C2_AI_Drivers]") {
                            CY.B3 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C2_Non_AI]") {
                            CY.B4 = dp["@MeasureDimension"].formattedValue;
                        }

                        ////////////////////////////////////////////
                        //Column 3 
                        //CW --> Version_4
                        //Model Variable --> Selected_Version_3 
                        ////////////////////////////////////////////

                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C3_AI_Only]") {
                            CY.C1 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C3_New_AI]") {
                            CY.C2 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C3_AI_Drivers]") {
                            CY.C3 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C3_Non_AI]") {
                            CY.C4 = dp["@MeasureDimension"].formattedValue;
                        }

                        ////////////////////////////////////////////
                        //Column 4 
                        //CW --> Version_5
                        //Model Variable --> Selected_Version_5 
                        ////////////////////////////////////////////

                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C4_AI_Only]") {
                            CY.D1 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C4_New_AI]") {
                            CY.D2 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C4_AI_Drivers]") {
                            CY.D3 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C4_Non_AI]") {
                            CY.D4 = dp["@MeasureDimension"].formattedValue;
                        }
                    }

                    if (dp["TIME.YEAR"].id === CY_Plus1y) {

                        ////////////////////////////////////////////
                        //Column 1 
                        //CW --> Version_2
                        //Model Variable --> Selected_Version_1 
                        ////////////////////////////////////////////

                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C1_AI_Only]") {
                            CY_Plus1.A1 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C1_New_AI]") {
                            CY_Plus1.A2 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C1_AI_Drivers]") {
                            CY_Plus1.A3 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C1_Non_AI]") {
                            CY_Plus1.A4 = dp["@MeasureDimension"].formattedValue;
                        }

                        ////////////////////////////////////////////
                        //Column 2 
                        //CW --> Version_3
                        //Model Variable --> Selected_Version_2 
                        ////////////////////////////////////////////

                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C2_AI_Only]") {
                            CY_Plus1.B1 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C2_New_AI]") {
                            CY_Plus1.B2 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C2_AI_Drivers]") {
                            CY_Plus1.B3 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C2_Non_AI]") {
                            CY_Plus1.B4 = dp["@MeasureDimension"].formattedValue;
                        }

                        ////////////////////////////////////////////
                        //Column 3 
                        //CW --> Version_4
                        //Model Variable --> Selected_Version_3 
                        ////////////////////////////////////////////

                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C3_AI_Only]") {
                            CY_Plus1.C1 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C3_New_AI]") {
                            CY_Plus1.C2 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C3_AI_Drivers]") {
                            CY_Plus1.C3 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C3_Non_AI]") {
                            CY_Plus1.C4 = dp["@MeasureDimension"].formattedValue;
                        }

                        ////////////////////////////////////////////
                        //Column 4 
                        //CW --> Version_5
                        //Model Variable --> Selected_Version_4 
                        ////////////////////////////////////////////

                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C4_AI_Only]") {
                            CY_Plus1.D1 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C4_New_AI]") {
                            CY_Plus1.D2 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C4_AI_Drivers]") {
                            CY_Plus1.D3 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C4_Non_AI]") {
                            CY_Plus1.D4 = dp["@MeasureDimension"].formattedValue;
                        }
                    }

                    if (dp["TIME.YEAR"].id === CY_Plus2y) {

                        ////////////////////////////////////////////
                        //Column 1 
                        //CW --> Version_2
                        //Model Variable --> Selected_Version_1 
                        ////////////////////////////////////////////

                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C1_AI_Only]") {
                            CY_Plus2.A1 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C1_New_AI]") {
                            CY_Plus2.A2 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C1_AI_Drivers]") {
                            CY_Plus2.A3 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C1_Non_AI]") {
                            CY_Plus2.A4 = dp["@MeasureDimension"].formattedValue;
                        }

                        ////////////////////////////////////////////
                        //Column 2 
                        //CW --> Version_3
                        //Model Variable --> Selected_Version_2 
                        ////////////////////////////////////////////

                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C2_AI_Only]") {
                            CY_Plus2.B1 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C2_New_AI]") {
                            CY_Plus2.B2 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C2_AI_Drivers]") {
                            CY_Plus2.B3 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C2_Non_AI]") {
                            CY_Plus2.B4 = dp["@MeasureDimension"].formattedValue;
                        }

                        ////////////////////////////////////////////
                        //Column 3 
                        //CW --> Version_4
                        //Model Variable --> Selected_Version_3 
                        ////////////////////////////////////////////

                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C3_AI_Only]") {
                            CY_Plus2.C1 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C3_New_AI]") {
                            CY_Plus2.C2 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C3_AI_Drivers]") {
                            CY_Plus2.C3 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C3_Non_AI]") {
                            CY_Plus2.C4 = dp["@MeasureDimension"].formattedValue;
                        }

                        ////////////////////////////////////////////
                        //Column 4 
                        //CW --> Version_5
                        //Model Variable --> Selected_Version_4 
                        ////////////////////////////////////////////

                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C4_AI_Only]") {
                            CY_Plus2.D1 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C4_New_AI]") {
                            CY_Plus2.D2 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C4_AI_Drivers]") {
                            CY_Plus2.D3 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C4_Non_AI]") {
                            CY_Plus2.D4 = dp["@MeasureDimension"].formattedValue;
                        }
                    }

                    if (dp["TIME.YEAR"].id === CY_Plus3y) {

                        ////////////////////////////////////////////
                        //Column 1 
                        //CW --> Version_2
                        //Model Variable --> Selected_Version_1 
                        ////////////////////////////////////////////

                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C1_AI_Only]") {
                            CY_Plus3.A1 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C1_New_AI]") {
                            CY_Plus3.A2 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C1_AI_Drivers]") {
                            CY_Plus3.A3 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C1_Non_AI]") {
                            CY_Plus3.A4 = dp["@MeasureDimension"].formattedValue;
                        }

                        ////////////////////////////////////////////
                        //Column 2 
                        //CW --> Version_3
                        //Model Variable --> Selected_Version_2 
                        ////////////////////////////////////////////

                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C2_AI_Only]") {
                            CY_Plus3.B1 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C2_New_AI]") {
                            CY_Plus3.B2 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C2_AI_Drivers]") {
                            CY_Plus3.B3 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C2_Non_AI]") {
                            CY_Plus3.B4 = dp["@MeasureDimension"].formattedValue;
                        }

                        ////////////////////////////////////////////
                        //Column 3 
                        //CW --> Version_4
                        //Model Variable --> Selected_Version_3 
                        ////////////////////////////////////////////

                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C3_AI_Only]") {
                            CY_Plus3.C1 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C3_New_AI]") {
                            CY_Plus3.C2 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C3_AI_Drivers]") {
                            CY_Plus3.C3 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C3_Non_AI]") {
                            CY_Plus3.C4 = dp["@MeasureDimension"].formattedValue;
                        }

                        ////////////////////////////////////////////
                        //Column 4 
                        //CW --> Version_5
                        //Model Variable --> Selected_Version_4 
                        ////////////////////////////////////////////

                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C4_AI_Only]") {
                            CY_Plus3.D1 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C4_New_AI]") {
                            CY_Plus3.D2 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C4_AI_Drivers]") {
                            CY_Plus3.D3 = dp["@MeasureDimension"].formattedValue;
                        }
                        if (dp["@MeasureDimension"].id === "[OG_ACCOUNT].[parentId].&[NEW_Stacked_C4_Non_AI]") {
                            CY_Plus3.D4 = dp["@MeasureDimension"].formattedValue;
                        }
                    }

                })

                ////// Custom Widget columns data sintax sample:
                //Version_2		Version_3	Version_4  Version_5
                // A4; 			B4; 		C4 		    D4             >> Non AI
                // A3; 			B3; 		C3 		    D3             >> HI	(AI Drivers)
                // A2;			B2; 		C2		    D2             >> Ñew AI
                // A1; 			B1; 		C1 		    D2             >> Base AI  (AI Only)


                ////// Custom widget Chart.data sintax sample:
                //[
                //{year:"2021", "B1": 30.2, "B2": 10, "B3":13.6}
                //{year:"2022", "A1": 24.2, "A2": 13, "A3":13.4, "B1": 30.2, "B2": 10, "B3":13.6, "C1": 30.2, "C2": 10, "C3":13.6}
                //{year:"2023", "A1": 24.2, "A2": 13, "A3":13.4, "B1": 30.2, "B2": 10, "B3":13.6, "C1": 30.2, "C2": 10, "C3":13.6}
                //{year:"2024", "A1": 24.2, "A2": 13, "A3":13.4, "B1": 30.2, "B2": 10, "B3":13.6, "C1": 30.2, "C2": 10, "C3":13.6}
                //{year:"2025", "A1": 24.2, "A2": 13, "A3":13.4, "B1": 30.2, "B2": 10, "B3":13.6, "C1": 30.2, "C2": 10, "C3":13.6}
                //]

            
                //TEST GETTING MAX VALUE
                var YMaxValue = 0;
                var temp = 0;
                ///////////////
                //////CY
                ///////////////

                ///
                //Actual
                ///
                temp = CY_Minus1.B1 + CY_Minus1.B2 + CY_Minus1.B3 + CY_Minus1.B4;

                if(YMaxValue < temp){
                    YMaxValue = temp; 
                }

                temp = CY_Minus1.A1 + CY_Minus1.A2 + CY_Minus1.A3 + CY_Minus1.A4;

                if(YMaxValue < temp){
                    YMaxValue = temp; 
                }


                ///
                //Non-Actual
                ///

                temp = CY.A1 + CY.A2 + CY.A3 + CY.A4;

                if(YMaxValue < temp){
                    YMaxValue = temp; 
                }

                temp = CY.B1 + CY.B2 + CY.B3 + CY.B4;
 
                if(YMaxValue < temp){
                    YMaxValue = temp; 
                }

                temp = CY.C1 + CY.C2 + CY.C3 + CY.C4;

                if(YMaxValue < temp){
                    YMaxValue = temp; 
                }

                temp = CY.D1 + CY.D2 + CY.D3 + CY.D4;

                if(YMaxValue < temp){
                    YMaxValue = temp; 
                }

                ///////////////
                ////// CY + 1
                ///////////////

                ///
                //Non-Actual
                ///

                temp = CY_Plus1.A1 + CY_Plus1.A2 + CY_Plus1.A3 + CY_Plus1.A4;

                if(YMaxValue < temp){
                    YMaxValue = temp; 
                }

                temp = CY_Plus1.B1 + CY_Plus1.B2 + CY_Plus1.B3 + CY_Plus1.B4;

                if(YMaxValue < temp){
                    YMaxValue = temp; 
                }

                temp = CY_Plus1.C1 + CY_Plus1.C2 + CY_Plus1.C3 + CY_Plus1.C4;

                if(YMaxValue < temp){
                    YMaxValue = temp; 
                }

                temp = CY_Plus1.D1 + CY_Plus1.D2 + CY_Plus1.D3 + CY_Plus1.D4;

                
                if(YMaxValue < temp){
                    YMaxValue = temp; 
                }
                
                console.log("CY_Plus1.A1");
                console.log(Number(CY_Plus1.A1));

                console.log("CY_Plus1.A2");
                console.log(Number(CY_Plus1.A2));

                console.log("CY_Plus1.A1 + CY_Plus1.A2 ");
                console.log(Number(CY_Plus1.A1) + Number(CY_Plus1.A2));

                  
                console.log("TEST");
                console.log("YMaxValue");
                console.log(YMaxValue);
                

                // Data array definition
                chart.data = [];

                // Data array feed
                
                if(NumYears === 4){
                    if(EnabledActuals === "true"){
                        
                        chart.data.push(CY_Minus1);
                    }
                    
                    chart.data.push(CY);
                    chart.data.push(CY_Plus1);
                    chart.data.push(CY_Plus2);
                    chart.data.push(CY_Plus3);
                }else if(NumYears === 3){
                    if(EnabledActuals === "true"){                    
                        chart.data.push(CY_Minus1);
                    }                   
                    chart.data.push(CY);
                    chart.data.push(CY_Plus1);
                    chart.data.push(CY_Plus2);
                }else{
                    if(EnabledActuals === "true"){
                        
                        chart.data.push(CY_Minus1);
                    }
                    
                    chart.data.push(CY);
                    chart.data.push(CY_Plus1);
                }
                
               

                //console.log("*******FINAL CHART DAATA******");
                //console.log(chart.data);

                // Create X axes (and customize it)
                var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "year";
                categoryAxis.fontFamily = "Arial";
                categoryAxis.fontSize = 14;

                //Show/Hide Grid
                categoryAxis.renderer.grid.template.disabled = true;

                //Hide X axis line
                categoryAxis.renderer.line.strokeOpacity = 1;
                categoryAxis.renderer.line.stroke = am4core.color("#ffffff");

                //Star and End Location for columns (of each year)
                categoryAxis.renderer.cellStartLocation = 0.1;
                categoryAxis.renderer.cellEndLocation = 0.9;

                //Set the cursor to pointer over the categoryAxis values (2021,2022,2023,2024)
                categoryAxis.renderer.labels.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;

                //Filter Year
                categoryAxis.renderer.labels.template.events.on("hit", function(ev) {
                    //Return the selected year value (2021,2022,2023,2024)
                    //console.log(ev.target.dataItem.properties.category);
                    //Return the selected year index (1,2,3,4)
                    //console.log(categoryAxis.categoryToIndex(ev.target.dataItem.properties.category));


                    var start = categoryAxis.categoryToIndex(ev.target.dataItem.properties.category);
                    var end = categoryAxis.categoryToIndex(ev.target.dataItem.properties.category) + 1;

                    categoryAxis.zoomToIndexes(start, end);
                });

                 /////
                //Axis to display totals for the first column
                /////
                // Create Y axes (and customize it)
                var valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis1.min = 0;
                valueAxis1.max = YaxisMaxValue;

                valueAxis1.fontFamily = "Arial";
                valueAxis1.fontSize = 14;

                //Enable total calculation
                valueAxis1.calculateTotals = ShowStackedTotals;

                //Show/Hide Y Axis labels
                valueAxis1.renderer.labels.template.disabled = false;

                //Show/Hide Grid
                valueAxis1.renderer.grid.template.disabled = false;

                //Set Grid Color/Opacity/Strokewidth
                valueAxis1.renderer.grid.template.strokeOpacity = 1;
                valueAxis1.renderer.grid.template.stroke = am4core.color("#E0E0E0");
                valueAxis1.renderer.grid.template.strokeWidth = 0.5;
                
                // Set up axis title
                valueAxis1.title.text = YAxisTitle;

                /////
                //Another axis to display totals for the second column
                /////
                // Create Y axes (and customize it)
                var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis2.min = 0;
                valueAxis2.max = YaxisMaxValue;
                //Enable total calculation
                valueAxis2.calculateTotals = ShowStackedTotals;

                //Show/Hide Y Axis labels
                valueAxis2.renderer.labels.template.disabled = true;

                //Show/Hide Grid
                valueAxis2.renderer.grid.template.disabled = true;
                
                /////
                //Another axis to display totals for the third column
                /////
                // Create Y axes (and customize it)
                var valueAxis3 = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis3.min = 0;
                valueAxis3.max = YaxisMaxValue;
                //Enable total calculation
                valueAxis3.calculateTotals = ShowStackedTotals;

                //Show/Hide Y Axis labels
                valueAxis3.renderer.labels.template.disabled = true;

                //Show/Hide Grid
                valueAxis3.renderer.grid.template.disabled = true;

                /////
                //Another axis to display totals for the fourth column
                /////
                // Create Y axes (and customize it)
                var valueAxis4 = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis4.min = 0;
                valueAxis4.max = YaxisMaxValue;
                //Enable total calculation
                valueAxis4.calculateTotals = ShowStackedTotals;

                //Show/Hide Y Axis labels
                valueAxis4.renderer.labels.template.disabled = true;

                //Show/Hide Grid
                valueAxis4.renderer.grid.template.disabled = true;


                //Function to Set diferent patterns and assign them to diferent colors
                function SetPatterns(field, color) {
                    var pattern = new am4core.LinePattern();

                    // A1; B1; C1 >> Base AI 
                    // A2; B2; C2 >> New AI 
                    // A3; B3; C3 >> HI 
                    // A4; B4; C4 >> Non AI

                    if (field === "A2" || field === "B2" || field === "C2" || field === "D2") {
                        var pattern = new am4core.LinePattern();
                        pattern.width = 10;
                        pattern.height = 10;
                        pattern.strokeWidth = 3;
                        pattern.gap = 0.5;
                        pattern.rotation = 135;
                        pattern.fill = am4core.color(color);
                        pattern.stroke = am4core.color(color);
                    } else if (field === "A3" || field === "B3" || field === "C3" || field === "D3") {
                        var pattern = new am4core.LinePattern();
                        pattern.width = 6;
                        pattern.height = 6;
                        pattern.strokeWidth = 1;
                        //pattern.gap = 0.5;
                        pattern.rotation = 135;
                        pattern.fill = am4core.color(color);
                        pattern.stroke = am4core.color(color);
                    } else if (field === "A4" || field === "B4" || field === "C4" || field === "D4") {
                        var pattern = new am4core.CirclePattern();
                        pattern.width = 6;
                        pattern.height = 6;
                        pattern.rotation = 45;
                        pattern.radius = 0.5;
                        pattern.fill = am4core.color(color);
                        pattern.stroke = am4core.color(color);
                    }

                    return pattern;
                }



                // Create series
                function createSeries(field, name, stacked, version, yAxes) {
                    var valueAxis;
                    if (yAxes === 1) {
                        valueAxis = valueAxis1;
                    }

                    if (yAxes === 2) {
                        valueAxis = valueAxis2;
                    }

                    if (yAxes === 3) {
                        valueAxis = valueAxis3;
                    }

                    if (yAxes === 4) {
                        valueAxis = valueAxis4;
                    }

                    var series = chart.series.push(new am4charts.ColumnSeries());

                    if (field === 'A1') {
                        series.columns.template.fill = CNonAct_Col1_Dark;
                    } else if (field === 'A2') {
                        series.columns.template.fill = SetPatterns(field, CNonAct_Col1_Light);
                    } else if (field === 'A3') {
                        series.columns.template.fill = SetPatterns(field, CNonAct_Col1_Light);
                    } else if (field === 'A4') {
                        series.columns.template.fill = SetPatterns(field, CNonAct_Col1_Light);
                    } else if (field === 'B1') {
                        series.columns.template.fill = CNonAct_Col2_Dark;
                    } else if (field === 'B2') {
                        series.columns.template.fill = SetPatterns(field, CNonAct_Col2_Light);
                    } else if (field === 'B3') {
                        series.columns.template.fill = SetPatterns(field, CNonAct_Col2_Light);
                    } else if (field === 'B4') {
                        series.columns.template.fill = SetPatterns(field, CNonAct_Col2_Light);
                    } else if (field === 'C1') {
                        series.columns.template.fill = CNonAct_Col3_Dark;
                    } else if (field === 'C2') {
                        series.columns.template.fill = SetPatterns(field, CNonAct_Col3_Light);
                    } else if (field === 'C3') {
                        series.columns.template.fill = SetPatterns(field, CNonAct_Col3_Light);
                    } else if (field === 'C4') {
                        series.columns.template.fill = SetPatterns(field, CNonAct_Col3_Light);
                    } else if (field === 'D1') {
                        series.columns.template.fill = CNonAct_Col4_Dark;
                    } else if (field === 'D2') {
                        series.columns.template.fill = SetPatterns(field, CNonAct_Col4_Light);
                    } else if (field === 'D3') {
                        series.columns.template.fill = SetPatterns(field, CNonAct_Col4_Light);
                    } else if (field === 'D4') {
                        series.columns.template.fill = SetPatterns(field, CNonAct_Col4_Light);
                    }

                    series.dataFields.valueY = field;
                    series.dataFields.categoryX = "year";
                    series.name = name;
                    series.stacked = stacked;
                    series.yAxis = valueAxis;

                    //Set columns width
                    if (NumVersions === 0 || NumVersions === 1) {
                        series.columns.template.width = am4core.percent(20);
                    } else if (NumVersions === 2) {
                        series.columns.template.width = am4core.percent(40);
                    } else if (NumVersions === 3 || NumVersions === 4) {
                        series.columns.template.width = am4core.percent(60);
                    }

                    //Set columns border color
                    series.columns.template.stroke = am4core.color("#FFFFFF");

                    // Tooltip 
                    series.tooltip.getFillFromObject = false;
                    series.tooltip.background.fill = am4core.color("#F3F3F3");
                    series.tooltip.label.fill = am4core.color("#000000");
                    series.tooltip.label.fontSize = 12;
                    series.tooltip.fontFamily = "Arial";
                    series.columns.template.tooltipText = `{name}: [bold]{valueY.value} ` + Scale + ` [/] 
        Version: [bold]` + version;

                    // Add and edit Datalabel 
                    var labelBullet = series.bullets.push(new am4charts.LabelBullet());
                    labelBullet.label.text = "[bold]{valueY}";
                    labelBullet.label.fill = am4core.color("#000000");
                    labelBullet.locationY = 0.5;
                    labelBullet.label.fontSize = DataLabelsFontSize;
                    labelBullet.fontFamily = "Arial";

                    //We used below an adapter for a data labels color exception in the Base        
                    labelBullet.label.adapter.add("fill", function(fill, target) {
                        if (target.dataItem && (
                                target.dataItem.component.dataFields.valueY === 'A1' ||
                                target.dataItem.component.dataFields.valueY === 'B1' ||
                                target.dataItem.component.dataFields.valueY === 'C1' ||
                                target.dataItem.component.dataFields.valueY === 'D1'
                            )) {
                            return am4core.color(BaseLabelColorExc);
                        } else {
                            return fill;
                        }
                    });

                    //Hide label when less than MinValue
                    labelBullet.label.adapter.add("text", function(text, target) {
                        if (target.dataItem && target.dataItem.values.valueY.value < MinValue) {
                            return "";
                        }
                        return text;
                    })

                    if(EnabledActuals === "true"){
                        //Logic to ajust the 2021 (Cy-1) colum in the center
                        if (NumVersions === 2) {

                            //We used below an adapter to ajust the column position for the year 2021  (Cy-1)
                            series.columns.template.adapter.add("dx", function(dx, target) {
                                if (target.dataItem && target.dataItem.index === 0) {
                                    return dx + target.pixelWidth + 15;
                                } else {
                                    return dx;
                                }
                            });

                            labelBullet.adapter.add("dx", function(dx, target) {
                                if (target.dataItem && target.dataItem.categories.categoryX === CY_Minus1y) {
                                    return dx + target.dataItem.column.realWidth + 15;
                                } else {
                                    return dx;
                                }
                            })
                        } else if (NumVersions === 4) {

                            //We used below an adapter to ajust the column position for the year 2021 (Cy-1)
                            series.columns.template.adapter.add("dx", function(dx, target) {
                                if (target.dataItem && target.dataItem.index === 0) {
                                    return dx + target.pixelWidth + 5;
                                } else {
                                    return dx;
                                }
                            });

                            labelBullet.adapter.add("dx", function(dx, target) {
                                if (target.dataItem && target.dataItem.categories.categoryX === CY_Minus1y) {
                                    return dx + target.dataItem.column.realWidth + 5;
                                } else {
                                    return dx;
                                }
                            })
                        }

                        //We used below adapter to show "Actuals" in the the tooltip for actuals column            
                        series.columns.template.adapter.add("tooltipText", function(tooltipText, target) {
                            if (target.dataItem && target.dataItem.categories.categoryX === CY_Minus1y) {
                            return `{name}: [bold]{valueY.value} [/] 
                                    Version: [bold]Actuals`;
                            }else{
                                return tooltipText;
                            }
                        });

                        //We used below an adapter for a color exception for year === 2021
                        series.columns.template.adapter.add("fill", function(fill, target) {
                            if (target.dataItem && (target.dataItem.categories.categoryX === CY_Minus1y)) {

                                if (NumVersions === 0 || NumVersions === 1 || NumVersions === 2) {
                                    if (target.dataItem.component.dataFields.valueY === 'A2') {
                                        return SetPatterns("A2", CAct_Light);
                                    } else if (target.dataItem.component.dataFields.valueY === 'A3') {
                                        return SetPatterns("A3", CAct_Light);
                                    } else if (target.dataItem.component.dataFields.valueY === 'A4') {
                                        return SetPatterns("A4", CAct_Light);
                                    } else {
                                        //console.log(target.dataItem.component.dataFields.valueY);
                                        return am4core.color(CAct_Dark);
                                    }
                                } else if (NumVersions === 3 || NumVersions === 4) {

                                    if (target.dataItem.component.dataFields.valueY === 'B2') {
                                        return SetPatterns("B2", CAct_Light);
                                    } else if (target.dataItem.component.dataFields.valueY === 'B3') {
                                        return SetPatterns("B3", CAct_Light);
                                    } else if (target.dataItem.component.dataFields.valueY === 'B4') {
                                        return SetPatterns("B4", CAct_Light);
                                    } else {
                                        //console.log(target.dataItem.component.dataFields.valueY);
                                        return am4core.color(CAct_Dark);
                                    }
                                }

                            } else {
                                return fill;
                            }
                        });

                    }
                }

                function createTotalSeries(yAxes) {
                    var valueAxis;
                    if (yAxes === 1) {
                        valueAxis = valueAxis1;
                    }

                    if (yAxes === 2) {
                        valueAxis = valueAxis2;
                    }

                    if (yAxes === 3) {
                        valueAxis = valueAxis3;
                    }

                    if (yAxes === 4) {
                        valueAxis = valueAxis4;
                    }

                    // Create series for total
                    var totalSeries = chart.series.push(new am4charts.ColumnSeries());
                    totalSeries.dataFields.valueY = "none";
                    totalSeries.dataFields.categoryX = "year";
                    totalSeries.stacked = true;
                    totalSeries.hiddenInLegend = true;
                    totalSeries.columns.template.strokeOpacity = 0;
                    totalSeries.yAxis = valueAxis;
                    totalSeries.columns.template.properties.dx = 0;


                    //Set columns width
                    if (NumVersions === 0 || NumVersions === 1) {
                        totalSeries.columns.template.width = am4core.percent(20);
                    } else if (NumVersions === 2) {
                        totalSeries.columns.template.width = am4core.percent(40);
                    } else if (NumVersions === 3 || NumVersions === 4) {
                        totalSeries.columns.template.width = am4core.percent(60);
                    }

                    var totalBullet = totalSeries.bullets.push(new am4charts.LabelBullet());
                    totalBullet.dy = -20;
                    //totalBullet.dx = 0;
                    totalBullet.label.text = "[bold]{valueY.total}";
                    totalBullet.label.hideOversized = false;
                    totalBullet.label.fontSize = TotalsDataLabelsFontSize;
                    totalBullet.label.background.fill = TotalsBackgroundColor;
                    totalBullet.label.background.fillOpacity = 1;
                    //totalBullet.label.padding(5, 10, 5, 10);       

                    //Hide Total label when equal to 0
                    totalBullet.label.adapter.add("text", function(text, target) {
                        if (target.dataItem && target.dataItem.values.valueY.total === 0) {
                            return "";
                        }
                        return text;
                    })

                    if(EnabledActuals === "true"){
                        //Ajust Total labels position when 2 columns displayed             
                        if (NumVersions === 2 || NumVersions === 4) {
                            totalSeries.columns.template.width = am4core.percent(40);

                            totalBullet.adapter.add("dx", function(dx, target) {
                                if (target.dataItem && target.dataItem.categories.categoryX === CY_Minus1y) {
                                    return dx + target.dataItem.column.realWidth + 15;
                                } else {
                                    return dx;
                                }
                            })
                        }
                    }

                }

                //Set columns 
                if (NumVersions === 0 || NumVersions === 1) {
                    // First Column
                    createSeries("A1", AIScope_1, true, Version_2, 1);
                    createSeries("A2", AIScope_2, true, Version_2, 1);
                    createSeries("A3", AIScope_3, true, Version_2, 1);
                    createSeries("A4", AIScope_4, true, Version_2, 1);

                    createTotalSeries(1);

                } else if (NumVersions === 2) {
                    // First Column
                    createSeries("A1", AIScope_1, true, Version_2, 1);
                    createSeries("A2", AIScope_2, true, Version_2, 1);
                    createSeries("A3", AIScope_3, true, Version_2, 1);
                    createSeries("A4", AIScope_4, true, Version_2, 1);

                    createTotalSeries(1);

                    // Second Column
                    createSeries("B1", AIScope_1, false, Version_3, 2);
                    createSeries("B2", AIScope_2, true, Version_3, 2);
                    createSeries("B3", AIScope_3, true, Version_3, 2);
                    createSeries("B4", AIScope_4, true, Version_3, 2);

                    createTotalSeries(2);

                } else if (NumVersions === 3) {
                    // First Column
                    createSeries("A1", AIScope_1, true, Version_2, 1);
                    createSeries("A2", AIScope_2, true, Version_2, 1);
                    createSeries("A3", AIScope_3, true, Version_2, 1);
                    createSeries("A4", AIScope_4, true, Version_2, 1);

                    createTotalSeries(1);

                    // Second Column
                    createSeries("B1", AIScope_1, false, Version_3, 2);
                    createSeries("B2", AIScope_2, true, Version_3, 2);
                    createSeries("B3", AIScope_3, true, Version_3, 2);
                    createSeries("B4", AIScope_4, true, Version_3, 2);

                    createTotalSeries(2);

                    // Third Column
                    createSeries("C1", AIScope_1, false, Version_4, 3);
                    createSeries("C2", AIScope_2, true, Version_4, 3);
                    createSeries("C3", AIScope_3, true, Version_4, 3);
                    createSeries("C4", AIScope_4, true, Version_4, 3);

                    createTotalSeries(3);

                } else if (NumVersions === 4) {
                    // First Column
                    createSeries("A1", AIScope_1, true, Version_2, 1);
                    createSeries("A2", AIScope_2, true, Version_2, 1);
                    createSeries("A3", AIScope_3, true, Version_2, 1);
                    createSeries("A4", AIScope_4, true, Version_2, 1);

                    createTotalSeries(1);

                    // Second Column
                    createSeries("B1", AIScope_1, false, Version_3, 2);
                    createSeries("B2", AIScope_2, true, Version_3, 2);
                    createSeries("B3", AIScope_3, true, Version_3, 2);
                    createSeries("B4", AIScope_4, true, Version_3, 2);

                    createTotalSeries(2);

                    // Third Column
                    createSeries("C1", AIScope_1, false, Version_4, 3);
                    createSeries("C2", AIScope_2, true, Version_4, 3);
                    createSeries("C3", AIScope_3, true, Version_4, 3);
                    createSeries("C4", AIScope_4, true, Version_4, 3);

                    createTotalSeries(3);

                    // Fourth Column
                    createSeries("D1", AIScope_1, false, Version_5, 4);
                    createSeries("D2", AIScope_2, true, Version_5, 4);
                    createSeries("D3", AIScope_3, true, Version_5, 4);
                    createSeries("D4", AIScope_4, true, Version_5, 4);

                    createTotalSeries(4);
                }

                //Custom legend
                //// NON AI, HI, NEW AI, BASE AI
                var legendA = new am4charts.Legend();
                //To push the custom legend top
                legendA.parent = chart.topAxesContainer;

                //Disable toggle of items in LegendA
                legendA.itemContainers.template.clickable = false;
                legendA.itemContainers.template.focusable = false;
                legendA.itemContainers.template.cursorOverStyle = am4core.MouseCursorStyle.default;

                //Set font size and font family for the custom legend
                legendA.fontSize = 12;
                legendA.fontFamily = "Arial";

                //Align the custom legend to the right of its container
                legendA.contentAlign = "right";

                //Set RightPadding of the legend
                legendA.paddingRight = LegendRightPadding;

                //Custom the markers size for the custom legend
                legendA.markers.template.width = 15;
                legendA.markers.template.height = 15;

                var patternNEWAI = SetPatterns("A2", AIScope_color);
                var patternHI = SetPatterns("A3", AIScope_color);
                var patternNONAI = SetPatterns("A4", AIScope_color);

                legendA.data = [];

                if(EnabledActuals === "true"){
                    if (Version_1.length !== 0 && Version_1 !== undefined) {
                        legendA.data.push({
                            "name": Version_1,
                            "fill": CAct_Dark
                        })
                    }
                }
                
                if (Version_2.length !== 0 && Version_2 !== undefined) {
                    legendA.data.push({
                        "name": Version_2,
                        "fill": CNonAct_Col1_Dark
                    })
                }

                if (Version_3.length !== 0 && Version_3 !== undefined) {
                    legendA.data.push({
                        "name": Version_3,
                        "fill": CNonAct_Col2_Dark
                    })
                }

                if (Version_4.length !== 0 && Version_4 !== undefined) {
                    legendA.data.push({
                        "name": Version_4,
                        "fill": CNonAct_Col3_Dark
                    })
                }

                if (Version_5.length !== 0 && Version_5 !== undefined) {
                    legendA.data.push({
                        "name": Version_5,
                        "fill": CNonAct_Col4_Dark
                    })
                }


                if (AIScope_1.length !== 0 && AIScope_1 !== undefined) {
                    legendA.data.push({
                        "name": AIScope_1,
                        "fill": AIScope_color
                    })
                }
                if (AIScope_2.length !== 0 && AIScope_2 !== undefined) {
                    legendA.data.push({
                        "name": AIScope_2,
                        "fill": patternNEWAI
                    })
                }
                if (AIScope_3.length !== 0 && AIScope_3 !== undefined) {
                    legendA.data.push({
                        "name": AIScope_3,
                        "fill": patternHI
                    })
                }
                if (AIScope_4.length !== 0 && AIScope_4 !== undefined) {
                    legendA.data.push({
                        "name": AIScope_4,
                        "fill": patternNONAI
                    })
                }
    
          
                //Customize the markers layout for the Custom legend
                var marker = legendA.markers.template.children.getIndex(0);
                marker.strokeWidth = 2;
                marker.strokeOpacity = 1;
                marker.stroke = am4core.color("#ccc");

  /*
                //REMOVE SECOND LINE OF LEGEND               

                //// Version 1, Version 2, Version 3, Version 4
                var legendB = new am4charts.Legend();
                //To push the custom legend top
                legendB.parent = chart.topAxesContainer;

                //Disable toggle of items in LegendB
                legendB.itemContainers.template.clickable = false;
                legendB.itemContainers.template.focusable = false;
                legendB.itemContainers.template.cursorOverStyle = am4core.MouseCursorStyle.default;

                //Set font size and font family for the custom legend
                legendB.fontSize = 12;
                legendB.fontFamily = "Arial";

                //Align the custom legend to the right of its container
                legendB.contentAlign = "right";

                //Custom the markers size for the custom legend
                legendB.markers.template.width = 15;
                legendB.markers.template.height = 15;

                //Custom legend for the Versions
                legendB.data = [{
                    "name": Version_1,
                    "fill": CAct_Dark
                }];

                if (Version_2.length !== 0 && Version_2 !== undefined) {
                    legendB.data.push({
                        "name": Version_2,
                        "fill": CNonAct_Col1_Dark
                    })
                }
                if (Version_3.length !== 0 && Version_3 !== undefined) {
                    legendB.data.push({
                        "name": Version_3,
                        "fill": CNonAct_Col2_Dark
                    })
                }

                if (Version_4.length !== 0 && Version_4 !== undefined) {
                    legendB.data.push({
                        "name": Version_4,
                        "fill": CNonAct_Col3_Dark
                    })
                }

                //Customize the markers layout for the Custom legend
                var marker = legendB.markers.template.children.getIndex(0);
                marker.strokeWidth = 2;
                marker.strokeOpacity = 1;
                marker.stroke = am4core.color("#ccc");

         */       

                //Timeline ScroolBar in the bottom
                chart.scrollbarX = new am4core.Scrollbar();
                //To push the TimeLine ScroolBar down
                chart.scrollbarX.parent = chart.bottomAxesContainer;

                //Customize the Timeline ScrollBar
                //line
                chart.scrollbarX.minHeight = ScrollbarXHeight;  
                //The startGrip
                chart.scrollbarX.startGrip.icon.disabled = true;
                //The endGrip
                chart.scrollbarX.endGrip.icon.disabled = true;
                
                //To not zooming in Y Axis (only X Axis)
                chart.events.on("ready", function(ev) {
                    valueAxis1.min = 0;
                    valueAxis1.max = YaxisMaxValue;
                    
                    valueAxis2.min = 0;
                    valueAxis2.max = YaxisMaxValue;
                    
                    valueAxis3.min = 0;
                    valueAxis3.max = YaxisMaxValue;
                    
                    valueAxis4.min = 0;
                    valueAxis4.max = YaxisMaxValue;
                });


                // Chart showing in the frontend (SAC)
                chart.appear();

            }); // end am4core.ready()        

        } // END of method --> render 
    } // END of class NewCharts


    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    // Return the end result into SAC (SAP ANALYTICS CLOUD) application vvvvvvvvvvvvvvvvvvv
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    customElements.define('com-sap-sample-asantos-new-cwstackv1', NewStackV127)

})() // END of function --> (function () {
