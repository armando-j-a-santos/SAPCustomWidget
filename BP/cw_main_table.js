(function()  {
	let _shadowRoot;
	let _id;
    	let tmpl = document.createElement('template');
	
	tmpl.innerHTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    	<meta charset="UTF-8" />
	<script src="https://openui5.hana.ondemand.com/resources/sap-ui-core.js"
		type="text/javascript"
		id="sap-ui-bootstrap"
		data-sap-ui-libs="sap.m,sap.ui.commons,sap.ui.table,sap.ui.layout,sap.ui.core.mvc.Controller"
		data-sap-ui-theme="sap_bluecrystal"
		data-sap-ui-bindingSyntax="complex"
		ui-compatVersion="edge"
		data-sap-ui-preload="async">
	</script>
  </head>
  <body>
      	<div id="dataTableCustom99"></div>
  </body>
</html>	`;

	
    class CWTableDrill extends HTMLElement {
		constructor() {
			super(); 
			_shadowRoot = this.attachShadow({
				mode: "open"
			});
			_shadowRoot.appendChild(tmpl.content.cloneNode(true));

			_root = this._shadowRoot.getElementById('dataTableCustom99')
			_props = {}
			
			//this._JSON = "-";
			//this._paramColumns = "-";
			/*
			this.addEventListener("click", event => {
                		var event = new Event("onClick");
                		this.dispatchEvent(event);
            		});
			*/
			
			var ModelA = {  "catalog": {
			"clothing": {
			  "categories": [
				{"name1": "Women", "amount": 160.99, "currency": "EUR", "size": "S", "selected": "X", "categories": [
				  {"name1":"Clothing", "categories": [
					 {"name1": "Dresses", "amount": 16.99, "currency": "EUR", "size": "S", "selected": "X", 
					  "categories": [
					 {"name1": "Casual Red Dress", "amount": 16.99, "currency": "EUR", "size": "S", "selected": "X"},
					 {"name1": "Short Black Dress", "amount": 47.99, "currency": "EUR", "size": "M"},
					 {"name1": "Long Blue Dinner Dress", "amount": 103.99, "currency": "USD", "size": "L"}
					]},
					{"name1": "Tops", "categories": [
					  {"name1": "Printed Shirt", "amount": 24.99, "currency": "USD", "size": "M"},
					  {"name1": "Tank Top", "amount": 14.99, "currency": "USD", "size": "S"}
					]},
					{"name1": "Pants", "categories": [
					  {"name1": "Red Pant", "amount": 32.99, "currency": "USD", "size": "M"},
					  {"name1": "Skinny Jeans", "amount": 44.99, "currency": "USD", "size": "S"},
					  {"name1": "Black Jeans", "amount": 99.99, "currency": "USD", "size": "XS"},
					  {"name1": "Relaxed Fit Jeans", "amount": 56.99, "currency": "USD", "size": "L"}
					]},
					{"name1": "Skirts", "categories": [
					  {"name1": "Striped Skirt", "amount": 24.99, "currency": "USD", "size": "M"},
					  {"name1": "Black Skirt", "amount": 44.99, "currency": "USD", "size": "S"}
					]}
				  ]},
				  {"name1":"Jewelry", "categories": [
					  {"name1": "Necklace", "amount": 16.99, "currency": "USD"},
					  {"name1": "Bracelet", "amount": 47.99, "currency": "USD"},
					  {"name1": "Gold Ring", "amount": 399.99, "currency": "USD"}
					]},
				  {"name1":"Handbags", "categories": [
					{"name1": "Little Black Bag", "amount": 16.99, "currency": "USD", "size": "S"},
					{"name1": "Grey Shopper", "amount": 47.99, "currency": "USD", "size": "M"}
				  ]},
				  {"name1":"Shoes", "categories": [
					{"name1": "Pumps", "amount": 89.99, "currency": "USD"},
					{"name1": "Sport Shoes", "amount": 47.99, "currency": "USD"},
					{"name1": "Boots", "amount": 103.99, "currency": "USD"}
				  ]}
				]}]}
				}};
			var treeTable = new sap.ui.table.TreeTable({
				title:"Tree Table",
				selectionMode : sap.ui.table.SelectionMode.None,
				editable:true,
				ariaLabelledBy:"title",
				toggleOpenState: function (oEvent) {}
			});
			var myModel = new sap.ui.model.json.JSONModel(ModelA);
			treeTable.setModel(myModel);
			treeTable.addColumn(new sap.ui.table.Column({
				label: new sap.ui.commons.Label({text: "Categories - AAA"}),
				template: new sap.m.Text({ text : "{name1}"}),
				sortProperty: "NscItem"}));
			treeTable.addColumn(new sap.ui.table.Column({
				label: new sap.ui.commons.Label({text: "Armando"}),
				template: new sap.m.Text({ text : "{amount}"}),
				sortProperty: "NscItem"}));
			treeTable.addColumn(new sap.ui.table.Column({
				label: new sap.ui.commons.Label({text: "SANTOS"}),
				template: new sap.m.Text({ text : "{currency}"}),
				sortProperty: "NscItem"}));
			treeTable.addColumn(new sap.ui.table.Column({
				label: new sap.ui.commons.Label({text: "Size"}),
				template: new sap.m.Text({ text : "{size}"}),
				sortProperty: "NscItem"}));
			treeTable.bindRows("/catalog/clothing/");
			//treeTable.placeAt("dataTableArmando");
			
			var dataTable = document.createElement('div');		
			//dataTable.slot = "content";
			_shadowRoot.appendChild(dataTable);		
			//_shadowRoot.querySelector("#dataTable").id = "_dataTable";	
			
			treeTable.placeAt(_shadowRoot.getElementById("dataTableCustom99"));
		
		}

		connectedCallback(){
		}

		disconnectedCallback(){
		}

		onCustomWidgetBeforeUpdate(oChangedProperties) {
		}

		async loadData(JSON, paramColumns){
			//if (JSON != "") {
			//	makeTable(JSON, paramColumns);
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
	customElements.define('com-sap-ajmlds-cwtabledrill', CWTableDrill);	
	
	function makeTable(JSON,paramColumns) {	
	}
})();

