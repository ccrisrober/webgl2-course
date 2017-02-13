#version 300 es
precision mediump float;

in vec3 position;
in vec2 texCoord;

out vec2 tc;

void main() 
{
	tc = texCoord;
	gl_Position = vec4(position, 1.0);
}
