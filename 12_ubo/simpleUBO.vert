#version 300 es
precision mediump float;
layout(std140) uniform;

in vec3 position;
in vec3 normal;
in vec2 texCoord;

out vec3 Pos;
out vec3 Normal;
out vec2 Tc;

uniform mat4 model;

uniform Transform
{
    mat4 projection2;
    mat4 view2;
};
void main() 
{
	Tc = texCoord;
	
	gl_Position = projection2 * view2 * model * vec4(position, 1.0);

	Pos = vec3(model * vec4(position, 1.0));
	Normal = mat3(transpose(inverse(model))) * normal;
}
