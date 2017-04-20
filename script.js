function grayOut(tileNum) {
	var tileId = "#tile" + tileNum;
	$(tileId).toggleClass("tileFade");
	//document.getElementById(tileId).style.backgroundColor = "#bbb";
}
$(document).ready(function() {
	$(".flag").lettering();
});

var totalLeft = 0, totalOriginal = 0, score = 45, begin = true, roundContinue = false;
var tilesUp = [null];

for(var i = 1; i < 10; i++) {
	var tempObj = {
		num: i,
		isUp: true,
		inPlay: true
	}
	tilesUp.push(tempObj); //first indicates if it is in play, second indicates if it is up
}

var game = {
	spin: function() {
		totalLeft = 0;
		totalOriginal = 0;
		this.diceSpin("num1");
		this.diceSpin("num2");
		//document.getElementById("totalText").innerHTML = "You must knock down "+ totalLeft + " more numbers.";
	},
	diceSpin: function(die) {
		randNum = Number(Math.floor(Math.random() *6) + 1);
		console.log(die + " " + randNum);
		//$(die).val(randNum);
		document.getElementById(die).innerHTML = randNum;
		totalLeft += randNum;
		totalOriginal += randNum;
		document.getElementById("score").innerHTML = "Score: " + score;
	},
	tileClick: function(tileNum) {
		if (tilesUp[tileNum].inPlay) {
			grayOut(tileNum);
			tilesUp[tileNum].isUp = !tilesUp[tileNum].isUp;
		}
			this.recalc();
	},
	recalc: function() {
		totalLeft = totalOriginal;
		for(i = 1; i < 10; i++) {
			//does not reset
			if (tilesUp[i].inPlay && !tilesUp[i].isUp) {
				totalLeft -= i;
			}
		}
				if (totalLeft > 0) {
				document.getElementById("totalText").innerHTML = "You must knock down "+ totalLeft + " more numbers.";
				roundContinue = false;
			} else if (totalLeft == 0) {
				document.getElementById("totalText").innerHTML = "You have knocked down enough numbers.";
				roundContinue = true;
			} else {
			document.getElementById("totalText").innerHTML = "You must put back "+ -totalLeft + " more numbers.";
			roundContinue = false;
		}
	},
	submit: function() {
		if (roundContinue) {
			roundContinue = false;
			score -= totalOriginal;
			for(i = 1; i < 10; i++) {
			//does not reset
			if (tilesUp[i].inPlay && !tilesUp[i].isUp) {
				tilesUp[i].inPlay = false;
				document.getElementById("tile" + i).style.display = "none";
			}
		}
			// this.spin();
			// this.recalc();
		if (score !== 0) {
			this.spin();
			this.recalc();
		} else {
			score = 0;
			document.getElementById("totalText").innerHTML = "You shut the box!";
			document.getElementById("score").innerHTML = "Score: " + score;
		}
		} else if (begin) {
			this.spin();
			begin = false;
			this.recalc();
		}
	},
	reset: function() {
		
	}
}
game.spin();
game.recalc();
