#version 300 es

precision mediump float;

uniform float uTime;
uniform vec2 uResolution;

out vec4 fragColor;

float columnsCount = 10.;

void main() {
  vec3 color;
  vec2 uv = gl_FragCoord.xy / uResolution;
  float time = mod(uTime * .35, 2.);
  time = time > 1. ? 2. - time : time;

  float columns = fract(uv.x * columnsCount);
  columns = abs(columns - .5);
  float segs = round(uv.x * columnsCount) /columnsCount;
  segs = abs(segs - time);

  float activeSeg = smoothstep(.95, 1., 1. - segs);

  color = vec3(segs);

  if(uv.y < .75) {
    color = vec3(activeSeg);
  }
  if(uv.y < .5) {
    color = vec3(columns);
  }
  if(uv.y < .25) {
    color = vec3(step(.1, activeSeg * columns));
    float grid =  step(.49, columns);
    color += grid;
  }

  fragColor = vec4(color, 1.0);
}


void main_a () {
    vec3 color;
    float uCCount = 10.;
    float t = mod(uTime * 0.2, 2.);
    //t = .61;
    if(t>1.){
        t = 2. - t;
    }    

    vec2 uv = (gl_FragCoord.xy * 2. - uResolution)/min(uResolution.x,uResolution.y);
    uv = (gl_FragCoord.xy)/uResolution;
    
    float columns = fract(uv * uCCount*1.).x;
    columns = abs(columns - .5);
    float linear = t;
    
    float fColumn = (round(uv * uCCount)/uCCount).x;
    float aColumn = fColumn -linear;
    float saColumn = smoothstep(0., 1./(2. * uCCount), aColumn);
    
    
    float line = abs(uv.x - linear) * 20.;

    float cl = min(line, columns);
    //cl = max(line, column);
    cl = line + columns;
    //cl = 1. - step(.5, cl);
  
    float grid = step(.485, columns);
    //color = vec3(1. - smoothstep(.0, .05, saColumn * columns));
    float sig = 1. - (columns * saColumn);
    //color = vec3(1. - step(.025, columns));
    //color = vec3(smoothstep(.49, .5, (saColumn + columns) * (1. - saColumn)));

    if (uv.y < .9) {
        color = vec3(step(.05, columns *  (1. - saColumn)));
        color += grid;
        //color = vec3(aColumn);
    } else {
        color = vec3(step(.1, line));
    }
    

   
    fragColor = vec4(color, 1.);

}