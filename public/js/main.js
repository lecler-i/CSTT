function loadStars(width, height, fov)
{
  var stars = [];
  for (var i = 0; i < 120; i++) {
    stars.push({x: Math.random() * width + 1, y: Math.random() * height + 1, density:Math.random() * 5 + 1});
  }
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

function drawStar(context, star)
{
  context.fillRect(star.x, star.y, star.density, star.density);
}

function drawSky(canvas) {
    var context = canvas.getContext("2d");
    var stars = loadStars(canvas.width, canvas.height, 60);

    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#FFF";

    for (var i = 0; i < stars.length; i++) {
      drawStar(context, stars[i]);
    }
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

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    
    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);
