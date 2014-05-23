

console.log("TOTOT");

function draw_sky(canvas)
{
    var context = canvas.getContext("2d");

    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#FFF";
    context.fillRect(canvas.width / 2, 50, 10, 10);
}

window.onload = window.onresize = function()
{
  var canvas = document.getElementById("spaceCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  console.log(canvas.width);
  draw_sky(canvas);
}