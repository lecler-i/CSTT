
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
  console.log(stars);
 // var stars = [];
  // for (var i = 0; i < 120; i++) {
  //   stars.push({x: Math.random() * width + 1, y: Math.random() * height + 1, density:Math.random() * 5 + 1});
  // }
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
  detector.fillStyle = "rgba(" + intensity + ", " + intensity  + ", " + intensity + ", 1)";
  detector.fillRect(x, y, 1, 1);
  console.log(x + "    " + y + "     " + intensity);
 }

 function getPixel(detector, x, y)
 {
  var imgd = detector.getImageData(x, y, 1, 1);
  var pix = imgd.data;
  console.log(pix);
  return (pix[0]);
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
    fov = 1;

    RST = RefST(ra, decl, rotNE);
    var detector_array = [];
    for(i=0; i<canvas.width; i++){
     detector_array[i] = [];
     for(j=0; j<canvas.height; j++){
       detector_array[i][j] = 0.0;
   }
  }


    new_stars = convert_elem(stars, RST);
    
    //console.log(stars);
    //console.log(new_stars);


    convert_to_screen(new_stars, canvas.width, canvas.height, fov, detector_array);
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
 
// document.getElementById("startButton").onclick = function () {
//     var canvas = document.getElementById("spaceCanvas");
//     enterFullscreen(canvas);
//   };

