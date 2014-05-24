function set_display_div(id)
{
    var obj = document.getElementById(id+'_to_hide');

    if ($('#'+id+':checked').length)
    	$(obj).slideDown(300);
    else
    	$(obj).slideUp(300);
}

$(document).ready(function()
		  {
		      var params = new CSTTConf();
		      $('#startButton').click(function() {
			  $('input').css('border-color', 'white');
			  var tmp = params.formIsOk("declinaison", "ascention", "rotation", "fov", "bruit", "vibration", "distortion", "refraction", "radiation", "to_hide");

			  if (tmp != "")
			      $('#'+tmp).css('border-color', 'red');
			  else
			      enterFullscreen(document.getElementById("spaceCanvas"));
		      });
		      $( "input[type='checkbox']" ).change(function() {
			  set_display_div($(this).attr('id'));
		      });
		  });