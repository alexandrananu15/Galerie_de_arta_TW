var express = require('express');/*include modulul express
memorand in variabila express obiectul asociat modulului(exportat de modul)*/
var path = require('path');
var formidable=require('formidable');
var session=require('express-session');
var crypto=require('crypto');
var fs=require('fs');
var app = express();

// pentru folosirea ejs-ului 
app.set('view engine', 'ejs');

console.log(__dirname);//calea catre radacina proiectului
app.use(express.static(path.join(__dirname, "resurse")))
//din acest moment toate caile catre fisierele statice le scriem relativ la folderul resurse

app.use(session({
    secret: "parola_sesiune",
    resave: true,
    saveUninitialized: false
}))

/*
app.post('/inreg', function(req, res) {
	var formular= new formidable.IncomingForm()
	  formular.parse(req, function(err, fields, files){
		  //files provine din inputurile de tip file <input type="file"....
		  //fields sunt toate celelalte
		  //in fields proprietatile sunt valorile atributelor name din inputurile din formular
		  // <input type="text" name="username" 
		  console.log(fields.username)
		  fisierUseri=fs.readFileSync("resurse/json/useri.json");
		  var parolaCriptata;
		  //al doilea argument e parola(cheia) de criptare
		  var algoritmCriptare=crypto.createCipher('aes-128-cbc',"parola_criptare");
		  parolaCriptata=algoritmCriptare.update(fields.password, "utf-8", "hex");
		  parolaCriptata+=algoritmCriptare.final("hex");
		  obUseri= JSON.parse(fisierUseri);
		  var userNou= {
			id:obUseri.lastId,
			nume:fields.nume,
			username:fields.username,
            email:fields.email,
            parola:parolaCriptata,
            dataInreg: new Date(),
            rol:"user",
            artisti_pref: fields.artisti_pref
			  }
		  obUseri.useri.push(userNou);
	  obUseri.lastId++;
		  var jsonNou=JSON.stringify(obUseri);
		  fs.writeFileSync("resurse/json/useri.json",jsonNou );
		  res.redirect("/")
	  })
  })

  app.post('/LogIn4', function(req, res) {
	var formular= new formidable.IncomingForm()
	  formular.parse(req, function(err, fields, files){
  
		  fisierUseri=fs.readFileSync("resurse/json/useri.json");
		  var parolaCriptata;
		  //al doilea argument e parola(cheia) de criptare
		  var algoritmCriptare=crypto.createCipher('aes-128-cbc',"parola_criptare");
		  parolaCriptata=algoritmCriptare.update(fields.parola, "utf-8", "hex");
		  parolaCriptata+=algoritmCriptare.final("hex");
		  obUseri= JSON.parse(fisierUseri);
		var utiliz= obUseri.useri.find(function(u) {
		return u.username == fields.username && parolaCriptata == u.parola;
	  });
		  //find returneaza null daca nu gaseste elementul cu conditia data
		  if(utiliz){
			   console.log(fields.logat);
			  //setez datele de sesiune
			  req.session.utilizator=utiliz;
			  console.log("Exista utilizatorul")
			  //render primeste pe al doilea parametru date (organizate sub forma unui obiect) care pot fi transmise catre ejs (template) 
			  res.render("html/index", {username: utiliz.username})
		  }
  
  
		  //res.redirect("/")
	  })
  })
*/

// cand se face o cerere get catre pagina de index 
app.get('/', function(req, res) {
	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/index');
});



//---------------tratare cereri post------------------
//<form method="post" action="/register"
 app.post("/inreg", function(req,res){
	//preiau obiectul de tip formular
	var form=new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){

		//proprietatile din fields sunt valorile atributelor name din inputurile formularului
		var continutFisier= fs.readFileSync("useri.json")
		var obUseri=JSON.parse(continutFisier);
		var parolaCriptata;
		var algoritmCriptare= crypto.createCipher("aes-128-cbc", "cheie_pentru_criptare");
		parolaCriptata=algoritmCriptare.update(fields.password, "utf8", "hex");
		parolaCriptata+=algoritmCriptare.final("hex")
		var userNou={
			id:obUseri.lastId,
			nume:fields.nume,
			username:fields.username,
            email:fields.email,
            parola:parolaCriptata,
            dataInreg: new Date(),
            rol:"user",
            artisti_pref: fields.artisti_pref
		}
		obUseri.lastId += 1;
		obUseri.useri.push(userNou);
		var jsonNou=JSON.stringify(obUseri);
		fs.writeFileSync("useri.json", jsonNou);
		console.log(jsonNou);
		res.redirect("/");
	})
});


app.post("/LogIn4", function(req,res){
	//preiau obiectul de tip formular
	var form=new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){

		//proprietatile din fields sunt valorile atributelor name din inputurile formularului
		var continutFisier= fs.readFileSync("useri.json");
		var obUseri=JSON.parse(continutFisier);
		var parolaCriptata;
		var algoritmCriptare= crypto.createCipher("aes-128-cbc", "cheie_pentru_criptare");
		parolaCriptata=algoritmCriptare.update(fields.parola, "utf-8", "hex");
		parolaCriptata+=algoritmCriptare.final("hex")

		//find returneaza primul element pentru care functia data ca parametru returneaza true (e indeplinita conditia de cautare)
		//daca nu gaseste un element cu conditia ceruta returneaza null
		var utiliz = obUseri.useri.find(function(el){
			return el.email == fields.email && el.parola == parolaCriptata;
		});

		if(utiliz){
			console.log("exista utilizatorul!")
			req.session.utilizator=utiliz;

			//parametrul al doilea al lui render  contine date de transmis catre ejs
			res.render("html/index", {username: utiliz.username});
		}
	})
});


app.get("/logout", function(req, res) {
    req.session.destroy();
    res.redirect("/")
});

app.get('/', function(req, res) {
	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/index');
});

app.get("/*",function(req, res){
	//err este null daca randarea s-a terminat cu succes, si contine eroarea in caz contrar (a survenit o eroare)
	//rezRandare - textul in urma randarii (compilarii din ejs in html)
  console.log(req.url);
  res.render("html"+req.url, function(err, rezRandare){
		if (err){
			if(err.message.includes("Failed to lookup view")){
				res.status(404).render("html/404");
			}
			else{
				throw err;
			}
		}
		else{
			res.send(rezRandare);
		}
	});
})

app.use(function(req, res){
    res.status(404).render("html/404");
})

app.listen(8080);
console.log('Aplicatia se va deschide pe portul 8080.');
