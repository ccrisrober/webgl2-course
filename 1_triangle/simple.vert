#version 300 es
precision mediump float;

in vec3 position;

out vec3 oColor;

void main() 
{
	gl_Position = vec4(position, 1.0);
}
