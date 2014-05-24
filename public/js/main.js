

  function enterFullscreen(element) {
    if(element.requestFullScreen) {
      element.requestFullScreen();
    } else if(element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if(element.mozRequestFullScreen){
      element.mozRequestFullScreen();
    } else {
      alert('Votre navigateur ne supporte pas le mode plein écran, il est temps de passer à un plus récent ;)');
    }
 }

function draw_sky(canvas)
{
    var context = canvas.getContext("2d");

    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#FFF";
    context.fillRect(canvas.width / 2, 50, 10, 10);
}

window.onresize = function()
{
  var canvas = document.getElementById("spaceCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  console.log(canvas.width);
  draw_sky(canvas);
}

var callback = function(e) {
  var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
  var canvas = document.getElementById("spaceCanvas");

  if (state)
  {
    canvas.style.display = "block";
  }
  else
  {
    canvas.style.display = "none";
  }
};



document.addEventListener("fullscreenchange", callback);
document.addEventListener("webkitfullscreenchange", callback);
 



document.getElementById("startButton").onclick = function () {
    var canvas = document.getElementById("spaceCanvas");
    enterFullscreen(canvas);
  };