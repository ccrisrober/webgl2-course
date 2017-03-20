#version 300 es
precision highp float;

layout(location = 0) in vec2 position;
layout(location = 1) in vec2 velocity;
layout(location = 2) in float spawntime;
layout(location = 3) in float lifetime;
layout(location = 4) in float ID;

uniform float time;
uniform vec2 acceleration;

out vec2 Position;
out vec2 Velocity;
out float SpawnTime;
out float LifeTime;

float rand(vec2 co)
{
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main()
{
  if (spawntime == 0.0 || 
    (time - spawntime > lifetime))
  {
    // Generate a new particle
    Position = vec2(0.0, 0.0);
    Velocity = vec2(rand(vec2(ID, 0.0)) - 0.5, rand(vec2(ID, 0.1)));
    SpawnTime = time;
    LifeTime = 5000.0;
  }
  else
  {
    Velocity = velocity + 0.01 * acceleration;
    Position = position + 0.01 * Velocity;
    SpawnTime = spawntime;
    LifeTime = lifetime;
  }
}