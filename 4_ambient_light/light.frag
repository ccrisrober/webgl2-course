#version 300 es
precision mediump float;

uniform vec3 ourColor;
uniform vec3 lightColor;

out vec4 fragColor;

void main()
{
	fragColor = vec4(lightColor * ourColor, 1.0);
}