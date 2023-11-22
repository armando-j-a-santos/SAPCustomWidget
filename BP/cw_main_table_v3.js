(function()  {
	let _shadowRoot;
	let _id;
    	let tmpl = document.createElement('template');
	
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
	sap.ui.controller("view1.initial", {
	    onInit : function(oEvent) {
		console.log("hereeeeee 1111");
	        var oModel = new sap.ui.model.json.JSONModel();
	        oModel.setData({
	            data: [
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
	            ]
	        });
	        this.getView().setModel(oModel);
	    },
	
	    onAfterRendering : function() {
	    }
	});
	  
	var app = new sap.m.App({});
	
	var oView = sap.ui.xmlview({
	    viewContent: jQuery("#view1").html()
	});
	
	app.addPage(oView);
	//app.placeAt("uiArea");

	console.log("hereeeeee 2222");

	//var myDiv = document.createElement('div');		
	//_shadowRoot.appendChild(myDiv);			
	app.placeAt(_shadowRoot.getElementById("uiArea"));
		
	}
})();
