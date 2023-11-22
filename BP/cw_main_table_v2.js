(function()  {
	let _shadowRoot;
	let _id;
    let tmpl = document.createElement('template');
	let widgetName;
	
	//HTML
	tmpl.innerHTML = `<script src="https://openui5.hana.ondemand.com/1.108.20/resources/sap-ui-core.js"
						type="text/javascript"
						id="sap-ui-bootstrap"
						data-sap-ui-libs="sap.m,sap.ui.commons,sap.ui.table,sap.ui.layout,sap.ui.core.mvc.Controller"
						data-sap-ui-theme="sap_bluecrystal"
						data-sap-ui-bindingSyntax="complex"
						ui-compatVersion="edge"
						data-sap-ui-preload="async">
					  </script>
       
					  <script id="view1" type="ui5/xmlview">
					      <mvc:View 
					        controllerName="view1.initial"
					        xmlns:t="sap.ui.table"
					        xmlns="sap.ui.commons"
					        xmlns:mvc="sap.ui.core.mvc" >
					          <t:TreeTable id="tbl" rows="{path:'/',parameters:{arrayNames:['data']}}" >
					              <t:columns>
					                  <t:Column>
					                      <t:label><Label text="name" /></t:label>
					                      <t:template><TextView text="{name}" /></t:template>
					                  </t:Column>
		       
					                  <t:Column>
					                      <t:label><Label text="Arm" /></t:label>
					                      <t:template><TextView text="{description}" /></t:template>
					                  </t:Column>
		       
					                  <t:Column>
					                      <t:label><Label text="product" /></t:label>
					                      <t:template><TextView text="{product}" /></t:template>
					                  </t:Column>                
					
					              </t:columns>
					          </t:TreeTable>
					      </mvc:View>
					  </script>
					
					  <div id="uiArea"></div>`;
	
    class CWTableDrillV2 extends HTMLElement {
		constructor() {
				super(); 
				_shadowRoot = this.attachShadow({
					mode: "open"
				});
				_shadowRoot.appendChild(tmpl.content.cloneNode(true));
				this._JSON = "-";
				this._paramColumns = "-";
			    this.addEventListener("click", event => {
                	var event = new Event("onClick");
                	this.dispatchEvent(event);
            	});
		}

		connectedCallback(){
		}

		disconnectedCallback(){
		}

		onCustomWidgetBeforeUpdate(oChangedProperties) {
		}

		async loadData(JSON, paramColumns){
			//if (JSON != "") {
			console.log("-----**TES 3*---");
				makeTable(JSON, paramColumns)
			//}		
		}

		onCustomWidgetAfterUpdate(oChangedProperties) {
		}

		onCustomWidgetDestroy(){
		}

		//Getters and Setters
		set paramColumns(value) {
			this._paramColumns = value;
		}

		get JSON() {
			return this._JSON;
		}

		set JSON(value) {
			this._JSON = value;
		}

	};
	customElements.define('com-sap-ttable-cwtabledrillv2', CWTableDrillV2);	
	
	function makeTable(JSON,paramColumns) {	

		widgetName = "CWTableDrillV3_1";

        var mapcanvas_divstr = _shadowRoot.getElementById('uiArea');

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

                return Controller.extend("view1.initial", {

                    onInit: function() {
                        
                        console.log('>>>>>>>>>>>>>>>inside onInit');
                        
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
                            var _oModel = new JSONModel(oData);
                            _oModel.setSizeLimit(1000000);
                            
                            // Link the model to the widget
                            this.getView()
                                .setModel(_oModel, that.widgetName);
                            sap.ui.getCore().setModel(_oModel, that.widgetName);
                    }

                });
            });

            
            var foundIndex = Ar.findIndex(x => x.id == widgetName);
            var divfinal = Ar[foundIndex].div;
            console.log(divfinal);

            
            //### THE APP: place the XMLView somewhere into DOM ###
            var oView = sap.ui.xmlview({
                viewContent: jQuery(divfinal).html(),
            });
            oView.placeAt(div);

			oView.placeAt(_shadowRoot.getElementById("uiArea"));
            
        });
		
	}
})();
