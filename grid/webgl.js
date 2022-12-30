const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');
import vertexShaderSource from './shaders/vertex.glsl'
import fragmentShaderSource from './shaders/fragment.glsl'

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
  throw new Error(gl.getShaderInfoLog(vertexShader))
};

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
  throw new Error(gl.getShaderInfoLog(fragmentShader))
};

const prg = gl.createProgram();
gl.attachShader(prg, vertexShader);
gl.attachShader(prg, fragmentShader);
gl.linkProgram(prg);
if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
  throw new Error(gl.getProgramInfoLog(prg))
};


gl.detachShader(prg, vertexShader);
gl.deleteShader(vertexShader);
gl.detachShader(prg, fragmentShader);
gl.deleteShader(fragmentShader);

const positionLoc = gl.getAttribLocation(prg, 'position');
const vertexPositions = new Float32Array([
    -1, 1,
    1, 1,
    -1, -1,
    -1, -1,
    1,1,
    1,-1
]);

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertexPositions, gl.STATIC_DRAW);

const uvLoc = gl.getAttribLocation(prg, 'uv');
const uvPositions = new Float32Array([
    0,  1,
    1,  1,
    0,  0,
    0,  0,
    1,  1,
    1,  0,
]);

const uvBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
gl.bufferData(gl.ARRAY_BUFFER, uvPositions, gl.STATIC_DRAW);

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.enableVertexAttribArray(positionLoc);
gl.vertexAttribPointer(
    positionLoc,  
    2,            // 2 values per vertex shader iteration
    gl.FLOAT,     // data is 32bit floats
    false,        // don't normalize
    0,            // stride (0 = auto)
    0,            // offset into buffer
);


gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
gl.enableVertexAttribArray(uvLoc);
gl.vertexAttribPointer(
    uvLoc,  
    2,            // 2 values per vertex shader iteration
    gl.FLOAT,     // data is 32bit floats
    false,        // don't normalize
    0,            // stride (0 = auto)
    0,            // offset into buffer
);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

resizeCanvasToDisplaySize(gl.canvas)

// Tell WebGL how to convert from clip space to pixels
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

// Clear the canvas
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.useProgram(prg);

// resolution
const uResolution = gl.getUniformLocation(prg, 'uResolution');
gl.uniform2fv(uResolution, [gl.canvas.width, gl.canvas.height])


// draw
var primitiveType = gl.TRIANGLES;
var offset = 0;
var count = 6;
gl.drawArrays(primitiveType, offset, count);


function resizeCanvasToDisplaySize(canvas, multiplier) {
    multiplier = multiplier || 1;
    const width  = canvas.clientWidth  * multiplier | 0;
    const height = canvas.clientHeight * multiplier | 0;
    if (canvas.width !== width ||  canvas.height !== height) {
      canvas.width  = width;
      canvas.height = height;
      return true;
    }
    return false;
  }