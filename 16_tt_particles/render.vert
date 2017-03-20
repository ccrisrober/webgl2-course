#version 300 es
precision highp float;

layout(location = 0) in vec2 position;
layout(location = 1) in vec2 velocity;
layout(location = 2) in float spawntime;
layout(location = 3) in float lifetime;

uniform float time;

void main()
{
  float deltaTime = time - spawntime;
  if (deltaTime < lifetime)
  {
    gl_Position = vec4(position, 0.0, 1.0);
  }
  else
  {
    gl_Position = vec4(-100.0, -100.0, 0.0, 1.0);
  }
  gl_PointSize = 25.0;
}