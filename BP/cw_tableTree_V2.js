(function () {
    let _shadowRoot;

    let div;
    let widgetName;
    var tmpArray = [];
    let that;
    let changedPropertiesv2;

    let tmpl = document.createElement("template");
    tmpl.innerHTML = `
      <style>
      </style>      
    `;

    class ASANTOS extends HTMLElement {

        constructor() {
            super();

            _shadowRoot = this.attachShadow({
                mode: "open"
            });
            _shadowRoot.appendChild(tmpl.content.cloneNode(true));

            this.addEventListener("click", event => {
                console.log('click event in here');
            });

            ///this._firstConnection = 0;
        }

        connectedCallback() { }

        disconnectedCallback() {
            if (this._subscription) { // react store subscription
                this._subscription();
                this._subscription = null;
            }
        }

        // Method: loadData use by SAC side to pass the array od nodes to be used.
        async loadData(arrayNodes, columnsIDs, columnsDesc, columnsNumberFormat) {
            // if there is nodes to render
            if (arrayNodes != "") {
                // Check if the treetable as already been created.
                // If YES then only updating the data.
                if (sap && sap.ui.getCore().getElementById("__xmlview1--tbl")) {
                    var table = sap.ui.getCore().getElementById("__xmlview1--tbl");
                    var newData = convert(arrayNodes);
                    table.getModel().setData(newData);

                    // NOTE: In this if statment the treetable is NOT created. Only the data is updated.
                } else {
                    // Need to treetable widget.
                    loadthis(that, changedPropertiesv2, arrayNodes, columnsIDs, columnsDesc, columnsNumberFormat);
                }
            }

        }

        onCustomWidgetBeforeUpdate(changedProperties) { }

        onCustomWidgetAfterUpdate(changedProperties) {
            that = this;
            changedPropertiesv2 = changedProperties;
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue != newValue) {
                this[name] = newValue;
            }
        }

    }
    customElements.define("com-asantos-sap-sac-treetableb", ASANTOS);

    function loadthis(that, changedProperties, arrayNodes, columnsIDs, columnsDesc, columnsNumberFormat) {
        var that_ = that;

        widgetName = changedProperties.widgetName;
        if (typeof widgetName === "undefined") {
            widgetName = that._export_settings.title.split("|")[0];
        }

        // console.log('>>>><<<<<');
        // Clear DOM
        // Delete any previous DOM widget(s), to avoid the same treetable to appear multiple times. 
        // Only a SINGLE treetable should appear to the SAC user. For example, by appling different filters to the techTable behind the scenes.
        // The below while cycle will break when there is no __xmlview1,2,3,4,5,6... to to be removed.

        // var x = document.getElementById("__xmlview1");
        // if (x) {
        //     document.getElementById("__xmlview1").remove();
        // } else {
        //     var i = 2;
        //     while (i < 50) {
        //         var x = document.getElementById(`__xmlview${i}`);
        //         if (x) {
        //             document.getElementById(`__xmlview${i}`).remove();
        //             console.log('deleted the element.');
        //             break;
        //         }
        //         i++;
        //         console.log(i);
        //     }
        // }

        // div creation
        div = document.createElement('div');
        div.slot = "content_" + widgetName;

        // SAP UI5 necessary library and theme settings
        let div1 = document.createElement('div');
        div1.innerHTML = '<script id="sap-ui-bootstrap" src="https://openui5.hana.ondemand.com/1.108.20/resources/sap-ui-core.js" data-sap-ui-theme="sap_bluecrystal" data-sap-ui-bindingSyntax="complex" data-sap-ui-libs="sap.m"></script>'
        _shadowRoot.appendChild(div1);


        // treeTable necessary settings & definitions
        // treeTable columns settings
        let div2 = document.createElement('div');
        div2.innerHTML = '<script id="oView' + widgetName + '" name="oView' + widgetName + '" type="sapui5/xmlview"><mvc:View controllerName="myView.Template" ' +
            'xmlns:core="sap.ui.core" xmlns:mvc="sap.ui.core.mvc" xmlns:t="sap.ui.table" xmlns="sap.ui.commons">' +
            '<t:TreeTable id="tbl" rows="{/}" selectionMode="Single" enableColumnReordering="false" expandFirstLevel="false" visibleRowCount="16">' +
            '<t:columns>' +
            // '<t:Column width="400px"><t:label><Label text="Tree" /></t:label><t:template><TextView text="{Name}"/></t:template></t:Column>' +
            // '<t:Column><t:label><Label text="HC" /></t:label><t:template><TextView text="{HC}"/></t:template></t:Column>' +
            // '<t:Column><t:label><Label text="Prediction" /></t:label><t:template><TextView text="{Prediction}"/></t:template></t:Column>' +
            // '<t:Column><t:label><Label text="Adjustment" /></t:label><t:template><TextView text="{Adjustment}"/></t:template></t:Column>' +
            '</t:columns>' +
            '</t:TreeTable></mvc:View></script>';

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /* NOTES:
          1. selectionMode="Single" enableColumnReordering="false" expandFirstLevel="false" >>> To remove the first column checkboxes for each row.
          2. visibleRowCount="16" >>> Basically defines the height of the treetable.
        */
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        _shadowRoot.appendChild(div2);

        // treeTable panel & slot settings
        let div3 = document.createElement('div');
        var maxheight = '800px';
        div3.innerHTML = '<div style="max-height: "' + maxheight + '"; border-radius: 15px; overflow-y: hidden;" id="ui5_content_' + widgetName + '" name="ui5_content_' + widgetName + '"><div style="max-height: ' + maxheight + '; border-radius: 15px; overflow-y: auto;" id="ui5_content_' + widgetName + '" name="ui5_content_' + widgetName + '"><slot name="content_' + widgetName + '"></slot></div></div>';
        _shadowRoot.appendChild(div3);

        that_.appendChild(div);

        console.log("================");
        console.log(">>>> LOGS >>>>");
        console.log(widgetName);
        console.log("div");
        console.log(div);
        console.log("div1");
        console.log(div1);
        console.log("div2");
        console.log(div2);
        console.log("div3");
        console.log(div3);

        console.log("arrayNodes:");
        console.log(arrayNodes);

        console.log("columnsIDs:");
        console.log(columnsIDs);
        console.log("columnsDesc:");
        console.log(columnsDesc);
        console.log("================");

        var mapcanvas_divstr = _shadowRoot.getElementById('oView' + widgetName);

        tmpArray.pop();
        tmpArray.push({
            'id': widgetName,
            'div': mapcanvas_divstr
        });

        sap.ui.getCore().attachInit(function () {
            "use strict";

            //### Controller definition ###
            sap.ui.define([
                "jquery.sap.global",
                "sap/ui/core/mvc/Controller",
                "sap/ui/model/json/JSONModel",
                "sap/m/MessageToast",
                "sap/ui/core/library",
                "sap/ui/core/Core",
                'sap/ui/model/Filter',
                'sap/m/library',
                'sap/m/MessageBox',
                'sap/ui/unified/DateRange',
                'sap/ui/core/format/DateFormat',
                'sap/ui/model/BindingMode',
                'sap/ui/core/Fragment',
                'sap/m/Token',
                'sap/ui/model/FilterOperator',
                'sap/ui/model/odata/ODataModel',
                'sap/m/BusyDialog',
                "sap/ui/core/format/NumberFormat"
            ], function (jQuery, Controller, JSONModel, MessageToast, coreLibrary, Core, Filter, mobileLibrary, MessageBox, DateRange, DateFormat, BindingMode, Fragment, Token, FilterOperator, ODataModel, BusyDialog, NumberFormat) {
                "use strict";

                var busyDialog = (busyDialog) ? busyDialog : new BusyDialog({});

                return sap.ui.controller("myView.Template", {

                    onInit: function () {
                        /*
                        // oData preparation (nodes, columns and rows)
                        var myData = [
                            // Level 0 >>> ENTITY for example.
                            { Id: "1", Name: "#", Parent: "", HC: "20", Prediction: "-", Adjustment: "$282.27 m" },
                            { Id: "2", Name: "Other", Parent: "", HC: "-", Prediction: "-", Adjustment: "$282.27 m" },
                            { Id: "3", Name: "Customer & Products", Parent: "", HC: "-", Prediction: "-", Adjustment: "$282.27 m" },
                            { Id: "4", Name: "Finance", Parent: "", HC: "-", Prediction: "-", Adjustment: "$282.27 m" },
                            { Id: "5", Name: "Gas & Low Carbon Energy", Parent: "", HC: "-", Prediction: "-", Adjustment: "$282.27 m" },
                            { Id: "6", Name: "Innovation & Engineering", Parent: "", HC: "-", Prediction: "-", Adjustment: "$282.27 m" },
                            { Id: "7", Name: "Legal", Parent: "", HC: "-", Prediction: "-", Adjustment: "$282.27 m" },
                            { Id: "8", Name: "People & Culture", Parent: "", HC: "-", Prediction: "-", Adjustment: "$282.27 m" },
                            { Id: "9", Name: "Production & Operations", Parent: "", HC: "-", Prediction: "-", Adjustment: "$282.27 m" },
                          
                            // Level 1 >>> SUB-ENTITY for example.
                            { Id: "10", Name: "Unassigned", Parent: "1", HC: "-", Prediction: "-", Adjustment: "$282.27 m" },
                            { Id: "11", Name: "Don't Use - Incorrect Enterprise", Parent: "10", HC: "-", Prediction: "-", Adjustment: "$282.27 m" },
                            
                            // Level E >>> ENTERPRISE for example.
                            { Id: "12", Name: "BP Corporate Exec Office Exec", Parent: "2", HC: "-", Prediction: "-", Adjustment: "$282.27 m" },
                            { Id: "13", Name: "CEO - Legacy", Parent: "2", HC: "-", Prediction: "-", Adjustment: "$282.27 m" },
                            { Id: "14", Name: "CEO Support", Parent: "2", HC: "-", Prediction: "-", Adjustment: "$282.27 m" },
                           
                        ];
                          
                        var newMember = {Id: "15", Name: "Armando Santos", Parent: "4", HC: "5", Prediction: "10", Adjustment: "$123 m" };
                        myData.push(newMember);
                        var result = convert(myData);
                        */


                        var result = convert(arrayNodes);
                        console.log("tableTree is: ", result);

                        // number formatting
                        columnsNumberFormat.forEach((colNumFormat) => {
                            const parts = colNumFormat.split(";");
                            var colName = parts[0];
                            var scale = parts.length > 1 ? parts[1] : "";
                            if (scale !== "-" && scale !== "") {
                                var refNumber = scale === "m" ? 1000000 : scale === "k" ? 1000 : 1;
                                result.forEach((row) => {
                                    var oFormatOptions = {
                                        style: "short",
                                        shortDecimals: 2,
                                        shortRefNumber: refNumber
                                    };
                                    var oFormatter = NumberFormat.getFloatInstance(oFormatOptions);
                                    var value = oFormatter.format(row[colName]);
                                    var numberPart = value.substring(0, value.length - 1);
                                    var letter = value.substring(value.length - 1);
                                    row[colName] = numberPart + letter.toLowerCase();
                                });
                            }
                        });

                        // Create the model linked to the data (oData)
                        var _oModel = new sap.ui.model.json.JSONModel(result);
                        //_oModel.setSizeLimit(1000000);

                        //console.log("_oModel");
                        //console.log(_oModel);

                        // Link the model to the widget
                        this.getView().setModel(_oModel);

                        // Bring the columns into the treeTable defined above
                        // NOTE: width property is set to 400px only for the first column (Tree column - hierarchy) 
                        var table = this.getView().byId("tbl");
                        columnsIDs.forEach((id, index) => {
                            var colName = columnsDesc[index];
                            var colNumFormat = columnsNumberFormat.find((value) => value.split(";")[0] === colName);
                            var scale = colNumFormat && colNumFormat.split(";")[1];
                            table.addColumn(new sap.ui.table.Column({
                                label: colName,
                                template: id,
                                width: index === 0 ? "400px" : "",
                                hAlign: scale !== "" && scale !== "-" ? "End" : "Start"
                            }));
                        });

                        //console.log("The model from");
                        //console.log(this.getView().getModel());

                        //console.log("that.widgetName");
                        //console.log(that.widgetName);

                        // Releasing memory
                        result = [''];
                        _oModel = [''];
                        arrayNodes = [''];
                    }

                });
            });

            console.log("WidgetName Final:" + widgetName);
            var foundIndex = tmpArray.findIndex(x => x.id == widgetName);
            var divfinal = tmpArray[foundIndex].div;
            console.log(divfinal);

            //### THE APP: place the XMLView into DOM ###
            var oView = sap.ui.xmlview({
                viewContent: jQuery(divfinal).html(),
            });
            //### Place the XMLView into div piece ###
            oView.placeAt(div);

            // Releasing memory
            oView = '';
            div = '';

        });

    } // end of: function loadthis...

    // Function that builds the hierarchy tree, readable in console.log
    function convert(array) {
        var map = {};
        for (var i = 0; i < array.length; i++) {
            var obj = array[i];
            obj.children = [];

            map[obj.Id] = obj;

            var parent = obj.Parent || "-";
            if (!map[parent]) {
                map[parent] = {
                    children: [],
                };
            }

            map[parent].children.push(obj);
        }

        return map["-"].children;
    }

})();
