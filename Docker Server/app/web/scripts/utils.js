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
    var a = document.createElement('a');
    a.href = response.url;
    a.setAttribute('data-toggle', 'tooltip');
    a.title = 'DESCRIPTION URIAS';
    a.innerHTML = response.title;

    return a;
}

$(document).on('.page-links', 'hover', function () {
   linksHovered ++;
});

$(document).on('.page-links', 'click', function () {
   linksClicked ++;
});

$(document).on('click', '#search-button', function () {
    $('#container').empty();
});