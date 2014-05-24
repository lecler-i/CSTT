function CSTTConf () {

    // Angle Start

    this.declinaison = 0;
    this.ascention = 0;
    this.rotation = 0;
    this.fov = 20;
    // Angle End

    // Perturbation Start

    this.bruit = 0;
    this.vibration = 0;
    this.distortion = 0;
    this.refraction = 0;
    this.radiation = 0;

    // Perturbation End

    this.isFloat = function(n)
    {
	return (parseFloat(n.replace(",",".")));
    }

    this.isBetween0_1 = function(n)
    {
	var tmp = this.isFloat(n);

	if (!tmp)
	    return (false);
	if (tmp >= 0 && tmp <= 1)
	    return (1);
	return (0);
    }

    this.formIsOk = function (idDeclinaison, idAscention, idRotation, idFov, idBruit, idVibration, idDistortion, idRefraction, idRadiation, to_hide)
    {
	if (this.isFloat($('#'+idDeclinaison).val()))
	    this.declinaison = parseFloat($("#"+idDeclinaison).val().replace(",","."));
	else
	    return (idDeclinaison);

	if (this.isFloat($('#'+idAscention).val()))
	    this.ascention = parseFloat($("#"+idAscention).val().replace(",","."));
	else
	    return (idAscention);

	if (this.isFloat($('#'+idRotation).val()))
	    this.rotation = parseFloat($("#"+idRotation).val().replace(",","."));
	else
	    return (idRotation);

	if ($('#'+idFov+':checked').length)
	{
	    if (this.isFloat($('#'+idFov+'_'+to_hide+' input').val()) && $('#'+idFov+'_'+to_hide+' input').val() != "")
	    {
		this.fov = parseFloat($("#"+idFov+'_'+to_hide+' input').val().replace(",","."));
		if (this.fov < 0 || this.fov > 360)
		{
		    this.fov = 20;
		    return (idFov+'_'+to_hide+' input');
		}
	    }
	    else
		return (idFov+'_'+to_hide+' input');
	}
	else
	    this.fov = 20;

	if ($('#'+idBruit+':checked').length)
	{
	    if (this.isFloat($('#'+idBruit+'_'+to_hide+' input').val()) && this.isBetween0_1($('#'+idBruit+'_'+to_hide+' input').val()))
		this.bruit = parseFloat($("#"+idBruit+'_'+to_hide+' input').val().replace(",","."));
	    else
		return (idBruit+'_'+to_hide+' input');
	}
	else
	    this.bruit = 0;

	if ($('#'+idVibration+':checked').length)
	{
	    if (this.isFloat($('#'+idVibration+'_'+to_hide+' input').val()))
		this.vibration = parseFloat($("#"+idVibration+'_'+to_hide+' input').val().replace(",","."));
	    else
		return (idVibration+'_'+to_hide+' input');
	}
	else
	    this.vibration = 0;

	if ($('#'+idDistortion+':checked').length)
	{
	    if (this.isFloat($('#'+idDistortion+'_'+to_hide+' input').val()) && this.isBetween0_1($('#'+idDistortion+'_'+to_hide+' input').val()))
		this.distortion = parseFloat($("#"+idDistortion+'_'+to_hide+' input').val().replace(",","."));
	    else
		return (idDistortion+'_'+to_hide+' input');
	}
	else
	    this.distortion = 0;

	if ($('#'+idRefraction+':checked').length)
	{
	    if (this.isFloat($('#'+idRefraction+'_'+to_hide+' input').val()) && this.isBetween0_1($('#'+idRefraction+'_'+to_hide+' input').val()))
		this.distortion = parseFloat($("#"+idRefraction+' '+to_hide+' input').val().replace(",","."));
	    else
		return (idRefraction+'_'+to_hide+' input');
	}
	else
	    this.refraction = 0;

	if ($('#'+idRadiation+':checked').length)
	{
	    if (this.isFloat($('#'+idRadiation+'_'+to_hide+' input').val()) && this.isBetween0_1($('#'+idRadiation+'_'+to_hide+' input').val()))
		this.radiation = parseFloat($("#"+idRadiation+'_'+to_hide+' input').val().replace(",","."));
	    else
		return (idRadiation+'_'+to_hide+' input');
	}
	else
	    this.radiation = 0;
	return ("");
    }
}