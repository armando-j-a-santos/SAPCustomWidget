(function() {
    let _shadowRoot;

    let div;
    let widgetName;
    var Ar = [];

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

            /*
            _id = createGuid();
            _shadowRoot.querySelector("#oView").id = "oView";
            */

            this._export_settings = {};
            this._export_settings.title = "";
            this._export_settings.subtitle = "";
            this._export_settings.icon = "";
            this._export_settings.unit = "";
            this._export_settings.footer = "";

            this.addEventListener("click", event => {
                console.log('click');

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

        /*
        _firePropertiesChanged() {
            this.unit = "";
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        unit: this.unit
                    }
                }
            }));
        }
        */

        /*
        static get observedAttributes() {
            return [
                "title",
                "subtitle",
                "icon",
                "unit",
                "footer",
                "link"
            ];
        }
        */

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue != newValue) {
                this[name] = newValue;
            }
        }

    }
    customElements.define("com-asantos-sap-sac-sapuitablex", ASANTOS);

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

        //var path = "{path:\'/\',parameters:{arrayNames:[\'oData\']}}"
            
        let div2 = document.createElement('div');
        div2.innerHTML = '<script id="oView' + widgetName + '" name="oView' + widgetName + '" type="sapui5/xmlview"><mvc:View controllerName="myView.Template" xmlns:core="sap.ui.core" xmlns:mvc="sap.ui.core.mvc" xmlns:t="sap.ui.table" xmlns="sap.ui.commons"><t:TreeTable id="tbl" rows="{path:\'/\'}"><t:columns><t:Column><t:label><Label text="ID" /></t:label><t:template><TextView text="{name}"/></t:template></t:Column><t:Column><t:label><Label text="NAME" /></t:label><t:template><TextView text="{description}"/></t:template></t:Column><t:Column><t:label><Label text="SURNAME" /></t:label><t:template><TextView text="{product}"/></t:template></t:Column></t:columns></t:TreeTable></mvc:View></script>';               
        _shadowRoot.appendChild(div2);
       
        let div3 = document.createElement('div');
        div3.innerHTML = '<div style="max-height: "' + that.max_height + that.unit_option + '"; border-radius: 15px; overflow-y: hidden;" id="ui5_content_' + widgetName + '" name="ui5_content_' + widgetName + '"><div style="max-height: ' + that.max_height + that.unit_option + '; border-radius: 15px; overflow-y: auto;" id="ui5_content_' + widgetName + '" name="ui5_content_' + widgetName + '"><slot name="content_' + widgetName + '"></slot></div></div>';
         _shadowRoot.appendChild(div3);

        that_.appendChild(div);


        console.log("MILTON TEST");
        console.log(widgetName);
        console.log("div");
        console.log(div);
        console.log("div1");
        console.log(div1);
        console.log("div2");
        console.log(div2);
        console.log("div3");
        console.log(div3);
        
        var mapcanvas_divstr = _shadowRoot.getElementById('oView' + widgetName);

        Ar.push({
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

                return Controller.extend("myView.Template", {

                    onInit: function() {
                        
                        console.log('>>>>>>>>>>>>>>>inside onInit');
                        
                            // oData defintion (nodes, columns and rows)
                            /*
                            var oData = [{
                              text: "Node1",
                              nodes: [{
                                text: "Node1-1"
                              }]
                            }, {
                              text: "Node2",
                              nodes: [{
                                text: "Node2-1"
                              }]
                            }];
                            */

                            var oData = [
                                { 
                                    name  : "node1", 
                                    description : "Lorem ipsum dolor sit amet",
                                    product : "ABC",
                                    data : [
                                        { 
                                            name : "node1.1", 
                                            description : "Cras pretium nisl ac ex congue posuere",
                                            product : "XYZ" 
                                        },
                                        { 
                                            name : "node1.2", 
                                            description : "Consectetur adipiscing elit",
                                            product : "ABC",
                                            data: [
                                                { 
                                                    name : "node1.2.1",
                                                    description : "Maecenas accumsan ipsum diam",
                                                    product : "ABC",
                                                }
                                           ]
                                        },
                                        { 
                                            name : "node1.3", 
                                            description : "Sed tristique diam non imperdiet commodo",
                                            product : "ABC"
                                        },
                                        { 
                                            name : "node1.4", 
                                            description : "Consectetur adipiscing elit",
                                            product : "ABC",
                                            data: [
                                                { 
                                                    name : "node1.4.1",
                                                    description : "Maecenas accumsan ipsum diam",
                                                    product : "ABC",
                                                    data: [
                                                        { 
                                                            name : "node1.4.1.1",
                                                            description : "Maecenas accumsan ipsum diam",
                                                            product : "ABC",
                                                            data: [
                                                                { 
                                                                    name : "node1.4.1.1.1",
                                                                    description : "Maecenas accumsan ipsum diam",
                                                                    product : "ABC",
                                                                    data: [
                                                                        { 
                                                                            name : "node1.4.1.1.1.1",
                                                                            description : "Maecenas accumsan ipsum diam",
                                                                            product : "ABC",
                                                                        }
                                                                   ]
                                                                }
                                                           ]
                                                        }
                                                   ]
                                                }
                                           ]
                                        },
                                        { 
                                            name : "node1.5", 
                                            description : "Sed tristique diam non imperdiet commodo",
                                            product : "ABC",
                                        },
                                        { 
                                            name : "node1.6", 
                                            description : "Consectetur adipiscing elit",
                                            product : "ABC",
                                            data: [
                                                { 
                                                    name : "node1.6.1",
                                                    description : "Maecenas accumsan ipsum diam",
                                                    product : "ABC",
                                                }
                                           ]
                                        },
                                        { 
                                            name : "node1.7", 
                                            description : "Sed tristique diam non imperdiet commodo",
                                            product : "ABC",
                                        },
                
                                    ]
                                },
                            ];

                             // Create the model linked to the data (oData)
                            //var _oModel = new sap.ui.model.json.JSONModel(oData);
                            var _oModel = new JSONModel(oData)
                            _oModel.setSizeLimit(1000000);
                            
                            console.log("_oModel");
                            console.log(_oModel);
                            
                            // Link the model to the widget
                            //this.getView().setModel(_oModel, that.widgetName);
                            sap.ui.getCore().setModel(_oModel, that.widgetName);

                            
                            //this.getView().byId("tbl").setModel(_oModel, that.widgetName);   // ----> did not solve
                            this.getView().byId("oViewsapuitablex_1").setModel(_oModel);  // ----> did not solve

                            console.log("The model from");
                            console.log(this.getView().byId("oViewsapuitablex_1").getModel(_oModel, that.widgetName));
                            console.log(this.getView().byId("tbl").getModel(_oModel, that.widgetName));


                            //console.log(this.getView().byId("tbl").getModel());  // ---->> undefined
                            //console.log(this.getView().byId(that.widgetName).getModel()); // ---->> error

                            //"oViewsapuitable_1"
                            
                            console.log("that.widgetName");
                            console.log(that.widgetName);
                    }

                });
            });

            console.log("WidgetName Final:" + widgetName);
            var foundIndex = Ar.findIndex(x => x.id == widgetName);
            var divfinal = Ar[foundIndex].div;
            console.log(divfinal);
            
            
            
            //### THE APP: place the XMLView somewhere into DOM ###
            var oView = sap.ui.xmlview({
                viewContent: jQuery(divfinal).html(), 
            });
            oView.placeAt(div);
            
        });
    } // end of: function loadthis(that, changedProperties) {

    
})();