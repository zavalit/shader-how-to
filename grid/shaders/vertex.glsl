attribute vec4 position;
attribute vec2 uv;

uniform vec2 uResolution;
varying vec2 vUv;

void main() {

  gl_Position = position;

  vUv = uv;

  //
  // !comment it out to make it responsible!
  //

  // #put it in a ceneter
  // vUv -= .5;

  // #fix resolution
  // float aspect = uResolution.x/uResolution.y;
  // vUv.x *= aspect;
  
  
}
