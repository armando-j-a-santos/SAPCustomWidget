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
        //div.slot = "content_" + widgetName;
  
        let div2 = document.createElement('div');
        div2.innerHTML = '<script id="sap-ui-bootstrap" src="https://sapui5.hana.ondemand.com/resources/sap-ui-core.js" data-sap-ui-theme="sap_bluecrystal" data-sap-ui-xx-bindingSyntax="complex" data-sap-ui-libs="sap.m"></script> <script id="view1" type="ui5/xmlview"><mvc:View controllerName="view1.initial" xmlns:t="sap.ui.table" xmlns="sap.ui.commons" xmlns:mvc="sap.ui.core.mvc" > <t:TreeTable id="tbl" rows="{path:'+ "'" + '/' + "'" + '}" > <t:columns> <t:Column> <t:label><Label text="name" /></t:label> <t:template><TextView text="{name}" /></t:template> </t:Column> <t:Column> <t:label><Label text="Arm" /> </t:label> <t:template><TextView text="{description}" /></t:template> </t:Column> <t:Column> <t:label><Label text="product" /> </t:label> <t:template><TextView text="{product}" /></t:template> </t:Column> </t:columns> </t:TreeTable> </mvc:View> </script>';
        _shadowRoot.appendChild(div2);

        that_.appendChild(div);
        
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

                return Controller.extend("view1", {

                    onInit: function() {
                        
                        console.log('>>>>>>>>>>>>>>>inside onInit');
                        
		        var oNodes = { 
		                            "nodes": [{
		                              "name": "O100",
		                              "description": "Software Development",
		                              "ParentID": "",
		                              "product": "O",
		                              "nodes" : [{
		                                "name": "O110",
		                                "description": "Team A",
		                                "ParentID": "O100",
		                                "product": "O",
		                                "nodes" : [{
		                                  "name": "S111",
		                                  "description": "Product Owner",
		                                  "ParentID": "O110",
		                                  "product": "S"
		                                }]
		                              }]
		                            }]
		                     };
		        var oArmando = new sap.ui.model.json.JSONModel(oNodes);
                            
                        // Link the model to the widget
                        this.getView()
                             .setModel(oArmando);
                        sap.ui.getCore().setModel(oArmando);
                    }

                });
            });
            
            //### THE APP: place the XMLView somewhere into DOM ###
            var oView = sap.ui.xmlview({
                viewContent: jQuery('#view1').html(),
            });
            oView.placeAt(div);

		
        });
    } // end of: function loadthis(that, changedProperties) {

    
})();
