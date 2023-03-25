type WebGLFactoryPops = {
  gl: WebGL2RenderingContext;
  vertexShader: string;
  fragmentShader: string;
  width?: number;
  height?: number;
};

export default (
  { gl, vertexShader, fragmentShader, ...props }: WebGLFactoryPops,
  PARAMS: { [key: string]: number }
) => {
  const width = props.width || window.innerWidth;
  const height = props.height || window.innerHeight;

  const specifyCanvasSize = () => {
    const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = width.toString();
    canvas.style.height = height.toString();
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  };

  specifyCanvasSize();

  // initiaize program and attach shaders
  const prog = gl.createProgram()!;

  const attachShader = (shaderType: number, shaderSource: string) => {
    const shader = gl.createShader(shaderType)!;
    gl.shaderSource(shader, shaderSource);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(shaderType, gl.getShaderInfoLog(shader));
      return;
    }
    gl.attachShader(prog, shader);
  };

  attachShader(gl.VERTEX_SHADER, vertexShader);
  attachShader(gl.FRAGMENT_SHADER, fragmentShader);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(prog));
  }

  // provide attributes and uniforms
  const b1 = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, b1);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      -1, -1, 1, -1, -1, 1,

      -1, 1, 1, -1, 1, 1,
    ]),
    gl.STATIC_DRAW
  );

  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 2 * 4, 0);
  gl.enableVertexAttribArray(0);

  gl.useProgram(prog);

  const u1 = gl.getUniformLocation(prog, "uResolution");
  gl.uniform2fv(u1, [gl.drawingBufferWidth, gl.drawingBufferHeight]);
  const u2 = gl.getUniformLocation(prog, "uTime");
  gl.uniform1f(u2, 0);

  // draw
  const animate = (time: number) => {
    requestAnimationFrame(animate);
    const sec = time / 1000;
    step(sec);
  };

  const step = (time: number) => {
    gl.uniform1f(u2, time);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };

  // listeners
  window.addEventListener("resize", specifyCanvasSize, false);

  return {
    animate,
    step,
  };
};
