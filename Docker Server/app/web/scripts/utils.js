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
    a.title = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui.";
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