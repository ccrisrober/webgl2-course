#version 300 es
precision mediump float;

in vec3 position;

out vec2 tc;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

void main() 
{
	gl_Position = projection * view * model * vec4(position, 1.0);
}
