let obJson;

function Info(text, okText = "OK") //myalert_a
{
    let wrapper = document.createElement("div");
    wrapper.classList.add("infoAlertWrapper");
    let div = document.createElement("div");
    div.classList.add("infoAlert");
    div.innerHTML = text;
    let okButton = document.createElement("button");
    okButton.classList.add("infoAlert-okButton");
    okButton.innerHTML = okText;
    okButton.onclick = function() {
        document.body.removeChild(wrapper);
    };

    div.appendChild(okButton);
    wrapper.appendChild(div);
    document.body.appendChild(wrapper);  
}

function Info2(text, okText = "OK") //myalert_b
{
    let wrapper = document.getElementById("errorAlertWrapper");
    let div = document.getElementById("errorAlert");
    let okButton = document.getElementById("errorAlert-okButton");
    let textDiv = document.getElementById("errorAlert-text");
    textDiv.innerHTML = text;
    okButton.innerHTML = okText;
    wrapper.style.display = "inline";
    okButton.onclick = function() {
        wrapper.style.display = "none";
    };
}

Init();

function Init()
{
	if(localStorage.getItem("obJson") == null)
		Reload();
	
	else
	{
		obJson = JSON.parse(localStorage.getItem("obJson"));
		afiseazaJsonTemplate();
	}
	setInterval(function() {
		if(obJson.tablouri.length > 0)
		{
			let ind = Math.floor(Math.random() * obJson.tablouri.length);
			if(Math.random() > 0.5)
				Info("Tabloul " + obJson.tablouri[ind].id + " a fost scos la licitatie.");
			else
				Info2("Tabloul " + obJson.tablouri[ind].id + " a fost vandut.");
			obJson.tablouri.splice(ind, 1);
			afiseazaJsonTemplate();
		}
	}, 1000);
}

function Reload()
{
	//creez un obiect de tip XMLHttpRequest cu care pot transmite cereri catre server
	var ajaxRequest = new XMLHttpRequest();


	//la schimbarea starii obiectului XMLHttpRequest (la schimbarea proprietatii readyState)
	/* stari posibile:
	0 - netrimis
	1 - conexiune deschisa
	2 - s-au transmis headerele
	3 - se downleadeaza datele (datele sunt impartite in pachete si el primeste cate un astfel de pachet)
	4 - a terminat
	*/
	ajaxRequest.onreadystatechange = function() {
			//daca am primit raspunsul (readyState==4) cu succes (codul status este 200)
			if (this.readyState == 4 && this.status == 200) {
					//in proprietatea responseText am continutul fiserului JSON
					obJson = JSON.parse(this.responseText);
					afiseazaJsonTemplate();
			}
	};
	//deschid o conexiune cu o cerere de tip get catre server
	//json e pus in folderul static "resurse" deci calea e relativa la acel folder (fisierul e la calea absoluta /resurse/json/studenti.json)
	ajaxRequest.open("GET", "/opere_de_arta.json", true);
	//trimit catre server cererea
	ajaxRequest.send();
}

var oldFiltreaza = -1;
function afiseazaJsonTemplate(tip = 0, filtreazaId = -1) {
	//in acest div voi afisa template-urile
	let container=document.getElementById("afisTemplate");

	if(filtreazaId == -1)
		filtreazaId = oldFiltreaza;

	if(tip == 1)
	{
		obJson.tablouri.sort((a, b) => a.id - b.id);
	}
	else if(tip == -1)
	{
		obJson.tablouri.sort((a, b) => b.id - a.id);
	}
	else if(tip == 2)
	{
		obJson.tablouri.sort((a, b) => a.pret - b.pret);
	}
	else if(tip == 3)
	{
		obJson.tablouri.sort((a, b) => b.pret - a.pret);
	}
	
	while(container.hasChildNodes())
	{
		container.removeChild(container.firstChild);
	}
	
	//parcurg vetorul de tablouri din obJson
	for(let i=0;i<obJson.tablouri.length;i++){
		if(filtreazaId == -1 || obJson.tablouri[i].id == filtreazaId)
		{
			//creez un template ejs (primul parametru al lui ejs.render)
			//acesta va primi ca parametru un tablouri din vectorul de tablouri din json {tablouri: obJson.tablouri[i]}
			//practic obJson.tablouri[i] e redenumit ca "tablou" in template si putem sa ii accesam proprietatile: tablou.id etc
			let elem = document.createElement("div");
			//se modifica proprietatea innerHTML
			elem.innerHTML = "<h1>Id: " +  obJson.tablouri[i].id +  "</h1>\
							 <h1>Titlu: " +  obJson.tablouri[i].titlu + "</h1>\
							 <p>Datare: "+ obJson.tablouri[i].datare +  "</p>\
							 <p>Materiale: " + obJson.tablouri[i].materiale + "</p>\
							 <p>Curent artistic: " + obJson.tablouri[i].curent_artistic + "</p>\
							 <p>Descriere: " +  obJson.tablouri[i].descriere + "</p>\
							 <p>Pictura apreciata de critici: " + obJson.tablouri[i].pictura_apreciata_de_critici + "</p>\
							 <p>Pret: " + obJson.tablouri[i].pret + "</p>";
			let removeButton = document.createElement("button");
			//se modifica proprietatea innerHTML si proprietatea onclick
			removeButton.innerHTML = "Temporal Remove";
			removeButton.onclick = function() {
				container.removeChild(elem);
			}
			elem.appendChild(removeButton);
			//modific stilul unui element
			elem.classList.add("templ_tablou");
			container.appendChild(elem);
		}
	}
	localStorage.setItem("obJson", JSON.stringify(obJson));
	oldFiltreaza = filtreazaId;
	UpdateMedie();
}

function SorteazaCrescator()
{
	afiseazaJsonTemplate(1);
}

function SorteazaDescrescator()
{
	afiseazaJsonTemplate(-1);
}

function CrescatorPret()
{
	afiseazaJsonTemplate(2);
}

function DesCrescatorPret()
{
	afiseazaJsonTemplate(3);
}

function ResetSortare()
{
	Reload();
}

function Filtreaza()
{
	let id = document.getElementById("inputId").value;
	afiseazaJsonTemplate(0, id);
}

function UpdateMedie()
{
	let suma = 0;
	for(let i=0;i<obJson.tablouri.length;i++){
		suma += obJson.tablouri[i].pret;
	}
	document.getElementById("medie").innerHTML = parseInt(obJson.tablouri.length) == 0 ? 0 : (parseInt(suma) / parseInt(obJson.tablouri.length));
}