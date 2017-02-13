#version 300 es
precision mediump float;

out vec4 fragColor;

in vec2 tc;

void main() 
{
    fragColor = vec4(tc, 0.0, 1.0);
}