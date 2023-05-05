#version 300 es

precision mediump float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;

uniform float uSTEPS;
uniform float uHARDNESS;
uniform float uLIGHT_SPEED;

out vec4 fragColor;

struct Ray {
  vec2 uv;
  vec2 source;
  vec2 dencity;
};


float circleRadius = .1;

float sdfCircle (vec2 uv) {
  vec2 circleCenter = uMouse * 2. - 1.;
  return length(uv - circleCenter) - circleRadius;
}

Ray makeRay (vec2 uv, vec2 source) {
  Ray r;

  r.uv = uv;
  r.source = source;
  r.dencity = (source - uv) / uSTEPS;

  return r;
}


vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}




void main() {
  vec2 uv = (gl_FragCoord.xy / uResolution) * 2.  - 1.;

  vec3 color;

  // make ray
  Ray ray = makeRay(uv, vec2(.0)); 
  
  // march throgh space
  for(float i = 0.; i< uSTEPS; i++){    
    float circle = sdfCircle(ray.uv);
    circle *= uHARDNESS;
    circle = clamp(circle, 0., uLIGHT_SPEED);
    ray.uv += ray.dencity * circle;
  }

  ray.uv -= ray.source;

  
  // light
  float c = sdfCircle(ray.uv);
  color = pal( c, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(2.0,1.0,0.0),vec3(0.5,0.20,0.25) );
  
  //color = pal( c, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0),vec3(0.0,0.10,0.20) );

  fragColor = vec4(color, 1.0);
}
