#version 300 es
precision mediump float;

in vec3 position;
in vec2 texCoord;

in vec3 offset;
in vec3 color;

out vec2 tc;
out vec3 outColor;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

void main() 
{
	tc = texCoord;
	outColor = color;
	gl_Position = projection * view * model * vec4(position + offset, 1.0);
}
