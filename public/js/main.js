

console.log("TOTOT");

function draw_sky(canvas)
{
    var context = canvas.getContext("2d");

    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#FFF";
    context.fillRect(canvas.width / 2, 50, 10, 10);
}

window.onload = window.onresize = function() {
  var canvas = document.getElementById("spaceCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  console.log(canvas.width);
  draw_sky(canvas);
}




$( document ).ready(function() {
    console.log( "ready!" );

var canvas = document.getElementById("spaceCanvas");
var context = canvas.getContext("2d");

//Background
context.fillStyle = "#F00";
context.fillRect(0, 0, canvas.width, canvas.height);

canvas.addEventListener("mousedown", function(e)
    {
      var x = Math.floor(e.x * canvas.width / parseInt(canvas.style.width));
      var y = Math.floor(e.y * canvas.height / parseInt(canvas.style.height));
      context.fillStyle = "#F00";
      context.fillRect(x, y, 1, 1);
  }, true);

});

