precision mediump float;

attribute vec3 position;
attribute vec2 texCoord;

varying vec2 tc;

void main() 
{
	tc = texCoord;
	gl_Position = vec4(position, 1.0);
}
