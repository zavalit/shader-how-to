#version 300 es

#define PI 3.141592653589793
precision mediump float;

uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;

out vec4 fragColor;

float columnsCount = 2.;

float lineMask (vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float k = dot(pa, ba)/dot(ba, ba);

  //return k;

  vec2 line = a + k*ba;
  float d = distance(p, line);

  return d;
}

mat2 rototed2D (float a) {
  float s = sin(a);
	float c = cos(a);
	return mat2(c, -s, s, c);
}

void main() {
  vec3 color;

  float time = mod(uTime * .35, 2.);
  time = time > 1. ? 2. - time : time;
  //time = .05;
  
  vec2 uv = (gl_FragCoord.xy * 2. - uResolution) / uResolution.y;
  uv *= 1.;
  vec2 mouse = uMouse/uResolution;
  vec2 nUv = uv * time * time;
  nUv *= rototed2D(PI * 2. * time * time);
  uv -= nUv;


  float angle = mouse.x * PI;
  angle = PI * .75;
  vec2 n = vec2(sin(angle), cos(angle));
  float d = dot(uv, n);
  uv -= n * min(0., d) * 2.;

  angle = PI * .25;
  n = vec2(sin(angle), cos(angle));
  d = dot(uv, n);

  uv -= n * min(0., d) * 2.;


  


  float columns = fract(uv.x * columnsCount);
  columns = abs(columns - .5);
  float segs = round(uv.x * columnsCount) /columnsCount;
  segs = abs(segs - time);

  float activeSeg = smoothstep(1. - 1./(2.*columnsCount), 1., 1. - segs);

  color = vec3(segs);

  
  // if(uv.y < .75) {
  //   color = vec3(activeSeg);
  // }
  // if(uv.y < .5) {
  //   color = vec3(columns);
  // }
  // if(uv.y < .25) {
    color = vec3(step(.1, activeSeg * columns));
    float grid =  step(.4, columns);
    color += grid;
 // }

  //color += d;


  fragColor = vec4(color, 1.0);
}

void main_r() {
  vec3 color;
  vec2 uv = (gl_FragCoord.xy * 2. - uResolution) / uResolution.y;
  vec2 mouse = uMouse/uResolution;
  

  float angle = mouse.x * PI;
  angle = .25 * PI;
  vec2 n = vec2(sin(angle), cos(angle));
  float d;// = lineMask(uv, vec2(.5), n);
  d = dot(uv, n);
  uv -= n * min(0., d) * 2.;
  
  
  color.xy = sin(uv * 10.);
  color += smoothstep(0.01, 0., abs(d));

  //color += d;
  
  // if(uv.y < .75) {
  //   color = vec3(activeSeg);
  // }
  // if(uv.y < .5) {
  //   color = vec3(columns);
  // }
  // if(uv.y < .25) {
  //   color = vec3(step(.1, activeSeg * columns));
  //   float grid =  step(.49, columns);
  //   color += grid;
  // }

  fragColor = vec4(color, 1.0);
}



