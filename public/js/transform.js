	// x_cen = 5.0;
	// y_cen = 5.0;
	// energy = 255;
	
	// Parametres generaux
	// Wpix = 680;
	// Hpix = 460;
	
	var BLOB_SIGMA_PIX = 0.50;
	var BLOB_WIDTH_PIX = 3.0;
	
	// Initialisation de la matrice du detector 
	var detector_array = [];
	for(i=0; i<Wpx; i++){
		detector_array[i] = [];
		for(j=0; j<Hpx; j++){
			detector_array[i][j] = 0.0;
		}
	}
	
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
				detector_array[i][j] = detector_array[i][j] + flux;
				y = y + DELTA;
    		}
			x = x + DELTA;
    	}
		
		return;
	}

	function is_valid(elem)
	{

		return (false);
	}

	function select(array)
	{
		var result = [];

		for (var i = 0; i < array.length; i++) {
			if (is_valid(array[i]))
				result.push(array[i]);
		};
		return (result);
	}
	

	function convert_elem(array)
	{
		array = select(array);

		var result = [];

		for (var i = 0; i < array.length; i++) {
			result.push(convert_single_elem(array[i]));
		};
		return (result);
	}

	function convert_single_elem(elem)
	{

		return ({x:0, y:0, z:0, mag:0});
	}