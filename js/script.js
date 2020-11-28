var bright = new Map();
var selection = [];
var cliquable = true;

function sleep(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}

function allumer(list) {
	list.forEach(function(element){
		document.getElementById('date'+element).classList.remove('selection');
		document.getElementById('date'+element).classList.add('allume');
		bright.set(element, true);
		selection = [];
		verif();
	});
}

function interrupteur(date) {
	if (!bright.get(date) && cliquable){
		cliquable = false;
		if (selection.length == 0){
			document.getElementById('date'+date).classList.add('selection');
			selection.push(date);
		}
		else{
			if (selection.includes(date)){
				document.getElementById('date'+date).classList.remove('selection');
				selection.splice(selection.indexOf(date), 1);
			}
			else{
				somme = selection[0] + date;
				if (selection.length < 2){
					document.getElementById('date'+date).classList.add('selection');
					selection.push(date);
					cliquable = false;
					if (somme < 25 && !bright.get(somme)){
						setTimeout(allumer, 500, [selection[0], date, somme]);
					}
				}
			}
		}
		setTimeout(function () {cliquable = true;}, 500);
	}
}

function verif() {
	var bool = true;
	for (let i = 1; i < 25; i++) {
		bool = bool && bright.get(i);
	}
	if (bool){
		alert("C'est gagné !")	
	}
}

function reset(){
	selection = [];
	for (let i = 1; i < 25; i++) {
		bright.set(i, false);
		document.getElementById('date'+i).classList.remove('selection');
		document.getElementById('date'+i).classList.remove('allume');
	}
}

window.onload = reset;