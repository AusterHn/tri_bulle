"use strict";
//Auteurs: Codjo AMOUSSOUVI, Aristippe HANOU, Victor SAUTEJEAU
//Exercice 2: Tri à bulle
//Ce programme fait la simulation d'un algorithme
//qui range les nombres d'un tableau dans l'ordre croissant
// suivant la méthode du tri à bulle
//Tableau donnant les lignes de l'algorithme simulé
//Permet d'afficher l'algorithme dans la visualisation
var algo = [
    "1: trié = faux",
    "2: Tant que trié est faux faire",
    "3:     trié = vrai",
    "4:     Pour i de 1 à n-1 faire",
    "5:         Si t[i]>=t[i+1] alors",
    "6:             Echanger t[i] et t[i+1]",
    "7:             trié = faux",
    "8:         Fin si",
    "9:     Fin pour",
    "10: Fin tant que"
];
//Déclaration de la variable qui contiendra le numéro de la ligne de l'algo qui s'exécute
var machine_ligneCourante = 0; //commence à 0 parceque la simulation n'a pas encore débuté
var machine_t = [];
var machine_trié = false;
var machine_i = 0;
var machine_n = 0;
//initialisation d'une machine
function initialiserVM(tailleTableau) {
    //initialisation des variables du programme
    machine_t = [];
    //remplissage du tableau avec des valeurs aléatoires comprises entre 10 et 100
    for (var i = 0; i < tailleTableau; ++i) {
        machine_t[i] = Math.floor(Math.random() * 91) + 10;
    }
    machine_trié = false;
    machine_i = 0;
    machine_n = machine_t.length;
    machine_ligneCourante = 1;
}
//Fonction qui réalise l'échange entre deux valeurs
//Elle sera utile pour faire les échanges de valeurs dans le tableau quand la condition de comparaison est vérifiée 
function echanger(tab, i, j) {
    var tmp = tab[i];
    tab[i] = tab[j];
    tab[j] = tmp;
}
//Définition de la fonction qui exécute un pas dans la simulation de l'algorithme
function makeaStep() {
    if (machine_ligneCourante == 1) {
        //correspond à l'initialisation du booléen trié
        machine_trié = false;
        machine_ligneCourante = 2;
    }
    else if (machine_ligneCourante == 2) {
        //correspond à la conditionnelle tant que trié est faux
        if (machine_trié == false) { /*cas où la condtion de répétition de la boucle est vérifié*/
            machine_ligneCourante = 3;
        }
        else { /*cas où la condition de répétition n'est pas vérifié*/
            machine_ligneCourante = 10;
        }
    }
    else if (machine_ligneCourante == 3) {
        //correspond à l'affectation de l'état true à trié
        machine_trié = true;
        machine_ligneCourante = 4;
    }
    else if (machine_ligneCourante == 4) {
        //correspond à la boucle pour i allant de 1 à n-1
        //initialisation du compteur de boucle à 1
        machine_i = 1;
        if (machine_i <= machine_n - 1) {
            machine_ligneCourante = 5;
        }
        else {
            machine_ligneCourante = 9;
        }
    }
    else if (machine_ligneCourante == 5) {
        //corrrespond à la conditionnelle de comparaison entre les valeurs i et i+1 du tableau
        if (machine_t[machine_i - 1] >= machine_t[machine_i]) {
            machine_ligneCourante = 6;
        }
        else {
            machine_ligneCourante = 8;
        }
    }
    else if (machine_ligneCourante == 6) {
        //correspond à l'échange des valeurs t[i] et t[i+1] si la condition (supérieur ou égale) est vérifié
        echanger(machine_t, machine_i - 1, machine_i);
        machine_ligneCourante = 7;
    }
    else if (machine_ligneCourante == 7) {
        machine_trié = false;
        machine_ligneCourante = 8;
    }
    else if (machine_ligneCourante == 8) {
        //fin de la condition si
        //donc aucune action
        machine_ligneCourante = 9;
    }
    else if (machine_ligneCourante == 9) {
        //correspond à la ligne Fin pour
        machine_i++;
        //test de la condition de la boucle pour à la ligne 4
        //Si i <= n, la boucle pour s'exécute une nouvelle fois
        //sinon fin de la boucle pour
        if (machine_i <= machine_n) {
            machine_ligneCourante = 5;
        }
        else {
            machine_ligneCourante = 10;
        }
    }
    else if (machine_ligneCourante == 10) {
        //correspond à la ligne Fin tant que
        //test de l'état de la  variable booléenne trié
        //si elle est fausse, la boucle s'exécute une nouvelle fois
        //sinon, fin de la boucle tant que
        if (machine_trié == false) {
            machine_ligneCourante = 3;
        }
        else {
            machine_ligneCourante = 11;
        }
    }
}
//Visualisation de la machine virtuelle
//et de l'algorithme
var canvas = document.getElementById("simulation");
var ctx = canvas.getContext("2d");
//police des caractères utilisé
ctx.font = "15px serif";
//fonction d'affichage de l'algorithme
function displayAlgorithm() {
    var algoX = 760, algoY = 100;
    var algoDY = 30;
    ctx.textAlign = "left";
    //affichage de l'algorithme
    //la ligne courante est affichée sur un rectanglede couleur
    //et le texte doit être en gras
    //les autres en noir
    for (var i = 0; i < algo.length; i++) {
        // La position verticale de la ligne est calculée.
        var y = algoY + i * algoDY;
        if (machine_ligneCourante == i + 1) {
            //mettre la police d'écriture en gras
            ctx.font = "bold 16px Arial";
            //Calcul de la longueur de la ligne de l'ago
            //afin de pouvoir ajuster la longueur du rectangle
            var textWidth = ctx.measureText(algo[i]).width;
            // Dessiner un rectangle rouge derrière le texte courant.
            ctx.fillStyle = "red";
            ctx.lineWidth = 5;
            ctx.fillRect(algoX - 5, y - 18, textWidth + 10, 24); // Rectangle ajusté à la taille du texte
            ctx.fillStyle = "black"; // Texte en noir dans le rectangle à bordure rouge
        }
        else {
            ctx.fillStyle = "black"; // Texte normal en noir
            ctx.font = "16px Arial";
        }
        // Afficher le texte
        ctx.fillText(algo[i], algoX, y);
    }
}
//fonction affichant une variable de la machine
function displayVar(x, y, val, title) {
    var varDX = 50, varDY = 30;
    var valVarDX = 25, valVarDY = 20;
    var titleVarDX = 25, titleVarDY = 47;
    //Dessin d'un rectangle à bordure noir
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, varDX, varDY);
    //La valeur de la variable est écrite en bleu dans le rectangle 
    ctx.textAlign = "center";
    ctx.fillStyle = "blue";
    ctx.fillText(val, x + valVarDX, y + valVarDY);
    //le nom de la variable est écrit en vert en dessous du rectangle
    ctx.fillStyle = "green";
    ctx.fillText(title, x + titleVarDX, y + titleVarDY);
}
//fonction qui affiche l'état de la machine virtuelle
function displayVM() {
    var width = 170 / machine_t.length; //calcul de la largeur de chacune des bandes du tableau
    var max_heigth = 330;
    var coeff = 3; //représente le coefficient
    //affichage de toutes les variables du programme
    displayVar(320, 430, String(machine_ligneCourante), "Ligne");
    displayVar(420, 430, String(machine_i), "i");
    displayVar(520, 430, String(machine_n), "n");
    displayVar(620, 430, String(machine_trié), "trié");
    //affiche des cellules du tableau t
    for (var i = 0; i < machine_t.length; i++) {
        // Calcul de la largeur de chaque bande
        var width_1 = 680 / machine_t.length; // Espace total divisé par le nombre d'éléments
        // Calcul de la hauteur proportionnelle
        var height = Math.min(machine_t[i] * coeff, max_heigth);
        // Calcul des coordonnées x et y
        var x = 40 + i * width_1; // Position x en fonction de l'index i
        var y = 330 - height; // Pour que le rectangle "monte" depuis la base 380
        // Dessiner le rectangle
        ctx.strokeRect(x, y, width_1, height);
        // Ajouter le texte centré sur le rectangle
        ctx.fillStyle = "green";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.fillText(machine_t[i].toString(), x + width_1 / 2, y + height / 2);
        ctx.fillStyle = "black";
        ctx.fillText("t[" + (i + 1) + "]", x + width_1 / 2, 360);
    }
}
//fonction qui redessime complètement le canva
function refreshCanevas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    displayVM();
    displayAlgorithm();
}
refreshCanevas();
//contrôleur de simulation
var champTailleTab = document.getElementById("taille_tableau");
var champVitesseSim = document.getElementById("vitesse_simulation");
var boutonInit = document.getElementById("initialiser");
var boutonStep = document.getElementById("un_pas");
var boutonContinue = document.getElementById("continuer");
var boutonBreak = document.getElementById("stop");
if (!champTailleTab || !champVitesseSim || !boutonInit || !boutonStep || !boutonContinue || !boutonBreak) {
    throw new Error("Certains éléments graphiques de la page n'ont pas été trouvés !");
}
var simArrete = true;
//fonction qui initialise la machine virtuelle
function reinit() {
    simArrete = true;
    //récupération de la taille du tablea
    var nb = parseInt(champTailleTab.value, 10);
    //si l'utilisateur ne rentre pas une taille ou rentre un taille inférieur à 1,
    //alors le programme génère aléatoirement une taille comprise entre 1 et 20
    if (isNaN(nb) || nb < 1) {
        nb = Math.floor(Math.random() * 20) + 1;
    }
    //initialisation de la machine virtuelle
    initialiserVM(nb);
    //dessin du canvas
    refreshCanevas();
}
boutonInit.addEventListener("click", reinit);
//fonction qui effectue un pas dans la simulation
function aStep() {
    simArrete = true;
    makeaStep();
    refreshCanevas();
}
boutonStep.addEventListener("click", aStep);
//fonction qui relance la simulation continue
function continuer() {
    simArrete = false;
}
boutonContinue.addEventListener("click", continuer);
//fonction qui stop la simulation
function stop() {
    simArrete = true;
}
boutonBreak.addEventListener("click", stop);
//fonction qui effectue la simulation continue
function simContinue() {
    //variable qui récupère la vitesse d'exécution de la simulation
    //a pour valeur minimum min=1000 et pour valeur maximum max=10000
    //l'intervalle de valeur ici représente donc des millisecondes d'exécution
    //ce qui représente un intervalle de 1 sec à 10 sec
    var vitesse = parseFloat(champVitesseSim.value);
    if (!simArrete) {
        makeaStep();
        refreshCanevas();
        setTimeout(simContinue, vitesse);
    }
    else {
        setTimeout(simContinue, vitesse / 4);
    }
}
simContinue();
