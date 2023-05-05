import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import webgl from "./webgl";

export const PARAMS = {};

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
