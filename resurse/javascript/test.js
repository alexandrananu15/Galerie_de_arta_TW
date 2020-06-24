window.onload=function(){
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
					//in proprietatea responseText am contintul fiserului JSON
					document.getElementById("afisJson").innerHTML=this.responseText;
					var obJson = JSON.parse(this.responseText);
					afiseajaJsonTemplate(obJson);
			}
	};
	//deschid o conexiune cu o cerere de tip get catre server
	//json e pus in folderul static "resurse" deci calea e relativa la acel folder (fisierul e la calea absoluta /resurse/json/studenti.json)
	ajaxRequest.open("GET", "/opere_de_arta.json", true);
	//trimit catre server cererea
	ajaxRequest.send();
  
	function afiseajaJsonTemplate(obJson) {
		console.log(obJson);
			//in acets div voi afisa template-urile
			let container=document.getElementById("afisTemplate");

			//in textTemplate creez continutul (ce va deveni innerHTML-ul) divului "afisTemplate"
			let textTemplate ="";
			//parcurg vetorul de tablouri din obJson
			for(let i=0;i<obJson.tablouri.length;i++){
				//creez un template ejs (primul parametru al lui ejs.render)
				//acesta va primi ca parametru un tablouri din vectorul de tablouri din json {tablouri: obJson.tablouri[i]}
				//practic obJson.tablouri[i] e redenumit ca "tablou" in template si putem sa ii accesam proprietatile: tablou.id etc
				textTemplate+="<div class='templ_tablou'>\
				<p>Id: " +  tablouri[i].id +  "</p>\
				<p>Titlu: " +  tablouri[i].titlu + "</p>\
				<p>Datare: "+ tablouri[i].datare +  "</p>\
				<p>Materiale: " + tablouri[i].materiale + "</p>\
				<p>Curent artistic: " + tablouri[i].curent_artistic + "</p>\
				<p>Descriere: " +  tablouri[i].descriere + "</p>\
				<p>Pictura apreciata de critici: " + tablouri[i].pictura_apreciata_de_critici + "</p>\
				</div>";
			}
			console.log(textTemplate);
			//adaug textul cu afisarea tablourilor in container
			container.innerHTML=textTemplate;
	}
}
