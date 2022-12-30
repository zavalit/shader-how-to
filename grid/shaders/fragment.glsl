precision mediump float;
varying vec2 vUv;

void main() {
  
  vec2 grid = fract(vUv * 5.);
  float distanceX = abs(.5 - grid.x);
  float distanceY = abs(.5 - grid.y);
  float mask = 1. - max(distanceX, distanceY);
  
  mask = smoothstep(.5, .53, mask);
  
  gl_FragColor = vec4(vec3(mask), 1.); 
  
}