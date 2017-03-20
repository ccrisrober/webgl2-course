#version 300 es
precision highp float;
out vec4 fragColor;

uniform sampler2D ourTexture;

void main()
{
  vec2 pc = (gl_PointCoord - 0.5) * 2.0;

  fragColor = texture(ourTexture, pc);
}