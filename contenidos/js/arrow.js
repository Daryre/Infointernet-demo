var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.lineWidth = 3;

var $canvas = $("#canvas");
var canvasOffset = $canvas.offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;

ctx.clearRect(0, 0, canvas.width, canvas.height);

function noop() {}

function connect($from, $to) {
    var eFrom = $from;//c.from;
    var eTo = $to;//c.to;
    var pos1 = eFrom.offset();
    var pos2 = eTo.offset();
    var size1 = eFrom.size();
    var size2 = eTo.size();
    ctx.beginPath();
    ctx.moveTo(pos1.left + eFrom.width() - 330, pos1.top + eFrom.height() - 135);
    console.log("Xo: " + (pos1.left + eFrom.width() - 330));
    console.log("Yo: " + (pos1.top + eFrom.height() - 135));
    ctx.lineTo(pos2.left - 330, pos2.top + eTo.height() - 135);
    console.log("Xi: " + (pos2.left - 330));
    console.log("Yi: " + (pos2.top + eTo.height() - 135));
    ctx.stroke();	
}

function clean() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}