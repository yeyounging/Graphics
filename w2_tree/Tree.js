
var gl;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height);
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );    

    //  Load shaders and initialize 
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );

	gl.useProgram( program );   

    // create a buffer on gpu and bind point    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId ); 

    // Associate out shader variables with our data buffer   	
	// attribute variable
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( vPosition );

	// uniform variable
	var offsetLoc = gl.getUniformLocation(program, "offset");	
	var colorLoc = gl.getUniformLocation(program, "color");	

	// clear buffer bit
    gl.clear( gl.COLOR_BUFFER_BIT );


	/*--------------------------------------------------------------------------------------------------- */
	/* leaf --------------------------------------------------------------------------------------------- */
	/*--------------------------------------------------------------------------------------------------- */

	// vertex
	var leaf = new Float32Array([
		0, 1, -0.5, 0.5, 0.5, 0.5,   // triangle 
		]);
	gl.bufferData(gl.ARRAY_BUFFER, leaf, gl.STATIC_DRAW );	
	
	// color
	gl.uniform4fv(colorLoc,[0,1,0,1]); // color (R,G,B,A)	
	var first = 0 // the starting index in the array of vector points.
	var count = 3 // the number of indices to be rendered.

	render(first, count) // render function

	gl.uniform4fv(offsetLoc,[0,-0.5,0,0]); // color (R,G,B,A)	
	render(first, count) // render function

	gl.uniform4fv(offsetLoc,[0,-1,0,0]); // color (R,G,B,A)	
	render(first, count) // render function

	/*--------------------------------------------------------------------------------------------------- */
	/* body --------------------------------------------------------------------------------------------- */
	/*--------------------------------------------------------------------------------------------------- */

	// vertex
	var body = new Float32Array([
		-0.15, -0.5, 0.15, -0.5, -0.15, -1, // triangle
		0.15, -0.5, -0.15, -1, 0.15, -1     // triangle
		]);
	gl.bufferData(gl.ARRAY_BUFFER, body, gl.STATIC_DRAW );

	// color
	gl.uniform4fv(offsetLoc,[0,0,0,0]); // color (R,G,B,A)	
	gl.uniform4f(colorLoc, 0.5, 0.25, 0, 1); // color (R,G,B,A)
	var first = 0
	var count = 6
	render(first, count) // render function
};

function render(first, count) {
	gl.drawArrays( gl.TRIANGLES, first, count );
}


