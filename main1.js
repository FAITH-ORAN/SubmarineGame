// chaque joueur choisi un déplacement
// la defense vient en premier (joueur principal apres le u-36 )
//l'attack vient en deuxième mouvement (joueur principal apres le U-36)
// la santé diminue à mesure que les attaques arrivent



// variables globales >>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var yourMove;
var compMove;
var savedCompMove;
var yourHealth = 100;
var compHealth = 100;

//Compteurs de tours >>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var totRounds = 0;

//Doucment réécrit >>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

var res;
var playByPlay = document.getElementById('announcements');
var yourHealthBar = document.getElementById('yourHealthBar');
var compHealthBar = document.getElementById('compHealthBar');
var attackButton = document.getElementById('attack');
var counterButton = document.getElementById('defense');
var playAgain = document.getElementById('playAgain');

// load >>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function enableButtons() {
	attackButton.disabled = false;
	counterButton.disabled = false;
}

//se déplacer >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// Function partager>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//
//déclenche le combat dans le HTML
function fight(id) {
	addRound();
	compMove(id);
	healthChange();
	gameOver();
}
// ajoute un tour aux compteurs ronds
function addRound() {
	totRounds += 1;
}

//ajoute la contre-action pour attaquer
function counter(y, c) {
	var move = Math.floor((Math.random()*5));
	if (move >= 3 && y === 'attack') {
		res = "Le sous-marin U-36 a réussi! Vous avez subi 10 dégâts";
		yourHealth -= 10;
	} else if (move >= 3 && y === 'counter') {
		res = 'Votre defense à réussi! le sous-marin U-36 a subi 10 dégâts';
		compHealth -= 10;
	} else if (move < 3 && y === 'attack') {
		res = "le U-36 à échoué! Vous avez infligé 15 dégâts!";
		compHealth -= 15;
	} else if (move < 3 && y === 'counter') {
		res = 'Votre défense à échoué vous avez subi 15 dégâts!';
		yourHealth -= 15;
	}

}

// Affiche les résultats du tour
function roundResults(res) {
	playByPlay.innerHTML += res + "<br>";
}

function healthChange() {
	yourHealthBar.style.width = yourHealth + "%";
	compHealthBar.style.width =  compHealth + "%";
}

function gameOver() {
	if (yourHealth === 0) {
		res = 'vous avez perdu!';
		roundResults(res);
		attackButton.disabled = true;
		counterButton.disabled = true;
		playAgain.disabled = true;
	}else if(compHealth === 0) {
		res = 'U-36 à perdu!';
		roundResults(res);
		attackButton.disabled = true;
		counterButton.disabled = true;
		playAgain.disabled = true;
	}
}

//le jeu >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Prend les mouvements du joueur et en génère un pour la composition, puis exécute l'étape de dégâts
function compMove(id) {
	var move = Math.floor((Math.random()*4)+1);
	if (move <= 3) {
		savedCompMove =  'attack';
	} else {
		savedCompMove = 'counter';
	};
	res = ('votre déplacement est <span>'+ id + '</span> et le déplacement de U-36 est  <span>' + savedCompMove + '</span> en tour ' + totRounds);
	damageStep(id, savedCompMove);
	roundResults(res);

}

// traite les mouvements vers un résultat
function damageStep(y, c) {
	if ( y === 'attack' && c === 'attack') {
		res = 'Les deux joueurs ont subi des dégâts';
		if (compHealth >= 10 && yourHealth >= 10) {
			compHealth -= 10;
			yourHealth -= 10;
		} else {
			compHealth = 0;
			yourHealth = 0;
		}
	} else if ( y === 'counter' && c === 'counter') {
		res = 'Positions défensives prises en vain';
	} else if ( y === 'attack' && c === 'counter') {
		res = 'U-36 a pris une position défensive et se prépare à contrer';
		counter(y, c);
	} else if ( y === 'counter' && c === 'attack') {
		res = 'Vus êtes en position defensive et vous vous preparer à contrer';
		counter(y, c);
	}
}


window.onload=enableButtons();