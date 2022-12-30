
## Draw a simple grid

Shader implementation mimics a bit three.js, but is done completly from scratch, so you don't need any dependecies but dev server/bundler.

you can just run it by: 

```
parcel index.html
```


### Fix grid position and sizes

to do it simply uncomment this code in `vertex.glsl`

````

  // #put it in a ceneter
  vUv -= .5;

  // #fix resolution
  float aspect = uResolution.x/uResolution.y;
  vUv.x *= aspect;
  
```