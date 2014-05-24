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
		      $( "input[type='checkbox']" ).change(function() {
			  set_display_div($(this).attr('id'));
		      });
		  });