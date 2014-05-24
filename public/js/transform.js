	// x_cen = 5.0;
	// y_cen = 5.0;
	// energy = 255;
	
	// Parametres generaux
	// Wpix = 680;
	// Hpix = 460;
	
	var BLOB_SIGMA_PIX = 0.50;
	var BLOB_WIDTH_PIX = 3.0;
	var COS_MAX_ANG_DISTANCE = Math.cos(30.0 / 180.0 * Math.PI);		// Pour selection
	
	// Initialisation de la matrice du detector 
	// var detector_array = [];
	// for(i=0; i<Wpx; i++){
	// 	detector_array[i] = [];
	// 	for(j=0; j<Hpx; j++){
	// 		detector_array[i][j] = 0.0;
	// 	}
	// }
	
	// INPUT
	// Wdeg
	var RST = [];
	//TODO
	//RST = RefST(ra, decl, rotNE);
	
	// Transformation vecteur ref Star Tracker vers Tablet
	function ST2Tablet(Wpix, Hpix, Wdeg, vST){
		
		L = Wpix/2/Math.sin(Wdeg/2/180.0*Math.PI);		// Projection
		vTab = [];
		vNorm = Math.sqrt(vST[0]*vST[0] + vST[1]*vST[1] + vST[2]*vST[2]);
		
		for(i=0; i<3; i++){
			vTab[i] = vST[i]/vNorm*L;
		}
		
		vTablet = [vTab[0]+Wpix/2, vTab[1]+Wpix/2];
		
		return vTablet;
	}
	
	// Creation de la matrice de transformation Catalog > Star Tracker
	function RefST(ra, decl, rotNE){
		
		cd = Math.cos(decl);
		sd = Math.sin(decl);
		ca = Math.cos(ra);
		sa = Math.sin(ra);
		
		zST = [ cd*ca , cd*sa , sd ];
		
		azimDet = Math.atan2(zST[1], zST[0]);
		
		rotZ = -(azimDet - Math.PI/2);
		rotX = Math.acos(zST[2]);
		rollZ = (rotNE + Math.PI);
		
		A1 = RotZ(rollZ);
		A2 = RotX(rotX);
		A3 = RotZ(rotZ);
		
		C = multMatrix(A2,A1);
		ROT_ST = multMatrix(A3,C);
		
		return ROT_ST;
	}
	
	// Matrice de rotation Z
	function RotZ(a){
		ca = Math.cos(a);
		sa = Math.sin(a);
		
		Rot = [
			[ca, sa, 0.0],
			[-sa, ca, 0.0],
			[0.0, 0.0, 1.0]
			];
		
		return Rot;
	}
	
	// Matrice de rotation X
	function RotX(a){
		ca = Math.cos(a);
		sa = Math.sin(a);
		
		Rot = [
			[1.0, 0.0, 0.0],
			[0.0, ca, sa],
			[0.0, -sa, ca]
			];
		
		return Rot;
	}
	
	// Multiplication entre matrices
	function multMatrix(A,B){
		C = [
			[0.0, 0.0, 0.0],
			[0.0, 0.0, 0.0],
			[0.0, 0.0, 0.0]
			];
			
		for(i=0; i<3; i++){
			for(j=0; j<3; j++){
				for (k=0; k<3; k++){
					C[i][j] = C[i][j] + A[i][k] * B[k][j];
				}
				
			}
		}
		
		return C;
	}
	
	// Multiplication entre matrice et vecteur
	function matrix_vector( M, v){
		
		b = [0.0, 0.0, 0.0];
		for(i=0; i<3; i++){
			for(j=0; j<3; j++){
				b[i] = b[i] + M[i][j] * v[j];
			}
		}
		
		return b;
	}
	
	
	// Multiplication entre matrice et vecteur
	function vector_vector( v, w){
		
		b = 0;
		for(i=0; i<3; i++){		
			b = b + v[i] * w[j];
		}
		
		return b;
	}
	// Integration gaussienne sur detecteur
	function gauss2pixels(x_cen, y_cen, sigma_pix, width_pix, detector_array, energy) {
		DIV_PER_PIX = 2;
    	DELTA = 1/DIV_PER_PIX;
    	sigma2_pix = Math.pow(sigma_pix, 2);
		I0 = energy / 2 / Math.PI / sigma2_pix;
		
		x_0 = x_cen - width_pix/2;
    	x_f = x_cen + width_pix/2;
    	y_0 = y_cen - width_pix/2;
    	y_f = y_cen + width_pix/2;
				
		x = x_0;
    	while (x <= x_f){
    		x_block = Math.pow( x - x_cen, 2 ) / ( 2*sigma2_pix );
        	y = y_0;
    		while (y <= y_f){
    			y_block = Math.pow( y - y_cen, 2 ) / ( 2*sigma2_pix );
    			flux = I0 * Math.exp(-(x_block + y_block)) / Math.pow( DIV_PER_PIX, 2) / Math.pow( DIV_PER_PIX, 2);
				
    			i = Math.floor(x);
				j = Math.floor(y);
				

				drawPixel(detector_array, j, i, getPixel(detector_array, j, i) + flux);

				//detector_array[i][j] = detector_array[i][j] + flux;
				y = y + DELTA;
    		}
			x = x + DELTA;
    	}
		
		return;
	}

	function select(array, zST)
	{
		var result = [];

		console.log(zST);

		for (var i = 0; i < array.length; i++) {
			
			vCat = [array[i].x, array[i].y, array[i].z];
			cosStarST = vector_vector( vCat, zST);
			console.log(cosStarST);
			if (cosStarST > COS_MAX_ANG_DISTANCE)
				result.push(array[i]);
		};
		return (result);
	}
	

	function convert_elem(array, RST)
	{
		zST = [RST[0][2], RST[1][2], RST[2][2]];
		array = select(array, zST);
		console.log(array);
		var result = [];

		for (var i = 0; i < array.length; i++) {
			result.push(convert_single_elem(array[i], RST));
		};
		return (result);
	}

	function convert_single_elem(elem, RST)
	{
		vCat = [elem.x, elem.y, elem.z];
		vST = matrix_vector( RST, vCat);
		//gauss2pixels(x_cen, y_cen, BLOB_SIGMA_PIX, BLOB_WIDTH_PIX, detector_array, energy);
		return ({x:vST[0], y:vST[1], z:vST[2], mag:elem.mag});
	}
	
	function convert_to_screen(array, Wpix, Hpix, Wdeg, detector_array){
		for (var i = 0; i < array.length; i++) {
			vST = [array[i].x, array[i].y, array[i].z];
			vTablet = ST2Tablet(Wpix, Hpix, Wdeg, vST);
			energy = 255.0;
			gauss2pixels(vTablet[0], vTablet[1], BLOB_SIGMA_PIX, BLOB_WIDTH_PIX, detector_array, energy);
		}
	}