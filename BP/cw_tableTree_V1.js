(function() {
    let _shadowRoot;

    let div;
    let widgetName;
    var tmpArray = [];

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

            this._firstConnection = 0;
        }

        connectedCallback() {
        }

        disconnectedCallback() {
            if (this._subscription) { // react store subscription
                this._subscription();
                this._subscription = null;
            }
        }

        onCustomWidgetBeforeUpdate(changedProperties) {
        }

        onCustomWidgetAfterUpdate(changedProperties) {
            var that = this;
            loadthis(that, changedProperties);
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue != newValue) {
                this[name] = newValue;
            }
        }

    }
    customElements.define("com-asantos-sap-sac-treetablea", ASANTOS);

    function loadthis(that, changedProperties) {
        var that_ = that;

        widgetName = changedProperties.widgetName;
        if (typeof widgetName === "undefined") {
            widgetName = that._export_settings.title.split("|")[0];
        }

    
        div = document.createElement('div');
        div.slot = "content_" + widgetName;

        let div1 = document.createElement('div');
        div1.innerHTML = '<script id="sap-ui-bootstrap" src="https://openui5.hana.ondemand.com/1.108.20/resources/sap-ui-core.js" data-sap-ui-theme="sap_bluecrystal" data-sap-ui-bindingSyntax="complex" data-sap-ui-libs="sap.m"></script>'
        _shadowRoot.appendChild(div1);

    
        let div2 = document.createElement('div');
        div2.innerHTML = '<script id="oView'+ widgetName +'" name="oView'+ widgetName +'" type="sapui5/xmlview"><mvc:View controllerName="myView.Template"'+ 
        'xmlns:core="sap.ui.core" xmlns:mvc="sap.ui.core.mvc" xmlns:t="sap.ui.table" xmlns="sap.ui.commons"><t:TreeTable id="tbl" rows="{/}">'+
        '<t:columns>'+
        '<t:Column><t:label><Label text="ID" /></t:label><t:template><TextView text="{name}"/></t:template></t:Column>'+
        '<t:Column><t:label><Label text="NAME" /></t:label><t:template><TextView text="{description}"/></t:template></t:Column>'+
        '<t:Column><t:label><Label text="SURNAME" /></t:label><t:template><TextView text="{product}"/></t:template></t:Column>'+
        '</t:columns>'+
        '</t:TreeTable></mvc:View></script>';

        _shadowRoot.appendChild(div2);
       
        let div3 = document.createElement('div');
        div3.innerHTML = '<div style="max-height: "' + that.max_height + that.unit_option + '"; border-radius: 15px; overflow-y: hidden;" id="ui5_content_' + widgetName + '" name="ui5_content_' + widgetName + '"><div style="max-height: ' + that.max_height + that.unit_option + '; border-radius: 15px; overflow-y: auto;" id="ui5_content_' + widgetName + '" name="ui5_content_' + widgetName + '"><slot name="content_' + widgetName + '"></slot></div></div>';
         _shadowRoot.appendChild(div3);

        that_.appendChild(div);

        console.log("================");
        console.log("LOGS");
        console.log(widgetName);
        console.log("div");
        console.log(div);
        console.log("div1");
        console.log(div1);
        console.log("div2");
        console.log(div2);
        console.log("div3");
        console.log(div3);
        console.log("================");
        
        var mapcanvas_divstr = _shadowRoot.getElementById('oView' + widgetName);

        tmpArray.push({
            'id': widgetName,
            'div': mapcanvas_divstr
        });

        sap.ui.getCore().attachInit(function() {
            "use strict";

            //### Controller ###
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
                'sap/m/BusyDialog'
            ], function(jQuery, Controller, JSONModel, MessageToast, coreLibrary, Core, Filter, mobileLibrary, MessageBox, DateRange, DateFormat, BindingMode, Fragment, Token, FilterOperator, ODataModel, BusyDialog) {
                "use strict";

                var busyDialog = (busyDialog) ? busyDialog : new BusyDialog({});

                    return sap.ui.controller("myView.Template", {

                    onInit: function() {
                        
                            // oData preparation (nodes, columns and rows)
                            var oData = { 
                                "nodes": [{
                                  "name": "O100",
                                  "description": "Fist nodee",
                                  
                                  "product": "O",
                                  "nodes" : [{
                                    "name": "O110",
                                    "description": "Team AAAA",
                                    
                                    "product": "O",
                                    "nodes" : [{
                                      "name": "S111",
                                      "description": "Product Owner",
                                      
                                      "product": "S"
                                    }]
                                  }]
                                }]
                            };


                            var myData = [
                                // Level 0
                                { Id: "1", Name: "#", Parent: "", HC: "20", Prediction: "-", Adjustment: "$282.27 m" },
                                { Id: "2", Name: "Other", Parent: "", HC: "-", Prediction: "-", Adjustment: "$282.27 m" },
                                { Id: "3", Name: "Customer & Products", Parent: "", HC: "-", Prediction: "-", Adjustment: "$282.27 m" },
                                { Id: "4", Name: "Finance", Parent: "", HC: "-", Prediction: "-", Adjustment: "$282.27 m" },
                                { Id: "5", Name: "Gas & Low Carbon Energy", Parent: "", HC: "-", Prediction: "-", Adjustment: "$282.27 m" },
                                { Id: "6", Name: "Innovation & Engineering", Parent: "", HC: "-", Prediction: "-", Adjustment: "$282.27 m" },
                                { Id: "7", Name: "Legal", Parent: "", HC: "-", Prediction: "-", Adjustment: "$282.27 m" },
                                { Id: "8", Name: "People & Culture", Parent: "", HC: "-", Prediction: "-", Adjustment: "$282.27 m" },
                                { Id: "9", Name: "Production & Operations", Parent: "", HC: "-", Prediction: "-", Adjustment: "$282.27 m" },
                              
                                // #
                                { Id: "10", Name: "Unassigned", Parent: "1", HC: "-", Prediction: "-", Adjustment: "$282.27 m" },
                                { Id: "11", Name: "Don't Use - Incorrect Enterprise", Parent: "10", HC: "-", Prediction: "-", Adjustment: "$282.27 m" },
                                
                                // Other
                                { Id: "12", Name: "BP Corporate Exec Office Exec", Parent: "2", HC: "-", Prediction: "-", Adjustment: "$282.27 m" },
                                { Id: "13", Name: "CEO - Legacy", Parent: "2", HC: "-", Prediction: "-", Adjustment: "$282.27 m" },
                                { Id: "14", Name: "CEO Support", Parent: "2", HC: "-", Prediction: "-", Adjustment: "$282.27 m" },
                               
                            ];
                              
                            var newMember = {Id: "15", Name: "Armando Santos", Parent: "12", HC: "5", Prediction: "10", Adjustment: "$123 m" };

                            
                            myData.push(newMember);
                              
                            var result = convert(myData);
                            console.log("tree is: ", result);


                            // Function that builds the hierarchy tree
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

                            

                            // Create the model linked to the data (oData)
                            var _oModel = new sap.ui.model.json.JSONModel(oData);
                            //_oModel.setSizeLimit(1000000);
                            
                            console.log("_oModel");
                            console.log(_oModel);
                            
                            // Link the model to the widget
                            this.getView().setModel(_oModel); 

                            console.log("The model from");
                            console.log(this.getView().getModel());  
                            
                            console.log("that.widgetName");
                            console.log(that.widgetName);
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
            
        });

    } // end of: function loadthis(that, changedProperties) {

    
})();
