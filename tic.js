let flag = 1;
let numberOfMoves = 0;

function gameOver() {
	let b1 = document.getElementById("b1").value;
	let b2 = document.getElementById("b2").value;
	let b3 = document.getElementById("b3").value;
	let b4 = document.getElementById("b4").value;
	let b5 = document.getElementById("b5").value;
	let b6 = document.getElementById("b6").value;
	let b7 = document.getElementById("b7").value;
	let b8 = document.getElementById("b8").value;
	let b9 = document.getElementById("b9").value;
	if((b1 == b2 && b2 == b3 && b1 != '') || (b4 == b5 && b5 == b6 && b4 != '') ||
	   (b7 == b8 && b8 == b9 && b7 != '') || (b1 == b4 && b4 == b7 && b1 != '') ||
	   (b2 == b5 && b5 == b8 && b2 != '') || (b3 == b6 && b6 == b9 && b3 != '') ||
	   (b1 == b5 && b5 == b9 && b1 != '') || (b3 == b5 && b5 == b7 && b3 != '')) {
	       return true;
	}
	return false;
}

function myfunc() {
	if(gameOver()) {
		if(flag == 1) {
			document.getElementById('print').innerHTML = "Player O Won";
			window.alert('Player O Won');
		}
		else {
			document.getElementById('print').innerHTML = "Player X Won";
			window.alert('Player X Won');
		}
		document.getElementById("b1").disabled = true;
		document.getElementById("b2").disabled = true;
		document.getElementById("b3").disabled = true;
		document.getElementById("b4").disabled = true;
		document.getElementById("b5").disabled = true;
		document.getElementById("b6").disabled = true;
		document.getElementById("b7").disabled = true;
		document.getElementById("b8").disabled = true;
		document.getElementById("b9").disabled = true;
	}
	else if (numberOfMoves == 9) {
		document.getElementById('print').innerHTML = "Match Tie";
		window.alert('Match Tie');
	}
	else {
		if (flag == 1) {
			document.getElementById('print').innerHTML = "Player X Turn";
		}
		else {
			document.getElementById('print').innerHTML = "Player O Turn";
			if(document.getElementById('ops').value == "cvp"){
				computerTurn();
			}
		}
	}
}

function resetGrid(){
	location.reload();
    for(let i=1;i<10;i++){
        document.getElementById("b" + i).value = '';
    }
}

function writeOnGrid(a){
	if(flag == 1){
		document.getElementById(a).value = "X";
		flag = 0;
	}
	else{
		document.getElementById(a).value = "O";
		flag = 1;
	}
	document.getElementById(a).disabled = true;
	numberOfMoves++;
	myfunc();
}

function minimax(moves, isComputer, computerMove, humanMove){
	let score = 0;
	let bestScore = 0;
	if(gameOver()){
		if(isComputer){
			return -10;
		}
		return 10;
	}
	if(moves == 9){
		return 0;
	}
	if(isComputer){
		bestScore = -1000;
		for(let i=1;i<10;i++){
			if(document.getElementById("b" + i).value == ''){
				document.getElementById("b" + i).value = computerMove;
				score = minimax(moves+1, false, computerMove, humanMove);
				document.getElementById("b" + i).value = '';
				if(score > bestScore){
					bestScore = score;
				}
			}
		}
		return bestScore;
	}
	bestScore = 1000;
	for(let i=1;i<10;i++){
		if(document.getElementById("b" + i).value == ''){
			document.getElementById("b" + i).value = humanMove;
			score = minimax(moves+1, true, computerMove, humanMove);
			document.getElementById("b" + i).value = '';
			if(score < bestScore){
				bestScore = score;
			}
		}
	}
	return bestScore;
}

function bestMove(moves, computerMove, humanMove){
	let n = -1;
	let score = 0;
	let bestScore = -1000;
	for(let i=1;i<10;i++){
		if(document.getElementById("b" + i).value == ''){
			document.getElementById("b" + i).value = computerMove;
			score = minimax(moves+1, false, computerMove, humanMove);
			document.getElementById("b" + i).value = '';
			if(score > bestScore){
				bestScore = score;
				n = i;
			}
		}
	}
	return n;
}

function computerTurn(){
	let n = bestMove(numberOfMoves, 'O', 'X');
	writeOnGrid("b" + n);
}