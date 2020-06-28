/*
Niv 2
4. Timp petrecut pe pagina. Folosind localStorage sa se afiseze pe fiecare pagina (de exemplu in footer) numarul de minute si secunde petrecute in total (pe parcursul tuturor vizitarilor) de un utilizator pe pagina curenta (se va afisa pe fiecare pagina a site-ului). Afisajul se va actualiza la fiecare secunda.. Realizati taskul folosind aceeasi functie pentru toate paginile.
12. Alert
13. Nr cuvinte
*/

window.onload=function(){
    Init();
    nr_cuvinte_body();
    var date = new Date().getTime();
    setInterval(function () {
        var now = new Date().getTime();
        var distance = now - date;

        let timpItem = "timp_" + window.location.href;
        if(localStorage.getItem(timpItem) === null)
            localStorage.setItem(timpItem, 0);
        let timp = parseInt(localStorage.getItem(timpItem)) + parseInt(distance);

        localStorage.setItem(timpItem, timp);

        var minutes = Math.floor((localStorage.getItem(timpItem)) / (1000 * 60));
        var seconds = Math.floor((localStorage.getItem(timpItem) % (1000 * 60)) / 1000);

        document.getElementById("timeOnPage").innerHTML = "Timpul petrecut pe pagina: " + minutes + " min " + seconds + " sec";

        date = now;
    }, 1000);
}

function nr_cuvinte_body() {
    var text = document.getElementsByTagName("body")[0].innerText;
    text = text.split('\n');

    var nr_cuv = 0;
    for (var i = 0; i < text.length; i++) {
        text[i] = text[i].split(" ").join(",");
        text[i] = text[i].split(".").join(",");
        text[i] = text[i].split("/").join(",");
        text[i] = text[i].split(",");
        for (var j = 0; j < text[i].length; j++) {
            if (text[i][j] == "") {
                text[i].splice(j, 1);
                j--;
            }
        }
        nr_cuv += text[i].length;
    }
    let div = document.getElementById("nrCuvinte");
    div.innerHTML = "Numarul de cuvinte din body este: " + nr_cuv;
}