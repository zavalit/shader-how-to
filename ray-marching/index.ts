import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import webgl from "./webgl";
import {Pane} from 'tweakpane'

export const PARAMS = {
  STEPS: 1,
  HARDNESS: 1,
  LIGHT_SPEED: .5
};

// obtain canvas context
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const gl = canvas.getContext("webgl2")!;

const { step } = webgl(
  {
    gl,
    vertexShader,
    fragmentShader,
    width: 512,
    height: 512,
  },
  PARAMS
);

const animateSteps = async (time) => {
  requestAnimationFrame(animateSteps);
  step(time / 3000);
};

animateSteps(0);


const pane = new Pane()
pane.addInput(PARAMS, 'STEPS', {min: 0, max: 64, step: 1})
pane.addInput(PARAMS, 'HARDNESS', {min: 0, max: 64, step: 1})
pane.addInput(PARAMS, 'LIGHT_SPEED', {min: 0, max: 5, step: .2})

//pane.addInput(PARAMS, 'MIN_DIST', {min: 0, max: 100}).on('change', (ev) => ev.last && drawFinalTimes());
  