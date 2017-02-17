#version 300 es
precision mediump float;

in vec3 VertexPosition;
in vec2 VertexVelocity;
in float VertexStartTime;
in vec3 VertexInitialVelocity;

out float Transp;

uniform float Time;
uniform float ParticleLifetime;

uniform mat4 projection;
uniform mat4 view;
//uniform mat4 model;

void main( ) 
{
    float age = Time - VertexStartTime;
    Transp = 1.0 - age / ParticleLifetime;
	gl_PointSize = 10.0;

	gl_Position = projection * view /* * model*/ * vec4(VertexPosition, 1.0);
}