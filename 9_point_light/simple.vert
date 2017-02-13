#version 300 es
precision mediump float;

in vec3 position;
in vec3 normal;
in vec2 texCoord;

out vec3 Pos;
out vec3 Normal;
out vec2 Tc;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

void main() 
{
	Tc = texCoord;
	gl_Position = projection * view * model * vec4(position, 1.0);
	Pos = vec3(model * vec4(position, 1.0));
	Normal = mat3(transpose(inverse(model))) * normal;
}
