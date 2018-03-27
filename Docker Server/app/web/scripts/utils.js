var seconds = 0, minutes = 0, hours = 0, t;
var started = false;
var linksClicked = 0;
var linksHovered = 0;

function add() {

    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    var timerH1 = document.getElementById('timer');
    timerH1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}

function initStatistics() {
    timer();
}

function createTooltip(response) {
    var h5 = document.createElement('h5');
    var a = document.createElement('a');
    a.href = response.url;
	a.target = "_blank";
    a.setAttribute('data-toggle', 'tooltip');
    a.title = response.description;
    a.innerHTML = response.title;

    h5.appendChild(a);

    return h5;
}

$(document).on('mouseover', 'a', function () {
   linksHovered ++;
   console.log("H: " + linksHovered);
});

$(document).on('click', 'a', function () {
   linksClicked ++;
   console.log(linksClicked);
});

$(document).on('click', '#search-button', function () {
    $('#container').empty();
});