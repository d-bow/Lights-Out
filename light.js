var numLights = 9;
var lights = [];
var lightSwitches = document.querySelectorAll(".lbutton");
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();
resetButton.addEventListener("click", reset);

function init() {
	setupModeButtons();
	reset();
}

function setupModeButtons() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			modeButtons[2].classList.remove("selected");
			this.classList.add("selected");
			lightSwitches.forEach(function(light) {
					light.classList.remove('easy');
					light.classList.remove('normal');
					light.classList.remove('hard');
			});
			if(this.textContent === "Easy") {
				numLights = 9;
				lightSwitches.forEach(function(light) {
					light.classList.add('easy');
				});
			} else if(this.textContent === "Normal") {
				numLights = 16;
				lightSwitches.forEach(function(light) {
					light.classList.add('normal');
				});
			} else {
				numLights = 25;
				lightSwitches.forEach(function(light) {
					light.classList.add('hard');
				});
			}
			reset();
		});
	}
}

function setupLights() {
	$('.lbutton').on('click',function() {
			var myLight = $(this).attr("id");
			switchLight(myLight);
			if (checkWin()) {
				messageDisplay.textContent = "YOU WIN!";
				$('.lbutton').off('click');
				resetButton.textContent = ("Play again?");
			}
	});
}

function reset() {
	$('.lbutton').off('click');
	lights = fillBoard(numLights);
	for(var i = 0; i < lightSwitches.length; i++) {
		if(lights[i]) {
			lightSwitches[i].style.display = "block";
			if (lights[i] === "on") {
				lightSwitches[i].classList.add("on");
			} else {
				lightSwitches[i].classList.remove("on");
			}
		} else {
			lightSwitches[i].style.display = "none";
		}
	}
	messageDisplay.textContent = "";
	resetButton.textContent = ("Reset");
	setupLights();
}

function fillBoard(num) {
	var arr = [];
	for (var i = 0; i < num; i++) {
		arr.push(randomizeOnOff());
	}
	return arr;
}

function randomizeOnOff() {
	onOff = Math.floor(Math.random() * 3);
	if (onOff == 1) {
		return "on";
	} else {
		return "off";
	}
}

function switchLight(numLight) {
	if (numLights === 9) {
		var above = numLight - 3;
		var below = Number(numLight) + 3;
		if (numLight % 3 == 1) {
			var left = -1;
		} else {
			var left = Number(numLight) - 1;
		}
		if (numLight % 3 == 0) {
			var right = -1;
		} else {
			var right = Number(numLight) + 1;
		}
	} else if (numLights === 16) {
		var above = numLight - 4;
		var below = Number(numLight) + 4;
		if (numLight % 4 == 1) {
			var left = -1;
		} else {
			var left = Number(numLight) - 1;
		}
		if (numLight % 4 == 0) {
			var right = -1;
		} else {
			var right = Number(numLight) + 1;
		}
	} else {
		var above = numLight - 5;
		var below = Number(numLight) + 5;
		if (numLight % 5 == 1) {
			var left = -1;
		} else {
			var left = Number(numLight) - 1;
		}
		if (numLight % 5 == 0) {
			var right = -1;
		} else {
			var right = Number(numLight) + 1;
		}
	}
	$('#' + numLight).toggleClass("on");
	$('#' + above).toggleClass("on");
	$('#' + below).toggleClass("on");
	$('#' + right).toggleClass("on");
	$('#' + left).toggleClass("on");
}

function checkWin() {
	for (var i = 0; i < numLights; i++) {
		if (lightSwitches[i].classList.contains('on')) {
			return false;
		}
	}
	return true;
}