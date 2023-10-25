
var gl;
var points;
var colors;

var flag=0;
var trans = 0;
var ctm;
var ctm2;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    // vertices
    var vertices = [
        // mountain 1
        vec2(-1.0, -1.0),
        vec2(-0.5, 0.0),
        vec2(0.0, -1.0),

        // mountain 2
        vec2(-0.5, -1.0),
        vec2(0.0, -0.5),
        vec2(0.5, -1.0),
        
        // mountain 3
        vec2(0.5, -1.0),
        vec2(1.0, 0.3),
        vec2(1.0, -1.0),

        // cloud 1
        vec2(0.0,0.0),
        vec2(-0.2,-0.2),
        vec2(0.2,-0.2),
        vec2(0.3,0),
        vec2(0.2,0.2),
        vec2(-0.2,0.2),
        vec2(-0.3,0),
        vec2(-0.2,-0.2),

        // cloud 2
        vec2(-0.7,0.75),
        vec2(-0.8,0.6),
        vec2(-0.6,0.6),
        vec2(-0.45,0.75),
        vec2(-0.6,0.9),
        vec2(-0.8,0.9),
        vec2(-0.95,0.75),
        vec2(-0.8,0.6),

        // cloud 3 
        vec2(0.4,0.35),
        vec2(0.2,0.25),
        vec2(0.6,0.25),
        vec2(0.75,0.35),
        vec2(0.6,0.45),
        vec2(0.2,0.45),
        vec2(0.05,0.35),
        vec2(0.2,0.25),

        // star 1
        vec2(0.3,0.25),
        vec2(0.3,0.2),
        vec2(0.35,0.25),
        vec2(0.3,0.3),
        vec2(0.25,0.25),
        vec2(0.3,0.2),

        // star 2
        vec2(-0.3,0.8),
        vec2(-0.3,0.75),
        vec2(-0.25,0.8),
        vec2(-0.3,0.85),
        vec2(-0.35,0.8),
        vec2(-0.3,0.75),

        // star 3
        vec2(-0.85,0.55),
        vec2(-0.85,0.5),
        vec2(-0.8,0.55),
        vec2(-0.85,0.6),
        vec2(-0.9,0.55),
        vec2(-0.85,0.5),

        // star 4
        vec2(0.7,0.65),
        vec2(0.7,0.6),
        vec2(0.75,0.65),
        vec2(0.7,0.7),
        vec2(0.65,0.65),
        vec2(0.7,0.6),

        // star 5
        vec2(-0.4,0.15),
        vec2(-0.4,0.1),
        vec2(-0.35,0.15),
        vec2(-0.4,0.2),
        vec2(-0.45,0.15),
        vec2(-0.4,0.1),
        
        // star 6
        vec2(0.4,0.6),
        vec2(0.4,0.55),
        vec2(0.45,0.6),
        vec2(0.4,0.65),
        vec2(0.35,0.6),
        vec2(0.4,0.55),

        // star 7
        vec2(-0.35,0.5),
        vec2(-0.35,0.45),
        vec2(-0.4,0.5),
        vec2(-0.35,0.55),
        vec2(-0.3,0.5),
        vec2(-0.35,0.45),

        // giant 1
        vec2(0.3,0.75),
        vec2(0.18,0.55),
        vec2(0.42,0.55),

        vec2(0.18,0.7),
        vec2(0.3,0.5),
        vec2(0.42,0.7),

        // giant 2
        vec2(-0.8,0.3),
        vec2(-0.92,0.15),
        vec2(-0.68,0.15),

        vec2(-0.92,0.25),
        vec2(-0.8,0.1),
        vec2(-0.68,0.25),

        // giant 3
        vec2(0.6, -0.15),
        vec2(0.48,-0.3),
        vec2(0.72,-0.3),

        vec2(0.48,-0.2),
        vec2(0.6,-0.35),
        vec2(0.72,-0.2),
        
    ];

    gl.viewport( 0, 0, canvas.width, canvas.height );   //canvas 넓이 재정의
    gl.clearColor( 0.0, 0.2, 0.5, 1.0 );    //background color :NAVY

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // create buffer and Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,flatten(vertices), gl.STATIC_DRAW );
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );


    colors = gl.getUniformLocation(program, "colors");


    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    render();

};

function render(){

    ctm = mat4();
    ctm = mult(ctm, translate(trans, 0.0, 0.0, 0.0));
    ctm2 = mat4();
    ctm2 = mult(ctm2, translate(0.0,0.0,0.0,0.0));
    

    //draw moutain with dark green color
    gl.uniform3fv( colors, [0.0, 0.64, 0.0]);
    // gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(ctm2));
    mountains();

    //draw moutain with light green color
    gl.uniform3fv( colors, [0.0, 1.0, 0.5]);
    // gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(ctm2));
    mountains2();

    //draw moutain with bright green color
    gl.uniform3fv( colors, [0.8, 1.0, 0.0]);
    // gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(ctm2));
    mountains3();

    //draw clouds with white color
    gl.uniform3fv( colors, [1.0, 1.0, 1.0]);
    // gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(ctm));
    clouds();
    
    //draw clouds with skyblue color
    gl.uniform3fv( colors, [0.7, 1.0, 1.0]);
    // gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(ctm));
    clouds2();

    //draw stars with orange color
    gl.uniform3fv( colors, [1.0, 0.8, 0.3]);
    // gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(ctm2));
    giant();

    //draw giant with yellow color
    gl.uniform3fv( colors, [1.0, 1.0, 0.0]);
    // gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(ctm2));
    stars();
    //draw giant with coral color
    gl.uniform3fv( colors, [1.0, 0.7, 0.5]);
    // gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(ctm2));
    stars2();

    requestAnimationFrame(render);

}


function mountains() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
}

function mountains2(){
    gl.drawArrays( gl.TRIANGLES, 3, 3 );
}

function mountains3(){
    gl.drawArrays( gl.TRIANGLES, 6, 3 );
}

function clouds() {
    gl.drawArrays( gl.TRIANGLE_FAN, 9, 8);
    gl.drawArrays( gl.TRIANGLE_FAN, 17, 8);
}

function clouds2() {
    gl.drawArrays( gl.TRIANGLE_FAN, 25, 8);
}

function stars() {
    gl.drawArrays( gl.TRIANGLE_FAN, 33, 6);
    gl.drawArrays( gl.TRIANGLE_FAN, 39, 6);
    gl.drawArrays( gl.TRIANGLE_FAN, 45, 6);
    gl.drawArrays( gl.TRIANGLE_FAN, 51, 6);
}

function stars2() {
    gl.drawArrays( gl.TRIANGLE_FAN, 57, 6);
    gl.drawArrays( gl.TRIANGLE_FAN, 63, 6);
    gl.drawArrays( gl.TRIANGLE_FAN, 69, 6);
}

function giant(){
    gl.drawArrays(gl.TRIANGLES,75,3);
    gl.drawArrays(gl.TRIANGLES,78,3);
    gl.drawArrays(gl.TRIANGLES,81,3);
    gl.drawArrays(gl.TRIANGLES,84,3);
    gl.drawArrays(gl.TRIANGLES,87,3);
    gl.drawArrays(gl.TRIANGLES,90,3);
}