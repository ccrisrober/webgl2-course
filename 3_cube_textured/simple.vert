#version 300 es
precision mediump float;

in vec3 position;
in vec2 texCoord;

out vec2 tc;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

void main() 
{
	tc = texCoord;
	gl_Position = projection * view * model * vec4(position, 1.0);
}
