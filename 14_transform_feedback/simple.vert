#version 300 es
precision mediump float;

in vec4 position;

void main() 
{
	gl_PointSize = 20.0;
	gl_Position = vec4(-position.x, position.yzw);
}
