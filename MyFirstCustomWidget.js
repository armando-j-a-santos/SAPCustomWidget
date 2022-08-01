(function () {
	let tmpl = document.createElement('template');
	tmpl.innerHTML = 

	<div id="table", style="width:100%">
		<div class = "FirstTable">
			<div class = "Row1">
				<div class = "Column1">
					Milton
				</div>
				<div class = "Column2">
					Armando
				</div>
				<div class = "Column3">
					Prodigy
				</div>
				<div class = "Column4">
					Consult
				</div>
			</div>
		</div>
	</div>

	<style>

	div.Row1{
		display: table-row; width: 100%;
		white-espace: nowrap;
		vertical-align: top;
		padding: 0;	
		margin: 0;
	}

	div.Column1{
		display: table-cell; height: 100%; min-width: 25%; backgorund-color: #CCD9FF;
		vertical-align: top;
		padding: 0;
		border: 1px solid black;
		margin:0;
	}

	div.Column2{
		display: table-cell; height: 100%; min-width: 25%; backgorund-color: #CCD9FF;
		vertical-align: top;
		padding: 0;
		border: 1px solid black;
		margin:0;
	}

	div.Column3{
		display: table-cell; height: 100%; min-width: 25%; backgorund-color: #CCD9FF;
		vertical-align: top;
		padding: 0;
		border: 1px solid black;
		margin:0;
	}

	div.Column4{
		display: table-cell; height: 100%; min-width: 25%; backgorund-color: #CCD9FF;
		vertical-align: top;
		padding: 0;
		border: 1px solid black;
		margin:0;
	}

	</style>;

	constructor() {
		super();
		this._shadowRoot = this.attachShadow({mode: "open"});
		this._shadowRoot.appendChild(tmpl.content,cloneNode(true));
		this._values = [];
		this._keys = [];
		this.currentFocus;

		this._milton = this._shadowRoot.getElementById("table");

		this._listStyle = "font-family: Arial; font-size: 14px; color: rgb(51,51,51)"
		this._listLimit = 5; 
	}


	addITem(key, text){
		let index = this._keys.indexOf(key);
		if(index === -1){
			this._values.push(text);
			this._keys.push(key);
		}
	}

})();


