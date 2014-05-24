
  var stars = [];

  $.get('http://kawox.tk/CNES/CSTT/public/catalogue.json',function(data){
    stars = data;
  },'json');


function getStarCoord(star)
{
  return ({x: Math.random() * width + 1, y: Math.random() * height + 1, density:Math.random() * 5 + 1});
}

function loadStars(width, height, fov)
{
  var stars = [];
  // for (var i = 0; i < 120; i++) {
  //   stars.push({x: Math.random() * width + 1, y: Math.random() * height + 1, density:Math.random() * 5 + 1});
  // }
  // console.log(stars);
   return (stars);
}

function enterFullscreen(element) {
    if (element.requestFullScreen) {
      element.requestFullScreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (element.mozRequestFullScreen){
      element.mozRequestFullScreen();
    } else {
      alert('Votre navigateur ne supporte pas le mode plein écran, il est temps de passer à un plus récent ;)');
    }
 }

 function drawPixel(detector, x, y, intensity)
 {
  context.fillStyle = "#FFF";
  detector.fillRect(x, y, 1, 1);
 }
 
function drawStar(context, star)
{
  context.fillRect(star.x, star.y, star.density, star.density);
}

function drawSky(canvas) {
    var context = canvas.getContext("2d");
    var stars = loadStars(canvas.width, canvas.height, 60);

    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    ra = 1.4;
    decl = 1;
    rotNE = 0.5;
    fov = 0.6;

    RST = RefST(ra, decl, rotNE);

    convert_to_screen(stars, canvas.width, canvas.height, fov, canvas);
    // context.fillStyle = "#FFF";

    // for (var i = 0; i < stars.length; i++) {
    //   drawStar(context, stars[i]);
    // }
}

window.onresize = function() {
  var canvas = document.getElementById("spaceCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  console.log(canvas.width);
  drawSky(canvas);
};

var fullScreenCallback = function(e) {
  var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
  var canvas = document.getElementById("spaceCanvas");
  canvas.style.display = state ? "block" : "none";
};

document.addEventListener("fullscreenchange", fullScreenCallback);
document.addEventListener("webkitfullscreenchange", fullScreenCallback);
 
document.getElementById("startButton").onclick = function () {
    var canvas = document.getElementById("spaceCanvas");
    enterFullscreen(canvas);
  };

