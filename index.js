var express = require('express');/*include modulul express
memorand in variabila express obiectul asociat modulului(exportat de modul)*/
var path = require('path');
var app = express();

// pentru folosirea ejs-ului 
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "resurse")));

// cand se face o cerere get catre pagina de index 
app.get('/', function(req, res) {
	/*afiseaza(render) pagina folosind ejs (deoarece este setat ca view engine) */
    res.render('html/index');
});

app.get('/Galerie1', function(req, res){ 
    res.render('html/pagina_proiect_1_web')
});

app.get('/Curente2', function(req, res){ 
    res.render('html/pagina2_proiect')
});

app.get('/Sculpturi3', function(req, res){ 
    res.render('html/pagina_proiect_3')
});

app.get('/LogIn4', function(req, res){ 
    res.render('html/pagina_proiect_5')
});

app.get('/inreg', function(req, res){ 
    res.render('html/pagina_inregistrare')
});

app.use(function(req, res){
    res.status(404).render('html/404');
});

app.listen(8080);
console.log('Aplicatia se va deschide pe portul 8080.');
