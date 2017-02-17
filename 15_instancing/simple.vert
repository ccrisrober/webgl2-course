#version 300 es
precision mediump float;

in vec2 position;
out vec3 color;

void main() 
{
	if (mod(float(gl_InstanceID), 2.0) == 0.0)
	{
		color = vec3(1.0, 0.0, 0.0);
	}
	else {
		color = vec3(0.0, 1.0, 0.0);
	}
	gl_Position = vec4(position + vec2(float(gl_InstanceID) - 0.5, 0.0), 0.0, 1.0);
}
