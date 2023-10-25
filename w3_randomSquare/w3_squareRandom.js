
var gl;
var points;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );   //canvas 넓이 재정의
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );    //배경색 지정

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId);

    // Associate vertex data buffer with shader variables

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var u_resolution = gl.getUniformLocation(program, "u_resolution");
    var fColor = gl.getUniformLocation(program, "fColor");

    gl.uniform2f(u_resolution, gl.canvas.width, gl.canvas.height);


    /////////
    for(var ii = 0; ii<50; ++ii){
        setRectangle(gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300));
        
        gl.uniform4f(fColor, Math.random(), Math.random(), Math.random(), 1);

        // var method = gl.TRIANGLES
        // var str = 0;
        // var offset = 6;

        gl.drawArrays(gl.TRIANGLES, 0, 6);

    }
    /////////
};

function randomInt(range){
    return Math.floor(Math.random()*range);
}

function setRectangle(gl, x, y, w, h){
    x1 = x;
    x2 = x+w;
    y1 = y;
    y2 = y+h;

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x1,y1,
        x2,y1,
        x1,y2,
        x1,y2,
        x2,y1,
        x2,y2])
    , gl.STATIC_DRAW);
}